import { Category } from '@/schemas/configuration-schema';
import Link from 'next/link';
import { ListGroup } from 'react-bootstrap';
import { useTranslations } from 'next-intl';

// TODO: Replace with actual data from configuration
export default function NavigationContent({ categories, className }: { categories: Category[]; className?: string }) {
  const t = useTranslations('NavigationContent');
  return (
    <ListGroup variant="flush" className={className}>
      <ListGroup.Item>
        <Link href="/" className="nav-link">
          <i className="bi bi-house-door-fill" /> {t('home')}
        </Link>
      </ListGroup.Item>
      <ListGroup.Item>
        <Link href="#" className="nav-link">
          <i className="bi bi-search" /> {t('search')}
        </Link>
      </ListGroup.Item>
      <ListGroup.Item>
        <Link href="#" className="nav-link">
          <i className="bi bi-bar-chart-fill" /> {t('dashboards')}
        </Link>
        <div className="d-flex flex-column">
          <Link href="#" className="link-secondary link-underline-opacity-0 m-1 ms-3">
            <i className="bi bi-book-half" /> Bevölkerung
          </Link>
          <Link href="#" className="link-secondary link-underline-opacity-0 m-1 ms-3">
            <i className="bi bi-book-half" /> Verwaltung
          </Link>
          <Link href="#" className="link-secondary link-underline-opacity-0 m-1 ms-3">
            <i className="bi bi-book-half" /> Bildung
          </Link>
          <Link href="#" className="link-secondary link-underline-opacity-0 m-1 ms-3">
            <i className="bi bi-book-half" /> Kultur
          </Link>
          <Link href="#" className="link-secondary link-underline-opacity-0 m-1 ms-3">
            <i className="bi bi-book-half" /> Mobilität
          </Link>
        </div>
      </ListGroup.Item>
      <ListGroup.Item>
        <Link href="#" className="nav-link">
          <i className="bi bi-folder-fill" /> {t('data')}
        </Link>
        <div className="d-flex flex-column">
          {categories.map((category, index) => (
            <Link key={index} href="#" className="link-secondary link-underline-opacity-0 m-1 ms-3">
              <i className={`bi bi-${category.icon}`} /> {category.name}
            </Link>
          ))}
        </div>
      </ListGroup.Item>
    </ListGroup>
  );
}
