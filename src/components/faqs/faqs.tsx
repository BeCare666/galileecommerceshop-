import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    BookOpen,
    Search,
    ChevronDown,
    ChevronUp,
    Info,
    Truck,
    ShieldCheck,
    Globe,
    DollarSign,
    Layers,
    Settings,
    CheckCircle,
} from 'lucide-react';

// Single-file, production-ready React + Tailwind component
// Usage: import FaqGalilee from './FaqGalilee'; then <FaqGalilee />
// Dependencies: lucide-react, framer-motion, tailwindcss

const sections = [
    {
        id: 'strat',
        title: '1. STRATÉGIE D\'ACHAT & RECHERCHE PRODUIT',
        icon: BookOpen,
        items: [
            {
                q: 'Q : Quelle est la différence entre les produits "Prêts à Expédier" et "Personnalisés" ?',
                a: `R :\n• Prêts à Expédier (RTS) : Ce sont des produits finis, en stock. Ils ont un prix fixe et sont expédiés sous 2 à 14 jours. Idéal pour les petites commandes rapides.\n• Personnalisés (OEM/ODM) : Vous demandez au fournisseur de fabriquer le produit avec votre logo, vos couleurs ou votre design. Cela nécessite une quantité minimum (MOQ) plus élevée et un délai de production, mais c'est idéal pour créer votre propre marque.`,
            },
            {
                q: 'Q : Comment trouver spécifiquement des produits africains (ZLECAf) ?',
                a: `R : Utilisez notre filtre "Origine" dans la recherche. Cochez "Made in Africa". Cela vous permet non seulement de soutenir l'industrie locale, mais aussi de bénéficier souvent de droits de douane réduits ou nuls grâce aux accords de la ZLECAf.`,
            },
            {
                q: 'Q : Je ne connais pas le nom du produit, mais j\'ai une photo. Que faire ?',
                a: `R : Utilisez notre fonction de Recherche Visuelle (Visual Search). Sur l'application mobile ou le site, cliquez sur l'icône "Appareil Photo" dans la barre de recherche et téléchargez l'image. Notre IA scannera les Pavillons Digitaux pour trouver le produit correspondant.`,
            },
        ],
    },
    {
        id: 'fiabilite',
        title: "2. FIABILITÉ DES VENDEURS & NÉGOCIATION",
        icon: ShieldCheck,
        items: [
            {
                q: 'Q : Comment reconnaître un fournisseur fiable sur Galiléecommerce ?',
                a: `R : Ne vous fiez pas au hasard. Cherchez le badge "Fournisseur Certifié" (Verified Supplier). Cela signifie que Galiléecommerce a audité l'entreprise (existence légale, capacité de production). Vérifiez aussi s'ils affichent des certifications (ISO, Normes) validées par notre Centre de Ressources Normatives.`,
            },
            {
                q: 'Q : Puis-je négocier les prix affichés ?',
                a: `R :\n• Pour les achats unitaires (B2C), le prix est généralement fixe.\n• Pour les achats de gros (B2B), OUI. Utilisez le bouton "Demander une Cotation" (RFQ) pour envoyer vos spécifications et quantités. C'est la norme pour obtenir le meilleur tarif.`,
            },
            {
                q: 'Q : Dois-je commander un échantillon avant de faire une grosse commande ?',
                a: `R : C'est notre recommandation n°1. "N'achetez jamais en gros sans avoir vu un échantillon."\nMême si cela coûte un peu plus cher en frais de port, demandez toujours l'envoi d'une unité pour valider la qualité, la finition et l'emballage avant de lancer la production de masse.`,
            },
        ],
    },
    {
        id: 'paiement',
        title: '3. PAIEMENT SÉCURISÉ & CONFIANCE',
        icon: DollarSign,
        items: [
            {
                q: 'Q : Le fournisseur me demande de le payer sur WhatsApp ou par virement direct pour "éviter les frais". Que faire ?',
                a: `R : REFUSEZ IMMÉDIATEMENT. C'est un piège classique.\nSi vous payez hors de la plateforme, vous perdez la protection de Galiléecommerce (Séquestre). En cas de non-livraison, nous ne pourrons rien faire. Signalez ce vendeur à notre Support Client.`,
            },
            {
                q: 'Q : Comment fonctionne la protection "Séquestre" ?',
                a: `R : Lorsque vous payez sur le site, l'argent ne va pas directement au vendeur. Il est bloqué sur un compte sécurisé géré par Galiléecommerce. Nous ne libérons l'argent au vendeur que lorsque vous confirmez avoir reçu la marchandise conforme. C'est votre assurance "Satisfait ou Remboursé".`,
            },
        ],
    },
    {
        id: 'logistique',
        title: '4. LOGISTIQUE, DOUANE & ZONES ENCLAVÉES',
        icon: Truck,
        items: [
            {
                q: 'Q : Je ne comprends pas les termes "Incoterms" (EXW, FOB, DDP). Lequel choisir ?',
                a: `R : C'est crucial pour savoir qui paie le transport :\n• EXW (Ex Works) : Vous gérez tout depuis l'entrepôt du vendeur. (Complexe).\n• FOB (Free on Board) : Le vendeur livre au port, vous gérez le bateau et l'arrivée. (Standard B2B).\n• DDP (Delivered Duty Paid) : La solution "Clé en main". Le vendeur (ou le Corridor Digital Galilée) gère tout jusqu'à votre porte, douane incluse. Nous recommandons le DDP pour les débutants.`,
            },
            {
                q: 'Q : Je vis dans une zone difficile d\'accès. Livrez-vous là-bas ?',
                a: `R : Oui, grâce à notre Centre de Ressources du Dernier Kilomètre.\nContrairement aux logisticiens classiques qui s'arrêtent aux grandes villes, nous utilisons des solutions multimodales (train, camionnette, pirogue, drone) pour atteindre les zones enclavées. Assurez-vous de fournir un point GPS précis lors de la commande.`,
            },
            {
                q: 'Q : Comment savoir si je vais payer de la douane ?',
                a: `R :\n• Si vous achetez dans le même pays : Généralement non.\n• Si vous importez : Oui, sauf si vous utilisez un Corridor Digital en mode DDP (tout inclus) ou si le produit bénéficie des exonérations ZLECAf (Made in Africa). Le montant estimé s'affiche souvent lors du choix de la logistique.`,
            },
        ],
    },
    {
        id: 'sav',
        title: "5. SAV & INSPECTION",
        icon: CheckCircle,
        items: [
            {
                q: 'Q : J\'achète une machine industrielle coûteuse. Comment être sûr qu\'elle marche avant qu\'elle ne quitte l\'usine ?',
                a: `R : Ne prenez pas de risque. Lors de la commande, cochez l'option "Inspection Normative".\nGaliléecommerce enverra un inspecteur certifié à l'usine pour tester la machine et vous envoyer un rapport vidéo/technique. Si le rapport est mauvais, nous annulons la vente et vous remboursons avant même l'expédition.`,
            },
            {
                q: 'Q : Le produit reçu est cassé. Combien de temps ai-je pour réclamer ?',
                a: `R : Agissez vite !\n• Alimentaire/Périssable : 6 heures max (avec photos).\n• Autres produits : 7 jours (défaut apparent) à 15 jours (électronique).\nOuvrez un litige dans votre espace "Mes Commandes" pour bloquer le paiement au vendeur.`,
            },
        ],
    },
];

export default function FaqGalilee() {
    const [openId, setOpenId] = useState(null);
    const [query, setQuery] = useState('');

    const toggle = (id) => setOpenId(openId === id ? null : id);

    const filtered = sections.map((sec) => ({
        ...sec,
        items: sec.items.filter(
            (it) =>
                it.q.toLowerCase().includes(query.toLowerCase()) ||
                it.a.toLowerCase().includes(query.toLowerCase())
        ),
    })).filter((sec) => sec.items.length > 0);

    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 p-6 sm:p-12">
            <div className="max-w-6xl mx-auto">
                <header className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-white/60 backdrop-blur rounded-2xl shadow-md">
                            <BookOpen className="w-7 h-7 text-gray-700" />
                        </div>
                        <div>
                            <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">FAQ — Centres d'aide Galileecommerce.com</h1>
                            <p className="text-sm text-gray-500">Version : 3.0 (Intégration Guide Sourcing)</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <input
                                aria-label="Rechercher dans la FAQ"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                className="pl-10 pr-4 py-2 rounded-lg bg-white shadow-sm border border-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-300 w-full md:w-72"
                                placeholder="Rechercher une question..."
                            />
                            <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
                        </div>
                    </div>
                </header>

                <main className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <aside className="hidden lg:block">
                        <div className="sticky top-6 space-y-4">
                            {sections.map((s) => (
                                <button
                                    key={s.id}
                                    onClick={() => document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth' })}
                                    className="flex items-center gap-3 w-full text-left p-3 rounded-xl hover:bg-white/60 transition">
                                    <s.icon className="w-5 h-5 text-gray-600" />
                                    <span className="text-sm font-medium">{s.title}</span>
                                </button>
                            ))}
                        </div>
                    </aside>

                    <section className="md:col-span-2 space-y-8">
                        {filtered.map((sec) => (
                            <div id={sec.id} key={sec.id} className="bg-white/60 backdrop-blur-md rounded-2xl p-6 shadow">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <sec.icon className="w-6 h-6 text-gray-700" />
                                        <h2 className="text-lg font-semibold">{sec.title}</h2>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    {sec.items.map((it, idx) => {
                                        const id = `${sec.id}-${idx}`;
                                        const isOpen = openId === id;
                                        return (
                                            <div key={id} className="border border-gray-100 rounded-xl overflow-hidden">
                                                <button
                                                    onClick={() => toggle(id)}
                                                    className="w-full flex items-start justify-between p-4 bg-white hover:bg-gray-50 transition">
                                                    <div className="text-left">
                                                        <div className="text-sm font-medium text-gray-800">{it.q}</div>
                                                    </div>
                                                    <div className="ml-4 flex items-center">
                                                        <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
                                                            <ChevronDown className="w-5 h-5 text-gray-500" />
                                                        </motion.div>
                                                    </div>
                                                </button>

                                                <AnimatePresence initial={false}>
                                                    {isOpen && (
                                                        <motion.div
                                                            initial={{ height: 0, opacity: 0 }}
                                                            animate={{ height: 'auto', opacity: 1 }}
                                                            exit={{ height: 0, opacity: 0 }}
                                                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                                            className="px-4 pb-4 text-sm text-gray-700 bg-white/50"
                                                        >
                                                            {it.a.split('\n').map((line, i) => (
                                                                <p key={i} className="py-1 leading-relaxed">{line}</p>
                                                            ))}
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}

                        <footer className="text-xs text-gray-500 italic">Pour toute question supplémentaire, contactez notre Support Client via le Centre d'Aide.</footer>
                    </section>
                </main>
            </div>
        </div>
    );
}



