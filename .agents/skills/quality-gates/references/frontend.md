# Frontend gate

Resolve the requested route, component or path before reading files.

Check:

- rendered content exists in generated HTML for known routes;
- semantic HTML, one H1, landmarks, skip link and keyboard flow;
- visible focus, contrast, zoom, reduced motion and responsive containment;
- real loading, success, empty and error states for interactive UI;
- reusable design tokens/components are used instead of one-off drift;
- links and controls are real semantic elements;
- focused tests/build evidence and the owning npm gate.

Use the existing visual-audit tooling only after it is created and only when the required services are available. Do not change behavior during an audit.
