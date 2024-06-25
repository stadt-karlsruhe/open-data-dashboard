import LocaleSwitcher from './LocaleSwitcher';
import { createSharedPathnamesNavigation } from 'next-intl/navigation';
import { locales } from '@/locales';
import { useTranslations } from 'next-intl';

const { Link } = createSharedPathnamesNavigation({
  locales: [...locales.values()],
});

export default function Footer({ className }: { className?: string }) {
  const t = useTranslations('Footer');
  return (
    <footer className={`footer bg-black py-3 d-flex flex-wrap ${className ?? ''}`} data-cy="footer">
      <div className="container-lg d-flex flex-wrap justify-content-around align-content-center">
        <div className="d-flex flex-column">
          <Link
            href="/legal-notice"
            className="link-light link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
            data-cy="footer-legal-notice"
          >
            <i className="bi bi-info-circle-fill me-2"></i>
            {t('legalNotice')}
          </Link>
          <Link
            href="https://github.com/stadt-karlsruhe/open-data-dashboard"
            target="_blank"
            rel="noopener noreferrer"
            className="link-light link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
            data-cy="footer-github"
          >
            <i className="bi bi-github me-2"></i>
            {t('source')}
          </Link>
        </div>
        <div>
          <LocaleSwitcher />
        </div>
      </div>
    </footer>
  );
}
