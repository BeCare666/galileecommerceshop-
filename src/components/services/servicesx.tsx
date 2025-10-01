// components/ServicesSections.tsx
import Image from "next/image";
import Servicesimg from "@/assets/images/services/service.png";
import Servicesimgx from "@/assets/images/services/servicesx.png";
import entreServices from "@/assets/images/services/robot.png";
import leftarrown from "@/assets/images/services/leftarrown.png";
import Link from 'next/link';
export default function ServicesSections() {
    return (
        <div className="w-full flex flex-col ">
            {/* --- Section 1 (fond noir + image) --- gap-10*/}
            <section className="relative w-full bg-black text-white flex flex-col md:flex-row items-center justify-between px-6 md:px-20  ">
                {/* Texte gauche */}
                <div className="w-full md:w-1/2 text-center md:text-left space-y-4 transition-all duration-700 ease-in-out z-10">
                    <h2 className="text-2xl md:text-3xl font-semibold leading-snug">
                        Profitez d’un secteur des services en <br /> pleine expansion dans
                        le monde
                    </h2>
                    <p className="text-base md:text-lg">
                        Visitez les B Spaces dédiés au commerce des services sur <br />
                        <span className="font-bold">Galileecommerce.com</span>
                    </p>
                    <p className="text-base md:text-lg">
                        Découvrez des offres de services dans tous les secteurs clés :{" "}
                        <br />
                        digital, éducation, finance, et plus encore !
                    </p>
                </div>

                {/* Image droite */}
                <div className="relative w-full md:w-1/2 flex justify-center mt-6 md:mt-0 transition-transform duration-700 ease-in-out">
                    <Image
                        src={Servicesimg}
                        alt="Secteur des services"
                        width={700}
                        height={700}
                        className="object-cover w-full h-[50vh] sm:h-[70vh] md:object-contain md:w-auto md:h-auto"
                        priority
                    />
                </div>
            </section>
            <section className="bg-[#fbbf24] text-black py-10 px-6 md:px-16 lg:px-24">
                {/* Container principal */}
                <h1 className="text-center font-extrabold text-xl md:text-2xl lg:text-3xl leading-tight mb-8">
                    Avec Galiléecommerce.com, profitez de réductions et de services essentiels à chaque étape de votre activité
                </h1>
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">

                    {/* Flèche gauche noire */}
                    <div className="hidden md:flex">
                        <div className="w-10 h-200 clip-path-arrow">
                            <Image
                                src={leftarrown}
                                width={40}
                                height={240}
                                alt="Robot Galiléecommerce"
                                className="mx-auto drop-shadow-lg hover:scale-105 transition-transform duration-300"
                            />
                        </div>
                    </div>

                    {/* Texte gauche */}
                    <div className="flex-1 text-center md:text-left">
                        <h2 className="font-bold text-lg md:text-xl mb-2">
                            Accédez à la valeur créée par les entreprises et les entrepreneurs
                        </h2>
                        <p className="text-sm md:text-base leading-relaxed">
                            Galiléecommerce.com vous donne accès à des services essentiels au soutien de vos activités quotidiennes.
                        </p>
                    </div>

                    {/* Robot central */}
                    <div className="flex-shrink-0 w-48 md:w-60 lg:w-72 mx-auto">
                        <Image
                            src={entreServices}
                            alt="Robot Galiléecommerce"
                            className="mx-auto drop-shadow-lg hover:scale-105 transition-transform duration-300"
                        />
                    </div>

                    {/* Texte droite */}
                    <div className="flex-1 text-center md:text-left">
                        <h2 className="font-bold text-lg md:text-xl mb-2">
                            Découvrez l’offre des entreprises innovantes
                        </h2>
                        <p className="text-sm md:text-base leading-relaxed">
                            Que vous soyez une petite ou une grande entreprise, galiléecommerce.com vous permet de découvrir l’offre innovante et adaptées des fournisseurs de services numériques, technologiques, financiers, juridique, de santé, d’ éducation, de marketing, de conseils aux entreprises, de transport et logistique…

                        </p>
                    </div>
                </div>
            </section>
            {/* --- Section 2 (fond image) --- */}
            <section
                className="h-[80vh] relative w-full flex items-center px-6 md:px-20   text-black"
                style={{
                    backgroundImage: `url(${Servicesimgx.src})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                {/* Texte droite */}
                <div
                    className="
                    w-full md:w-1/2
                    text-center md:text-right
                    md:ml-auto
                    transition-all duration-700 ease-in-out
                    "
                >
                    <p className="text-2xl md:text-3xl font-medium leading-snug bg-white/70 p-4 rounded-xl inline-block">
                        <Link href="/become-seller" className="inline-block px-2 py-1 rounded transition-colors text-white">
                            Cliquez pour <br />
                            découvrir des <br />
                            milliers d’offres de <br />
                            services commerciaux
                        </Link>

                    </p>
                </div>
            </section>

        </div>
    );
}
