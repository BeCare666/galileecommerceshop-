import React from "react";

export default function PhonePromoBanners() {
    return (
        <div className="w-full flex flex-col md:flex-row gap-6 py-6 px-2">
            {/* Bannière 1 */}
            <div className="flex-1 bg-[#fdf3ee] overflow-hidden flex flex-col md:flex-row items-center min-h-[220px] shadow-sm">
                <div className="flex-1 flex flex-col justify-center pl-6 py-8">
                    <span className="inline-block bg-pink-400 text-white text-xs font-semibold px-4 py-1 rounded-md mb-4 shadow">
                        En promo cette semaine
                    </span>
                    <h3 className="text-2xl md:text-2xl font-extrabold text-gray-900 mb-4 leading-tight">
                        Meilleure qualité,<br /> meilleur service pour vos produits
                    </h3>
                    <a
                        href="#"
                        className="text-base font-medium text-gray-900 mt-2 flex items-center gap-1 hover:underline"
                    >
                        Acheter maintenant <span aria-hidden>→</span>
                    </a>
                </div>
                <div className="flex-1 flex items-end justify-end h-full">
                    <img
                        src="https://becaree.netlify.app/assets/img/galile/refrigerateur-four-gaz-hotte-electromenagers-intelligents_107791-2971.png"
                        alt="Électroménagers intelligents"
                        className="h-full w-full max-w-[260px] md:max-w-[320px] object-contain"
                        draggable={false}
                    />
                </div>
            </div>
            {/* Bannière 2 */}
            <div className="flex-1 bg-[#f3f5fa] overflow-hidden flex flex-col md:flex-row items-center min-h-[220px] shadow-sm">
                <div className="flex-1 flex flex-col justify-center pl-6 py-8">
                    <span className="inline-block bg-pink-400 text-white text-xs font-semibold px-4 py-1 rounded-md mb-4 shadow">
                        En promo cette semaine
                    </span>
                    <h3 className="text-2xl md:text-2xl font-extrabold text-gray-900 mb-4 leading-tight">
                        Innovation et confort<br /> pour votre quotidien
                    </h3>
                    <a
                        href="#"
                        className="text-base font-medium text-gray-900 mt-2 flex items-center gap-1 hover:underline"
                    >
                        Acheter maintenant <span aria-hidden>→</span>
                    </a>
                </div>
                <div className="flex-1 flex items-end justify-end h-full">
                    <img
                        src="https://becaree.netlify.app/assets/img/galile/femme-reflechie-touchant-ecran-virtuel-tenant-ordinateur-portable_74855-4758.png"
                        alt="Technologie et accessoires"
                        className="h-full w-full max-w-[260px] md:max-w-[320px] object-contain"
                        draggable={false}
                    />
                </div>
            </div>
        </div>
    );
}
