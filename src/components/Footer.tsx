import { createSharedPathnamesNavigation } from 'next-intl/navigation';
import { locales } from '@/locales';
import { useTranslations } from 'next-intl';

const { Link } = createSharedPathnamesNavigation({
  locales: [...locales.values()],
});

export default function Footer({ className }: { className?: string }) {
  const t = useTranslations('Footer');
  return (
    <footer className={`footer bg-black py-3 d-flex flex-wrap ${className ?? ''}`}>
      <div className="container-sm d-flex flex-wrap justify-content-around">
        <a
          href="/imprint"
          className="lead link-light link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
        >
          {t('imprint')} & <br /> {t('dataProtection')}
        </a>
        <a
          href="#"
          className="lead link-light link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
        >
          {t('sourceCode')}
        </a>
      </div>
    </footer>
  );
}
