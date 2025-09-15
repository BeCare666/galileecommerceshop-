// components/Hero.tsx
import Image from "next/image";
import Menu7 from "@/assets/images/centrale-achat/menu8.png";
export default function Hero() {
    return (
        <section className="h-screen w-full bg-[#1B2232] flex flex-col md:flex-row items-center justify-center px-6 md:px-12">
            {/* Texte à gauche */}
            <div className="flex-1 text-center md:text-left mb-10 md:mb-0">
                <h1 className="text-white font-serif text-2xl md:text-3xl lg:text-4xl leading-relaxed max-w-lg mx-auto md:mx-0">
                    Inscrivez-vous <br />
                    gratuitement et obtenez <br />
                    vos produits à des prix <br />
                    imbattables
                </h1>
            </div>

            {/* Image à droite */}
            <div className="flex-1 flex items-center justify-center relative">
                {/* Cercle avec découpe */}
                <div className="relative w-72 h-72 md:w-96 md:h-96 rounded-full overflow-hidden">
                    <Image
                        src={Menu7} // Mets ton image ici
                        alt="Promo"
                        fill
                        className="object-cover"
                    />
                </div>
            </div>
        </section>
    );
}
