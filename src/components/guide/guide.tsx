import React from "react";
import {
    BookOpen,
    Search,
    Target,
    ShieldCheck,
    Factory,
    Ship,
    CheckCircle,
    Globe,
    ClipboardList,
    FileCheck,
    Package,
    MapPin,
    Layers,
    BadgeCheck,
} from "lucide-react";

export default function GuideApprovisionnement() {
    return (
        <div className="w-full max-w-5xl mx-auto px-4 py-10 space-y-12">
            {/* TITLE */}
            <div className="text-center space-y-4">
                <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">LE GUIDE COMPLET DE L'APPROVISIONNEMENT</h1>
                <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                    Maîtrisez l'art du Sourcing B2B et B2C en Afrique et dans le Monde
                </p>
            </div>

            {/* CARD COMPONENTS */}

            {/* INTRODUCTION */}
            <section className="bg-white shadow-lg rounded-2xl p-6 md:p-8 space-y-6 border border-gray-100">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-md">
                        <BookOpen className="w-6 h-6" />
                    </div>
                    <h2 className="text-xl md:text-2xl font-bold">INTRODUCTION</h2>
                </div>
                <div className="border-l-2 border-gray-200 pl-4 space-y-4 text-gray-700 leading-relaxed">
                    <p>
                        Galiléecommerce.com : L'infrastructure commerciale de l'Afrique. Galiléecommerce.com n'est pas seulement une place de
                        marché ; c'est le moteur numérique de la Zone de Libre-échange Continentale Africaine (ZLECAf). Pour les
                        entreprises commerciales, les PME et les acheteurs internationaux, c'est la porte d'entrée vers des millions
                        de produits, des fournisseurs certifiés et une logistique intégrée.
                    </p>
                    <p>
                        Cependant, se lancer dans le sourcing (approvisionnement) sans méthode peut mener à des erreurs coûteuses :
                        mauvais fournisseurs, produits non conformes ou bloqués en douane. Ce guide compile les meilleures pratiques
                        adaptées à notre écosystème unique. Vous apprendrez à naviguer entre nos Pavillons Digitaux, à sécuriser vos
                        achats via notre Séquestre, et à maîtriser la logistique des Corridors Digitaux.
                    </p>
                </div>
            </section>

            {/* ÉTAPE 1 */}
            <section className="bg-white shadow-lg rounded-2xl p-6 md:p-8 space-y-6 border border-gray-100">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-green-600 text-white flex items-center justify-center shadow-md">
                        <Target className="w-6 h-6" />
                    </div>
                    <h2 className="text-xl md:text-2xl font-bold">ÉTAPE 1 : DÉFINIR VOTRE STRATÉGIE PRODUIT</h2>
                </div>
                <div className="border-l-2 border-gray-200 pl-4 space-y-4 text-gray-700 leading-relaxed">
                    <p>
                        Avant de chercher, il faut savoir ce que vous cherchez. Sur Galiléecommerce, deux types d'approvisionnement
                        coexistent :
                    </p>
                    <p className="font-semibold">A. Les Produits "Prêts à Expédier" (Ready-to-Ship)</p>
                    <ul className="list-disc pl-6 space-y-1">
                        <li>C'est quoi ? Des produits finis, stockés dans les entrepôts des vendeurs ou dans nos hubs logistiques.</li>
                        <li>Pour qui ? Commerçants voulant du stock rapide et petites quantités.</li>
                        <li>Avantage : Prix fixe, aucun délai de production, idéal pour tester un marché.</li>
                    </ul>
                    <p className="font-semibold">B. Les Produits Personnalisés (OEM/ODM)</p>
                    <ul className="list-disc pl-6 space-y-1">
                        <li>Produits fabriqués selon vos spécifications (logo, couleur, design…)</li>
                        <li>Idéal pour les marques voulant se différencier.</li>
                        <li>MOQ plus élevé et délai de production requis.</li>
                    </ul>
                </div>
            </section>

            {/* ÉTAPE 2 */}
            <section className="bg-white shadow-lg rounded-2xl p-6 md:p-8 space-y-6 border border-gray-100">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-purple-600 text-white flex items-center justify-center shadow-md">
                        <Search className="w-6 h-6" />
                    </div>
                    <h2 className="text-xl md:text-2xl font-bold">ÉTAPE 2 : RECHERCHE EFFICACE SUR LA PLATEFORME</h2>
                </div>
                <div className="border-l-2 border-gray-200 pl-4 space-y-4 text-gray-700 leading-relaxed">
                    <p className="font-semibold">1. Utilisation des mots-clés et filtres "Origine"</p>
                    <p>Soyez précis : utilisez des termes complets pour de meilleurs résultats.</p>
                    <p className="italic">Astuce Galilée : le filtre exclusif "Origine" :</p>
                    <ul className="list-disc pl-6 space-y-1">
                        <li>"Made in Africa" → avantages douaniers ZLECAf.</li>
                        <li>"Made in Asia/Europe" → sourcing international classique.</li>
                    </ul>

                    <p className="font-semibold">2. La Recherche par Image (Visual Search)</p>
                    <ul className="list-disc pl-6 space-y-1">
                        <li>Ouvrez l'application Galiléecommerce</li>
                        <li>Appuyez sur l'icône appareil photo</li>
                        <li>Notre IA identifie le produit exact ou similaire</li>
                    </ul>
                </div>
            </section>

            {/* ÉTAPE 3 */}
            <section className="bg-white shadow-lg rounded-2xl p-6 md:p-8 space-y-6 border border-gray-100">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-orange-500 text-white flex items-center justify-center shadow-md">
                        <BadgeCheck className="w-6 h-6" />
                    </div>
                    <h2 className="text-xl md:text-2xl font-bold">ÉTAPE 3 : IDENTIFIER LES FOURNISSEURS FIABLES</h2>
                </div>
                <div className="border-l-2 border-gray-200 pl-4 space-y-4 text-gray-700 leading-relaxed">
                    <p className="font-semibold">A. Distinguer les types de vendeurs</p>
                    <ul className="list-disc pl-6 space-y-1">
                        <li>Vendeur Standard : vérification basique.</li>
                        <li>Pavillon Digital Certifié : badge vérifié (Gold Supplier africain).</li>
                    </ul>

                    <p className="font-semibold">B. Vérifier la conformité normative</p>
                    <ul className="list-disc pl-6 space-y-1">
                        <li>Vérifier les logos : ISO, normes ZLECAf, CE.</li>
                        <li>Inspection avant expédition recommandée.</li>
                    </ul>

                    <p className="font-semibold">C. Analyse du Pavillon Digital</p>
                    <p>Un vendeur sérieux est spécialisé et a une boutique cohérente.</p>
                </div>
            </section>

            {/* ÉTAPE 4 */}
            <section className="bg-white shadow-lg rounded-2xl p-6 md:p-8 space-y-6 border border-gray-100">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-red-500 text-white flex items-center justify-center shadow-md">
                        <ClipboardList className="w-6 h-6" />
                    </div>
                    <h2 className="text-xl md:text-2xl font-bold">ÉTAPE 4 : NÉGOCIER ET COMMANDER (RFQ)</h2>
                </div>
                <div className="border-l-2 border-gray-200 pl-4 space-y-4 text-gray-700 leading-relaxed">
                    <p className="font-semibold">1. Envoyer une Demande de Cotation (RFQ)</p>
                    <ul className="list-disc pl-6 space-y-1">
                        <li>Indiquer la quantité exacte</li>
                        <li>Spécifications techniques</li>
                        <li>Destination finale pour calcul douane/fret</li>
                        <li>Demander un échantillon</li>
                    </ul>

                    <p className="font-semibold">2. Comprendre les Incoterms</p>
                    <ul className="list-disc pl-6 space-y-1">
                        <li>EXW : Vous gérez tout → risqué.</li>
                        <li>DDP : Livraison jusqu'à votre porte → recommandé.</li>
                    </ul>
                </div>
            </section>

            {/* ÉTAPE 5 */}
            <section className="bg-white shadow-lg rounded-2xl p-6 md:p-8 space-y-6 border border-gray-100">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-teal-600 text-white flex items-center justify-center shadow-md">
                        <ShieldCheck className="w-6 h-6" />
                    </div>
                    <h2 className="text-xl md:text-2xl font-bold">ÉTAPE 5 : PAYER EN TOUTE SÉCURITÉ</h2>
                </div>
                <div className="border-l-2 border-gray-200 pl-4 space-y-4 text-gray-700 leading-relaxed">
                    <p>
                        La solution Galiléecommerce : Le Paiement Séquestre. L'argent est bloqué jusqu'à confirmation de réception
                        conforme. Remboursement garanti en cas de non-conformité.
                    </p>
                </div>
            </section>

            {/* ÉTAPE 6 */}
            <section className="bg-white shadow-lg rounded-2xl p-6 md:p-8 space-y-6 border border-gray-100">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-yellow-500 text-white flex items-center justify-center shadow-md">
                        <MapPin className="w-6 h-6" />
                    </div>
                    <h2 className="text-xl md:text-2xl font-bold">ÉTAPE 6 : MAÎTRISER LA LOGISTIQUE</h2>
                </div>
                <div className="border-l-2 border-gray-200 pl-4 space-y-4 text-gray-700 leading-relaxed">
                    <p className="font-semibold">1. Corridors Digitaux</p>
                    <p>Choisissez un corridor, notre système calculera douane + itinéraire optimal.</p>

                    <p className="font-semibold">2. Zones Enclavées</p>
                    <p>Notre Centre de Ressources Dernier Kilomètre assure la livraison même en zones reculées.</p>
                </div>
            </section>

            {/* CHECKLIST */}
            <section className="bg-white shadow-lg rounded-2xl p-6 md:p-8 space-y-6 border border-gray-100">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-md">
                        <CheckCircle className="w-6 h-6" />
                    </div>
                    <h2 className="text-xl md:text-2xl font-bold">CHECKLIST DE L'ACHETEUR INGÉNIEUX</h2>
                </div>
                <ul className="border-l-2 border-gray-200 pl-6 space-y-3 text-gray-700 leading-relaxed list-disc">
                    <li>J'ai défini si je veux du "Prêt à expédier" ou du "Sur-mesure".</li>
                    <li>J'ai utilisé le filtre "Origine" pour optimiser mes droits de douane.</li>
                    <li>J'ai choisi un fournisseur avec le badge "Pavillon Certifié".</li>
                    <li>J'ai demandé un échantillon pour valider la qualité.</li>
                    <li>J'ai payé uniquement via la plateforme.</li>
                    <li>J'ai sélectionné le bon Corridor Logistique.</li>
                </ul>
            </section>
        </div>
    );
}

