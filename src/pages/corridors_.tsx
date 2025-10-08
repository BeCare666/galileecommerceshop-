// pages/login.tsx
import MapChap from "@/components/mapChart/mapChart";
import Image from "next/image";
import Menu2 from "@/assets/imgloginorsignup/menu2.png";
import type { GetStaticProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import type { NextPageWithLayout } from '@/types';
import dynamic from "next/dynamic";
import React, { useState } from "react";
const MapChart = dynamic(() => import("@/components/mapChart/mapChart"), {
    ssr: false,
});
import { PageLoader } from '@/components/ui/loader/spinner/spinner';
const MapChapPage: NextPageWithLayout = () => {
    const [mapIsOk, setMapIsOk] = useState(true);
    const { t } = useTranslation('common');
    return (
        <div className="w-full h-[100vh]">
            <MapChart setMapIsOk={setMapIsOk} />
        </div>
    );
}
export const getStaticProps: GetStaticProps = async ({ locale }) => {
    return {
        props: {
            ...(await serverSideTranslations(locale!, ['common'])),
        },
        revalidate: 60, // In seconds
    };
};
export default MapChapPage;

{/* {mapIsOk && (
                <PageLoader showText={false} />
            )}*/}