import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import type { GetStaticProps } from 'next';
import { useTranslation } from 'next-i18next';
import type { NextPageWithLayout } from '@/types';
import Layout from '@/layouts/_layout';
import Header from '@/components/header/headers';

const ErrorPage: NextPageWithLayout = () => {
  const { t } = useTranslation('common');
  return <Header />;
};

export default ErrorPage;
