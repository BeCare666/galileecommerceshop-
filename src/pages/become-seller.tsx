"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import banner1 from "@/assets/images/banner/banner1.jpg";
import banner2 from "@/assets/images/banner/banner2.jpg";
import banner3 from "@/assets/images/banner/banner3.png";
import supplier from "@/assets/images/banner/supplier.png";
import Header from '@/components/header/headers';
import routes from '@/config/routes';
import { useIsRTL } from '@/lib/locals';
import client from '@/data/client';
import toast from 'react-hot-toast';
import { useMutation } from 'react-query';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);
export default function MonComposant() {
    const ref1 = useRef(null);
    const ref3 = useRef(null);

    const { scrollYProgress } = useScroll({
        target: ref1,
        offset: ["start end", "end start"],
    });
    const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "0%"]);

    const { scrollYProgress: scrollY3 } = useScroll({
        target: ref3,
        offset: ["start end", "end start"],
    });
    const y3 = useTransform(scrollY3, [0, 1], ["0%", "0%"]);
    const { isRTL } = useIsRTL();
    const router = useRouter();
    const { mutate: becomeSeller, isLoading } = useMutation(client.becomeSeller.post, {
        onSuccess: (data: any) => {
            // Affiche un toast de succès
            //toast.success(data?.message || "Vous êtes désormais fournisseur !");

            // Redirection sécurisée côté client après un petit délai
            if (typeof window !== "undefined") {
                setTimeout(() => {
                    let become_seller = 1
                    window.location.href = `https://galileecommerceadmin-six.vercel.app/fr/login?become_seller=${become_seller}`;
                }, 1500); // 1.5s pour laisser le toast visible
            }
        },
        onError: (error: any) => {
            if (error?.message === "Unauthorized") {
                MySwal.fire({
                    title: "Vous n'êtes pas autorisé",
                    html: `
                    <p>Vous n'êtes pas autorisé à devenir fournisseur sur <strong>GaliléeCommerce</strong>.</p>
                    <p>Veuillez vous connecter si vous avez déjà un compte, ou créer un compte si vous n’en possédez pas encore.</p>
                    `,
                    showCancelButton: true,
                    showDenyButton: true,
                    confirmButtonText: "Créer un compte",
                    denyButtonText: "Connexion",
                    cancelButtonText: "Annuler",
                    imageUrl: "https://unsplash.it/400/200",
                    imageWidth: 400,
                    imageHeight: 200,
                    imageAlt: "Custom image",
                    allowOutsideClick: false,
                }).then((result) => {
                    if (result.isConfirmed) {
                        // Redirection vers la page de création de compte
                        router.push("/register");
                    } else if (result.isDenied) {
                        // Redirection vers la page de connexion
                        router.push("/login");
                    }
                    // Si annulé, ne rien faire
                });
            }
            //toast.error(error?.message || "Une erreur est survenue.");
        },
    });
    return (
        <>
            <Header />
            <div className="w-full flex flex-col">
                {/* ================== SECTION 3 ================== */}
                <section
                    ref={ref1}
                    className="relative w-full min-h-[70vh] flex items-center justify-center px-6 md:px-12 py-20 bg-black/70 overflow-hidden"
                >
                    <motion.div style={{ y: y1 }} className="absolute inset-0 -z-10">
                        <Image
                            src={banner1}
                            alt="Connexion aux acheteurs"
                            fill
                            className="object-cover brightness-75"
                            priority
                        />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        viewport={{ once: true }}
                        className="max-w-3xl mx-auto text-center text-white flex flex-col gap-6"
                    >
                        <h2 className="text-3xl md:text-5xl font-bold">
                            Connectez-vous à des millions d’acheteurs grâce au B Space de
                            Galiléecommerce.com
                        </h2>
                        <p className="text-lg text-gray-200">
                            Les B Spaces, abréviation de Business Space, correspondent à vos
                            boutiques en ligne sur Galileecommerce.com
                        </p>
                    </motion.div>
                </section>

                {/* ================== SECTION 2 ================== */}
                <section className="w-full bg-white text-gray-800">
                    {/* image de fond */}
                    <div
                        className="relative w-full min-h-[60vh] bg-cover bg-center bg-no-repeat flex items-center"
                        style={{
                            backgroundImage: `url(${banner2.src})`,
                        }}
                    >
                        <motion.div
                            initial={{ opacity: 0, x: -60 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.9, ease: "easeOut" }}
                            viewport={{ once: true }}
                            className="px-6 md:px-16 lg:px-24 max-w-4xl"
                        >
                            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-snug drop-shadow-lg text-black md:w-[50%]">
                                Galiléecommerce.com vous offre des B Spaces captivantes
                                <br className="hidden md:inline" />
                                pour promouvoir et vendre vos produits
                            </h1>
                        </motion.div>
                    </div>

                    {/* grille responsive */}
                    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 text-sm md:text-base mt-10 px-6 py-12">
                        {[
                            {
                                title: "Rejoignez-nous en tant que fournisseur de services",
                                text: "Les B Spaces de Galileecommerce.com sont conçus pour accueillir un large éventail de services : conseils, études, maintenance, santé, communication, logistique, finance, éducation, numérique, transport…",
                            },
                            {
                                title: "Devenez fournisseur de produits physiques",
                                text: "Les B Spaces de Galileecommerce.com proposent des espaces personnalisés pour les fabricants, distributeurs, détaillants, importateurs, exportateurs, ainsi que pour les fournisseurs de matières premières dans tous les secteurs industriels.",
                            },
                            {
                                title: "Faites découvrir vos produits d’origine",
                                text: "La notion de produit d’origine est cruciale en commerce international (tarifs, accords commerciaux). Fournissez les informations sur l’origine de vos biens pour bénéficier de conditions avantageuses.",
                            },
                        ].map((bloc, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: i * 0.2 }}
                                viewport={{ once: true }}
                                className="p-6 rounded-lg shadow hover:shadow-xl bg-white transition-shadow duration-300"
                            >
                                <h2 className="text-lg font-semibold mb-3">{bloc.title}</h2>
                                <p className="text-gray-600">{bloc.text}</p>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* ================== SECTION 1 ================== */}
                <section
                    ref={ref3}
                    className="relative w-full flex items-center  justify-center text-center px-6 md:px-12 py-16 bg-black/70 overflow-hidden"
                >
                    <motion.div style={{ y: y3 }} className="absolute inset-0 -z-10">
                        <Image
                            src={banner3}
                            alt="Galileecommerce intro"
                            fill
                            className="object-cover brightness-75"
                            priority
                        />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1 }}
                        viewport={{ once: true }}
                        className="max-w-4xl mx-auto text-white flex flex-col gap-6"
                    >
                        <h1 className="text-3xl md:text-5xl font-bold">
                            Galileecommerce.com
                        </h1>

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-yellow-600 text-white font-semibold px-6 py-3  shadow-lg transition-all hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300"
                            onClick={() => router.push('/become_seller/become_seller')}
                            disabled={isLoading}>
                            REJOIGNEZ NOUS EN TANT QUE FOURNISSEUR !
                        </motion.button>

                        <p className="text-lg md:text-xl">Accédez à des millions d’acheteurs</p>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className="flex justify-center"
                        >
                            <div className=" px-4 py-2 flex items-center gap-2 shadow">
                                <Image
                                    src={supplier}
                                    alt="Verified Supplier"
                                    width={154}
                                    height={134}
                                />
                            </div>
                        </motion.div>

                        <p className="text-sm md:text-base text-gray-200 leading-relaxed max-w-2xl mx-auto">
                            Indiquez votre identité exacte. Une fois validé en tant que fournisseur
                            sur Galileecommerce.com, fournissez les informations relatives à votre
                            conformité aux normes et à vos certifications par des organismes
                            externes afin d’obtenir le statut de fournisseur vérifié (Verified Supplier).
                        </p>
                    </motion.div>
                </section>
            </div>
        </>
    );

}    