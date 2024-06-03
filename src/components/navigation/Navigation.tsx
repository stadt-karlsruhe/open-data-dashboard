'use client';

import { Configuration, categoriesSchema } from '@/schemas/configuration-schema';

import ErrorComponent from '../error-handling/ErrorComponent';
import NavigationContent from './NavigationContent';
import { Offcanvas } from 'react-bootstrap';
import { useShowNavigation } from './NavigationProvider';

export default function Navigation({ configuration }: { configuration: Configuration }) {
  const { show, setShow } = useShowNavigation();
  const categories = categoriesSchema.safeParse(configuration.categories);
  if (!categories.success) {
    return <ErrorComponent type="configurationInvalid" error={JSON.stringify(categories.error)} />;
  }

  return (
    <div>
      <Offcanvas
        show={show}
        onHide={() => {
          setShow(false);
        }}
      >
        <Offcanvas.Header closeButton>Open Data Dashboard</Offcanvas.Header>
        <Offcanvas.Body>
          <NavigationContent categories={configuration.categories} />
        </Offcanvas.Body>
      </Offcanvas>
      <NavigationContent categories={categories.data} className="d-none d-md-block me-md-5" />
    </div>
  );
}
