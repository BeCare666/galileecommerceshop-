"use client";
import { useState } from "react";

export default function GalileeFAQ() {
    const [language, setLanguage] = useState("fr");
    const [openIndex, setOpenIndex] = useState(null);

    const switchLanguage = () => {
        setLanguage(language === "fr" ? "en" : "fr");
    };

    const infoMoment = {
        fr: [
            "Où trouver les statistiques sur la ZLECAf ?",
            "Comment s’inscrire comme fournisseur sur Galileecommerce.com ?"
        ],
        en: [
            "Where can I find AfCFTA statistics?",
            "How do I register as a supplier on Galileecommerce.com?"
        ]
    };

    const categories = {
        fr: [
            {
                title: "Mon compte",
                description: "Création et gestion du compte fournisseur ou acheteur..."
            },
            {
                title: "Mes commandes",
                description: "Achat, vente, livraison, suivi des commandes..."
            },
            {
                title: "Paiement & Services financiers",
                description: "Solutions financières innovantes, paiement sécurisé..."
            },
            {
                title: "Chaîne logistique & Livraison",
                description: "Stations de livraison, optimisation du dernier kilomètre..."
            },
            {
                title: "Centrale d’achat & Produits",
                description: "Accès à des millions de références et sourcing fournisseurs..."
            },
            {
                title: "Plus d’opportunités",
                description: "ZLECAf, exportations, accès au marché africain..."
            }
        ],
        en: [
            {
                title: "My Account",
                description: "Create and manage your supplier or buyer account..."
            },
            {
                title: "My Orders",
                description: "Purchase, sales, delivery, and order tracking..."
            },
            {
                title: "Payments & Financial Services",
                description: "Innovative financial solutions, secure payment..."
            },
            {
                title: "Logistics & Delivery",
                description: "Dynamic delivery stations, last-mile optimization..."
            },
            {
                title: "Purchasing Hub & Products",
                description: "Access millions of references and supplier sourcing..."
            },
            {
                title: "More Opportunities",
                description: "AfCFTA, exports, access to the African market..."
            }
        ]
    };

    const faqs = {
        fr: [
            {
                question: "Comment fonctionne la plateforme Galileecommerce.com ?",
                answer:
                    "Galileecommerce.com est une marketplace qui connecte les fournisseurs et acheteurs à travers l'Afrique et le monde. Elle facilite la logistique, la centralisation des achats et l'accès à des services financiers innovants."
            },
            {
                question: "Quels sont les avantages pour les fournisseurs ?",
                answer:
                    "Les fournisseurs bénéficient d'une visibilité internationale, d'une gestion autonome des comptes et d'un accès direct à la ZLECAf avec des solutions logistiques et financières intégrées."
            },
            {
                question: "Comment accéder à la centrale d’achat ?",
                answer:
                    "En créant un compte sur Galileecommerce.com, vous pouvez accéder progressivement à la centrale d'achat qui regroupe des millions de références."
            },
            {
                question: "Comment Galileecommerce optimise la livraison du dernier kilomètre ?",
                answer:
                    "La plateforme déploie des stations de livraison dynamiques directement chez les fournisseurs et relie la logistique aux points relais territoriaux pour réduire les coûts et délais."
            },
            {
                question: "Quels services financiers sont disponibles pour les entreprises ?",
                answer:
                    "Galileecommerce propose des solutions de financement, de paiement sécurisé et des partenariats bancaires pour faciliter les transactions transfrontalières."
            }
        ],
        en: [
            {
                question: "How does Galileecommerce.com work?",
                answer:
                    "Galileecommerce.com is a marketplace that connects suppliers and buyers across Africa and the world. It facilitates logistics, centralized purchasing, and access to innovative financial services."
            },
            {
                question: "What are the benefits for suppliers?",
                answer:
                    "Suppliers gain international visibility, autonomous account management, and direct access to AfCFTA markets with integrated logistics and financial solutions."
            },
            {
                question: "How can I access the purchasing center?",
                answer:
                    "By creating an account on Galileecommerce.com, you can progressively access the purchasing hub with millions of product references."
            },
            {
                question: "How does Galileecommerce optimize last-mile delivery?",
                answer:
                    "The platform deploys dynamic delivery stations directly at suppliers' sites and connects logistics to local relay points to reduce costs and delays."
            },
            {
                question: "What financial services are available for businesses?",
                answer:
                    "Galileecommerce offers financing solutions, secure payments, and banking partnerships to facilitate cross-border transactions."
            }
        ]
    };

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="bg-gray-100 min-h-screen p-6">
            {/* Language Switch */}
            <div className="flex justify-end mb-6">
                <button
                    onClick={switchLanguage}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    {language === "fr" ? "English" : "Français"}
                </button>
            </div>

            {/* Informations du moment */}
            <section className="bg-white p-6 rounded-lg shadow mb-6">
                <h2 className="text-xl font-semibold mb-4">
                    {language === "fr" ? "Informations du moment" : "Latest Information"}
                </h2>
                <ul className="divide-y divide-gray-200">
                    {infoMoment[language].map((item, index) => (
                        <li key={index} className="py-3 cursor-pointer hover:text-blue-600">
                            {item}
                        </li>
                    ))}
                </ul>
            </section>

            {/* Categories */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {categories[language].map((cat, index) => (
                    <div
                        key={index}
                        className="bg-white p-6 rounded-lg shadow hover:shadow-md cursor-pointer"
                    >
                        <h3 className="text-lg font-semibold mb-2">{cat.title}</h3>
                        <p className="text-gray-600">{cat.description}</p>
                    </div>
                ))}
            </section>

            {/* FAQ */}
            <section className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-4">
                    {language === "fr" ? "Questions fréquentes" : "Frequently Asked Questions"}
                </h2>
                <ul className="divide-y divide-gray-200">
                    {faqs[language].map((faq, index) => (
                        <li key={index} className="py-3">
                            <button
                                onClick={() => toggleFAQ(index)}
                                className="w-full text-left font-semibold hover:text-blue-600 flex justify-between items-center"
                            >
                                {faq.question}
                                <span>{openIndex === index ? "−" : "+"}</span>
                            </button>
                            {openIndex === index && (
                                <p className="mt-2 text-gray-600">{faq.answer}</p>
                            )}
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    );
}
