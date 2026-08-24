import { useEffect, useRef } from 'react';

const GRAPH_WIDTH = 760;
const GRAPH_HEIGHT = 560;
const CONNECTION_DISTANCE = 0.4;
const PUSH_RADIUS = 0.6;
const NODE_LIMITS = { minX: 0.08, maxX: 0.92, minY: 0.1, maxY: 0.9 };

type GraphNodeDefinition = {
  x: number;
  y: number;
  size: number;
  velocityX: number;
  velocityY: number;
  phase: number;
};

type GraphNode = GraphNodeDefinition & {
  originX: number;
  originY: number;
};

const NODE_DEFINITIONS: GraphNodeDefinition[] = [
  { x: 0.09, y: 0.22, size: 1.08, velocityX: 0.00035, velocityY: 0.0002, phase: 0.2 },
  { x: 0.24, y: 0.08, size: 0.86, velocityX: -0.00025, velocityY: 0.0003, phase: 1.1 },
  { x: 0.48, y: 0.16, size: 1.28, velocityX: 0.00025, velocityY: -0.0002, phase: 2.3 },
  { x: 0.72, y: 0.1, size: 0.92, velocityX: -0.0003, velocityY: 0.00025, phase: 3.4 },
  { x: 0.91, y: 0.25, size: 1.16, velocityX: 0.0002, velocityY: 0.0003, phase: 4.6 },
  { x: 0.15, y: 0.43, size: 0.9, velocityX: -0.00025, velocityY: -0.00025, phase: 5.4 },
  { x: 0.34, y: 0.3, size: 1.38, velocityX: 0.0002, velocityY: 0.0002, phase: 0.8 },
  { x: 0.58, y: 0.39, size: 0.98, velocityX: -0.0003, velocityY: 0.0002, phase: 1.8 },
  { x: 0.79, y: 0.31, size: 1.12, velocityX: 0.0003, velocityY: -0.00025, phase: 2.8 },
  { x: 0.24, y: 0.59, size: 1.04, velocityX: 0.0003, velocityY: 0.00025, phase: 3.8 },
  { x: 0.5, y: 0.52, size: 1.48, velocityX: -0.00025, velocityY: 0.0003, phase: 4.8 },
  { x: 0.69, y: 0.61, size: 0.88, velocityX: 0.0002, velocityY: -0.0002, phase: 5.8 },
  { x: 0.1, y: 0.76, size: 1.2, velocityX: -0.0003, velocityY: 0.0002, phase: 0.4 },
  { x: 0.37, y: 0.82, size: 0.92, velocityX: 0.00025, velocityY: -0.00025, phase: 1.5 },
  { x: 0.57, y: 0.74, size: 1.1, velocityX: -0.0002, velocityY: 0.00025, phase: 2.6 },
  { x: 0.78, y: 0.85, size: 0.84, velocityX: 0.0003, velocityY: 0.0002, phase: 3.7 },
  { x: 0.91, y: 0.7, size: 1.32, velocityX: -0.00025, velocityY: -0.0002, phase: 4.7 },
  { x: 0.84, y: 0.91, size: 0.96, velocityX: 0.0002, velocityY: -0.00025, phase: 5.7 },
];

const EDGE_PAIRS = NODE_DEFINITIONS.flatMap((_, fromIndex) =>
  NODE_DEFINITIONS.slice(fromIndex + 1).map(
    (_, offset) => [fromIndex, fromIndex + offset + 1] as const,
  ),
);

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function createNodes(): GraphNode[] {
  return NODE_DEFINITIONS.map((definition) => ({
    ...definition,
    originX: definition.x,
    originY: definition.y,
  }));
}

export function ElasticWaveField() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const interactionSurface = svg.closest<HTMLElement>('.hero') ?? svg;
    const nodeElements = Array.from(svg.querySelectorAll<SVGCircleElement>('[data-graph-node]'));
    const haloElements = Array.from(svg.querySelectorAll<SVGCircleElement>('[data-graph-halo]'));
    const edgeElements = Array.from(svg.querySelectorAll<SVGLineElement>('[data-graph-edge]'));
    const nodes = createNodes();
    const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    const pointer = { x: 0.58, y: 0.48, active: false };
    let animationFrame: number | undefined;
    let lastTime = performance.now();
    let visible = true;

    const render = (time: number, delta: number) => {
      nodes.forEach((node) => {
        const ambientX = node.originX + Math.sin(time * 0.00018 + node.phase) * 0.014;
        const ambientY = node.originY + Math.cos(time * 0.00015 + node.phase) * 0.012;
        node.velocityX += (ambientX - node.x) * 0.0007 * delta;
        node.velocityY += (ambientY - node.y) * 0.0007 * delta;

        if (pointer.active) {
          const distanceX = node.x - pointer.x;
          const distanceY = node.y - pointer.y;
          const distance = Math.hypot(distanceX, distanceY);

          if (distance < PUSH_RADIUS) {
            const falloff = (1 - distance / PUSH_RADIUS) ** 2;
            const safeDistance = distance || 0.001;
            node.velocityX += (distanceX / safeDistance) * 0.0018 * falloff * delta;
            node.velocityY += (distanceY / safeDistance) * 0.0018 * falloff * delta;
          }
        }

        node.velocityX *= 0.85 ** delta;
        node.velocityY *= 0.85 ** delta;
        node.x += node.velocityX * delta;
        node.y += node.velocityY * delta;

        if (node.x < NODE_LIMITS.minX || node.x > NODE_LIMITS.maxX) {
          node.x = clamp(node.x, NODE_LIMITS.minX, NODE_LIMITS.maxX);
          node.velocityX *= -0.75;
        }
        if (node.y < NODE_LIMITS.minY || node.y > NODE_LIMITS.maxY) {
          node.y = clamp(node.y, NODE_LIMITS.minY, NODE_LIMITS.maxY);
          node.velocityY *= -0.75;
        }
      });

      const nodeFocus = nodes.map((node) => {
        if (!pointer.active) return 0;
        const distance = Math.hypot(node.x - pointer.x, node.y - pointer.y);
        return distance < PUSH_RADIUS ? (1 - distance / PUSH_RADIUS) ** 2 : 0;
      });

      EDGE_PAIRS.forEach(([fromIndex, toIndex], edgeIndex) => {
        const from = nodes[fromIndex];
        const to = nodes[toIndex];
        const distance = Math.hypot(from.x - to.x, from.y - to.y);
        const edge = edgeElements[edgeIndex];

        if (distance >= CONNECTION_DISTANCE) {
          edge.setAttribute('display', 'none');
          return;
        }

        const proximity = 1 - distance / CONNECTION_DISTANCE;
        const focus = Math.max(nodeFocus[fromIndex], nodeFocus[toIndex]);
        edge.removeAttribute('display');
        edge.setAttribute('x1', String(from.x * GRAPH_WIDTH));
        edge.setAttribute('y1', String(from.y * GRAPH_HEIGHT));
        edge.setAttribute('x2', String(to.x * GRAPH_WIDTH));
        edge.setAttribute('y2', String(to.y * GRAPH_HEIGHT));
        edge.setAttribute('stroke-opacity', String(0.07 + proximity * 0.18 + focus * 0.28));
        edge.setAttribute('stroke-width', String(0.8 + proximity * 0.8 + focus * 0.8));
      });

      nodes.forEach((node, index) => {
        const focus = nodeFocus[index];
        const circle = nodeElements[index];
        const halo = haloElements[index];

        circle.setAttribute('cx', String(node.x * GRAPH_WIDTH));
        circle.setAttribute('cy', String(node.y * GRAPH_HEIGHT));
        circle.setAttribute('r', String(4.2 * node.size + focus * 2.5));
        circle.setAttribute('fill-opacity', String(0.56 + focus * 0.42));
        halo.setAttribute('cx', String(node.x * GRAPH_WIDTH));
        halo.setAttribute('cy', String(node.y * GRAPH_HEIGHT));
        halo.setAttribute('r', String(7 + node.size * 2 + focus * 13));
        halo.setAttribute('stroke-opacity', String(focus * 0.28));
      });
    };

    const animate = (time: number) => {
      animationFrame = undefined;
      const delta = clamp((time - lastTime) / 16.667, 0.5, 2);
      lastTime = time;
      render(time, delta);
      if (visible) animationFrame = window.requestAnimationFrame(animate);
    };

    const start = () => {
      if (visible && animationFrame === undefined)
        animationFrame = window.requestAnimationFrame(animate);
    };

    const handlePointerMove = (event: Event) => {
      const pointerEvent = event as PointerEvent;
      const bounds = interactionSurface.getBoundingClientRect();
      if (!bounds.width || !bounds.height) return;

      pointer.x = clamp((pointerEvent.clientX - bounds.left) / bounds.width, 0, 1);
      pointer.y = clamp((pointerEvent.clientY - bounds.top) / bounds.height, 0, 1);
      pointer.active = true;
      start();
    };

    const handlePointerLeave = () => {
      pointer.active = false;
    };

    render(0, 0);
    if (reduceMotion) return;

    const visibilityObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) {
        lastTime = performance.now();
        start();
      } else if (animationFrame !== undefined) {
        window.cancelAnimationFrame(animationFrame);
        animationFrame = undefined;
      }
    });

    interactionSurface.addEventListener('pointermove', handlePointerMove);
    interactionSurface.addEventListener('pointerleave', handlePointerLeave);
    visibilityObserver.observe(svg);
    start();

    return () => {
      interactionSurface.removeEventListener('pointermove', handlePointerMove);
      interactionSurface.removeEventListener('pointerleave', handlePointerLeave);
      visibilityObserver.disconnect();
      if (animationFrame !== undefined) window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <svg
      ref={svgRef}
      className="hero__wave-field"
      viewBox={`0 0 ${GRAPH_WIDTH} ${GRAPH_HEIGHT}`}
      aria-hidden="true"
      focusable="false"
      preserveAspectRatio="xMidYMid meet"
    >
      <g className="hero__wave-edges">
        {EDGE_PAIRS.map(([fromIndex, toIndex], index) => (
          <line
            key={`${fromIndex}-${toIndex}`}
            data-graph-edge={index}
            x1="0"
            y1="0"
            x2="0"
            y2="0"
            stroke="var(--accent-text)"
            strokeOpacity="0"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </g>
      <g className="hero__wave-nodes">
        {NODE_DEFINITIONS.map((node, index) => (
          <g key={`${node.x}-${node.y}`}>
            <circle
              data-graph-halo={index}
              cx={node.x * GRAPH_WIDTH}
              cy={node.y * GRAPH_HEIGHT}
              r="8"
              stroke="var(--accent-text)"
              strokeOpacity="0"
              strokeWidth="1"
              fill="none"
              vectorEffect="non-scaling-stroke"
            />
            <circle
              data-graph-node={index}
              cx={node.x * GRAPH_WIDTH}
              cy={node.y * GRAPH_HEIGHT}
              r={4.2 * node.size}
              fill="var(--accent)"
              fillOpacity="0.56"
            />
          </g>
        ))}
      </g>
    </svg>
  );
}
