"use client";

import React from "react";
import Suiteaccueil1 from '@/assets/images/suiteaccueil/suiteaccueil1.png';
import Suiteaccueil2 from '@/assets/images/suiteaccueil/suiteaccueil2.png';
import Suiteaccueil3 from '@/assets/images/suiteaccueil/suiteaccueil3.png';
import Suiteaccueil4 from '@/assets/images/suiteaccueil/suiteaccueil4.png';
import Suite1 from '@/assets/images/suiteaccueil/suite1.png';
import Suite2 from '@/assets/images/suiteaccueil/suite2.png';
import Suite3 from '@/assets/images/suiteaccueil/suite3.png';
import Suite12 from '@/assets/images/suiteaccueil/suite1.2.png';
import Suite31 from '@/assets/images/suiteaccueil/suite3.1.png';
import Image from "next/image";
export default function CubeStatique() {
    return (
        <>
            <section className="w-full bg-[#2b0040] py-12 px-4 md:px-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto perspective-1000">

                    {/* Carte 1 */}
                    <div className="relative transform rotate-y-12 shadow-2xl bg-gradient-to-b from-[#222034] to-[#0d0d14] p-3">
                        <div className="relative bg-gradient-to-b from-[#222034] to-[#0d0d14] text-white p-6 h-[400px] transform translate-z-10">
                            <div className="absolute inset-0 bg-gradient-to-tr h-[400px] lg:h-[450px] from-black/40 via-transparent to-white/10 pointer-events-none [clip-path:inherit]"></div>
                            <div className="relative z-10 space-y-4">
                                <div className="bg-black p-2 rounded-full w-20 h-20 flex items-center justify-center">
                                    <Image
                                        src={Suiteaccueil1}
                                        alt="Produits en action"
                                        width={40}
                                        height={40}
                                        className="object-contain"
                                    />
                                </div>
                                <h3 className="text-lg font-bold">Des produits en actions et des offres spéciales</h3>
                                <p className="text-sm text-gray-200 leading-relaxed">
                                    Découvrez des produits d'origine : Made in Gabon, Made in Sénégal,
                                    Made in Canada, Made in India, Made in Chad, Made in Cameroon,
                                    Made in China, Made in Benin, et bien d'autres encore provenant de
                                    plus de 120 pays à travers le monde.
                                </p>
                                <a href="#" className="inline-block text-sm font-semibold text-pink-400 hover:text-pink-200 transition-colors">
                                    Cliquez pour en savoir plus
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Carte 2 */}
                    <div className="relative transform rotate-y-12 shadow-2xl bg-gradient-to-b from-[#ff4b5c] to-[#8b1d2c] p-3">
                        <div className="relative bg-gradient-to-b from-[#ff4b5c] to-[#8b1d2c] text-white p-6 h-[400px]  transform translate-z-10">
                            <div className="absolute inset-0 bg-gradient-to-tr h-[400px] lg:h-[450px] from-black/40 via-transparent to-white/10 pointer-events-none [clip-path:inherit]"></div>
                            <div className="relative z-10 space-y-4">
                                <div className="bg-black p-2 rounded-full w-20 h-20 flex items-center justify-center">
                                    <Image
                                        src={Suiteaccueil2}
                                        alt="Produits en action"
                                        width={40}
                                        height={40}
                                        className="object-contain"
                                    />
                                </div>
                                <h3 className="text-lg font-bold">Faciliter les transactions entre entreprises et consommateurs</h3>
                                <p className="text-sm text-gray-200 leading-relaxed">
                                    Bénéficiez de nombreux services essentiels tels que les services
                                    numériques et technologiques, les services financiers, les
                                    services de santé, les services de conseils, l’assistance
                                    technique, la logistique, l'éducation, la formation…
                                </p>
                                <a href="#" className="inline-block text-sm font-semibold text-pink-200 hover:text-white transition-colors">
                                    Cliquez pour en savoir plus
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Carte 3 */}
                    <div className="relative transform rotate-y-12 shadow-2xl bg-gradient-to-b from-[#9d00c6] to-[#4a0066] p-3">
                        <div className="relative bg-gradient-to-b from-[#9d00c6] to-[#4a0066] text-white p-6 h-[400px] transform translate-z-10">
                            <div className="absolute inset-0 bg-gradient-to-tr h-[400px] lg:h-[450px] from-black/40 via-transparent to-white/10 pointer-events-none [clip-path:inherit]"></div>
                            <div className="relative z-10 space-y-4">
                                <div className="bg-black p-2 rounded-full w-20 h-20 flex items-center justify-center">
                                    <Image
                                        src={Suiteaccueil3}
                                        alt="Produits en action"
                                        width={40}
                                        height={40}
                                        className="object-contain"
                                    />
                                </div>
                                <h3 className="text-lg font-bold">Des prix imbattables et des solutions commerciales uniques</h3>
                                <p className="text-sm text-gray-200 leading-relaxed">
                                    Assurer l’accès des acheteurs locaux et internationaux à des
                                    millions de produits à des conditions exceptionnelles. Maîtrisez
                                    les prix et les délais de livraison.
                                </p>
                                <a href="#" className="inline-block text-sm font-semibold text-pink-300 hover:text-white transition-colors">
                                    Cliquez pour en savoir plus
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Carte 4 [clip-path:polygon(4%_0,96%_0,100%_5%,100%_95%,96%_100%,4%_100%,0_95%,0_5%)]*/}
                    <div className="relative transform rotate-y-12 shadow-2xl bg-gradient-to-b from-[#222034] to-[#0d0d14] p-3  transform translate-z-8">
                        <div className="relative bg-gradient-to-b from-[#222034] to-[#0d0d14] text-white p-6 h-[450px]  transform translate-z-10">
                            <div className="absolute inset-0 bg-gradient-to-tr h-[450px] from-black/40 via-transparent to-white/10 pointer-events-none [clip-path:inherit]"></div>
                            <div className="relative z-10 space-y-4">
                                <div className="bg-black p-2 rounded-full w-20 h-20 flex items-center justify-center">
                                    <Image
                                        src={Suiteaccueil4}
                                        alt="Produits en action"
                                        width={40}
                                        height={40}
                                        className="object-contain"
                                    />
                                </div>
                                <h3 className="text-lg font-bold">Assurance et transactions sécurisées</h3>
                                <p className="text-sm text-gray-200 leading-relaxed">
                                    Commandez en toute confiance, de la sélection des produits et des
                                    fournisseurs à la gestion des paiements jusqu'à la livraison.
                                </p>
                                <a href="#" className="inline-block text-sm font-semibold text-pink-400 hover:text-pink-200 transition-colors">
                                    Cliquez pour en savoir plus
                                </a>
                            </div>
                        </div>
                    </div>

                </div>
            </section >
            <section className="w-full bg-white flex flex-col md:flex-row items-start justify-between px-6 md:px-20 py-10">
                {/* --- Bloc texte à gauche --- */}
                <div className="w-full  text-left mb-8 mt-0 lg:mt-[66px]">
                    <h2 className="text-2xl md:text-4xl font-extrabold text-gray-900 leading-tight">
                        Explorez une vaste sélection de produits <br />
                        répartis sur plus de <br />
                        <span className="font-bold text-[#8B005D]">150 pavillons digitaux.</span>
                    </h2>
                </div>

                {/* --- Bloc chiffres à droite --- */}
                <div className="w-full md:w-1/2 grid grid-cols-2 gap-6 md:gap-10 text-[#8B005D] font-mono">
                    {/* Carte Produits */}
                    <div className="flex flex-col items-start space-y-1 transition-transform duration-300 hover:scale-105">
                        <div className="flex items-center space-x-2 mb-2">
                            <Image src={Suite1} alt="Icône Produits" width={40} height={40} />
                            <Image src={Suite12} alt="Icône Produits" width={40} height={40} />
                        </div>
                        <p className="text-[22px] md:text-3xl font-semibold">+ 50 millions</p>
                        <span className="text-black text-[19px] font-extrabold">Produits</span>
                    </div>

                    {/* Carte Fournisseurs */}
                    <div className="flex flex-col items-start space-y-1 transition-transform duration-300 hover:scale-105">
                        <Image src={Suite2} alt="Icône Fournisseurs" width={40} height={40} className="mb-2" />
                        <p className="text-[22px] md:text-3xl font-semibold">+ 50 000</p>
                        <span className="text-black text-[19px] font-extrabold">Fournisseurs</span>
                    </div>

                    {/* Carte Pays et régions */}
                    <div className="flex flex-col items-start space-y-1 transition-transform duration-300 hover:scale-105">
                        <div className="flex items-center space-x-2 mb-2">
                            <Image src={Suite3} alt="Icône Pays" width={40} height={40} />
                            <Image src={Suite31} alt="Icône Pays" width={40} height={40} />
                        </div>
                        <p className="text-[22px] md:text-[26px] font-semibold">120 +</p>
                        <span className="text-black text-[19px] font-extrabold">Pays et régions</span>
                    </div>
                </div>
            </section>

        </>
    );
}
