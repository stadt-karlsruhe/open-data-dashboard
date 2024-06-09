import { useTranslations } from 'next-intl';

export default function Footer() {
  const t = useTranslations('Footer');
  return (
    <footer className="bg-black py-2 d-flex flex-wrap">
      <div className="container-sm d-flex flex-wrap justify-content-around">
        <a
          href="#"
          className="lead link-light link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
        >
          {t('imprint')}
        </a>
        <a
          href="#"
          className="lead link-light link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
        >
          {t('dataProtection')}
        </a>
      </div>
    </footer>
  );
}
