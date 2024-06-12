import { Category, Dashboard } from '@/schemas/configurationSchema';
import { concatenateNameAndId, replaceWhitespaceInString } from '@/utils/stringUtils';

import { ListGroup } from 'react-bootstrap';
import { createSharedPathnamesNavigation } from 'next-intl/navigation';
import { locales } from '@/locales';
import { useTranslations } from 'next-intl';

const { Link } = createSharedPathnamesNavigation({
  locales: [...locales.values()],
});

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
  const [homepage, ...dashboards] = providedDashboards;
  return (
    <ListGroup variant="flush" className={className}>
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
              href={`/overview/resources/${replaceWhitespaceInString(category.name)}`}
              className="link-secondary link-underline-opacity-0 m-1 ms-3 text-nowrap"
            >
              <i className={`bi bi-${category.icon}`} /> {category.name}
            </Link>
          ))}
        </div>
      </ListGroup.Item>
    </ListGroup>
  );
}
