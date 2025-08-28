import React from "react";

export default function FeaturesRow() {
    return (
        <section className="w-full bg-gradient-to-b from-white via-[#f8fafc] to-white py-12 px-4">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
                {/* Feature 1 */}
                <div className="flex flex-col md:flex-row items-center bg-white hover:shadow-1xl transition-shadow duration-300 p-6 group">
                    {/* Icon */}
                    <span className="mb-4 md:mb-0 md:mr-6 flex-shrink-0 bg-gradient-to-tr from-pink-400 to-orange-300 p-4 rounded-full shadow group-hover:scale-110 transition-transform duration-300">
                        {/* Rocket SVG */}
                        <svg width="40" height="40" fill="none" viewBox="0 0 64 64">
                            <g stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M14 50L50 14" />
                                <path d="M24 40l-6 6 6-6zm16-16l6-6-6 6z" />
                                <circle cx="44" cy="20" r="3" />
                                <path d="M20 44l-6 6M44 20l6-6" />
                            </g>
                        </svg>
                    </span>
                    {/* Text */}
                    <div>
                        <h3 className="text-lg md:text-xl font-extrabold text-gray-900 mb-1">Livraison rapide &amp; gratuite</h3>
                        <p className="text-gray-500 text-sm md:text-base">
                            Grâce à notre réseau logistique panafricain, vos produits arrivent vite et sans frais
                            supplémentaires, partout en Afrique et au-delà.
                        </p>
                    </div>
                </div>
                {/* Feature 2 */}
                <div className="flex flex-col md:flex-row items-center bg-white hover:shadow-2xl transition-shadow duration-300 p-6 group">
                    {/* Icon */}
                    <span className="mb-4 md:mb-0 md:mr-6 flex-shrink-0 bg-gradient-to-tr from-pink-400 to-orange-300 p-4 rounded-full shadow group-hover:scale-110 transition-transform duration-300">
                        {/* Dollar SVG */}
                        <svg width="40" height="40" fill="none" viewBox="0 0 64 64">
                            <circle cx="32" cy="32" r="18" stroke="white" strokeWidth="3" />
                            <path
                                d="M32 24v16m0 0a4 4 0 100-8 4 4 0 100 8"
                                stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
                            />
                        </svg>
                    </span>
                    {/* Text */}
                    <div>
                        <h3 className="text-lg md:text-xl font-extrabold text-gray-900 mb-1">30 jours satisfait ou remboursé</h3>
                        <p className="text-gray-500 text-sm md:text-base">
                            Achetez en toute confiance : si vous n’êtes pas satisfait, vous disposez de 30 jours
                            pour retourner vos articles et être intégralement remboursé.
                        </p>
                    </div>
                </div>
                {/* Feature 3 */}
                <div className="flex flex-col md:flex-row items-center bg-white hover:shadow-2xl transition-shadow duration-300 p-6 group">
                    {/* Icon */}
                    <span className="mb-4 md:mb-0 md:mr-6 flex-shrink-0 bg-gradient-to-tr from-pink-400 to-orange-300 p-4 rounded-full shadow group-hover:scale-110 transition-transform duration-300">
                        {/* Headset SVG */}
                        <svg width="40" height="40" fill="none" viewBox="0 0 64 64">
                            <g stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M16 40v-8a16 16 0 0132 0v8" />
                                <rect x="12" y="40" width="8" height="12" rx="4" />
                                <rect x="44" y="40" width="8" height="12" rx="4" />
                                <path d="M52 52a4 4 0 01-4 4h-4" />
                            </g>
                        </svg>
                    </span>
                    {/* Text */}
                    <div>
                        <h3 className="text-lg md:text-xl font-extrabold text-gray-900 mb-1">Centre d’assistance 24/7</h3>
                        <p className="text-gray-500 text-sm md:text-base">
                            Notre équipe d’assistance est disponible à tout moment pour vous accompagner,
                            répondre à vos questions et faciliter vos transactions.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
