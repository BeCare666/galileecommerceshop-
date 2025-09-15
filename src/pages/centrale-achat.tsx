import Centrale1 from "@/components/centrale/centrale1";
import Centrale from "@/components/centrale/centrale";
import Centrale2 from "@/components/centrale/centrale2";
import Centrale3 from "@/components/centrale/centrale3";
import Centrale4 from "@/components/centrale/centrale4";
import Centrale5 from "@/components/centrale/centrale5";
import Centrale6 from "@/components/centrale/centrale6";
import GeneralLayout from '@/layouts/_general-layout';
import Seo from '@/layouts/_seo';
import type { NextPageWithLayout } from '@/types';
import type { GetStaticProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const CentraleAchat: NextPageWithLayout = () => {
    return (
        <main className="space-y-12 bg-[#1B2232]">
            { /** <Centrale /> **/}
            <Centrale1 />
            <Centrale2 />
            <Centrale3 />
            <Centrale4 />
            <Centrale5 />
            <Centrale6 />


        </main>
    );
}


CentraleAchat.getLayout = function getLayout(page) {
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

export default CentraleAchat;
