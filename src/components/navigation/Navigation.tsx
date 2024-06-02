'use client';

import NavigationContent from './NavigationContent';
import { Offcanvas } from 'react-bootstrap';
import { useShowNavigation } from './NavigationProvider';

export default function Navigation() {
  const { show, setShow } = useShowNavigation();
  return (
    <div className="d-flex">
      <Offcanvas
        show={show}
        onHide={() => {
          setShow(false);
        }}
      >
        <Offcanvas.Header closeButton>Open Data Dashboard</Offcanvas.Header>
        <Offcanvas.Body>
          <NavigationContent />
        </Offcanvas.Body>
      </Offcanvas>
      <NavigationContent className="d-none d-md-block" />
    </div>
  );
}
