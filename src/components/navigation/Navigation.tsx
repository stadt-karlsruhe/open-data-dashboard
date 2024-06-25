'use client';

import { Configuration } from '@/schemas/configuration/configurationSchema';
import NavigationContent from './NavigationContent';
import { Offcanvas } from 'react-bootstrap';
import { useShowNavigation } from './NavigationProvider';

export default function Navigation({ configuration }: { configuration: Configuration }) {
  const { show, setShow } = useShowNavigation();

  return (
    <div data-cy="navigation">
      <Offcanvas
        show={show}
        onHide={() => {
          setShow(false);
        }}
      >
        <Offcanvas.Header closeButton>Open Data Dashboard</Offcanvas.Header>
        <Offcanvas.Body>
          <NavigationContent categories={configuration.categories} dashboards={configuration.dashboards} />
        </Offcanvas.Body>
      </Offcanvas>
      <NavigationContent
        categories={configuration.categories}
        dashboards={configuration.dashboards}
        className="d-none d-lg-block me-lg-2"
      />
    </div>
  );
}
