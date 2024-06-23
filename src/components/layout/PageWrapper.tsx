import { CSSProperties, ReactNode } from 'react';

export default function PageWrapper({
  title,
  description,
  children,
  style,
}: {
  title: string;
  description?: string;
  children?: ReactNode;
  style?: CSSProperties;
}) {
  return (
    <div className="flex-grow-1 m-2" style={style}>
      <div className="d-flex align-items-center justify-content-center">
        <div className="d-flex flex-column text-center text-wrap">
          <h1 className="h1 text-center" data-cy="page-title">
            {title}
          </h1>
          <p className="lead text-center" data-cy="page-description">
            {description}
          </p>
        </div>
      </div>
      {children}
    </div>
  );
}
