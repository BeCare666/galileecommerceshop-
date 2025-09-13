"use client";
import Image from "next/image";
import Centrale_img4 from "@/assets/images/centrale-achat/centrale_img4.png";

export default function Etape2() {
    return (
        <section className="w-full px-4 md:px-8 py-10">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start gap-8">
                {/* Gauche : numéro + titre + liste */}
                <div className="w-full md:w-1/2">
                    <div className="relative">
                        {/* grand cercle blanc contenant "02" */}
                        <div className="w-36 h-36 md:w-56 md:h-56 rounded-full bg-white shadow-[0_12px_30px_rgba(0,0,0,0.12)] flex items-center justify-center">
                            <span className="text-[#F4C300] md:text-[104px] text-4xl font-extrabold leading-none">02</span>
                        </div>

                        {/* cartouche titre */}
                        <div className="absolute left-28 md:left-40 top-4 md:top-8 bg-white shadow-lg rounded px-4 py-3 max-w-xs">
                            <h2 className="text-lg md:text-2xl font-bold">Étape 2. Formalités et assurance</h2>
                        </div>

                        {/* petite pastille jaune (desktop) */}
                        <div className="hidden md:block absolute left-[calc(28rem-10px)] top-1/2 transform -translate-y-1/2">
                            <div className="w-4 h-4 bg-[#F4C300] rounded-full shadow-sm"></div>
                        </div>
                    </div>

                    {/* Liste */}
                    <ul className="mt-40 md:mt-28 list-disc pl-5 space-y-2 text-justify">
                        <li>Compte adhérent (centrale d’achat de Galileecommerce.com)</li>
                        <li>Informations produits, quantités et détails de l’envoi vers un point de réception</li>
                        <li>Implémentation des règles Incoterms, code SH…</li>
                        <li>Assurance de cargaison</li>
                        <li>Facture commerciale</li>
                        <li>Contrat et autres formalités administratives et douanières</li>
                    </ul>
                </div>

                {/* Droite : image avec bande jaune */}
                <div className="w-full md:w-1/2 flex justify-center">
                    <div className="relative flex flex-col items-center w-11/12 md:w-4/5 max-w-md">
                        {/* Image au-dessus */}
                        <Image
                            src={Centrale_img4}
                            alt="formalites"
                            className="relative z-10 object-cover w-full rounded-t-lg"
                            priority
                        />

                        {/* Bande jaune collée */}
                        <div className="w-full h-14 md:h-20 bg-[#F7C400] rounded-b-lg"></div>
                    </div>
                </div>

            </div>
        </section>
    );
}
