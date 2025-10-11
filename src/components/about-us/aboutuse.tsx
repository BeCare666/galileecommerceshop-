import Image from "next/image";
import AproposBg from "@/assets/images/aboutus/about.png";
import { useState } from 'react';

export default function AproposSection() {
    const [open, setOpen] = useState(false);

    return (
        <>
            {/* ===== SECTION PRINCIPALE ===== */}
            <section
                className="relative flex flex-col md:flex-row items-center justify-start px-6 md:px-[40px] py-[40px] overflow-hidden bg-[#07131F] min-h-[420px]"
            >
                {/* Image de fond */}
                <Image
                    src={AproposBg}
                    alt="À propos de Galiléecommerce.com"
                    fill
                    className="object-cover z-0"
                    priority
                />

                {/* Overlay global */}
                <div className="absolute inset-0 bg-black/40 z-0" />

                {/* Bande noire + dégradé fluide */}
                <div className="absolute top-0 left-0 h-full w-[30%] bg-gradient-to-r from-[#000000]/95 via-[#000000]/80 to-transparent z-[1]" />

                {/* Bloc texte principal */}
                <div className="relative z-10 flex items-center h-full w-full md:w-[45%] text-white p-6 md:p-10 bg-gradient-to-r from-[#000000]/95 via-[#000000]/80 to-transparent rounded-2xl">
                    <div>
                        <div className="w-[40px] h-[6px] bg-[#FF7A2D] mb-3 rounded-full" />

                        <h3 className="font-extrabold text-[24px] md:text-[30px] leading-[32px] md:leading-[38px] mb-3">
                            À propos de Galiléecommerce.com
                        </h3>

                        <div className="h-[2px] w-[80px] bg-white/15 mb-3" />

                        <p className="text-[#D1D5DB] text-[14px] md:text-[15px] leading-[22px] mb-6">
                            Galiléecommerce.com, incontournable plateforme digitale pour le commerce en Afrique,
                            offre des solutions intégrées pour le B2B, B2C, C2B et C2C, avec une expertise de premier plan
                            en sourcing et en technologies avancées.
                        </p><br />

                        <button
                            onClick={() => setOpen(true)}
                            className="inline-flex items-center gap-2 bg-pink-700 hover:bg-[#ff8b48] text-white font-semibold px-5 py-2.5 rounded-full transition-all duration-300 hover:scale-105"
                        >
                            <span>En savoir plus</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2}
                                stroke="currentColor"
                                className="w-4 h-4"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Bloc complémentaire à droite */}
                <div className="relative z-10 w-full md:w-[50%] mt-8 md:mt-0 md:pl-10 text-white">
                    <div className="bg-black/50 backdrop-blur-md p-6 rounded-2xl border border-white/10">
                        <h4 className="text-[20px] font-bold mb-4 text-[#FF7A2D]">
                            Les quatre piliers de Galiléecommerce.com
                        </h4>
                        <ul className="space-y-2 text-[15px] text-[#E5E7EB] list-disc list-inside">
                            <li>L’assistance technique</li>
                            <li>Le respect des normes</li>
                            <li>La compétitivité-prix</li>
                            <li>Le dernier kilomètre</li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* ===== MODALE ===== */}
            {open && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm transition-opacity duration-300"
                >
                    <div
                        className="relative bg-white text-black  rounded-2xl shadow-2xl max-w-3xl w-[90%] p-8 overflow-y-auto max-h-[85vh] animate-fadeIn border border-white/10"
                    >
                        {/* Bouton fermer [#0B0E17]*/}
                        <button
                            onClick={() => setOpen(false)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-white transition"
                            aria-label="Fermer"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2}
                                stroke="currentColor"
                                className="w-6 h-6"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        <h2 className="text-[24px] font-bold mb-4 text-pink-700">
                            À propos de Galiléecommerce.com
                        </h2>

                        <div className="text-black text-[15px] leading-[24px] space-y-3 overflow-y-auto pr-2">
                            <p>
                                Galiléecommerce.com, incontournable plateforme digitale pour le commerce en Afrique, offre des solutions intégrées pour le B2B, B2C, C2B et C2C, avec une expertise de premier plan en sourcing et en technologies avancées.
                            </p>
                            <p>
                                L’entreprise Galiléecommerce est l’une des filiales du groupe Galilé (fondé en 2010 par Raoul Nougoum), dont le siège est à Douala, au Cameroun.
                            </p>
                            <p>
                                La mission de Galiléecommerce est de faciliter les affaires entre les pays de la Zone de Libre-échange continentale africaine (ZLECAf) et d’élargir leur accès au commerce mondial.
                            </p>
                            <p>
                                Galiléecommerce.com propose un écosystème visant à bâtir l'infrastructure commerciale de l'avenir de l'Afrique, offrant des solutions complètes qui facilitent l'accès des consommateurs aux produits et services mondiaux et africains, tout en assurant la prospérité des entreprises à l'ère numérique.
                            </p>
                            <p>
                                Son offre englobe un éventail de services tels que :
                            </p>
                            <ul className="list-disc list-inside ml-3 space-y-1">
                                <li>Les pavillons digitaux</li>
                                <li>Les corridors digitaux</li>
                                <li>Les solutions alimentées par l’IA</li>
                                <li>L’inspection normative</li>
                                <li>Les paiements numériques ultrasécurisés</li>
                                <li>Le cloud computing</li>
                                <li>La logistique et le divertissement numérique</li>
                            </ul>
                        </div>
                    </div>
                </div>
            )}

            <style jsx>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fadeIn {
                    animation: fadeIn 0.3s ease-out forwards;
                }
            `}</style>
        </>
    );
}
