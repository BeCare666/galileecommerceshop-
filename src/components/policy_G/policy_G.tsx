import React from 'react';
import { ShieldCheck, Lock, Globe, Database, Key, FileText, Users, MapPin, Info } from 'lucide-react';

export default function PrivacyPolicy() {
    return (
        <div className="w-full max-w-5xl mx-auto px-4 space-y-10 lg:mt-5">
            <header className="lg:text-center md:text-center text-left">
                <h1 className="text-3xl md:text-4xl font-extrabold">POLITIQUE DE CONFIDENTIALITÉ ET DE PROTECTION DES DONNÉES</h1>
                <p className="text-gray-600 mt-2">Plateforme : GALILÉECOMMERCE.COM</p>
                <p className="text-gray-500 text-sm mt-1">Entité Responsable : Galiléecommerce (Groupe Galilé) — Siège Social : Douala, Cameroun</p>
                <p className="text-gray-500 text-sm mt-1">Dernière mise à jour : [Le 27/11/2025]</p>
            </header>

            {/* Card 1 */}
            <section className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8">
                <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow hidden lg:flex md:flex hidden lg:flex md:flex">
                        <ShieldCheck className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                        <h2 className="text-xl font-semibold mb-2">1. ENGAGEMENT DE CONFIDENTIALITÉ</h2>
                        <div className="border-l-2 border-gray-100 pl-4 text-gray-700 leading-relaxed">
                            <p>
                                La société Galiléecommerce, filiale du Groupe Galilé, accorde une importance capitale à la
                                protection de votre vie privée.
                            </p>
                            <p className="mt-2">
                                En tant qu'infrastructure commerciale panafricaine opérant dans le cadre de la ZLECAf et du
                                commerce mondial, nous collectons et traitons vos données personnelles conformément aux lois
                                en vigueur au Cameroun (Loi n° 2010/012 sur la cybersécurité et la protection des données) et
                                aux standards internationaux.
                            </p>
                            <p className="mt-2">
                                Cette politique explique quelles données nous collectons via nos Pavillons Digitaux, nos
                                solutions de paiement et nos services logistiques, et comment nous les utilisons.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Card 2 */}
            <section className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8">
                <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-green-600 text-white flex items-center justify-center shadow hidden lg:flex md:flex">
                        <Lock className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                        <h2 className="text-xl font-semibold mb-2">2. LES DONNÉES QUE NOUS COLLECTONS</h2>
                        <div className="border-l-2 border-gray-100 pl-4 text-gray-700 leading-relaxed space-y-3">
                            <p>
                                Nous collectons les informations nécessaires au bon fonctionnement de nos services B2B, B2C
                                et logistiques.
                            </p>

                            <p className="font-semibold">2.1. Données fournies directement par vous</p>
                            <ul className="list-disc ml-6">
                                <li>
                                    Identité et Contact : Nom, prénom, adresse e-mail, numéro de téléphone, adresse physique.
                                </li>
                                <li>
                                    Données d'Entreprise (Pour les Vendeurs/B2B) : Numéro d'immatriculation (RCCM ou
                                    équivalent), Numéro d'Identifiant Fiscal (NIU), Licence d'exportation, Certificats normatifs.
                                </li>
                                <li>
                                    Données Financières : Bien que Galiléecommerce ne stocke pas le code CVV complet, nous traitons
                                    les données nécessaires aux transactions (Mobile Money ID, RIB bancaire pour les virements, historique de paiement).
                                </li>
                            </ul>

                            <p className="font-semibold">2.2. Données collectées automatiquement (IA et Technique)</p>
                            <ul className="list-disc ml-6">
                                <li>
                                    Données de Navigation : Adresse IP, type d'appareil, géolocalisation (indispensable pour les services "Dernier Kilomètre").
                                </li>
                                <li>
                                    Comportement d'Achat : Historique des commandes, produits consultés. Ces données alimentent nos "Solutions alimentées par l'IA"
                                    pour personnaliser votre expérience et vous recommander des produits pertinents.
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Card 3 */}
            <section className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8">
                <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow hidden lg:flex md:flex">
                        <Globe className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                        <h2 className="text-xl font-semibold mb-2">3. UTILISATION DE VOS DONNÉES</h2>
                        <div className="border-l-2 border-gray-100 pl-4 text-gray-700 leading-relaxed space-y-2">
                            <p>Nous utilisons vos données pour les finalités suivantes :</p>
                            <ol className="list-decimal ml-6">
                                <li>Exécution des Commandes : Traiter les paiements, émettre les factures et gérer la livraison via nos Corridors Digitaux.</li>
                                <li>Sécurité et Vérification (KYC/KYB) : Vérifier l'identité des Vendeurs occupant les Pavillons Digitaux pour prévenir la fraude et la contrefaçon.</li>
                                <li>Inspection Normative : Transmettre les détails techniques des produits à notre Centre de Ressources Normatives en cas de demande d'audit qualité.</li>
                                <li>Amélioration par l'IA : Analyser les tendances du marché pour aider nos vendeurs à mieux stocker et nos acheteurs à mieux sourcer.</li>
                                <li>Communication : Vous envoyer des notifications sur l'état de votre commande ou des offres promotionnelles (avec votre consentement).</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </section>

            {/* Card 4 */}
            <section className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8">
                <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-rose-600 text-white flex items-center justify-center shadow hidden lg:flex md:flex">
                        <Database className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                        <h2 className="text-xl font-semibold mb-2">4. PARTAGE DES DONNÉES AVEC DES TIERS</h2>
                        <div className="border-l-2 border-gray-100 pl-4 text-gray-700 leading-relaxed space-y-2">
                            <p>Galiléecommerce ne vend pas vos données personnelles. Cependant, pour fournir le service,
                                nous devons partager certaines informations avec des acteurs clés de notre écosystème :</p>
                            <ul className="list-disc ml-6">
                                <li>
                                    Les Vendeurs (Pavillons) : Le vendeur reçoit votre nom et adresse de livraison pour
                                    expédier le produit (sauf si expédié par Galiléecommerce).
                                </li>
                                <li>
                                    Les Partenaires Logistiques : Les transporteurs opérant sur nos Corridors Digitaux et
                                    les agents du Centre de Ressources Dernier Kilomètre (livreurs, pilotes de drones)
                                    reçoivent vos coordonnées de géolocalisation et téléphone pour effectuer la livraison.
                                </li>
                                <li>
                                    Les Autorités Douanières et Fiscales : Dans le cadre des transactions transfrontalières
                                    (ZLECAf), les données de facture sont transmises aux douanes des pays de départ et d'arrivée.
                                </li>
                                <li>
                                    Les Organismes d'Inspection : Si une inspection est requise, les données techniques
                                    du produit et du vendeur sont partagées avec les auditeurs.
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Card 5 */}
            <section className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8">
                <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-yellow-600 text-white flex items-center justify-center shadow hidden lg:flex md:flex">
                        <Key className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                        <h2 className="text-xl font-semibold mb-2">5. TRANSFERTS INTERNATIONAUX DE DONNÉES</h2>
                        <div className="border-l-2 border-gray-100 pl-4 text-gray-700 leading-relaxed">
                            <p>
                                Galiléecommerce étant une plateforme de commerce international, vos données peuvent être
                                transférées et traitées dans un pays autre que votre pays de résidence (par exemple : données
                                d'un acheteur camerounais transmises à un vendeur en Chine ou au Nigéria).
                            </p>
                            <p className="mt-2">
                                Nous nous assurons que ces transferts sont sécurisés et limités au strict nécessaire pour
                                l'exécution du contrat commercial.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Card 6 */}
            <section className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8">
                <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-teal-600 text-white flex items-center justify-center shadow hidden lg:flex md:flex">
                        <FileText className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                        <h2 className="text-xl font-semibold mb-2">6. SÉCURITÉ DES DONNÉES</h2>
                        <div className="border-l-2 border-gray-100 pl-4 text-gray-700 leading-relaxed space-y-2">
                            <p>Nous mettons en œuvre des mesures techniques robustes pour protéger vos informations :</p>
                            <ul className="list-disc ml-6">
                                <li>Protocole de cryptage SSL/TLS pour toutes les transactions (Paiements numériques ultrasécurisés).</li>
                                <li>Contrôle d'accès strict aux bases de données (seul le personnel habilité du Support Client
                                    peut accéder à vos détails en cas de litige).</li>
                                <li>Ségrégation des données bancaires (traitées par des partenaires certifiés PCI-DSS).</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Card 7 */}
            <section className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8">
                <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow hidden lg:flex md:flex">
                        <Users className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                        <h2 className="text-xl font-semibold mb-2">7. VOS DROITS</h2>
                        <div className="border-l-2 border-gray-100 pl-4 text-gray-700 leading-relaxed space-y-2">
                            <p>Conformément à la réglementation, vous disposez des droits suivants :</p>
                            <ul className="list-disc ml-6">
                                <li>Droit d'accès : Demander une copie des données que nous détenons sur vous.</li>
                                <li>Droit de rectification : Corriger des informations inexactes dans votre "Espace Business" ou "Compte Client".</li>
                                <li>Droit à l'effacement : Demander la suppression de votre compte (sous réserve des obligations légales de conservation des factures pendant 5 à 10 ans).</li>
                                <li>Droit d'opposition : Refuser l'utilisation de vos données à des fins marketing.</li>
                            </ul>
                            <p className="mt-2">Pour exercer ces droits, contactez notre Délégué à la Protection des Données (DPO) à : privacy@galileecommerce.com (ou adresse équivalente).</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Card 8 */}
            <section className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8">
                <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow hidden lg:flex md:flex">
                        <MapPin className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                        <h2 className="text-xl font-semibold mb-2">8. COOKIES ET TRACEURS</h2>
                        <div className="border-l-2 border-gray-100 pl-4 text-gray-700 leading-relaxed">
                            <p>Nous utilisons des cookies pour :</p>
                            <ol className="list-decimal ml-6">
                                <li>Maintenir votre session active.</li>
                                <li>Mémoriser votre panier d'achat.</li>
                                <li>Analyser le trafic via nos outils d'IA.</li>
                            </ol>
                            <p className="mt-2">Vous pouvez configurer votre navigateur pour refuser les cookies, mais certaines fonctionnalités (comme le paiement) pourraient ne pas fonctionner correctement.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Card 9 */}
            <section className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8">
                <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gray-700 text-white flex items-center justify-center shadow hidden lg:flex md:flex">
                        <Info className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                        <h2 className="text-xl font-semibold mb-2">9. MODIFICATION DE LA POLITIQUE</h2>
                        <div className="border-l-2 border-gray-100 pl-4 text-gray-700 leading-relaxed">
                            <p>
                                Galiléecommerce se réserve le droit de modifier cette politique pour refléter les évolutions
                                réglementaires ou technologiques. Les utilisateurs seront informés des mises à jour majeures par
                                e-mail ou via une notification sur la Plateforme.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
}