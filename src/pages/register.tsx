// pages/login.tsx
import Register from "@/components/auth/register-form";
import Image from "next/image";
import Menu2 from "@/assets/imgloginorsignup/menu2.png";
import type { GetStaticProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import type { NextPageWithLayout } from '@/types';
const RegisterPage: NextPageWithLayout = () => {
    const { t } = useTranslation('common');
    return (
        <div className="relative h-screen w-screen bg-black/10">
            {/* Background image 
            <Image
                src={Menu2} // ton image dans /public/img/
                alt="Background"
                fill
                style={{ objectFit: "cover" }}
                priority
            />
*/}
            {/* Overlay sombre pour mieux voir le formulaire */}
            <div className="absolute inset-0 bg-black/40" />

            {/* Login form centré */}
            <div className="absolute inset-0 flex px-3 justify-center items-center">
                <div className="z-10 w-full max-w-md bg-white/90 rounded-lg shadow-lg backdrop-blur-sm">
                    <Register />
                </div>
            </div>
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
export default RegisterPage;
