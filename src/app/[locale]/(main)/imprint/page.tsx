import '@/themes/theme.karlsruhe.scss';

import { useTranslations } from 'next-intl';

export default function Imprint() {
  const t = useTranslations('Footer');
  return (
    <div data-bs-theme="karlsruhe">
      <h1>{t('imprint')}</h1>
      <h2>Herausgeber</h2>
      <p>
        Stadt Karlsruhe <br />
        Karl-Friedrich-Str. 10 <br />
        76133 Karlsruhe <br />
        Telefon: 0721 133-0 <br />
        E-Mail: stadt[at]karlsruhe.de
      </p>
    </div>
  );
}
