// app/components/Hero.tsx
import Image from "next/image";
import Homepage1 from "@/assets/images/homepage1.png";
import Homepage2 from "@/assets/images/homepage2.png";
export default function Hero() {
    return (
        <section className="relative  w-full mt-0 pb-7 lg:pb-10 lg:pt-10 md:pb-8 ">
            {/* Background image h-[80vh]*/}
            <Image
                src={Homepage1}
                alt="Hero background"
                fill
                priority
                className="object-cover hidden lg:block md:block"
            />
            <Image
                src={Homepage2}
                alt="Hero background mobile"
                fill
                priority
                className="object-cover block md:hidden"
            />
            {/* Overlay sombre pour contraste (facultatif mais conseillé) max-w-3xl*/}
            <div className="absolute inset-0 bg-black/50"></div>

            {/* Contenu */}
            <div className="relative z-10 max-w-7xl mx-auto h-full flex items-center px-3 lg:px-6 ">
                <div className="text-white space-y-6 ">
                    <h1 className="text-3xl md:text-5xl font-bold leading-snug">
                        L'incontournable plateforme
                        digitale pour le commerce en Afrique.
                    </h1>

                    <p className="text-base sm:text-lg md:text-xl text-gray-200">
                        Des solutions digitales pour l’acheteur <br className="hidden sm:block" />
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
