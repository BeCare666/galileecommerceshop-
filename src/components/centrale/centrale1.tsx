"use client";
import Image from "next/image";
import Centrale_img2 from "@/assets/images/centrale-achat/centrale_img2.png";

export default function CentralAcheteur() {
    return (
        <div className="w-full">
            {/* Navigation */}
            <div className="grid grid-cols-2 md:grid-cols-4 text-white font-semibold text-center">
                <div className="bg-yellow-400 px-4 py-3">Centrale d’achat</div>
                <div className="bg-green-600 px-4 py-3">Choisir une campagne</div>
                <div className="bg-blue-600 px-4 py-3">Formalités et assurance</div>
                <div className="bg-pink-600 px-4 py-3">Payer sur Galileecommerce.com</div>
            </div>

            {/* Section Centrale */}
            <div className="flex flex-col md:flex-row items-center justify-between p-6 gap-6 md:gap-12">
                {/* Texte */}
                <div className="w-full md:w-1/2 space-y-4 text-justify">
                    <h2 className="text-2xl md:text-3xl font-bold">Galilé centrale d’achat</h2>
                    <p className="font-semibold text-lg">
                        Être au service des acheteurs et des fournisseurs internationaux
                    </p>
                    <p className="leading-relaxed">
                        Pour chaque campagne d’achat international, agissant pour le compte
                        de ses adhérents, Galilé centrale d’achat mobilise des milliers de
                        références, gère des fonctions administratives et commerciales et
                        s’occupe des achats, du transport et de la livraison des
                        marchandises. Nous aidons nos adhérents à maîtriser aussi bien les
                        prix que les délais de livraison, la logistique et les enjeux de
                        sécurité associés aux produits et à leur transport, quel que soit le
                        mode utilisé.
                    </p>
                    <p className="text-pink-600 font-semibold">
                        Inscription adhérent (lien d’inscription)
                    </p>
                    <p className="leading-relaxed">
                        Inscrivez vous pour participer aux campagnes d’achats internationaux
                        de Galileecommerce.com et profiter des milliers de produits de
                        qualités à des prix imbattables.
                    </p>
                </div>

                {/* Image */}
                <div className="w-full md:w-1/2 flex justify-center">
                    <Image
                        src={Centrale_img2}
                        alt="central"
                        className="rounded-lg object-cover w-full max-w-md"
                        priority
                    />
                </div>
            </div>
        </div>
    );
}
