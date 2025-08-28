// app/components/AboutSection.jsx
import Image from "next/image";
import globe from "@/assets/images/background8.webp";
import discussion from "@/assets/images/background6.webp";
import { useRouter } from "next/router"
export default function AboutSection() {
    const router = useRouter();
    function handleGoToAbout() {
        router.push("/about-us");
    }
    return (
        <section className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-10 items-center">
            {/* Colonne gauche avec images */}
            <div className="grid gap-4">
                <div className="overflow-hidden shadow-md">
                    <Image
                        src={discussion}
                        alt="Business discussion"
                        width={500}
                        height={350}
                        className="w-full h-auto object-cover"
                    />
                </div>
                <div className="overflow-hidden   shadow-md">
                    <Image
                        src={globe}
                        alt="Global trade"
                        width={500}
                        height={350}
                        className="w-full h-auto object-cover"
                    />
                </div>
            </div>

            {/* Colonne droite avec texte   <p className="text-sm text-purple-600 font-medium mb-2">
                    About – Votre Partenaire de Confiance
                </p>*/}
            <div>
                <h2 className="text-3xl font-bold mb-4 leading-snug">
                    Galileecommerce.com : Connecter l’Afrique au Monde
                </h2>
                <p className="text-gray-600 mb-6">
                    Galileecommerce.com permet aux entreprises d’accéder aux{" "}
                    <span className="font-semibold">54 pays de la Zone de libre-échange
                        continentale africaine (ZLECAf)</span>, et de saisir les opportunités
                    d’un commerce en pleine expansion en Afrique et à l’international.
                </p>

                {/* Mission */}
                <div className="mb-6">
                    <div className="flex items-center gap-2 mb-2">
                        {/* ✅ icône check */}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-6 h-6 text-purple-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                        <h3 className="text-xl font-semibold">Notre Mission</h3>
                    </div>
                    <p className="text-gray-600">
                        La mission de <span className="font-semibold">Galileecommerce.com</span>{" "}
                        est de promouvoir des solutions innovantes pour améliorer l’efficacité
                        des chaînes de valeur du commerce, connecter producteurs, distributeurs
                        et consommateurs, et simplifier l’accès aux{" "}
                        <span className="font-semibold">services financiers modernes</span>.
                    </p>
                </div>

                {/* Vision */}
                <div className="mb-8">
                    <div className="flex items-center gap-2 mb-2">
                        {/* 👁️ icône œil */}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-6 h-6 text-purple-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M1.5 12s3.75-7.5 10.5-7.5S22.5 12 22.5 12s-3.75 7.5-10.5 7.5S1.5 12 1.5 12z"
                            />
                            <circle cx="12" cy="12" r="3" />
                        </svg>
                        <h3 className="text-xl font-semibold">Notre Vision</h3>
                    </div>
                    <p className="text-gray-600">
                        Construire un écosystème où les{" "}
                        <span className="font-semibold">entreprises africaines</span> et
                        internationales accèdent à des millions de références produits, à
                        l’information en temps réel, et bénéficient d’une logistique optimisée
                        pour rendre les échanges plus compétitifs et accessibles à tous.
                    </p>
                </div>

                {/* Timeline Objectifs */}
                <div>
                    <h3 className="text-2xl font-bold text-purple-600 mb-6">
                        Nos Objectifs 2025 – 2030
                    </h3>
                    <ol className="relative border-l border-purple-300 pl-8 space-y-12">
                        {/* Étape 2025 */}
                        <li className="relative animate-fade-in opacity-0 animation-delay-200">
                            <span className="absolute -left-[1.35rem] flex items-center justify-center w-10 h-10 bg-white border-2 border-purple-500 rounded-full shadow-md">
                                {/* Icône fournisseurs */}
                                <svg xmlns="http://www.w3.org/2000/svg"
                                    className="w-5 h-5 text-purple-600" fill="none"
                                    viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm-8 7a7 7 0 1114 0H8zM4 6h16M4 10h4" />
                                </svg>
                            </span>
                            <h4 className="text-lg font-semibold text-gray-800 ml-7">2025</h4>
                            <p className="text-gray-600 ml-7">
                                Plus de <span className="font-semibold">100 000 fournisseurs</span>{" "}
                                inscrits et bénéficiant d’une gestion moderne et autonome de leurs comptes.
                            </p>
                        </li>

                        {/* Étape 2027 */}
                        <li className="relative animate-fade-in opacity-0 animation-delay-600">
                            <span className="absolute -left-[1.35rem] flex items-center justify-center w-10 h-10 bg-white border-2 border-purple-500 rounded-full shadow-md">
                                {/* Icône logistique */}
                                <svg xmlns="http://www.w3.org/2000/svg"
                                    className="w-5 h-5 text-purple-600" fill="none"
                                    viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7m-7-7v18" />
                                </svg>
                            </span>
                            <h4 className="text-lg font-semibold text-gray-800 ml-7">2027</h4>
                            <p className="text-gray-600 ml-7">
                                Déploiement de stations de livraison dynamiques pour connecter directement la production aux marchés.
                            </p>
                        </li>

                        {/* Étape 2030 */}
                        <li className="relative animate-fade-in opacity-0 animation-delay-1000">
                            <span className="absolute -left-[1.35rem] flex items-center justify-center w-10 h-10 bg-white border-2 border-purple-500 rounded-full shadow-md">
                                {/* Icône croissance */}
                                <svg xmlns="http://www.w3.org/2000/svg"
                                    className="w-5 h-5 text-purple-600" fill="none"
                                    viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 12h16m0 0l-6-6m6 6l-6 6" />
                                </svg>
                            </span>
                            <h4 className="text-lg font-semibold text-gray-800 ml-7">2030</h4>
                            <p className="text-gray-600 ml-7">
                                Atteindre la barre des{" "}
                                <span className="font-semibold">50 millions de produits</span>{" "}
                                provenant de plus de <span className="font-semibold">60 000 fournisseurs</span>{" "}
                                en Afrique et dans le monde.
                            </p>
                        </li>
                        {router.pathname === "/" && (
                            <li className="relative animate-fade-in opacity-0 animation-delay-1000">
                                <span className="absolute -left-[1.35rem] flex items-center justify-center w-10 h-10 bg-white border-2 border-purple-500 rounded-full shadow-md">
                                    {/* Icône croissance */}
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                        className="w-5 h-5 text-purple-600" fill="none"
                                        viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 12h16m0 0l-6-6m6 6l-6 6" />
                                    </svg>
                                </span>
                                <h4 className="text-lg font-semibold text-gray-800 ml-7">
                                    <button
                                        className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition"
                                        onClick={handleGoToAbout}
                                    >
                                        Cliquez ici pour en savoir plus
                                    </button>
                                </h4>

                            </li>
                        )}
                    </ol>



                </div>

            </div>

            {/* Styles animations */}
            <style jsx>{`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-fade-in {
                    animation: fadeInUp 0.8s ease forwards;
                }
                .animation-delay-200 {
                    animation-delay: 0.2s;
                }
                .animation-delay-600 {
                    animation-delay: 0.6s;
                }
                .animation-delay-1000 {
                    animation-delay: 1s;
                }
            `}</style>
        </section>
    );
}
