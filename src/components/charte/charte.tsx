import React from "react";
import {
    ShieldCheck,
    ClipboardList,
    FileText,
    AlertTriangle,
    Truck,
    Users,
    CheckCircle,
    XCircle,
    Info,
} from "lucide-react";

export default function CharteVendeurs() {
    return (
        <div className="w-full max-w-5xl mx-auto px-4 py-10">

            <h1 className="text-3xl font-bold mb-2">
                Charte des Vendeurs et Contrat d'Adhésion aux "Pavillons Digitaux"
            </h1>
            <p className="text-gray-600 mb-1">Plateforme : GALILÉECOMMERCE.COM</p>
            <p className="text-gray-600 mb-10">Version : 1.0</p>

            <div className="space-y-10">

                {/* SECTION 1 */}
                <div className="space-y-3">
                    <div className="flex items-center gap-2">
                        <FileText className="w-6 h-6 text-blue-600" />
                        <h2 className="text-xl font-semibold">1. OBJET ET CHAMP D'APPLICATION</h2>
                    </div>

                    <p className="text-gray-600 leading-relaxed">
                        Le présent accord (ci-après la "Charte") définit les droits et obligations de toute
                        entreprise (ci-après le "Vendeur") souhaitant exposer et vendre des produits ou
                        services via un Pavillon Digital (Business Space) sur la plateforme
                        Galiléecommerce.com. L'adhésion à cette Charte est la condition <i>sine qua non</i>
                        pour vendre sur la plateforme.
                    </p>
                </div>

                {/* SECTION 2 */}
                <div className="space-y-3">
                    <div className="flex items-center gap-2">
                        <ShieldCheck className="w-6 h-6 text-blue-600" />
                        <h2 className="text-xl font-semibold">2. ADMISSION ET VÉRIFICATION (KYB)</h2>
                    </div>

                    <p className="text-gray-600 leading-relaxed font-semibold">2.1. Statut Professionnel</p>

                    <p className="text-gray-600 leading-relaxed">
                        L'accès aux Pavillons Digitaux est réservé aux entités légales enregistrées
                        (Entreprises, Commerçants, Artisans, Industries). Le Vendeur doit fournir :
                    </p>

                    <ul className="list-disc ml-6 text-gray-600 leading-relaxed">
                        <li>Registre de Commerce (RCCM ou équivalent local).</li>
                        <li>Numéro d'Identifiant Fiscal (NIU).</li>
                        <li>Pièce d'identité du gérant.</li>
                    </ul>

                    <p className="text-gray-600 leading-relaxed font-semibold">2.2. Certification "Vendeur Vérifié"</p>

                    <p className="text-gray-600 leading-relaxed">
                        Galiléecommerce procède à une vérification (Audit documentaire ou visite physique).
                        Seuls les vendeurs ayant passé cette étape obtiennent le badge de confiance permettant
                        d'encaisser des paiements.
                    </p>
                </div>

                {/* SECTION 3 */}
                <div className="space-y-3">
                    <div className="flex items-center gap-2">
                        <ClipboardList className="w-6 h-6 text-blue-600" />
                        <h2 className="text-xl font-semibold">
                            3. OBLIGATIONS RELATIVES AUX PRODUITS ET SERVICES
                        </h2>
                    </div>

                    <p className="text-gray-600 leading-relaxed font-semibold">3.1. Conformité ZLECAf</p>
                    <p className="text-gray-600 leading-relaxed">
                        Le Vendeur s'engage à indiquer avec exactitude l'origine des produits
                        ("Made in Cameroun", "Made in China", etc.). Toute fausse déclaration d'origine
                        pour contourner les droits de douane entraînera un bannissement immédiat.
                    </p>

                    <p className="text-gray-600 leading-relaxed font-semibold">3.2. Qualité et Normes</p>

                    <ul className="list-disc ml-6 text-gray-600 leading-relaxed">
                        <li>
                            Le Vendeur accepte que ses produits puissent être audités à tout moment par
                            le Centre de Ressources Normatives de Galiléecommerce.
                        </li>
                        <li>
                            En cas d'inspection (avant expédition) demandée par un Acheteur, le Vendeur doit
                            donner libre accès à son stock ou son usine aux inspecteurs mandatés.
                        </li>
                    </ul>

                    <p className="text-gray-600 leading-relaxed font-semibold">3.3. Stock Réel</p>

                    <p className="text-gray-600 leading-relaxed">
                        Sauf accord de "Drop-shipping" validé, le Vendeur garantit posséder le stock affiché
                        dans son Pavillon Digital.
                    </p>
                </div>

                {/* SECTION 4 */}
                <div className="space-y-3">
                    <div className="flex items-center gap-2">
                        <CheckCircle className="w-6 h-6 text-blue-600" />
                        <h2 className="text-xl font-semibold">4. CONDITIONS FINANCIÈRES</h2>
                    </div>

                    <p className="text-gray-600 leading-relaxed font-semibold">4.1. Commissions</p>
                    <p className="text-gray-600 leading-relaxed">
                        En contrepartie de l'apport d'affaires et de la sécurisation technique,
                        Galiléecommerce prélève une commission sur chaque transaction validée
                        (le taux varie selon la catégorie de produit, voir Grille Tarifaire en annexe).
                    </p>

                    <p className="text-gray-600 leading-relaxed font-semibold">4.2. Système de Séquestre</p>

                    <p className="text-gray-600 leading-relaxed">
                        Le Vendeur accepte que les fonds payés par l'Acheteur soient bloqués sur le compte
                        séquestre de Galiléecommerce. Le virement vers le compte bancaire/mobile money du
                        Vendeur n'est déclenché qu'après :
                    </p>

                    <ul className="list-disc ml-6 text-gray-600 leading-relaxed">
                        <li>La confirmation de livraison (produits physiques).</li>
                        <li>La validation du livrable (services).</li>
                        <li>L'expiration du délai de réclamation.</li>
                    </ul>
                </div>

                {/* SECTION 5 */}
                <div className="space-y-3">
                    <div className="flex items-center gap-2">
                        <Truck className="w-6 h-6 text-blue-600" />
                        <h2 className="text-xl font-semibold">5. LOGISTIQUE ET EXPÉDITION</h2>
                    </div>

                    <p className="text-gray-600 leading-relaxed font-semibold">5.1. Responsabilité de l'Emballage</p>
                    <p className="text-gray-600 leading-relaxed">
                        Le Vendeur est seul responsable de l'emballage adéquat des produits, particulièrement
                        pour les expéditions vers des zones enclavées gérées par le Centre de Ressources
                        Dernier Kilomètre. Tout produit arrivé cassé pour cause d'emballage insuffisant sera
                        remboursé à l'Acheteur aux frais du Vendeur.
                    </p>

                    <p className="text-gray-600 leading-relaxed font-semibold">5.2. Délais</p>
                    <p className="text-gray-600 leading-relaxed">
                        Le Vendeur s'engage à remettre le colis au transporteur (ou au Corridor Digital choisi)
                        dans le délai affiché sur la fiche produit (généralement 24 à 48h).
                    </p>
                </div>

                {/* SECTION 6 */}
                <div className="space-y-3">
                    <div className="flex items-center gap-2">
                        <AlertTriangle className="w-6 h-6 text-red-500" />
                        <h2 className="text-xl font-semibold">6. RÈGLES DE CONDUITE ET "ANTI-CONTOURNEMENT"</h2>
                    </div>

                    <p className="text-gray-600 leading-relaxed font-semibold">6.1. Interdiction du Hors-Plateforme</p>
                    <p className="text-gray-600 leading-relaxed">
                        Il est strictement interdit d'utiliser la messagerie de Galiléecommerce pour inciter les
                        acheteurs à finaliser la transaction en dehors du site (ex: "Contactez-moi sur WhatsApp
                        pour payer moins cher").
                    </p>

                    <p className="text-gray-600 leading-relaxed">
                        Sanction : Nos systèmes d'IA scannent les messages. Toute tentative avérée entraîne la
                        fermeture définitive du Pavillon Digital et la retenue des fonds en cours.
                    </p>
                </div>

                {/* SECTION 7 */}
                <div className="space-y-3">
                    <div className="flex items-center gap-2">
                        <Users className="w-6 h-6 text-blue-600" />
                        <h2 className="text-xl font-semibold">7. GARANTIES ET SAV (SERVICE APRÈS-VENTE)</h2>
                    </div>

                    <p className="text-gray-600 leading-relaxed font-semibold">7.1. Politique de Retour</p>
                    <p className="text-gray-600 leading-relaxed">
                        Le Vendeur doit accepter les retours conformes aux CGV de la plateforme
                        (voir Annexe par catégories).
                    </p>

                    <p className="text-gray-600 leading-relaxed font-semibold">7.2. Réactivité</p>
                    <p className="text-gray-600 leading-relaxed">
                        Le Vendeur s'engage à répondre aux questions des Acheteurs et aux tickets du Centre
                        de Ressources Support Client sous 24 heures ouvrées.
                    </p>
                </div>

                {/* SECTION 8 */}
                <div className="space-y-3">
                    <div className="flex items-center gap-2">
                        <Info className="w-6 h-6 text-blue-600" />
                        <h2 className="text-xl font-semibold">8. PROPRIÉTÉ INTELLECTUELLE</h2>
                    </div>

                    <p className="text-gray-600 leading-relaxed">
                        Le Vendeur garantit qu'il détient les droits de vente sur les produits (pas de
                        contrefaçon). Il autorise Galiléecommerce à utiliser ses photos et logos pour la
                        promotion de la plateforme (publicité, réseaux sociaux).
                    </p>
                </div>

                {/* SECTION 9 */}
                <div className="space-y-3">
                    <div className="flex items-center gap-2">
                        <XCircle className="w-6 h-6 text-red-500" />
                        <h2 className="text-xl font-semibold">9. SANCTIONS ET RÉSILIATION</h2>
                    </div>

                    <p className="text-gray-600 leading-relaxed">
                        Galiléecommerce applique un système de pénalités à points :
                    </p>

                    <ul className="list-disc ml-6 text-gray-600 leading-relaxed">
                        <li>Avertissement : Retard d'expédition, taux d'annulation élevé.</li>
                        <li>Suspension Temporaire (7 à 30 jours) : Non-réponse au SAV, litiges répétés.</li>
                        <li>
                            Bannissement Définitif : Vente de produits interdits, fraude, contournement de la
                            plateforme, fausse déclaration d'origine.
                        </li>
                    </ul>

                    <p className="text-gray-600 leading-relaxed">
                        En cas de bannissement pour fraude, les fonds du Vendeur peuvent être gelés jusqu'à
                        180 jours pour couvrir les éventuelles réclamations des acheteurs.
                    </p>
                </div>

                {/* SECTION FINAL */}
                <div className="space-y-2">
                    <p className="text-gray-800 font-semibold">Lu et approuvé.</p>
                    <p className="text-gray-600">
                        L'ouverture d'un Pavillon Digital vaut acceptation pleine et entière de cette Charte.
                    </p>
                </div>

            </div>
        </div>
    );
}
