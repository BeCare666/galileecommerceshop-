// components/CentraleSection.tsx
import Image from "next/image";
import Menu2 from "@/assets/images/centrale-achat/menu2.png";
export default function CentraleSection() {
    return (
        <section className="relative h-screen w-full">
            {/* Background Image */}
            <div className="absolute inset-0">
                <Image
                    src={Menu2} // Mets ton image dans public/imgM2.png
                    alt="Background"
                    fill
                    className="object-cover"
                    priority
                />
                {/* Overlay sombre */}
                <div className="absolute inset-0 bg-[#1c2d4a]/80" />
            </div>

            {/* Content */}
            <div className="relative z-10 flex flex-col h-full text-white">
                {/* Tabs 
                <div className="grid grid-cols-4 w-full">
                    <button className="w-full px-2 py-3 bg-[#1a0f1f] text-[10px] sm:text-xs md:text-sm lg:text-base font-semibold">
                        Centrale d’achat
                    </button>
                    <button className="w-full px-2 py-3 bg-[#2b3243] text-[10px] sm:text-xs md:text-sm lg:text-base font-semibold">
                        Choisir une campagne
                    </button>
                    <button className="w-full px-2 py-3 bg-[#1a0b15] text-[10px] sm:text-xs md:text-sm lg:text-base font-semibold">
                        Formalités et assurance
                    </button>
                    <button className="w-full px-2 py-3 bg-[#3b4b60] text-[10px] sm:text-xs md:text-sm lg:text-base font-semibold">
                        Payer sur Galileecommerce.com
                    </button>
                </div>
                */}
                {/* Text Content */}
                <div className="flex flex-col md:flex-row gap-10 px-6 md:px-16 py-10 md:py-20 flex-1">
                    {/* Left Column */}
                    <div className="flex-1">
                        <h2 className="text-2xl md:text-3xl font-bold mb-4">
                            Galilé centrale d’achat
                        </h2>
                        <h3 className="text-lg md:text-xl font-semibold mb-6">
                            Être au service des acheteurs et des fournisseurs internationaux
                        </h3>
                        <p className="text-sm md:text-base leading-relaxed">
                            Pour chaque campagne d’achat international, agissant pour le compte
                            de ses adhérents, Galilé centrale d’achat mobilise des milliers de
                            références, gère des fonctions administratives et commerciales et
                            s’occupe des achats, du transport et de la livraison des
                            marchandises. Nous aidons nos adhérents à maîtriser aussi bien les
                            prix que les délais de livraison, la logistique et les enjeux de
                            sécurité associés aux produits et à leur transport, quel que soit
                            le mode utilisé.
                        </p>
                    </div>

                    {/* Right Column */}
                    <div className="flex-1 flex items-center">
                        <p className="text-sm md:text-base leading-relaxed">
                            Inscrivez-vous pour participer aux campagnes d’achats
                            internationaux de Galileecommerce.com et profiter des milliers de
                            produits de qualités à des prix imbattables.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
