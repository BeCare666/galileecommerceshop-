
import { useTranslation } from 'next-i18next';
import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { cn } from '@/lib/cn'; // Tu peux retirer si inutilisé
import { useIsRTL } from '@/lib/locals';
import client from '@/data/client';
import toast from 'react-hot-toast';
import { useMutation } from 'react-query';

const Glow = ({ className = "" }: { className?: string }) => (
    <span
        className={cn(
            "absolute h-[200px] blur-[120px] rounded-full -z-10",
            className
        )}
    />
);

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
    const router = useRouter();

    if (!isOpen) return null;
    const raw = document.cookie
        .split('; ')
        .find((c) => c.startsWith('AUTH_CRED_SHOP='))
        ?.split('=')[1];

    const decoded = raw ? decodeURIComponent(raw) : null;
    const parsed = decoded ? JSON.parse(decoded) : null;

    console.log('Ton token JWT', parsed?.token); // → Ton token JWT

    const { t } = useTranslation('common');
    const { isRTL } = useIsRTL();
    const { mutate: becomeSeller, isLoading } = useMutation(client.becomeSeller.post, {
        onSuccess: (data: any) => {
            console.log('data', data)
            toast.success(data?.message || "You are now a seller !");
        },
        onError: (error: any) => {
            toast.error(error?.message || "An error has occurred.");
        },
    });

    const handleClose = () => {
        onClose();
        // Rediriger à la page précédente si possible, sinon aller à "/"
        if (window.history.length > 1) {
            router.back();
        } else {
            router.push('/');
        }
    };

    return (
        <div
            className="fixed inset-0 z-50 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center"
            onClick={handleClose}
        >
            <div
                className="relative w-full h-full max-w-6xl max-h-[100vh] bg-white dark:bg-gray-900 overflow-hidden shadow-2xl animate-fadeIn"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Contenu scrollable */}
                <div className="overflow-y-auto h-full">
                    {/* Bouton de fermeture */}
                    <button
                        onClick={handleClose}
                        className="absolute top-4 right-4 text-3xl text-gray-600 hover:text-red-600 z-50"
                        aria-label="Close the modal"
                    >
                        &times;
                    </button>

                    {/* Section personnalisée */}
                    <section className="relative py-16 px-6 md:px-12 lg:px-20">
                        {/* Glow effects */}
                        <Glow className="bg-[#BDE4DC] opacity-40 w-[200px] top-1/2 left-0" />
                        <Glow className="bg-[#F0DC72] opacity-20 w-[120px] top-[10%] left-1/2" />
                        <Glow className="bg-[#BDE4DC] opacity-40 w-[150px] top-auto left-auto right-[3%] bottom-[12%]" />

                        <div className="relative z-10 max-w-[94.75rem] mx-auto">
                            <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-10 text-center lg:text-left">
                                {/* Texte */}
                                <div className="max-w-xl mx-auto xl:mx-0 text-center lg:text-left rtl:lg:text-right space-y-6">
                                    <h1 className="text-brand text-3xl md:text-4xl xl:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-tight">
                                        Start your online business with{" "}
                                        <span className="text-pink-600">Galilé E-commerce</span>.
                                    </h1>
                                    <p className="text-lg md:text-xl leading-relaxed text-gray-700 dark:text-gray-300 text-justify">
                                        Join Galileecommerce and become a seller on the platform that connects Africa and the world.
                                        Take advantage of optimized logistics, easy access to millions of products, and boost your sales today!
                                    </p>
                                    <div className="flex justify-center lg:justify-start">
                                        <button
                                            onClick={() => becomeSeller()}
                                            className="bg-pink-600 hover:bg-pink-700 text-white font-medium py-3 px-6 rounded-lg shadow-lg transition transform hover:-translate-y-1 hover:shadow-xl"
                                        >
                                            Become a Seller
                                        </button>
                                    </div>
                                </div>

                                {/* Image */}
                                <div className="w-full max-w-md lg:max-w-lg xl:max-w-xl">
                                    <Image
                                        src="https://galileecommerce.netlify.app/img/presentation-reunion-femme-noire-pour-idees-collaboration-affaires-.avif"
                                        alt="Presentation Femme Noire"
                                        width={630}
                                        height={680}
                                        quality={100}
                                        className="w-full h-auto object-contain rounded-xl shadow-lg"
                                    />
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default Modal;
