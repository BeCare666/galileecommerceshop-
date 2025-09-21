// app/components/Hero.tsx
import Image from "next/image";
import Homepage1 from "@/assets/images/homepage1.png";

export default function Hero() {
    return (
        <section className="relative h-[80vh] w-full mt-0">
            {/* Background image */}
            <Image
                src={Homepage1}
                alt="Hero background"
                fill
                priority
                className="object-cover"
            />

            {/* Overlay sombre pour contraste (facultatif mais conseillé) */}
            <div className="absolute inset-0 bg-black/50"></div>

            {/* Contenu */}
            <div className="relative z-10 max-w-7xl mx-auto h-full flex items-center px-3 lg:px-6">
                <div className="text-white space-y-6 max-w-2xl">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-4xl font-bold leading-snug">
                        Décuplez votre performance ! <br />
                        Réinventons les solutions digitales du commerce
                    </h1>

                    <p className="text-base sm:text-lg md:text-xl text-gray-200">
                        Des solutions digitales pour l’acheteur. <br className="hidden sm:block" />
                        Des solutions digitales pour le vendeur.
                    </p>

                    <a
                        href="https://Galileecommerce.com"
                        className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white text-[#1b0c0a] font-medium shadow hover:shadow-lg transition text-sm sm:text-base"
                    >
                        <span className="text-pink-500">◎</span>
                        En savoir plus sur Galileecommerce.com
                    </a>
                </div>
            </div>
        </section>
    );
}
