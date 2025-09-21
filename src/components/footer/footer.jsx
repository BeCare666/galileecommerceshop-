// components/Footer.tsx
import Link from "next/link";
import routes from '@/config/routes';
/** --- Logos de paiement (SVG inline, sans dépendances) --- */
function VisaLogo() {
    return (
        <svg viewBox="0 0 48 32" className="h-7 w-12" aria-label="Visa">
            <rect width="48" height="32" rx="6" fill="#1434CB" />
            <text
                x="50%"
                y="52%"
                textAnchor="middle"
                dominantBaseline="middle"
                fontFamily="Arial, Helvetica, sans-serif"
                fontWeight="800"
                fontSize="14"
                fill="#fff"
            >
                VISA
            </text>
        </svg>
    );
}

function MastercardLogo() {
    return (
        <svg viewBox="0 0 48 32" className="h-7 w-12" aria-label="Mastercard">
            <rect width="48" height="32" rx="6" fill="#fff" stroke="#e5e7eb" />
            <circle cx="20" cy="16" r="8" fill="#EB001B" />
            <circle cx="28" cy="16" r="8" fill="#F79E1B" />
        </svg>
    );
}

function AmexLogo() {
    return (
        <svg viewBox="0 0 48 32" className="h-7 w-12" aria-label="American Express">
            <rect width="48" height="32" rx="6" fill="#2E77BC" />
            <text
                x="50%"
                y="52%"
                textAnchor="middle"
                dominantBaseline="middle"
                fontFamily="Arial, Helvetica, sans-serif"
                fontWeight="800"
                fontSize="10"
                fill="#fff"
            >
                AMEX
            </text>
        </svg>
    );
}

function DiscoverLogo() {
    return (
        <svg viewBox="0 0 48 32" className="h-7 w-12" aria-label="Discover">
            <rect width="48" height="32" rx="6" fill="#fff" stroke="#e5e7eb" />
            <path d="M32 8c0 8-8 8-8 16h16c0-8-8-8-8-16z" fill="#ff7a00" />
            <text
                x="13"
                y="19"
                fontFamily="Arial, Helvetica, sans-serif"
                fontWeight="800"
                fontSize="8"
                fill="#111827"
            >
                DISCOVER
            </text>
        </svg>
    );
}

function PayPalLogo() {
    return (
        <svg viewBox="0 0 48 32" className="h-7 w-12" aria-label="PayPal">
            <rect width="48" height="32" rx="6" fill="#fff" stroke="#e5e7eb" />
            <path d="M16 22h7.5c4 0 6.5-2.2 6.5-5.4 0-3.1-2.5-4.6-6.3-4.6H19l-.8 4.6h4.6c1.2 0 2 .5 2 1.4 0 1.2-1.2 2-2.8 2H18l-2 2z" fill="#003087" />
            <path d="M18 22l2-12h6.1c3.7 0 6.3 1.5 6.3 4.6 0 .4 0 .8-.1 1.1 0 0-1.9-2.1-5.2-2.1H22.5l-.7 4.1h4.6c1.6 0 2.7.7 2.7 1.9 0 .5-.1 1-.3 1.4H18z" fill="#009cde" opacity="0.9" />
        </svg>
    );
}

export default function Footer() {
    return (
        <footer className="bg-white border-t mt-10 text-gray-800">
            {/* Grille supérieure */}
            <div className="hidden max-w-7xl mx-auto px-6 lg:px-12 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-12">
                {/* Contact */}
                <div>
                    <h3 className="text-xl font-semibold mb-5">Contactez-nous</h3>

                    <div className="mt-4 space-y-3 text-sm text-gray-600">
                        <div className="flex items-start gap-3">
                            <svg className="w-5 h-5 text-gray-400 mt-0.5" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2a7 7 0 00-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 00-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z" />
                            </svg>
                            <p>
                                8500 Rue Lorem Douala, IL <br />
                                55030 <br /> Dolor sit amet
                            </p>
                        </div>

                        <div className="flex items-center gap-3">
                            <svg className="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M6.6 10.8a15.5 15.5 0 006.6 6.6l2.2-2.2a1.5 1.5 0 011.5-.36c1.64.55 3.42.86 5.1.92a1.5 1.5 0 011.4 1.5V21a1.5 1.5 0 01-1.6 1.5A19 19 0 013 4.6 1.5 1.5 0 014.5 3H6.7a1.5 1.5 0 011.5 1.4c.06 1.68.37 3.46.92 5.1.2.5.08 1.1-.36 1.5L6.6 10.8z" />
                            </svg>
                            <p>+237 XXX XXX XXX</p>
                        </div>

                        <div className="flex items-center gap-3">
                            <svg className="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M4 5h16a2 2 0 012 2v.3l-10 6.2L2 7.3V7a2 2 0 012-2zm0 5.2l9.4 5.8a1 1 0 001.2 0L24 10.2V17a2 2 0 01-2 2H4a2 2 0 01-2-2v-6.8z" />
                            </svg>
                            <p>contact@galileecommerce.com</p>
                        </div>
                    </div>

                    {/* Réseaux sociaux */}
                    <div className="flex gap-3 mt-5">
                        {["facebook", "instagram", "x", "tiktok"].map((icon) => (
                            <button
                                key={icon}
                                className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 text-gray-700 hover:text-white hover:bg-black transition"
                                aria-label={icon}
                            >
                                {icon === "facebook" && (
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M22 12c0-5.5-4.5-10-10-10S2 6.5 2 12c0 5 3.7 9.1 8.4 9.9v-7h-2.6v-2.9h2.6V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6v1.9h2.8l-.4 2.9h-2.4v7C18.3 21.1 22 17 22 12z" />
                                    </svg>
                                )}
                                {icon === "instagram" && (
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M7.8 2A5.8 5.8 0 002 7.8v8.4A5.8 5.8 0 007.8 22h8.4A5.8 5.8 0 0022 16.2V7.8A5.8 5.8 0 0016.2 2H7.8zM12 7a5 5 0 110 10 5 5 0 010-10zm6.5-1.3a1.3 1.3 0 110 2.6 1.3 1.3 0 010-2.6zM12 9a3 3 0 100 6 3 3 0 000-6z" />
                                    </svg>
                                )}
                                {icon === "x" && (
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M4 3l7.5 9.3L4.7 21H7l6.1-6.9L18.7 21H22l-7.8-9.2L21 3h-2.3l-5.3 6L8.7 3H4z" />
                                    </svg>
                                )}
                                {icon === "tiktok" && (
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M14 2h2a5.9 5.9 0 003 4.5A7 7 0 0119 6v3a8.9 8.9 0 01-5-1.6V16a5 5 0 11-5-5 5.2 5.2 0 01.8.06V9.1A7 7 0 004 9a7 7 0 107 7V4a12 12 0 003 1V2z" />
                                    </svg>
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Shopping */}
                <div>
                    <h3 className="text-xl font-semibold mb-5">Achats</h3>
                    <ul className="space-y-3 text-sm text-gray-600">
                        {["Livraison", "Acheter par marque", "Suivi de commande", "Conditions générales", "Guide des tailles", "Ma liste de souhaits"].map(
                            (item) => (
                                <li key={item}>
                                    <Link href="#" className="hover:text-gray-900">
                                        {item}
                                    </Link>
                                </li>
                            )
                        )}
                    </ul>
                </div>

                {/* Information */}
                <div>
                    <h3 className="text-xl font-semibold mb-5">Informations</h3>
                    <ul className="space-y-3 text-sm text-gray-600">
                        {["À propos", "Conditions & Politique", "Centre d'aide", "Actualités & Blog", "Remboursements", "Carrières"].map(
                            (item) => (
                                <li key={item}>
                                    <Link href="#" className="hover:text-gray-900">
                                        {item}
                                    </Link>
                                </li>
                            )
                        )}
                    </ul>
                </div>

                {/* Newsletter */}
                <div>
                    <h3 className="text-xl font-semibold mb-5">Restons en contact</h3>
                    <p className="text-sm text-gray-600 mb-4">
                        Entrez votre email ci-dessous pour être le premier informé des nouvelles collections et lancements de produits.
                    </p>

                    <form className="mb-3 w-full">
                        <div className="flex w-full">
                            <input
                                type="email"
                                placeholder="Entrez votre email"
                                className="w-full px-5 py-3 rounded-l-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
                            />
                            <button
                                type="submit"
                                className="px-6 py-3 bg-black text-white font-medium rounded-r-full hover:bg-gray-800 flex items-center gap-2"
                            >
                                S'abonner
                                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-white text-black">
                                    →
                                </span>
                            </button>
                        </div>

                        <label className="mt-3 flex items-start gap-3 text-xs text-gray-500">
                            <input type="checkbox" className="mt-0.5 rounded border-gray-300" />
                            <span>
                                En cliquant sur s'abonner, vous acceptez les{" "}
                                <Link href="#" className="underline">
                                    Conditions d'utilisation
                                </Link>{" "}
                                et la{" "}
                                <Link href="#" className="underline">
                                    Politique de confidentialité
                                </Link>
                                .
                            </span>
                        </label>
                    </form>
                </div>
            </div>

            {/* Barre inférieure */}
            <div className="border-t py-4 text-sm text-gray-600">
                <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <Link href="#" className="hover:text-gray-900">
                            Aide & FAQ
                        </Link>
                        <span className="text-gray-300">|</span>
                        <Link href="#" className="hover:text-gray-900">
                            Usine
                        </Link>
                    </div>

                    <div className="flex items-center gap-3">
                        <span className="text-gray-700">Paiement :</span>
                        <div className="flex items-center gap-2">
                            <div className="rounded-md overflow-hidden shadow-sm ring-1 ring-gray-200 bg-white">
                                <VisaLogo />
                            </div>
                            <div className="rounded-md overflow-hidden shadow-sm ring-1 ring-gray-200 bg-white">
                                <MastercardLogo />
                            </div>
                            <div className="rounded-md overflow-hidden shadow-sm ring-1 ring-gray-200 bg-white">
                                <AmexLogo />
                            </div>
                            <div className="rounded-md overflow-hidden shadow-sm ring-1 ring-gray-200 bg-white">
                                <DiscoverLogo />
                            </div>
                            <div className="rounded-md overflow-hidden shadow-sm ring-1 ring-gray-200 bg-white">
                                <PayPalLogo />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
