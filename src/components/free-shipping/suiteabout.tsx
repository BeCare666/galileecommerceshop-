"use client";
import Image from "next/image";
import PavillonImg from "@/assets/images/aboutus/aboutsuite1.jpg";
import CorridorImg from "@/assets/images/aboutus/aboutsuite2.jpg";
import InternationalImg from "@/assets/images/aboutus/aboutsuite3.png";

export default function MonComposant() {
    const cards = [
        {
            title: "Découvrez tous les produits disponibles dans nos pavillons",
            image: PavillonImg,
            link: "#",
        },
        {
            title: "Visite des corridors digitaux",
            image: CorridorImg,
            link: "#",
        },
        {
            title: "Achetez à des tarifs compétitifs à l’international",
            image: InternationalImg,
            link: "#",
        },
    ];

    return (
        <section className="w-full px-6 md:px-12 py-6 bg-white">
            {/* === Titre principal === */}
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 leading-tight">
                Profitez des innovations de Galiléecommerce.com
            </h2><br />

            {/* === Grille des cartes === */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center">
                {cards.map((card, index) => (
                    <div
                        key={index}
                        className="group relative w-full max-w-[300px] bg-black   overflow-hidden shadow-lg transition-transform duration-300 hover:scale-[1.03]"
                    >
                        {/* Image de fond */}
                        <div className="relative w-full h-[220px]">
                            <Image
                                src={card.image}
                                alt={card.title}
                                fill
                                className="object-cover brightness-90 group-hover:brightness-75 transition-all duration-300"
                            />
                        </div>

                        {/* Titre sur l’image */}
                        <div className="absolute top-0 left-0 p-4">
                            <h3 className="text-white font-bold text-[16px] leading-[22px] drop-shadow-md">
                                {card.title}
                            </h3>
                        </div>

                        {/* Bande noire inférieure */}
                        <div className="absolute bottom-0 left-0 w-full bg-black p-2">
                            <a
                                href={card.link}
                                className="text-white text-[14px] font-medium tracking-wide transition-colors duration-300 hover:text-[#FF7A2D]"
                            >
                                En savoir plus
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
