import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from 'react';

type ClassNameProps = {
  className?: string;
};

function joinClassNames(...classNames: Array<string | undefined>) {
  return classNames.filter(Boolean).join(' ');
}

export function Tag({ className, ...props }: HTMLAttributes<HTMLSpanElement> & ClassNameProps) {
  return <span className={joinClassNames('tag', className)} {...props} />;
}

type TechnologyListProps = ClassNameProps & {
  items: readonly ReactNode[];
  label: string;
};

export function TechnologyList({ items, label, className }: TechnologyListProps) {
  return (
    <ul className={joinClassNames('technology-list', className)} aria-label={label}>
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
}

type SectionIntroProps = ClassNameProps & {
  eyebrow?: ReactNode;
  title: ReactNode;
  titleId?: string;
  description?: ReactNode;
};

export function SectionIntro({
  className,
  eyebrow,
  title,
  titleId,
  description,
}: SectionIntroProps) {
  return (
    <header className={joinClassNames('section-intro', className)}>
      {eyebrow && <p className="section-intro__eyebrow">{eyebrow}</p>}
      <h2 id={titleId}>{title}</h2>
      {description && <p className="section-intro__description">{description}</p>}
    </header>
  );
}

type CardProps = ClassNameProps &
  HTMLAttributes<HTMLElement> & {
    as?: 'article' | 'div' | 'section';
    interactive?: boolean;
  };

export function Card({
  as: Component = 'article',
  className,
  interactive = false,
  ...props
}: CardProps) {
  return (
    <Component
      className={joinClassNames('card', interactive ? 'card--interactive' : undefined, className)}
      {...props}
    />
  );
}

type ButtonProps = ClassNameProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: 'primary' | 'secondary';
  };

export function Button({ className, variant = 'primary', ...props }: ButtonProps) {
  return (
    <button className={joinClassNames('button', `button--${variant}`, className)} {...props} />
  );
}

export function Prose({ className, ...props }: HTMLAttributes<HTMLDivElement> & ClassNameProps) {
  return <div className={joinClassNames('prose', className)} {...props} />;
}

type MetricProps = ClassNameProps & {
  value: ReactNode;
  label: ReactNode;
  detail?: ReactNode;
};

export function Metric({ className, value, label, detail }: MetricProps) {
  return (
    <div className={joinClassNames('metric', className)}>
      <span className="metric__label">{label}</span>
      <span className="metric__value">{value}</span>
      {detail && <span className="metric__detail">{detail}</span>}
    </div>
  );
}
