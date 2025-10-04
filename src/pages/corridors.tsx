import Image from "next/image";

import Img1 from "@/assets/images/corridors/corridors1.png";
import Img2 from "@/assets/images/corridors/corridors2.png";
import Img3 from "@/assets/images/corridors/corridors3.png";
import Img31 from "@/assets/images/corridors/corridors3.1.png";
import Img4 from "@/assets/images/corridors/corridors4.jpg";
import Img41 from "@/assets/images/corridors/corridors4.1.png";
import Img5 from "@/assets/images/corridors/corridors5.jpg";
export default function MonComposant() {
    return (
        <div className="w-full flex flex-col space-y-16">
            {/* SECTION 1 */}
            <section className="relative w-full h-[90vh] flex items-center justify-center">
                {/* Image de fond */}
                <Image
                    src={Img1} // ⚠️ Mets ici ton image de fond (corridors3.png renommée)
                    alt="Corridor digital"
                    fill
                    className="object-cover brightness-75"
                    priority
                />

                {/* Texte superposé */}
                <div className="relative z-10 text-white px-6 md:px-16 lg:px-24 max-w-5xl">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                        Qu’est-ce qu’un corridor digital de Galiléecommerce.com?
                    </h2>
                    <ul className="space-y-2 text-lg md:text-xl">
                        <li>✔️ Optimisez vos coûts de transactions</li>
                        <li>✔️ Réduisez vos délais de livraison</li>
                        <li>✔️ Stimulez le développement de vos produits et services</li>
                    </ul>
                    <p className="mt-6 text-sm md:text-base text-gray-200">
                        En fournissant des outils et des solutions sur mesure, nous permettons une circulation plus
                        rapide et plus économique de vos marchandises.
                    </p>
                </div>
            </section>


            {/* SECTION 2 */}
            <section className="w-full bg-[#071322] text-white py-10">
                <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">

                    {/* ---------- IMAGE EN HAUT (centrée) ---------- */}
                    <div className="w-full flex justify-center">
                        {/* Conteneur image avec effet hover zoom */}
                        <div
                            className="w-full max-w-4xl overflow-hidden shadow-lg
                       transform transition-transform duration-700 ease-out hover:scale-105"
                            aria-hidden
                        >
                            <Image
                                src={Img2}
                                alt="Développement commercial - image"
                                width={1400}
                                height={520}
                                className="w-full h-auto object-cover"
                                priority
                            />
                        </div>
                    </div>

                    {/* ---------- DEUX BLOCS EN DESSOUS (grid) ---------- */}
                    {/* Sur mobile grid-cols-1 (stack), sur md grid-cols-2 (deux colonnes) */}
                    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-start">

                        {/* ----- GAUCHE : bloc centré DANS SA COLONNE ----- */}
                        <div className="flex items-center justify-center">
                            {/* 
              - Le texte est centré horizontalement et verticalement dans la colonne gauche.
              - Utilisation d'une police monospace/typographique (font-mono) pour reproduire l'effet visuel.
            */}
                            <h2
                                className="font-mono font-extrabold leading-tight text-3xl md:text-4xl lg:text-5xl
                         text-center md:text-center"
                                aria-label="Titre principal gauche"
                            >
                                Un moteur clé
                                <br />
                                du développement
                                <br />
                                commercial
                            </h2>
                        </div>

                        {/* ----- DROITE : bloc aligné à droite (titre + paragraphe) ----- */}
                        <div className="flex items-start justify-end">
                            {/* 
              - Le contenu est aligné à droite (text-right) afin de correspondre strictement à l'image fournie.
              - Le conteneur possède un léger lift au hover pour interaction.
            */}
                            <div
                                className="w-full max-w-xl transition-transform duration-300 ease-in-out hover:-translate-y-1"
                                tabIndex={0} // permet focus keyboard et montre l'effet : accessible
                            >
                                <h3 className="text-xl md:text-2xl font-semibold mb-3 text-right">
                                    Booster votre <span className="italic font-bold">potentiel</span> commercial
                                </h3>

                                <p className="text-sm md:text-base leading-relaxed text-gray-200 text-right">
                                    Galileecommerce.com facilite votre accès au marché de la Zone de Libre-échange
                                    continentale africaine (ZLECAF). Grâce à ses ressources techniques,
                                    informationnelles et physiques, Galileecommerce.com offre des solutions visant
                                    l’amélioration de votre efficacité commerciale à tous les niveaux, local,
                                    national et international.
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
            {/* Style scoped */}
            <style jsx>{`
        .space-y-16 > :not([hidden]) ~ :not([hidden]) {
           
          margin-top: 0 !important; 
        }
      `}</style>
            {/* SECTION 3 */}
            <section className="w-full flex flex-col items-center px-6 md:px-16 lg:px-24 py-12">
                {/* Titre */}
                <h2 className="text-center text-2xl md:text-3xl lg:text-4xl font-bold text-black mb-10 leading-snug">
                    <span className="font-bold">
                        Trouvez des solutions <br /> adaptées à vos besoins
                    </span>
                </h2>

                {/* Deux cercles */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl w-full">
                    {/* Carte 1 */}
                    <div className="flex flex-col items-center text-center">
                        <div className="rounded-full border border-gray-400 flex flex-col items-center justify-center w-72 h-72 p-6 transition-transform duration-500 hover:scale-105">
                            {/* Titre avec retour de ligne forcé et taille ajustée */}
                            <h3 className="text-base md:text-lg font-bold text-purple-900 mb-2 leading-tight text-center break-words">
                                Solutions pour <br /> faciliter les échanges
                            </h3>

                            <Image
                                src={Img3}
                                alt="Solutions échanges"
                                width={80}
                                height={80}
                                className="mb-3"
                            />

                            <p className="text-xs md:text-sm text-purple-900 leading-snug text-center">
                                Réduire les barrières normatives, <br />
                                informationnelles, physiques et logistiques.
                            </p>
                        </div>
                    </div>


                    {/* Carte 2 */}
                    <div className="flex flex-col items-center text-center">
                        <div className="rounded-full border border-gray-400 flex flex-col items-center justify-center w-72 h-72 p-6 transition-transform duration-500 hover:scale-105">
                            <h3 className="text-lg font-bold text-purple-900 mb-2">
                                Renforcer l’intégration
                            </h3>
                            <Image
                                src={Img31}
                                alt="Renforcer intégration"
                                width={100}
                                height={100}
                                className="mb-3"
                            />
                            <p className="text-sm text-purple-900 leading-snug">
                                Assurer la liaison entre plusieurs pays <br /> et accompagner l’intégration commerciale.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 3 */}
            <section className="w-full flex flex-col items-center px-6 md:px-16 lg:px-24 py-12">
                {/* Deux cercles */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl w-full">
                    {/* Carte 1 */}
                    <div className="flex flex-col items-center text-center">
                        <div className="rounded-full border border-gray-400 flex flex-col items-center justify-center w-72 h-72 p-6 transition-transform duration-500 hover:scale-105">
                            {/* Titre avec retour de ligne forcé et taille ajustée */}
                            <h3 className="text-base md:text-lg font-bold text-purple-900 mb-2 leading-tight text-center break-words">
                                Compétitivité <br /> des entreprises

                            </h3>

                            <Image
                                src={Img4}
                                alt="Solutions échanges"
                                width={80}
                                height={80}
                                className="mb-3"
                            />

                            <p className="text-xs md:text-sm text-purple-900 leading-snug text-center">
                                Faire baisser les dépenses <br />liées aux transactions
                                et optimiser <br />les délais de livraison.
                            </p>
                        </div>
                    </div>


                    {/* Carte 2 */}
                    <div className="flex flex-col items-center text-center">
                        <div className="rounded-full border border-gray-400 flex flex-col items-center justify-center w-72 h-72 p-6 transition-transform duration-500 hover:scale-105">
                            <h3 className="text-lg font-bold text-purple-900 mb-2">
                                Moderniser les axes de transport
                            </h3>
                            <Image
                                src={Img41}
                                alt="Renforcer intégration"
                                width={100}
                                height={100}
                                className="mb-3"
                            />
                            <p className="text-sm text-purple-900 leading-snug">
                                Soutenir et accompagner le <br /> développement  du capital spatial

                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="relative w-full h-[90vh] flex items-center justify-center">
                {/* Image de fond */}
                <Image
                    src={Img5} // ⚠️ Mets ici ton image de fond (corridors3.png renommée)
                    alt="Corridor digital"
                    fill
                    className="object-cover brightness-75"
                    priority
                />

                {/* Texte superposé */}
                <div className="relative z-10 text-white px-6 md:px-16 lg:px-24 max-w-5xl">
                    <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6 text-center items-center ">
                        Prenez contact avec l’équipe technique pour assistance

                    </h2>

                </div>
            </section>
        </div>
    );
}
