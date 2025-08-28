import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import type { GetStaticProps } from 'next';
import { useTranslation } from 'next-i18next';
import type { NextPageWithLayout } from '@/types';
import GeneralLayout from '@/layouts/_general-layout';
import PageHeading from '@/components/ui/page-heading';
import GeneralContainer from '@/layouts/_general-container';
import { privacyPolicy } from '@/data/static/privacy-setting';
import Seo from '@/layouts/_seo';
import routes from '@/config/routes';
import ImageHomePagebackground from '@/assets/images/background6.webp';
const PrivacyPage: NextPageWithLayout = () => {
  const { t } = useTranslation('common');
  return (
    <>
      <Seo
        title="Privacy Policy"
        description="Fastest digital download template built with React, NextJS, TypeScript, React-Query and Tailwind CSS."
        url={routes.privacy}
      />
      <div className="mx-auto flex h-full w-full max-w-screen-xl flex-col p-4 sm:p-5">
        <div className="h-full w-full relative bg-center bg-cover mb-7" style={{ backgroundImage: `url(${ImageHomePagebackground.src})` }}>
          <PageHeading
            title={t('text-privacy-page-title')}
            subtitle={t('text-privacy-page-subtitle')}
          />
        </div>
        <GeneralContainer>
          {privacyPolicy?.map((item) => (
            <div
              key={item.id}
              className="order-list-enable mb-8 last:mb-0 lg:mb-10"
            >
              <h3 className="mb-4 text-sm font-medium text-dark dark:text-light lg:mb-5">
                {t(item.title)}
              </h3>
              <div
                className="space-y-5 leading-6"
                dangerouslySetInnerHTML={{
                  __html: t(item.description),
                }}
              />
            </div>
          ))}
        </GeneralContainer>
      </div>
    </>
  );
};

PrivacyPage.getLayout = function getLayout(page) {
  return <GeneralLayout>{page}</GeneralLayout>;
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, ['common'])),
    },
    revalidate: 60, // In seconds
  };
};

export default PrivacyPage;
