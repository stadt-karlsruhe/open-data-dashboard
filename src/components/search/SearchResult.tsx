// eslint-disable-next-line import/named
import { Highlighter, TypeaheadMenuProps } from 'react-bootstrap-typeahead';

import { Resource } from '@/schemas/configuration-schema';
import { getColorForResourceType } from '@/colors';
import { getIconForResource } from '@/icons';

export default function SearchResult({ resource, menuProps }: { resource: Resource; menuProps: TypeaheadMenuProps }) {
  return (
    <div className="d-flex align-items-center">
      <div>
        <i className={`bi bi-${getIconForResource(resource)} fs-1`} />
      </div>
      <div className="d-flex flex-column text-center text-wrap flex-fill">
        <div className="fw-bold">
          <Highlighter search={menuProps.text}>{resource.name}</Highlighter>
        </div>
        <small className="fst-italic">
          {resource.description && <Highlighter search={menuProps.text}>{resource.description}</Highlighter>}
        </small>
        <div className="my-1">
          <div className="badge  p-2" style={{ backgroundColor: getColorForResourceType(resource.type) }}>
            {resource.type}
          </div>
        </div>
      </div>
    </div>
  );
}
