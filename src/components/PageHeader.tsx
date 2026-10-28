import type { ReactNode } from 'react';

interface PageHeaderProps {
  kicker: string;
  title: string;
  description: string;
  actions?: ReactNode;
}

export function PageHeader({ kicker, title, description, actions }: PageHeaderProps) {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-2xl animate-rise">
        <p className="kicker">{kicker}</p>
        <h1 className="mt-1 text-3xl font-extrabold text-white sm:text-4xl">{title}</h1>
        <p className="muted mt-2">{description}</p>
      </div>
      {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
    </div>
  );
}
