"use client";
import { useEffect } from "react";
import Image from "next/image";
import Servicesimg from "@/assets/images/pavillons/pavillons1.png";
import Pavillons2 from "@/assets/images/pavillons/pavillons2.png";
import Pavillons21 from "@/assets/images/pavillons/pavillons2.1.png";
import Pavillons3 from "@/assets/images/pavillons/pavillons3.jpg";
import Pavillons31 from "@/assets/images/pavillons/pavillons3.1.png";
import Pavillons4 from "@/assets/images/pavillons/pavillons4.png";
import Pavillons5 from "@/assets/images/pavillons/paviilons5.png";
import Pavillons51 from "@/assets/images/pavillons/pavillons5.1.png";
import Pavillons6 from "@/assets/images/pavillons/pavillons6.png";
import Link from 'next/link';
// Composant principal
export default function MonComposant() {
    useEffect(() => {
        const elements = document.querySelectorAll(".scroll-animate");
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("animate-fadeInUp");
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.2 }
        );
        elements.forEach((el) => observer.observe(el));
    }, []);

    return (
        <>
            <section className="w-full max-h-screen bg-white flex flex-col items-center justify-center px-4 md:px-12 lg:px-24 overflow-hidden">
                {/* Titre principal avec animation */}
                <h1 className="scroll-animate text-center text-4xl md:text-4xl lg:text-5xl font-bold text-purple-900 leading-snug mb-4 opacity-0">
                    Découvrez les pavillons digitaux de <br />
                    <span className="block">Galiléecommerce.com</span>
                </h1>

                {/* Image avec animation */}
                <div className="scroll-animate relative w-full flex justify-center max-h-[70vh] opacity-0">
                    <Image
                        src={Servicesimg}
                        alt="Pavillons digitaux Galiléecommerce"
                        width={990}
                        height={500}
                        className="w-full max-w-5xl h-auto object-contain transition-transform duration-700 ease-in-out hover:scale-105"
                        priority
                    />

                    {/* Texte sur la carte (superposé) */}
                    <div className="absolute bottom-2 md:bottom-4 px-2 w-full flex justify-center mt-4">
                        <div className="flex items-center justify-center">
                            <div className="flex items-center justify-center w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 bg-white/80 rounded-full shadow-md transition-all duration-500 ease-in-out hover:bg-white hover:scale-105">
                                <p className="text-center text-[10px] md:text-sm lg:text-base font-semibold text-purple-900 leading-snug px-3">
                                    Des millions de produits venant de <br />
                                    plus de 120 pays à travers le monde
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            <div className="w-full flex flex-col gap-10">
                {/* SECTION 3 - 120 Pavillons commerciaux */}
                <div className="w-full flex flex-col gap-16 px-6 md:px-16 ">
                    {/* Bloc du haut : Drapeaux + Texte */}
                    <div className="scroll-animate flex flex-col md:flex-row items-center justify-center gap-10 opacity-0 ">
                        {/* Image des drapeaux */}
                        <div className="flex-1 flex justify-center">
                            <Image
                                src={Pavillons2}
                                alt="Drapeaux pavillons"
                                width={500}
                                height={400}
                                className="transition-transform hover:scale-105 duration-300"
                            />
                        </div>

                        {/* Texte à droite */}
                        <div className="flex-1 flex items-center justify-center">
                            <h2 className="text-3xl md:text-5xl font-bold text-purple-900 text-center md:text-left leading-snug">
                                Êtes-vous prêts à visiter plus de <br />
                                <span className="text-purple-900">120 Pavillons commerciaux</span>
                            </h2>
                        </div>
                    </div>

                    {/* Bloc du bas : Texte + Dame */}
                    <div className="pl-5 pt-5 pr-5 lg:pr-0 scroll-animate flex flex-col md:flex-row items-center justify-center gap-10 opacity-0 border border-gray-300">
                        {/* Texte à gauche */}
                        <div className="flex-1 flex flex-col items-center md:items-start justify-center text-center md:text-left">
                            <p className="text-4xl font-semibold text-purple-800">
                                Profitez de l’abondance des offres et du savoir-faire mondial pour mieux vous approvisionner
                            </p>
                            <p className="text-[16px] text-gray-700 leading-relaxed max-w-md">
                                Galiléecommerce.com vous plonge dans un monde de produits issus de plus de 120 pays, vous offrant une expérience de satisfaction totale. Découvrez des produits et services reflétant la diversité culturelle et les savoir-faire uniques de chaque pays.
                            </p>
                        </div>

                        {/* Image dame à droite */}
                        <div className="flex-1 flex justify-center">
                            <Image
                                src={Pavillons21}
                                alt="Femme enthousiaste"
                                width={550}
                                height={400}
                                className="transition-transform hover:scale-105 duration-300"
                            />
                        </div>
                    </div>
                </div>

                {/* SECTION 2 - Pavillons par pays & Sélectionnez l'offre */}
                <div className="scroll-animate grid grid-cols-1 md:grid-cols-2 gap-8 px-4 md:px-12 opacity-0">
                    {/* Explorez les pavillons */}
                    <div className="relative border-2 border-yellow-600 p-6 rounded-tr-[20px] rounded-br-[60px] transition-transform hover:scale-105 duration-300">
                        <div className="flex justify-center mb-4">
                            <Image src={Pavillons3} alt="Explorez les pavillons" width={120} height={120} />
                        </div>
                        <h2 className="text-center font-bold text-purple-900 mb-2 text-[17px] ">
                            Explorez les pavillons par pays
                        </h2>
                        <p className="text-center text-[16px] text-gray-700">
                            Sélectionnez le pays de votre choix dans le menu déroulant pour découvrir ses produits et services
                        </p>
                    </div>

                    {/* Sélectionnez l'offre idéale */}
                    <div className="relative border-2 border-green-600 p-6 rounded-tr-[20px] rounded-br-[60px] transition-transform hover:scale-105 duration-300">
                        <div className="flex justify-center mb-4">
                            <Image src={Pavillons31} alt="Sélectionnez l'offre idéale" width={100} height={100} />
                        </div>
                        <h2 className="text-center font-bold text-purple-900 mb-2 text-[17px]">
                            Sélectionnez l’offre idéale
                        </h2>
                        <p className="text-center text-[16px] text-gray-700">
                            Explorez des milliers de produits et fournisseurs et choisissez les offres  qui répondent à vos attentes.
                        </p>
                    </div>
                </div>

                {/* SECTION 1 - Payez en toute confiance */}
                <div className="scroll-animate flex justify-center opacity-0">
                    <div className="relative border-2 border-purple-600 p-6 rounded-tr-[20px] rounded-br-[60px] transition-transform hover:scale-105 duration-300">
                        {/* Icône billet */}
                        <div className="flex justify-center mb-4">
                            <Image src={Pavillons4} alt="Payez en toute confiance" width={100} height={100} />
                        </div>
                        {/* Texte */}
                        <h2 className="text-center font-bold text-purple-900 mb-2 text-[17px]">
                            Payez en toute confiance
                        </h2>
                        <p className="text-center text-[16px] text-gray-700">
                            Réglez vos achats et commandes dans les devises correspondantes à travers plusieurs <br /> méthodes de paiements sécurisés.
                        </p>
                    </div>
                </div>

                {/* SECTION 5 - Pavillons par pays & Sélectionnez l'offre */}
                <div className="scroll-animate grid grid-cols-1 md:grid-cols-2 gap-8 px-4 md:px-12 opacity-0">
                    {/* Explorez les pavillons */}
                    <div className="relative border-2 border-yellow-600 p-6 rounded-tr-[20px] rounded-br-[60px] transition-transform hover:scale-105 duration-300">
                        <div className="flex justify-center mb-4">
                            <Image src={Pavillons5} alt="Explorez les pavillons" width={120} height={120} />
                        </div>
                        <h2 className="text-center font-bold text-purple-900 mb-2 text-[17px]">
                            Suivi complet de vos expéditions, étape par étape
                        </h2>
                        <p className="text-center text-[16px] text-gray-700">
                            Galilélogistics et ses partenaires stratégiques vous offre des solutions logistiques complètes, permettant un suivi en temps réel des itinéraires dans tous les pays de la ZLECAf et sur l'ensemble du continent africain.
                        </p>
                    </div>

                    {/* Sélectionnez l'offre idéale */}
                    <div className="relative border-2 border-green-600 p-6 rounded-tr-[20px] rounded-br-[60px] transition-transform hover:scale-105 duration-300">
                        <div className="flex justify-center mb-4">
                            <Image src={Pavillons51} alt="Optimiser votre gestion" width={120} height={120} />
                        </div>
                        <h2 className="text-center font-bold text-purple-900 mb-2 text-[17px]">
                            Optimiser votre gestion
                        </h2>
                        <p className="text-center text-[16px] text-gray-700">
                            Gérez vos fournisseurs, suivez l’état de vos commandes, de vos expéditions et de vos paiements, et contactez le service après-vente de Galiléecommerce.com lorsque nécessaire.
                        </p>
                    </div>
                </div>
            </div>

            <section className="scroll-animate w-full bg-white flex flex-col md:flex-row items-center justify-center mt-5 opacity-0">
                {/* Partie gauche : image avec sac et mégaphone */}
                <div className="w-full md:w-1/2 flex justify-center bg-gray-50">
                    <div className="relative w-[300px] h-[350px] md:w-[400px] md:h-[450px] lg:w-[500px] lg:h-[550px]">
                        {/* Image optimisée Next.js */}
                        <Image
                            src={Pavillons6}
                            alt="Client avec mégaphone et sac"
                            fill
                            className="object-contain"
                            priority
                        />
                    </div>
                </div>

                {/* Partie droite : texte */}
                <div className="w-full md:w-1/2 flex flex-col lg:items-start justify-center px-6 py-10 md:px-12 lg:px-20">
                    <h2 className="text-black text-3xl md:text-4xl lg:text-5xl font-bold leading-snug mb-6 text-center md:text-left">
                        Bénéficiez de nos <br />
                        réductions et de <br />
                        notre assistance <br />
                        spécialisée
                    </h2>
                    <Link href="/pavillons_">
                        <p className="text-black text-4xl md:text-4xl font-medium mb-6 text-center md:text-left ">
                            Visitez les pavillons <br />
                            de Galiléecommerce.com
                        </p>
                    </Link>
                </div>
            </section>
        </>
    );
}
