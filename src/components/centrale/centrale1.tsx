// components/HeroSection.tsx
import Image from "next/image";
import Menu1 from "@/assets/images/centrale-achat/menu1.png";
export default function HeroSection() {
    return (
        <section className="relative h-screen w-full" id="chooseId1">
            {/* Background Image */}
            <div className="absolute inset-0">
                <Image
                    src={Menu1} // mets ton image dans public/imgM1.png
                    alt="Background"
                    fill
                    className="object-cover"
                    priority
                />
                {/* Overlay bleu foncé */}
                <div className="absolute inset-0 bg-[#1c2d4a]/70" />
            </div>

            {/* Content */}
            <div className="relative z-10 flex flex-col justify-center items-start h-full px-6 md:px-16 text-white">
                <h1 className="text-3xl md:text-5xl font-bold leading-snug max-w-xl">
                    Des prix <br />
                    imbattables, des <br />
                    conditions <br />
                    exceptionnelles…
                </h1>

                <p className="mt-8 max-w-2xl text-sm md:text-base leading-relaxed">
                    Vous êtes grossiste ou détaillant. Nous aidons votre entreprise à accéder à des milliers d’offres
                    disponibles dans le monde à des prix imbattables. Choisissez vos produits, remplissez les
                    formalités d&apos;usage et effectuez le paiement pour être livré dans les meilleurs délais.
                </p>
            </div>
        </section >
    );
}
