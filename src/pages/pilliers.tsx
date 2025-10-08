"use client";

import Image from "next/image";
import { useState } from "react";

import Pilier1Num from "@/assets/images/pilliers/pilliers1.png";
import Pilier2Num from "@/assets/images/pilliers/pilliers2.png";
import Pilier3Num from "@/assets/images/pilliers/pilliers3.png";
import Pilier4Num from "@/assets/images/pilliers/pilliers4.png";

import Pilier1Img from "@/assets/images/pilliers/pilliers1.1.png";
import Pilier2Img from "@/assets/images/pilliers/pilliers2.1.jpg";
import Pilier3Img from "@/assets/images/pilliers/pilliers3.1.png";
import Pilier4Img from "@/assets/images/pilliers/pilliers4.1.png";

export default function MonComposant() {
    const [openId, setOpenId] = useState<number | null>(null);

    const cards = [
        {
            id: 1,
            num: Pilier1Num,
            title: "Piliers 1 : Assistance technique",
            bg: Pilier1Img,
            excerpt:
                "Galiléecommerce.com propose une assistance technique globale, allant du conseil à la formation...",
            texte: `
            Galiléecommerce.com propose une assistance technique globale, allant du conseil à la formation, en passant par les études, les interventions sur le terrain et les missions de veille, destinées à répondre aux problématiques de capacité et de performance commerciale, tant pour les consommateurs que pour les entreprises et les États.

            Les principales divisions d’assistance technique de Galiléecommerce comprennent :

           Le centre de ressources Pavillons  
            Destiné aux pays et aux entreprises occupant leurs pavillons digitaux, le centre de ressources pavillons de Galiléecommerce fournit des instructions sur l’utilisation optimale des Business Space (boutique en ligne). 
            Ainsi, dans un environnement mondial en perpétuelle évolution et soumis à des chocs négatifs, le centre de ressources pavillons de Galiléecommerce éduque ses utilisateurs pour garantir une utilisation efficace et sans interruption des outils technologiques, en leur donnant les moyens de saisir toutes les opportunités numériques et de booster leurs performances.

            Le centre de ressources normatives
            Le centre de ressources normatives de Galiléecommerce joue un rôle crucial dans l’harmonisation des pratiques garantissant la qualité, la sécurité et la conformité des produits et services commercialisés. En collaboration étroite avec ses partenaires, ses responsabilités normatives se structurent autour de trois missions : la mission d’encadrement des entreprises souscriptrices aux normes, le contrôle et la vérification des pratiques via des évaluations et certifications, et la mission de promotion et de régulation, qui comprend à la fois des actions consultatives, de promotion de la conformité et de régulation stricte vis-à-vis de la réglementation.

            Le centre de ressources pour corridors
            Le centre de ressources pour corridors a pour objectif d'aider les entreprises à promouvoir leur savoir-faire et à mettre en place des solutions visant à réduire les coûts, les délais de transport et à améliorer leur connectivité logistique, aussi bien à l'importation qu'à l'exportation. Il facilite l'accès aux marchés pour tous types de produits et services, et soutient la croissance et la coopération entre les acteurs économiques.

            Le centre de ressource pour support client
            Galiléecommerce accompagne ses clients dans la résolution des problèmes liés aux offres de ses fournisseurs. Son support répond aux questions des acheteurs, guide l'utilisation des produits et services et joue un rôle clé dans l'amélioration de l'expérience client et la fidélisation. Il intervient à toutes les étapes de la chaîne d’achat et de livraison et prend en charge les retours, les échanges, les garanties et les réparations. Les supports offerts comprennent le support technique, commercial, après-vente, en ligne, téléphonique et par mail.

            Le centre de ressources du dernier kilomètre
            Conscients des défis d'enclavement auxquels font face de nombreuses régions africaines, le centre offre des solutions stratégiques telles que des avions cargos et des trains de fret à faible empreinte carbone, des entrepôts écologiques, des véhicules propres et des drones de livraison. Les principaux objectifs visés par le centre sont de garantir des expéditions rapides, d’optimiser les coûts et de minimiser l'empreinte écologique des livraisons.
                `,
        },
        {
            id: 2,
            num: Pilier2Num,
            title: "Piliers 2: Le respect des normes",
            bg: Pilier2Img,
            excerpt:
                "Pour garantir que les produits et services commercialisés sur sa plateforme respectent des normes strictes de qualité...",
            texte: `
Pour garantir que les produits et services commercialisés sur sa plateforme respectent des normes strictes de qualité, de sécurité, de durabilité et d'efficacité, Galiléecommerce exige de ses fournisseurs qu'ils se conforment aux standards définis par les autorités compétentes. La plateforme encourage le respect des normes et procède à des tests rigoureux de qualité et de fiabilité avant de valider les offres des fournisseurs. Son centre de ressources normatives, en partenariat avec les organismes de normalisation, fournit une assistance aux entreprises souhaitant obtenir des certifications.
      `,
        },
        {
            id: 3,
            num: Pilier3Num,
            title: "Piliers 3 : La compétitivité prix",
            bg: Pilier3Img,
            excerpt:
                "En plus de ses exigences de qualité, Galiléecommerce encourage ses fournisseurs à privilégier une politique de grands volumes...",
            texte: `
En plus de ses exigences de qualité, Galiléecommerce encourage ses fournisseurs à privilégier une politique de grands volumes. Il leur recommande donc de fixer des prix attractifs pour des ventes massives stimulant une augmentation significative de leurs parts de marché et de leur chiffre d'affaires.
      `,
        },
        {
            id: 4,
            num: Pilier4Num,
            title: "Piliers 4 : Le dernier kilomètre",
            bg: Pilier4Img,
            excerpt:
                "L'accès difficile aux nombreuses zones enclavées d’Afrique rend les processus de livraison particulièrement coûteuses ...",
            texte: `
L'accès difficile aux nombreuses zones enclavées d’Afrique rend les processus de livraison particulièrement coûteuses aux acteurs logistiques. Le dernier kilomètre, en plus de constituer une part significative des coûts logistiques, représente un défi important à surmonter. Galiléecommerce offre un sentier du dernier kilomètre composé de trois étapes : les points de distribution de proximité (entrepôts et magasins stratégiques), les centres de tri pour les zones enclavées (entrepôts et magasins de tri spécialisés) et les points relais (lieux de retrait pour les destinataires).
      `,
        },
    ];

    return (
        <>
            <section className="w-full bg-white px-6 md:px-12 py-10">
                <h2 className="text-3xl md:text-4xl font-extrabold text-[#3a0b3f] mb-10 text-left">
                    Découvrez les quatre piliers de Galiléecommerce.com
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {cards.map((c) => (
                        <article
                            key={c.id}
                            className="group relative overflow-hidden rounded-md shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl border border-gray-100"
                        >
                            <div className="relative bg-[#b51b5f] h-[177px] md:h-[260px] flex items-start overflow-hidden">
                                <div className="hidden md:flex items-start justify-center px-6 pt-4 z-20">
                                    <div className="w-[120px] h-[120px] relative">
                                        <Image src={c.num} alt={`num-${c.id}`} fill className="object-contain" />
                                    </div>
                                </div>

                                <div className="flex flex-1 items-start justify-start px-6 md:px-4 pt-4 relative z-30">
                                    <div className="flex md:hidden items-start justify-start mr-3">
                                        <div className="w-10 h-10 relative">
                                            <Image src={c.num} alt={`num-${c.id}`} fill className="object-contain" />
                                        </div>
                                    </div>
                                    <h3 className="text-white text-[19px] font-semibold leading-tight md:leading-snug drop-shadow-lg w-full">
                                        {c.title}
                                    </h3>
                                </div>

                                <div className="absolute right-0 top-10 md:top-17 w-[120px] md:w-[200px] h-[140px] md:h-[220px] flex items-center justify-center z-10">
                                    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
                                        <Image
                                            src={c.bg}
                                            alt={c.title}
                                            fill
                                            className="object-contain brightness-[0.9] transition-transform duration-500 group-hover:scale-105"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="bg-black text-white px-6 py-3 flex items-center justify-between">
                                <p className="text-sm md:text-base leading-snug flex-1">{c.excerpt}</p>
                                <button
                                    onClick={() => setOpenId(c.id)}
                                    className="ml-4 whitespace-nowrap text-sm md:text-base font-medium underline decoration-white/80 hover:text-[#FF7A2D]"
                                >
                                    En savoir plus
                                </button>
                            </div>
                        </article>
                    ))}
                </div>
            </section>

            {openId && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
                    onClick={() => setOpenId(null)}
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="relative bg-[#0B0E17] text-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] p-6 md:p-8 overflow-y-auto border border-white/10 transform scale-95 animate-[fadeZoomIn_0.35s_ease-out_forwards]"
                    >
                        {/* Bouton fermer */}
                        <button
                            onClick={() => setOpenId(null)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-white transition z-50"
                            aria-label="Fermer"
                        >
                            ✕
                        </button>

                        {/* Titre */}
                        <h2 className="text-[24px] md:text-[28px] font-bold mb-6 text-[#FF7A2D] sticky top-0 bg-[#0B0E17] pt-4">
                            {cards.find((c) => c.id === openId)?.title}
                        </h2>

                        {/* Contenu */}
                        <div
                            className="text-left text-[#D1D5DB] text-[15px] md:text-[16px] leading-[24px] whitespace-pre-wrap"
                            dangerouslySetInnerHTML={{
                                __html: cards.find((c) => c.id === openId)?.texte || "",
                            }}
                        />
                    </div>
                </div>
            )}


            <style jsx global>{`
        @keyframes fadeZoomIn {
          0% {
            opacity: 0;
            transform: scale(0.8);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
        </>
    );
}
