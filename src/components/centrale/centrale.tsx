// app/components/PricingSection.jsx
import Image from "next/image";
import Centrale_img1 from "@/assets/images/centrale-achat/centrale_img1.png";
import Centrale_img2 from "@/assets/images/centrale-achat/centrale_img2.png";
import Centrale_img3 from "@/assets/images/centrale-achat/centrale_img3.png";
import Centrale_img4 from "@/assets/images/centrale-achat/centrale_img4.png";
import Centrale_img5 from "@/assets/images/centrale-achat/centrale_img5.png";
export default function PricingSection() {
    return (
        <>
            <section className="w-full bg-white">
                <div className="grid md:grid-cols-2 items-center">
                    {/* Texte à gauche */}
                    <div className="bg-pink-600 text-white p-8 md:p-16 flex flex-col justify-center">
                        <h2 className="text-3xl md:text-4xl font-bold leading-snug mb-6">
                            Des prix imbattables et des conditions exceptionnelles
                        </h2>
                        <p className="text-base md:text-lg leading-relaxed">
                            Vous êtes grossiste ou détaillant. Nous aidons votre entreprise à
                            accéder à des milliers d’offres disponibles dans le monde à des prix
                            imbattables. Choisissez vos produits, remplissez les formalités
                            d&apos;usage, effectuez le paiement pour être livré dans les
                            meilleurs délais.
                        </p>
                    </div>

                    {/* Image à droite */}
                    <div className="relative w-full  h-full">
                        <Image
                            src={Centrale_img1} // mets ton image dans public/
                            alt="Femme souriante avec un téléphone"
                            fill
                            className="object-cover"
                            priority
                        />

                        {/* Forme triangulaire */}
                        <div className="absolute top-0 left-0 w-0 h-0 border-t-[100%] md:border-t-[100%] border-r-[100vw] border-t-pink-600 border-r-transparent"></div>
                    </div>
                </div>
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
            </section>
            <section className="w-full px-4 md:px-8 lg:py-16">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center md:items-start gap-12">
                    {/* Gauche : numéro + titre + texte */}
                    <div className="w-full md:w-1/2 space-y-6">
                        {/* Cercle + cartouche titre collés */}
                        <div className="flex items-center gap-0 relative">
                            {/* Cercle numéro */}
                            <div className="w-28 h-28 md:w-40 md:h-40 rounded-full bg-white shadow-xl flex items-center justify-center">
                                <span className="text-[#0DAF3F] text-4xl md:text-6xl font-extrabold">01</span>
                            </div>

                            {/* Bloc titre qui s’emboîte */}
                            <div className="ml-7 bg-white shadow-xl px-6 py-3 rounded-r-full -ml-8">
                                <h2 className="text-xl md:text-2xl font-bold">Étape 1. Choisir une campagne</h2>
                            </div>
                        </div>

                        {/* Texte */}
                        <p className="text-justify leading-relaxed">
                            La sélection des produits se fait dans le cadre des campagnes périodiques d’achats
                            internationaux organisés par la centrale d’achat de Galileecommerce.com. Nous permettons aux adhérents de saisir
                            les opportunités de marché et de trouver des produits ou services à des standards de qualité spécifiques ou
                            élevés, à des coûts défiant toute concurrence.
                        </p>
                        <p className="font-semibold text-justify">
                            Choisissez l’une des campagnes d’achat international de Galileecommerce et sélectionnez les produits de votre
                            choix.
                        </p>
                    </div>

                    {/* Droite : image sur bande */}
                    <div className="w-full md:w-1/2 flex justify-center">
                        <div className="relative flex flex-col items-center w-11/12 max-w-md">
                            {/* Image au-dessus */}
                            <Image
                                src={Centrale_img3}
                                alt="campagne"
                                className="relative z-10 object-cover w-full rounded-t-lg"
                                priority
                            />

                            {/* Bande verte collée à l’image */}
                            <div className="w-full h-16 md:h-20 bg-[#00A651] rounded-b-lg"></div>
                        </div>
                    </div>

                </div>

            </section>
            <section className="w-full px-4 md:px-8 lg:py-10">
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
                        <ul className="mt-12 md:mt-10 list-disc pl-5 space-y-2 text-justify">
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
            <section className="max-w-6xl mx-auto px-6 lg:px-12 py-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                {/* COLONNE GAUCHE : cercle + titre + texte */}
                <div className="relative">
                    {/* Grand cercle blanc contenant "03" */}
                    <div className=" w-36 h-36 md:w-56 md:h-56 rounded-full bg-white shadow-[0_12px_30px_rgba(0,0,0,0.12)] flex items-center justify-center">
                        <span className="text-[#FC2518] md:text-[104px] text-4xl font-extrabold leading-none">
                            03
                        </span>
                    </div>

                    {/* Cartouche titre */}
                    <div className="absolute left-28 md:left-40 top-4 md:top-8 bg-white shadow-lg rounded px-4 py-3 max-w-xs">
                        <h2 className="text-lg md:text-2xl font-bold">Payer sur</h2>
                        <p className="text-sm md:text-lg font-semibold text-gray-900">
                            Galileecommerce.com
                        </p>
                        <div className="w-20 md:w-24 h-[3px] bg-[#FC2518] mt-2"></div>
                    </div>

                    {/* Pastille rouge */}
                    <div className="hidden md:block absolute left-[calc(16rem+7.5rem)] top-1/2 -translate-y-1/2">
                        <div className="w-4 h-4 bg-[#FC2518] rounded-full shadow-sm"></div>
                    </div>

                    {/* Texte explicatif sous le bloc titre */}
                    <p className="mt-12 md:mt-10 text-sm md:text-base text-gray-700 leading-relaxed text-justify">
                        Le règlement des commandes sur Galileecommerce.com est à la fois
                        simple et sécurisé. Après avoir convenu des modalités de paiement,
                        vous devrez effectuer un premier versement. Le montant restant sera
                        requis lors de l&apos;expédition des articles.{" "}
                        <span className="text-[#FC2518] underline">Galileecommerce.com</span>{" "}
                        permet d&apos;effectuer des paiements sécurisés grâce à l&apos;assurance
                        commerciale fournie par ses partenaires assureurs. Une fois le paiement
                        réalisé, vous aurez accès au système de suivi des opérations de A à Z,
                        jusqu&apos;à la livraison finale de vos articles.
                    </p>
                </div>

                {/* COLONNE DROITE : image seule */}
                <div className="flex justify-center md:justify-end">
                    <Image
                        src={Centrale_img5}
                        alt="Cartes bancaires"
                        width={480}
                        height={320}
                        className="w-full max-w-sm h-auto"
                    />
                </div>
            </section>

        </>
    );
}
