'use client';

import { useLocale, useTranslations } from 'next-intl';
import { createSharedPathnamesNavigation } from 'next-intl/navigation';
import { locales } from '@/locales';
import { useSearchParams } from 'next/navigation';

const { useRouter, usePathname } = createSharedPathnamesNavigation({
  locales: [...locales.values()],
});

export default function LocaleSwitcher() {
  const t = useTranslations('LocaleSwitcher');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const onLocaleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams);
    router.replace(`${pathname}?${params.toString()}`, { locale: e.target.value });
  };

  return (
    <select
      defaultValue={locale}
      onChange={onLocaleChange}
      id="locale-switcher"
      aria-label="locale-switcher"
      className="form-select"
      style={{ maxWidth: '200px' }}
    >
      {[...locales.values()].map((lang) => (
        <option key={lang} value={lang}>
          {t('locale', { locale: lang })}
        </option>
      ))}
    </select>
  );
}
