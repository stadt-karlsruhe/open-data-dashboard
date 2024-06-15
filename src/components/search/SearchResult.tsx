// eslint-disable-next-line import/named
import { Highlighter, TypeaheadMenuProps } from 'react-bootstrap-typeahead';

import { DataElement } from '@/types/data';
import { getColorForResourceType } from '@/utils/colors';

export default function SearchResult({ element, menuProps }: { element: DataElement; menuProps: TypeaheadMenuProps }) {
  return (
    <div className="d-flex align-items-center">
      <div>
        <i className={`bi bi-${element.icon} fs-1`} />
      </div>
      <div className="d-flex flex-column text-center text-wrap flex-fill">
        <div className="fw-bold">
          {element.type === 'category' && <i className="bi bi-collection-fill me-1" />}
          {element.type === 'dashboard' && <i className="bi bi-bar-chart-fill me-1" />}
          <Highlighter search={menuProps.text}>{element.name}</Highlighter>
        </div>
        <small>{element.description && <Highlighter search={menuProps.text}>{element.description}</Highlighter>}</small>
        <div className="my-1">
          <div className="badge p-2" style={{ backgroundColor: getColorForResourceType(element.resourceType) }}>
            {element.resourceType}
          </div>
        </div>
      </div>
    </div>
  );
}
