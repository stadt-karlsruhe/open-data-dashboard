import { useTranslations } from 'next-intl';

export default function Imprint() {
  const t = useTranslations('Footer');
  return (
    <div className="container mt-4">
      <h1>{t('legalNotice')}</h1>
      <br />
      <div className="mb-4">
        <h2>{t('publisher')}</h2>
        <address>
          Stadt Karlsruhe <br />
          Karl-Friedrich-Str. 10 <br />
          76133 Karlsruhe <br />
          Telefon: 0721 133-0 <br />
          E-Mail: <a href="mailto:stadt@karlsruhe.de">stadt[at]karlsruhe.de</a>
        </address>
        <p>
          <b>{t('authorizedRepresentative')}</b> <br />
          Oberbürgermeister Dr. Frank Mentrup
        </p>
        <p>
          <b>{t('supervisoryAuthority')}</b> <br />
          Regierungspräsidium Karlsruhe
        </p>
        <p>
          <b>{t('vatId')}</b> <br />
          DE143589000
        </p>
        <p>
          <b>{t('postalAddress')}</b> <br />
          Stadt Karlsruhe <br />
          76124 Karlsruhe
        </p>
      </div>

      <div className="mb-4">
        <h3>{t('responsibleEditorialDepartment')}</h3>
        <p>
          Amt für Informationstechnik und Digitalisierung <br />
          Open Government und Open Data <br />
          E-Mail: <a href="mailto:transparenz@karlsruhe.de">transparenz[at]karlsruhe.de</a>
        </p>
      </div>

      <div className="mb-4">
        <h3>{t('technicalImplementation')}</h3>
        <p>Anwendungsprojekt Hochschule Karlsruhe</p>
      </div>
      <div className="mb-4">
        <h2>{t('dataProtection')}</h2>
        <p>{t('dataProtectionText1')}</p>
        <p>
          <b>{t('externalLinks')}</b> <br />
          {t('dataProtectionText2')}
        </p>
      </div>
    </div>
  );
}
