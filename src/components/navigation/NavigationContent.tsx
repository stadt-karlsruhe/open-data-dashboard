import { concatenateNameAndId, sanitizeString } from '@/utils/stringUtils';

import { Category } from '@/schemas/configurationSchema';
import { Dashboard } from '@/schemas/configuration/dashboardsSchema';
import { ListGroup } from 'react-bootstrap';
import { createSharedPathnamesNavigation } from 'next-intl/navigation';
import { locales } from '@/locales';
import { useShowNavigation } from './NavigationProvider';
import { useTranslations } from 'next-intl';

const { Link } = createSharedPathnamesNavigation({
  locales: [...locales.values()],
});

// eslint-disable-next-line max-lines-per-function
export default function NavigationContent({
  categories,
  dashboards: providedDashboards,
  className,
}: {
  categories: Category[];
  dashboards: Dashboard[];
  className?: string;
}) {
  const t = useTranslations('NavigationContent');
  const { setShow } = useShowNavigation();
  const homepage = providedDashboards.find((dashboard) => dashboard.id === 'homepage');
  const dashboards = providedDashboards.filter((dashboard) => dashboard.id !== 'homepage');
  return (
    homepage && (
      <ListGroup
        variant="flush"
        className={className}
        onClick={() => {
          setShow(false);
        }}
      >
        <ListGroup.Item className="pe-md-5">
          <Link href="/home" className="nav-link text-nowrap">
            <i className={`bi bi-${homepage.icon}`} /> {t('home')}
          </Link>
        </ListGroup.Item>
        <ListGroup.Item className="pe-md-5">
          <Link href="/overview/dashboards" className="nav-link text-nowrap">
            <i className="bi bi-bar-chart-fill" /> {t('dashboards')}
          </Link>
          <div className="d-flex flex-column">
            {dashboards.map((dashboard, index) => (
              <Link
                key={index}
                href={`/dashboard/${concatenateNameAndId(dashboard.name, dashboard.id)}`}
                className="link-secondary link-underline-opacity-0 m-1 ms-3 text-nowrap"
              >
                <i className={`bi bi-${dashboard.icon}`} /> {dashboard.name}
              </Link>
            ))}
          </div>
        </ListGroup.Item>
        <ListGroup.Item className="pe-md-5">
          <Link href="/overview/resources" className="nav-link text-nowrap">
            <i className="bi bi-folder-fill" /> {t('data')}
          </Link>
          <div className="d-flex flex-column">
            {categories.map((category, index) => (
              <Link
                key={index}
                href={`/overview/resources/${sanitizeString(category.name).toLowerCase()}`}
                className="link-secondary link-underline-opacity-0 m-1 ms-3 text-nowrap"
              >
                <i className={`bi bi-${category.icon}`} /> {category.name}
              </Link>
            ))}
          </div>
        </ListGroup.Item>
      </ListGroup>
    )
  );
}
