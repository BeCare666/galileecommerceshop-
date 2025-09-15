// components/Step1Background.tsx
import React from "react";
import Menu3 from "@/assets/images/centrale-achat/menu3.png"; // ou utilisez une URL publique

export default function Step1Background() {
    return (
        <section
            className="relative h-screen w-full bg-center bg-cover bg-no-repeat"
            style={{ backgroundImage: `url(${Menu3.src})` }}
            aria-label="Étape 1 - Choisir une campagne"
            id="chooseId2">
            {/* Overlay bleu foncé semi-transparent (derrière le texte) */}
            <div className="absolute inset-0 bg-[#1B2232] opacity-60" />

            {/* Contenu (au-dessus de l'overlay) */}
            <div className="relative z-10 h-full flex items-center">
                {/* Le wrapper contrôle l'alignement et la largeur du bloc texte.
            - mobile : texte centré
            - md+ : texte aligné à gauche avec large padding (comme sur ta maquette) */}
                <div className="w-full px-6 py-12 md:pl-16 md:pr-6 lg:pl-28 lg:pr-8">
                    <div className="max-w-xl mx-auto md:mx-0 text-white">
                        <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl leading-tight mb-6 text-center md:text-left">
                            Étape 1. <br />
                            Choisir une <br />
                            campagne
                        </h2>

                        <p className="text-sm md:text-base leading-relaxed mb-6 text-center md:text-left">
                            La sélection des produits se fait dans le cadre des campagnes
                            périodiques d’achats internationaux organisés par la centrale
                            d’achat de Galileecommerce.com. Nous permettons aux adhérents de
                            saisir les opportunités de marché et de trouver des produits ou
                            services à des standards de qualité spécifiques ou élevés, et à des
                            coûts défiant toute concurrence.
                        </p>

                        <p className="text-sm md:text-base font-semibold leading-relaxed text-center md:text-left">
                            Choisissez l’une des campagnes d’achat international de
                            Galileecommerce et sélectionnez les produits de votre choix.
                        </p>
                    </div>
                </div>
            </div>
        </section >
    );
}
