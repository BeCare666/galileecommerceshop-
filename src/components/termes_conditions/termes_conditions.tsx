"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import {
    BookOpen,
    DownloadCloud,
    ChevronRight,
    ChevronDown,
    ShieldCheck,
    Truck,
    Cpu,
    Box,
    Coffee,
    BriefcaseBusiness,
    AlertTriangle,
    Menu,
    X,
} from "lucide-react";

/**
 * ConditionsGeneralesPremium.tsx
 * - Ultra moderne / premium / épuré
 * - Responsive: sidebar fixe desktop, collapsible mobile
 * - TOC avec ancres & scroll-spy
 * - Texte complet inclus et formaté en sections
 * - Téléchargement (placeholder .txt) et impression
 *
 * Copie-colle tel quel ; nécessite Tailwind + framer-motion + lucide-react.
 */

const sections = [
    {
        id: "intro",
        title: "Introduction & Définitions",
        content: `PLATEFORME : GALILÉECOMMERCE.COM
Éditeur : Galiléecommerce (Filiale du Groupe Galilé)
Version : 2.0 (Intégration Multi-Catégories)
Juridiction : OHADA / Cameroun / ZLECAf

La plateforme Galiléecommerce.com est une infrastructure souveraine de commerce digital visant à faciliter les échanges B2B, B2C, C2B et C2C au sein de la Zone de Libre-échange Continentale Africaine (ZLECAf) et vers le monde.
• La Plateforme : Désigne le site web, les applications et les infrastructures logistiques associées.
• Pavillon Digital (Vendeur) : Espace de vente vérifié (Business Space) alloué à une entreprise.
• Corridor Digital : Solution logistique et douanière intégrée proposée par la Plateforme.
• Centres de Ressources : Divisions d'assistance technique de Galiléecommerce (Normatif, Pavillons, Corridors, Support Client, Dernier Kilomètre).`,
    },
    {
        id: "role",
        title: "Rôle de la plateforme",
        content: `Galiléecommerce agit en tant que tiers de confiance et facilitateur technique. Sauf pour les produits vendus en propre ("Vendu par Galilée"), la plateforme n'est pas propriétaire des stocks. Elle assure cependant la sécurisation financière (Séquestre) et la surveillance normative.`,
    },
    {
        id: "acces-securite",
        title: "Accès & Sécurité",
        content: `3.1. Vérification des Vendeurs : Tout "Pavillon Digital" fait l'objet d'une vérification d'identité (KYC/KYB) pour garantir la fiabilité des transactions.
3.2. Paiements Sécurisés : Les fonds versés par l'Acheteur sont cantonnés (bloqués) sur un compte séquestre. Ils ne sont libérés au Vendeur qu'après confirmation de l'expédition ou de la conformité, selon la catégorie de produit.`,
    },
    {
        id: "logistique",
        title: "Logistique & Dernier Kilomètre",
        content: `4.1. Choix du Transport : L'utilisateur peut choisir les "Corridors Digitaux" de Galiléecommerce ou un logisticien tiers.
4.2. Zones Enclavées : Pour les livraisons complexes gérées par le Centre de Ressources du Dernier Kilomètre (Drones, Fret multimodal), les délais sont fournis à titre indicatif et dépendent des contraintes d'infrastructure locales.`,
    },
    {
        id: "responsabilite",
        title: "Responsabilité & Droit applicable",
        content: `5.1. Force Majeure : Les parties ne sont pas responsables en cas de force majeure (catastrophes naturelles, pannes internet continentales, troubles politiques majeurs).
5.2. Litiges : Tout différend doit d'abord être soumis au Centre de Ressources Support Client pour médiation. À défaut, les tribunaux de Douala (Cameroun) sont compétents, ou l'arbitrage selon les règles OHADA.`,
    },
    {
        id: "annexes",
        title: "Annexe — Politiques spécifiques par catégorie",
        content: `Les règles spécifiques suivant la catégorie de produit priment sur les conditions générales. Les chapitres A à E détaillent les règles applicables.`,
    },
    {
        id: "chap-a",
        title: "Chapitre A — Équipements industriels, énergie, véhicules",
        content: `Concerne : Centrales électriques, Batteries Industrielles, Bus, Camions, Engins BTP, Usines, Constructions Prédécoupées.

1. Processus de Vente : Demande de Cotation (RFQ) et validation de Facture Proforma.
2. Inspection Normative : Pré-shipment Inspection recommandée via le Centre de Ressources Normatives.
3. Ni Repris Ni Échangé : Expédiés → non retournables (sauf vice caché majeur).
4. Homologation : L'Acheteur est responsable de l'homologation dans son pays de destination.`,
    },
    {
        id: "chap-b",
        title: "Chapitre B — High-tech & Électronique",
        content: `Concerne : Téléphones, Informatique, Drones, TV, Accessoires.

1. Panne au Déballage (DOA) : Signalement sous 72 heures → remplacement à neuf.
2. Garantie Commerciale : 12 mois (gros équipements) / 6 mois (accessoires), hors casse physique et oxydation.
3. Exclusions : Problèmes logiciels non couverts par garantie matérielle.`,
    },
    {
        id: "chap-c",
        title: "Chapitre C — Grande consommation (mode, beauté, maison)",
        content: `Concerne : Vêtements, Cosmétiques, Mobilier, Jouets.

1. Droit de Rétractation : 7 à 14 jours pour produit non utilisé.
2. Clause Hygiène (Non-Retour) : Cosmétiques, Parfums, Lingerie, Boucles d'oreilles, Produits intimes — non repris s'ils sont descellés.
3. Mobilier : Retour possible mais frais de logistique à la charge du client en cas de changement d'avis.`,
    },
    {
        id: "chap-d",
        title: "Chapitre D — Agroalimentaire & Périssables",
        content: `Concerne : Fruits, Légumes, Viandes, Poissons, Produits laitiers.

1. Pas de Droit de Rétractation : Vente ferme dès commande.
2. Chaîne du Froid : Utilisation des logisticiens certifiés "Froid" obligatoire.
3. Réclamation Immédiate : Avarie → signaler (photos) dans les 6 heures suivant la livraison.`,
    },
    {
        id: "chap-e",
        title: "Chapitre E — Commerce des services",
        content: `Concerne : Études, Audit, Cloud, Tourisme, Prestations intellectuelles.

1. Obligation de Moyens : Le prestataire fournit ses meilleurs efforts.
2. Validation (Recette) : 5 jours pour valider les livrables. Sans réponse = accepté.`,
    },
    {
        id: "securite",
        title: "Partie 3 — Politique de sécurité (Prohibited Items)",
        content: `Il est strictement interdit de vendre sur Galiléecommerce :
1. Drogues, stupéfiants et précurseurs illégaux.
2. Armes à feu, munitions et explosifs non régulés.
3. Contrefaçons et copies non autorisées de marques.
4. Espèces protégées (Faune/Flore) et produits dérivés (Ivoire, etc.).
5. Documents gouvernementaux falsifiés ou devises.
6. Matériel de piratage informatique ou brouilleurs.

Tout contrevenant verra son Pavillon fermé immédiatement.`,
    },
];

export default function ConditionsGeneralesPremium() {
    const [mobileNavOpen, setMobileNavOpen] = useState(false);
    const [activeId, setActiveId] = useState<string>(sections[0].id);
    const contentRef = useRef<HTMLDivElement | null>(null);

    // Create a single string for download
    const fullText = sections.map((s) => `${s.title}\n\n${s.content}`).join("\n\n---\n\n");

    // Scroll spy: observe headings
    useEffect(() => {
        const observerOptions = { root: null, rootMargin: "0px 0px -40% 0px", threshold: 0 };
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveId(entry.target.id);
                }
            });
        }, observerOptions);

        const nodes = contentRef.current?.querySelectorAll("[data-section-id]") || [];
        nodes.forEach((n) => observer.observe(n));

        return () => observer.disconnect();
    }, []);

    function scrollTo(id: string) {
        const el = document.getElementById(id);
        if (!el) return;

        // Ferme le menu mobile si ouvert
        setMobileNavOpen(false);

        const y = el.getBoundingClientRect().top + window.scrollY - 80; // HEADER OFFSET

        window.scrollTo({
            top: y,
            behavior: "smooth",
        });
    }

    function handleDownload() {
        const blob = new Blob([fullText], { type: "text/plain;charset=utf-8" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `Conditions_Generales_Galileecommerce_${new Date().getFullYear()}.txt`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50 text-gray-900">
            {/* Header */}
            <header className="hidden sticky top-0 z-50 bg-white/60 backdrop-blur-md border-b border-gray-100">
                <div className="max-w-6xl mx-auto px-5 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="p-2 rounded-lg bg-gradient-to-tr from-indigo-700 to-sky-500 text-white shadow">
                            <BookOpen className="w-6 h-6" />
                        </div>
                        <div>
                            <div className="text-xs text-gray-500">GALILÉECOMMERCE.COM</div>
                            <div className="font-semibold text-lg">Conditions Générales — V2.0</div>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <button
                            onClick={handleDownload}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-black text-white text-sm font-medium shadow hover:opacity-95 transition"
                        >
                            <DownloadCloud className="w-4 h-4" />
                            Télécharger
                        </button>

                        <button
                            onClick={() => window.print()}
                            className="px-3 py-2 rounded-lg border border-gray-200 text-sm text-gray-700 hover:bg-gray-50"
                        >
                            Imprimer
                        </button>

                        {/* Mobile menu toggle */}
                        <button
                            className="lg:hidden p-2 rounded-md border border-gray-100 bg-white ml-2"
                            onClick={() => setMobileNavOpen((s) => !s)}
                            aria-label="Ouvrir la navigation"
                        >
                            {mobileNavOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </button>
                    </div>
                </div>
            </header>

            {/* Main */}
            <main className="max-w-6xl mx-auto lg:px-5 lg:py-10 grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Sidebar / TOC */}
                <aside className={`lg:col-span-1 ${mobileNavOpen ? "block" : "hidden"} lg:block`}>
                    <nav className="sticky top-24 bg-white lg:rounded-2xl shadow-lg p-4 border border-gray-100">
                        <div className="flex items-center justify-between mb-3">
                            <h4 className="text-xs uppercase text-gray-500 tracking-wide">Sommaire</h4>
                            <span className="text-xs text-gray-400">v2.0</span>
                        </div>

                        <ul className="space-y-1 hidden lg:block">
                            {sections.map((s) => (
                                <li key={s.id}>
                                    <button
                                        onClick={() => scrollTo(s.id)}
                                        className={`w-full text-left flex items-center gap-3 p-2 rounded-lg transition ${activeId === s.id
                                            ? "bg-gradient-to-r from-indigo-50 to-sky-50 ring-1 ring-indigo-100"
                                            : "hover:bg-gray-50"
                                            }`}
                                    >
                                        <span className="text-sm font-medium text-gray-700">{s.title}</span>
                                        <ChevronRight
                                            className={`ml-auto w-4 h-4 text-gray-400 transition-transform ${activeId === s.id ? "rotate-90" : ""
                                                }`}
                                        />
                                    </button>
                                </li>
                            ))}
                        </ul>

                        <div className="mt-4 pt-3 border-t border-gray-100">
                            <h5 className="text-xs uppercase text-gray-500 mb-2">Catégories</h5>
                            <div className="grid grid-cols-2 gap-2">
                                <button className="flex items-center gap-2 text-xs px-2 py-1 rounded-lg bg-gray-50">
                                    <ShieldCheck className="w-4 h-4" />
                                    Sécurité
                                </button>
                                <button className="flex items-center gap-2 text-xs px-2 py-1 rounded-lg bg-gray-50">
                                    <Truck className="w-4 h-4" />
                                    Logistique
                                </button>
                                <button className="flex items-center gap-2 text-xs px-2 py-1 rounded-lg bg-gray-50">
                                    <Cpu className="w-4 h-4" />
                                    High-Tech
                                </button>
                                <button className="flex items-center gap-2 text-xs px-2 py-1 rounded-lg bg-gray-50">
                                    <Box className="w-4 h-4" />
                                    Consommation
                                </button>
                            </div>
                        </div>
                    </nav>
                </aside>

                {/* Article */}
                <article className="lg:col-span-3">
                    <motion.section
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.45 }}
                        className="bg-white shadow-xl rounded-3xl p-8 border border-gray-100"
                    >
                        <header className="flex items-start justify-between gap-6">
                            <div>
                                <h1 className="text-3xl font-bold tracking-tight">CONDITIONS GÉNÉRALES ET RÈGLES D'UTILISATION</h1>
                                <p className="hidden text-sm text-gray-500 mt-1">Document original — intégral — présentation premium</p>
                            </div>
                            <div className="text-xs text-gray-400">OHADA • Cameroun • ZLECAf</div>
                        </header>

                        <div ref={contentRef} className="mt-8 prose max-w-none text-gray-800">
                            {sections.map((s) => (
                                <section
                                    key={s.id}
                                    id={s.id}
                                    data-section-id={s.id}
                                    className="mb-8 scroll-mt-28"
                                >
                                    <h2 className="text-xl font-semibold mb-3">{s.title}</h2>
                                    {/* render paragraphs */}
                                    {s.content.split("\n\n").map((para, i) => (
                                        <p key={i} className="text-sm leading-relaxed text-gray-700 whitespace-pre-wrap">
                                            {para}
                                        </p>
                                    ))}
                                </section>
                            ))}

                            <div className="mt-6 text-xs text-gray-500 flex justify-between border-t pt-4">
                                <div>Galiléecommerce • Version 2.0</div>
                                <div>© {new Date().getFullYear()} Galiléecommerce</div>
                            </div>
                        </div>
                    </motion.section>
                </article>
            </main>

            {/* subtle scrollbar styling */}
            <style jsx global>{`
        html, body {
          scroll-behavior: smooth;
        }
        ::-webkit-scrollbar { width: 9px; height: 9px; }
        ::-webkit-scrollbar-thumb { background: rgba(15, 23, 42, 0.07); border-radius: 999px; }
      `}</style>
        </div>
    );
}

