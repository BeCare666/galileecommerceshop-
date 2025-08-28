
import PageHeading from '@/components/ui/page-heading';
import routes from '@/config/routes';
import Services from '@/components/services/services';
import Seo from '@/layouts/_seo';
import type { NextPageWithLayout } from '@/types';
import GeneralLayout from '@/layouts/_general-layout';
import type { GetStaticProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import ImageHomePagebackground from '@/assets/images/toy-shopping-trolley-present-near-laptop-keyboard.jpg';

const ServicesPage: NextPageWithLayout = () => {
    const { t } = useTranslation('common');

    return (
        <>
            <Seo
                title="services"
                description="services"
                url={routes.terms}
            />
            <div className="mx-auto flex h-full w-full max-w-screen-xl flex-col p-4 sm:p-5">
                <div className="h-full w-full relative bg-center bg-cover mb-7" style={{ backgroundImage: `url(${ImageHomePagebackground.src})` }}>
                    <PageHeading
                        title="Nos services"
                        subtitle="Voici nos services"
                    />
                </div>

                <Services />
            </div>
        </>
    );
};

ServicesPage.getLayout = function getLayout(page) {
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

export default ServicesPage;
