import LegalNotice from '@/components/legal-notice/LegalNotice';
import PageWrapper from '@/components/layout/PageWrapper';
import { useTranslations } from 'next-intl';

export default function LegalNoticePage() {
  const t = useTranslations('LegalNotice');
  return (
    <PageWrapper title={t('title')}>
      <LegalNotice />
    </PageWrapper>
  );
}
