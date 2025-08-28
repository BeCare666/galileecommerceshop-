import React, { useEffect, useState } from "react";

// Date cible pour le décompte (exemple : 1 an à partir d'aujourd'hui)
const targetDate = new Date();
targetDate.setDate(targetDate.getDate() + 364);
targetDate.setHours(targetDate.getHours() + 6);
targetDate.setMinutes(targetDate.getMinutes() + 2);
targetDate.setSeconds(targetDate.getSeconds() + 39);

function getTimeLeft() {
    const now = new Date();
    const diff = targetDate.getTime() - now.getTime();
    const days = Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24)));
    const hours = Math.max(0, Math.floor((diff / (1000 * 60 * 60)) % 24));
    const mins = Math.max(0, Math.floor((diff / (1000 * 60)) % 60));
    const secs = Math.max(0, Math.floor((diff / 1000) % 60));
    return { days, hours, mins, secs };
}

export default function WeeklySale() {
    const [time, setTime] = useState(getTimeLeft());
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const timer = setInterval(() => setTime(getTimeLeft()), 1000);
        return () => clearInterval(timer);
    }, []);

    if (!mounted) {
        return null;
    }

    return (
        <section className="w-full bg-gradient-to-r from-[#ffe3ea] via-white to-[#fff6f0] py-8">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center md:items-stretch gap-6 md:gap-0 overflow-hidden min-h-[420px] md:min-h-[520px] px-4 md:px-8">

                {/* Image à gauche */}
                <div className="flex-1 flex items-center justify-center bg-[#ffe3ea] relative rounded-lg md:rounded-none overflow-hidden">
                    {/* Décor rond */}
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 sm:w-80 sm:h-80 md:w-[420px] md:h-[420px] rounded-full bg-gradient-to-tr from-pink-200 via-orange-100 to-white opacity-60 blur-2xl z-0" />

                    <img
                        src="https://opencart4.magentech.com/themes/so_gostore/image/catalog/demo/banners/id1/banner-deal.jpg"
                        alt="Offre hebdomadaire"
                        className="w-full max-w-[340px] md:max-w-[420px] object-contain relative z-10"
                        draggable={false}
                    />
                </div>

                {/* Bloc texte à droite */}
                <div className="flex-1 flex flex-col justify-center items-center md:items-start text-center md:text-left px-4 sm:px-6 md:px-10 py-8 md:py-0 bg-white rounded-lg md:rounded-none">

                    <button className="bg-gradient-to-r from-pink-500 to-orange-400 text-white font-semibold px-6 sm:px-8 md:px-10 py-2.5 md:py-3 rounded-lg shadow-lg mb-6 md:mb-8 text-base sm:text-lg md:text-xl tracking-wide hover:scale-105 transition">
                        OFFRE LIMITÉE
                    </button>

                    <h2 className="text-xl sm:text-2xl md:text-4xl font-extrabold text-gray-900 mb-4 md:mb-6 leading-snug md:leading-tight">
                        Promo hebdomadaire <span className="text-pink-500">-35%</span>
                    </h2>

                    {/* Compteur */}
                    <div className="flex justify-center md:justify-start items-end gap-4 sm:gap-6 md:gap-8 mb-4 md:mb-2">
                        {[
                            { label: "JOURS", value: time.days },
                            { label: "HEURES", value: time.hours },
                            { label: "MINUTES", value: time.mins },
                            { label: "SECONDES", value: time.secs },
                        ].map((item) => (
                            <div key={item.label} className="flex flex-col items-center">
                                <span className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-black bg-gradient-to-br from-pink-100 to-orange-100 px-4 sm:px-5 md:px-6 py-1.5 sm:py-2 rounded-lg md:rounded-xl shadow-inner mb-1">
                                    {item.value}
                                </span>
                                <span className="text-[10px] sm:text-xs md:text-sm text-pink-500 tracking-widest font-semibold">
                                    {item.label}
                                </span>
                            </div>
                        ))}
                    </div>

                    <p className="mt-4 sm:mt-5 md:mt-6 text-gray-500 max-w-md">
                        Profitez de nos réductions exclusives de la semaine sur une sélection de produits.
                        Des offres limitées avec livraison rapide partout en Afrique grâce à Galileecommerce.
                    </p>
                </div>
            </div>
        </section>
    );
}
