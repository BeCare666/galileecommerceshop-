import React from "react";

export default function PhonePromoBanners() {
    return (
        <>
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
                            href="/products/villa-prfabrique-de-luxe-conomique-maison-prfabrique-moderne-cl-en-main-avec-installation-rapide"
                            className="text-base font-medium text-gray-900 mt-2 flex items-center gap-1 hover:underline"
                        >
                            Acheter maintenant <span aria-hidden>→</span>
                        </a>
                    </div>
                    <div className="flex-1 flex items-end justify-end h-full">
                        <img
                            src="https://res.cloudinary.com/dxug9vkcd/image/upload/v1777009070/uploads/jwubvp3mws2cncqtj9mm.jpg"
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
                            href="/products/maisons-prfabriques-modernes-en-acier-lger-impermables-villa-bureau-magasin-toilettes-avec-panneaux-sandwich-alimentes-lnergie-solaire"
                            className="text-base font-medium text-gray-900 mt-2 flex items-center gap-1 hover:underline"
                        >
                            Acheter maintenant <span aria-hidden>→</span>
                        </a>
                    </div>
                    <div className="flex-1 flex items-end justify-end h-full">
                        <img
                            src="https://res.cloudinary.com/dxug9vkcd/image/upload/v1777017531/uploads/uheo5dmnfj2zpdc2wrwy.png"
                            alt="Technologie et accessoires"
                            className="h-full w-full max-w-[260px] md:max-w-[320px] object-contain"
                            draggable={false}
                        />
                    </div>
                </div>
            </div>
            <div className="w-full flex flex-col md:flex-row gap-6 py-6 px-2">
                {/* Bannière 1 */}
                <div className="flex-1 bg-[#fdf3ee] overflow-hidden flex flex-col md:flex-row items-center min-h-[220px] shadow-sm">
                    <div className="flex-1 flex flex-col justify-center pl-6 py-8">
                        <span className="inline-block bg-pink-400 text-white text-xs font-semibold px-4 py-1 rounded-md mb-4 shadow">
                            En promo cette semaine
                        </span>
                        <h3 className="text-2xl md:text-2xl font-extrabold text-gray-900 mb-4 leading-tight">
                            Meilleure qualité,<br /> meilleur service pour vos projets agricoles et industriels
                        </h3>
                        <a
                            href="/products/villa-prfabrique-de-luxe-conomique-maison-prfabrique-moderne-cl-en-main-avec-installation-rapide"
                            className="text-base font-medium text-gray-900 mt-2 flex items-center gap-1 hover:underline"
                        >
                            Acheter maintenant <span aria-hidden>→</span>
                        </a>
                    </div>
                    <div className="flex-1 flex items-end justify-end h-full">
                        <img
                            src="https://res.cloudinary.com/dxug9vkcd/image/upload/v1776964059/uploads/heuqmpvbnkzrsj4krvrq.png"
                            alt="Électroménagers intelligents"
                            className="h-full w-full max-w-[260px] md:max-w-[320px] object-contain"
                            draggable={false}
                        />
                    </div>
                </div>
                {/* Bannière 4 */}
                <div className="flex-1 bg-[#f3f5fa] overflow-hidden flex flex-col md:flex-row items-center min-h-[220px] shadow-sm">
                    <div className="flex-1 flex flex-col justify-center pl-6 py-8">
                        <span className="inline-block bg-pink-400 text-white text-xs font-semibold px-4 py-1 rounded-md mb-4 shadow">
                            En promo cette semaine
                        </span>
                        <h3 className="text-2xl md:text-2xl font-extrabold text-gray-900 mb-4 leading-tight">
                            Innovation et confort<br /> pour votre quotidien
                        </h3>
                        <a
                            href="/products/long-cycle-life-20ft-container-bess-2500kwh-lfp-energy-storage-container-for-utility-scale-peak-plant"
                            className="text-base font-medium text-gray-900 mt-2 flex items-center gap-1 hover:underline"
                        >
                            Acheter maintenant <span aria-hidden>→</span>
                        </a>
                    </div>
                    <div className="flex-1 flex items-end justify-end h-full">
                        <img
                            src="https://res.cloudinary.com/dxug9vkcd/image/upload/v1776968525/uploads/qrpt9b1sfycryp7dirrj.jpg"
                            alt="Technologie et accessoires"
                            className="h-full w-full max-w-[260px] md:max-w-[320px] object-contain"
                            draggable={false}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
