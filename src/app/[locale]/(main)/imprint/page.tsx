import '@/themes/theme.karlsruhe.scss';

import { useTranslations } from 'next-intl';

export default function Imprint() {
  const t = useTranslations('Footer');
  return (
    <div data-bs-theme="karlsruhe">
      <h1>{t('imprint')}</h1>
      <h2>Herausgeber</h2>
      <address>
        Stadt Karlsruhe <br />
        Karl-Friedrich-Str. 10 <br />
        76133 Karlsruhe <br />
        Telefon: <a href="tel:+497211330"> 0721 133-0 </a>
        <br />
        E-Mail: <a href="mailto:stadt@karlsruhe.de"> stadt[at]karlsruhe.de </a>
      </address>
      <p>
        <b> Vertretungsberechtiger </b>
        <br />
        Oberbürgermeister Dr. Frank Mentrup
      </p>
      <p>
        <b> Aufsichtsbehörde</b> <br />
        Regierungspräsidium Karlsruhe
      </p>
      <p>
        <b>Umsatzsteuer-Identifikationsnummer </b> <br />
        DE143589000
      </p>
      <p>
        <b>Postanschrift </b>
        <br />
        Stadt Karlsruhe <br />
        76124 Karlsruhe
      </p>
    </div>
  );
}
