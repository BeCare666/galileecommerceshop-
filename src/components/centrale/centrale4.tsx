// components/Step2.tsx
import Image from "next/image";
import Menu4 from "@/assets/images/centrale-achat/menu4.png";

export default function Step2() {
    return (
        <section className="relative min-h-screen w-full flex items-center px-6 md:px-12 py-16" id="chooseId3">
            {/* Image de fond */}
            <Image
                src={Menu4}
                alt="Formalités et assurance"
                fill
                priority
                className="object-cover object-center"
            />

            {/* Overlay bleu foncé semi-transparent */}
            <div className="absolute inset-0 bg-[#1B2232] opacity-70" />

            {/* Contenu */}
            <div className="relative z-10 text-white max-w-3xl">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif font-bold mb-6">
                    Étape 2. <br />
                    Formalités et <br />
                    assurance
                </h2>

                <ul className="space-y-3 text-sm md:text-base leading-relaxed list-disc list-inside">
                    <li>
                        Ouvrez un compte adhérent (centrale d’achat de Galileecommerce.com)
                    </li>
                    <li>
                        Précisez les informations sur les produits, les quantités et le
                        détail de l’envoi vers votre point de réception
                    </li>
                    <li>Galileecommerce implémente les règles Incoterms, code SH…</li>
                    <li>Assurez votre cargaison</li>
                    <li>Galileecommerce.com établit votre facture commerciale</li>
                    <li>
                        Signature du contrat et activation des autres formalités
                        administratives et douanières
                    </li>
                </ul>
            </div>
        </section>
    );
}
