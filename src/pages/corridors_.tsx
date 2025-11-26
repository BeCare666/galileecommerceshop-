// pages/login.tsx
import MapChap from "@/components/mapChart/mapChart";
import Image from "next/image";
import Menu2 from "@/assets/imgloginorsignup/menu2.png";
import type { GetStaticProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import type { NextPageWithLayout } from '@/types';
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { motion } from "framer-motion";
const MapChart = dynamic(() => import("@/components/mapChart/mapChart"), {
    ssr: false,
});
import { PageLoader } from '@/components/ui/loader/spinner/spinner';
const MapChapPage: NextPageWithLayout = () => {
    const [mapIsOk, setMapIsOk] = useState(true);
    const { t } = useTranslation('common');
    const router = useRouter();
    async function handleGotohom() {
        router.push('/')
    }
    return (
        <div className="w-full h-[100vh]">
            <MapChart setMapIsOk={setMapIsOk} />
            {/* Floating return button */}
            <motion.button
                onClick={() => router.back()}
                className="fixed bottom-4 left-8 z-50 w-14 h-14 rounded-full bg-rose-400/15 backdrop-blur-md border border-white/40 
             flex items-center justify-center shadow-lg hover:shadow-2xl hover:scale-110 transition-all"
                whileHover={{ rotate: -5 }}
                whileTap={{ scale: 0.9 }}
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#FF6EA9" className="w-7 h-7">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
            </motion.button>
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