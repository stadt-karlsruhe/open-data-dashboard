import Link from 'next/link';
import TeamMembers from './TeamMembers';
import { useTranslations } from 'next-intl';

// eslint-disable-next-line max-lines-per-function
export default function LegalNotice() {
  const t = useTranslations('LegalNotice');
  return (
    <>
      <div className="mb-4">
        <h2>{t('publisher')}</h2>
        <address>
          Stadt Karlsruhe <br />
          Karl-Friedrich-Str. 10 <br />
          76133 Karlsruhe <br />
          Telefon: 0721 133-0 <br />
          <div className="d-flex">
            E-Mail:
            <Link href="mailto:stadt@karlsruhe.de" className="nav-link ms-1">
              stadt[at]karlsruhe.de
            </Link>
          </div>
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
        <div className="text-nowrap">
          Amt für Informationstechnik und Digitalisierung <br />
          Open Government und Open Data <br />
          <div className="d-flex">
            E-Mail:
            <Link href="mailto:transparenz@karlsruhe.de" className="nav-link ms-1">
              transparenz[at]karlsruhe.de
            </Link>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <h3>{t('technicalImplementation')}</h3>
        <Link href="https://www.h-ka.de/" className="nav-link" target="_blank" rel="noopener noreferrer">
          {t('awp')}
        </Link>
        <table className="table table-borderless table-sm w-auto">
          <tbody>
            <TeamMembers />
          </tbody>
        </table>
      </div>
      <div className="mb-4">
        <h2>{t('dataProtection')}</h2>
        <p>{t('dataProtectionText1')}</p>
        <p>
          <b>{t('externalLinks')}</b> <br />
          {t('dataProtectionText2')}
        </p>
      </div>
    </>
  );
}
