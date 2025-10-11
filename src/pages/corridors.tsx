import Image from "next/image";

import Img1 from "@/assets/images/corridors/corridors1.png";
import Img2 from "@/assets/images/corridors/corridors2.png";
import Img3 from "@/assets/images/corridors/corridors3.png";
import Img31 from "@/assets/images/corridors/corridors3.1.png";
import Img4 from "@/assets/images/corridors/corridors4.jpg";
import Img41 from "@/assets/images/corridors/corridors4.1.png";
import Img5 from "@/assets/images/corridors/corridors5.jpg";
import Corridorssuite1 from "@/assets/images/corridors/suite1.jpg";
import Corridorssuite2 from "@/assets/images/corridors/suite2.png";
import Corridorssuite3 from "@/assets/images/corridors/suite3.jpg";
import Corridorsmobile from "@/assets/images/corridors/corridorsmobile.png";
import { motion } from "framer-motion";
export default function MonComposant() {
    return (
        <>

            <div className="w-full flex flex-col space-y-16">

                {/* SECTION 1 */}
                <section className=" relative w-full h-[90vh] flex items-center justify-center">
                    {/* Image de fond */}
                    <Image
                        src={Img1} // ⚠️ Mets ici ton image de fond (corridors3.png renommée)
                        alt="Corridor digital"
                        fill
                        className="object-cover brightness-75"
                        priority
                    />

                    {/* Texte superposé */}
                    <div className="relative z-10 text-white px-6 md:px-16 lg:px-24 text-left mt-14">
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                            Qu’est-ce qu’un corridor digital de Galiléecommerce.com?
                        </h2>
                        <ul className="space-y-2 text-lg md:text-xl">
                            <li className="before:content-['✔'] before:text-white before:mr-2 before:inline-block">
                                Optimisez vos coûts de transactions
                            </li>
                            <li className="before:content-['✔'] before:text-white before:mr-2 before:inline-block">
                                Réduisez vos délais de livraison
                            </li>
                            <li className="before:content-['✔'] before:text-white before:mr-2 before:inline-block">
                                Stimulez le développement de vos produits et services
                            </li>
                        </ul>
                        <p className="mt-6 text-sm md:text-base text-gray-200">
                            En fournissant des outils et des solutions sur mesure, nous permettons une circulation plus
                            rapide et plus économique de vos marchandises.
                        </p>
                    </div>
                </section>
                <div className="w-full flex justify-center bg-[#07131F] overflow-hidden">
                    <div className="w-full max-w-[1200px]">
                        {/* -------------------- SECTION 1 -------------------- */}

                        <section
                            className="relative flex flex-col md:flex-row items-center justify-start px-6 md:px-[40px] py-[32px] overflow-hidden bg-[#07131F] min-h-[380px] md:min-h-[420px]"
                        >
                            {/* Image de fond */}
                            <Image
                                src={Corridorssuite1}
                                alt="corridorssuite3"
                                fill
                                className="object-cover z-0"
                                priority
                            />

                            {/* Overlay global léger */}
                            <div className="absolute inset-0 bg-black/40 z-0" />

                            {/* Bande noire + dégradé fluide **/}
                            <div className="absolute top-0 left-0 h-full w-[30%]  bg-gradient-to-r from-[#000000]/95 via-[#000000]/80 to-transparent z-[1]" />

                            {/* Bloc texte (toute hauteur mais compact) flex font-extrabold text-[24px] md:text-[30px] leading-[30px] md:leading-[36px] mb-3*/}
                            <div className="relative z-10 flex items-center h-full w-full md:w-[70%] text-white p-6 md:p-10 bg-black lg:bg-gradient-to-r from-[#000000]/95 via-[#000000]/80 to-transparent">
                                <div>
                                    <div className="h-[6px] bg-[#FF7A2D] mb-3" />
                                    <h3 className="text-[12px] md:text-3xl lg:text-3xl font-bold mb-6">
                                        Les corridors digitaux de Galiléecommerce.com
                                    </h3>

                                    <div className="h-[2px] w-[80px] bg-white/15 mb-3" />

                                    <p className="text-[#D1D5DB] text-[14px] leading-[20px]">
                                        Les corridors de Galiléecommerce.com sont des dispositifs et ressources fortement connectés
                                        à la Zone de Libre-échange continentale africaine (ZLECAF), intégrés à la mondialisation,
                                        caractérisés par des flux économiques importants et un maillage commercial croissant.
                                    </p>
                                </div>
                            </div>
                        </section>



                        {/* -------------------- SECTION 2 -------------------- */}
                        <section
                            className="relative flex flex-col md:flex-row items-center justify-start px-6 md:px-[40px] py-6 overflow-hidden bg-[#242733] h-[400px] md:h-[450px]"
                        >
                            {/* Image de fond */}
                            <Image
                                src={Corridorssuite2}
                                alt="corridorssuite2"
                                fill
                                className="object-cover z-0"
                                priority
                            />

                            {/* Overlay global léger */}
                            <div className="absolute inset-0 bg-black/40 z-0" />

                            {/* Bande noire + dégradé fluide à gauche (30%) */}
                            <div className="absolute top-0 left-0 h-full w-[30%] bg-gradient-to-r from-[#242733]/95 via-[#242733]/80 to-transparent z-[1]" />

                            {/* Bloc texte */}
                            <div className="relative z-10 flex items-center h-full w-full md:w-[70%] text-white p-4 md:p-6 bg-gradient-to-r from-[#242733]/95 via-[#242733]/80 to-transparent">
                                <div className="flex flex-col justify-center h-full">
                                    <div className="w-[40px] h-[6px] bg-[#FF7A2D] mb-2" />
                                    <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                                        Un moteur clé du développement de <br className="hidden md:block" /> votre potentiel commercial
                                    </h3>

                                    <div className="h-[2px] w-[80px] bg-white/15 mb-2" />

                                    <p className="text-white font-semibold text-[13px] mb-2">
                                        Des corridors digitaux pour booster votre potentiel commercial
                                    </p>

                                    <p className="text-[#D1D5DB] text-[13px] leading-[18px]">
                                        Galiléecommerce.com facilite l’accès mondial au marché de la{" "}
                                        <span className="text-white font-semibold">ZLECAF</span> et accompagne les dynamiques
                                        commerciales de la ZLECAF vers le monde. Grâce à ses ressources techniques,
                                        technologiques, juridiques, digitales, informationnelles et physiques,
                                        Galiléecommerce.com vous offre des solutions visant le développement de votre potentiel commercial.
                                    </p>
                                </div>
                            </div>
                        </section>



                        {/* -------------------- SECTION 3 -------------------- */}
                        <section className="flex flex-col md:flex-row items-start justify-between bg-[#14141A] px-6 md:px-[40px] py-[48px] relative overflow-hidden">
                            {/* Texte à gauche */}
                            <div className="relative w-full md:w-[520px] text-white z-30 mb-8 md:mb-0">
                                {/* Gradient à droite du texte */}
                                <div className="absolute inset-y-0 right-0 w-[30%] bg-gradient-to-r from-[#14141A] to-transparent pointer-events-none" />

                                <h2 className="font-extrabold text-[26px] md:text-[32px] leading-[32px] md:leading-[38px] mb-4 relative">
                                    Comment ça marche ?
                                </h2>

                                <ul className="text-[#D1D5DB] text-[14px] md:text-[15px] leading-[22px] space-y-2 relative">
                                    <li>• Spécifiez vos catégories de produits, leurs caractéristiques et les quantités requises.</li>
                                    <li>
                                        • Indiquez la nature des besoins pour lesquels vous sollicitez l’aide du centre de ressources pour corridors de{" "}
                                        <span className="text-white font-semibold">Galiléecommerce.com</span>{" "}
                                        (importation, exportation, recherche de débouchés économiques, représentation de produits…)
                                    </li>
                                    <li>• Sélectionnez les corridors digitaux adéquats.</li>
                                    <li>• Effectuez le paiement des frais d’assistance.</li>
                                    <li>• Le centre de ressources pour corridors vous contactera dans les 48 heures avec des solutions concrètes.</li>
                                </ul>
                            </div>

                            {/* Image à droite */}
                            <div className="relative w-full md:w-[720px] h-[240px] md:h-[406px] overflow-hidden">
                                <Image
                                    src={Corridorssuite3}
                                    alt="corridorssuite1"
                                    fill
                                    className="object-cover"
                                    priority
                                />
                                {/* Dégradé sur 30% à gauche de l’image */}
                                <div className="absolute inset-y-0 left-0 w-[30%] bg-gradient-to-r from-[#07131F]/90 to-transparent" />
                            </div>
                        </section>
                    </div>
                </div>

                {/* SECTION 2 */}
                <section className="w-full bg-[#071322] text-white py-12  ">
                    <div className=" mx-auto px-6  ">

                        {/* ---------- IMAGE EN HAUT ---------- */}
                        <div className="w-full flex justify-center">
                            <div
                                className="w-full  overflow-hidden   shadow-lg transform transition-transform duration-700 ease-out hover:scale-105"
                            >
                                <Image
                                    src={Img2}
                                    alt="Développement commercial - image"
                                    width={1400}
                                    height={520}
                                    className="w-full h-auto object-cover"
                                    priority
                                    quality={100}
                                />
                            </div>
                        </div>

                        {/* ---------- BLOCS DE TEXTE EN DESSOUS ---------- */}
                        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-10 items-start">

                            {/* ----- COLONNE GAUCHE ----- */}
                            <div className="flex text-left">
                                <h2
                                    className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
                                >
                                    Un moteur clé <br className="hidden md:block" />
                                    du développement <br className="hidden md:block" />
                                    commercial
                                </h2>
                            </div>

                            {/* ----- COLONNE DROITE ----- */}
                            <div className="flex items-start justify-end">
                                <div
                                    className="w-full max-w-xl text-right transition-transform duration-300 ease-in-out hover:-translate-y-1"
                                    tabIndex={0}
                                >
                                    <h3 className="text-xl md:text-2xl font-semibold mb-4">
                                        Booster votre potentiel commercial
                                    </h3>

                                    <p className="text-sm md:text-base leading-relaxed text-gray-300">
                                        <span className="text-white font-semibold">Galileecommerce.com</span> facilite votre accès au marché de la{" "}
                                        <span className="text-white font-semibold">Zone de Libre-échange Continentale Africaine (ZLECAF)</span>.
                                        Grâce à ses ressources techniques, informationnelles et physiques,
                                        Galileecommerce.com vous offre des solutions visant l’amélioration de votre efficacité commerciale
                                        à tous les niveaux : local, national et international.
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
                <section className="w-full flex flex-col items-start px-6 md:px-16 lg:px-24 py-12">
                    {/* Titre */}
                    <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-10 leading-tight text-left">
                        <span className="font-bold">
                            Trouvez des solutions  adaptées à vos besoins
                        </span>
                    </h2>

                    {/* Grille des 4 cercles */}
                    <div
                        className="
                        grid 
                        grid-cols-1 
                        sm:grid-cols-2 
                        lg:grid-cols-4 
                        gap-10 
                        w-full 
                        justify-items-center
                        place-items-center
                        "
                    >
                        {/* Carte 1 */}
                        <div className="flex flex-col items-center text-center">
                            <div className="rounded-full border border-gray-400 flex flex-col items-center justify-center w-64 h-64 md:w-72 md:h-72 p-6 transition-transform duration-500 hover:scale-105 bg-white">
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
                            <div className="rounded-full border border-gray-400 flex flex-col items-center justify-center w-64 h-64 md:w-72 md:h-72 p-6 transition-transform duration-500 hover:scale-105 bg-white">
                                <h3 className="text-base md:text-lg font-bold text-purple-900 mb-2 leading-tight">
                                    Renforcer l’intégration
                                </h3>

                                <Image
                                    src={Img31}
                                    alt="Renforcer intégration"
                                    width={100}
                                    height={100}
                                    className="mb-3"
                                />

                                <p className="text-xs md:text-sm text-purple-900 leading-snug text-center">
                                    Assurer la liaison entre plusieurs pays <br /> et accompagner
                                    l’intégration commerciale.
                                </p>
                            </div>
                        </div>

                        {/* Carte 3 */}
                        <div className="flex flex-col items-center text-center">
                            <div className="rounded-full border border-gray-400 flex flex-col items-center justify-center w-64 h-64 md:w-72 md:h-72 p-6 transition-transform duration-500 hover:scale-105 bg-white">
                                <h3 className="text-base md:text-lg font-bold text-purple-900 mb-2 leading-tight text-center break-words">
                                    Compétitivité <br /> des entreprises
                                </h3>

                                <Image
                                    src={Img4}
                                    alt="Compétitivité entreprises"
                                    width={80}
                                    height={80}
                                    className="mb-3"
                                />

                                <p className="text-xs md:text-sm text-purple-900 leading-snug text-center">
                                    Faire baisser les dépenses  liées aux transactions <br /> et optimiser
                                    les <br />délais de livraison.
                                </p>
                            </div>
                        </div>

                        {/* Carte 4 */}
                        <div className="flex flex-col items-center text-center">
                            <div className="rounded-full border border-gray-400 flex flex-col items-center justify-center w-64 h-64 md:w-72 md:h-72 p-6 transition-transform duration-500 hover:scale-105 bg-white">
                                <h3 className="text-base md:text-lg font-bold text-purple-900 mb-2 leading-tight">
                                    Moderniser les axes de transport
                                </h3>

                                <Image
                                    src={Img41}
                                    alt="Moderniser transport"
                                    width={100}
                                    height={100}
                                    className="mb-3"
                                />

                                <p className="text-xs md:text-sm text-purple-900 leading-snug text-center">
                                    Soutenir et accompagner le <br /> développement du capital spatial.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>


                {/* SECTION 3 */}
                <section className="hidden w-full flex flex-col items-center px-6 md:px-16 lg:px-24 py-12">
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


                        {/* Carte  */}
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
                        className="object-cover brightness-75 hidden md:block"
                        priority
                    />
                    <Image
                        src={Corridorsmobile} // ⚠️ Mets ici ton image de fond (corridors3.png renommée)
                        alt="Corridor digital"
                        fill
                        className="object-cover brightness-75 md:hidden"
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
        </>
    );
}
