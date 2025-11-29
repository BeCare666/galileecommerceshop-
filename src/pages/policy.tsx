

import Policy_G from '@/components/policy_G/policy_G';
import ErrorMessage from '@/components/ui/error-message';
import PageHeading from '@/components/ui/page-heading';
import routes from '@/config/routes';
import { useFAQs } from '@/data/faq';
import GeneralContainer from '@/layouts/_general-container';
import GeneralLayout from '@/layouts/_general-layout';
import Seo from '@/layouts/_seo';
import type { NextPageWithLayout } from '@/types';
import type { GetStaticProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import ImageHomePagebackground from '@/assets/images/black-friday-best-sale-shopping-cart-with-bags.jpg';
const PolicyPage: NextPageWithLayout = () => {
    const { t } = useTranslation('common');

    return (
        <>
            <Seo
                title="Politique de Confidentialité"
                description=""
                url=""
            />
            <div className="mx-auto flex h-full w-full max-w-screen-xl flex-col p-4 sm:p-5">
                <Policy_G

                />
            </div>
        </>
    );
};

PolicyPage.getLayout = function getLayout(page) {
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

export default PolicyPage;
