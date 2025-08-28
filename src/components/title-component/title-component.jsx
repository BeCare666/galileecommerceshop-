import React from "react";

export default function SectionTitle({ children, subtitle }) {
    return (
        <div className="flex flex-col items-start gap-2 mt-8 mb-8 px-2 md:px-0">
            <div className="flex items-center gap-4">
                <span className="inline-block w-1.5 h-8 md:w-2 md:h-10 rounded bg-gradient-to-b from-pink-500 via-fuchsia-400 to-orange-400 shadow-lg" />
                <h2
                    className="text-2xl md:text-4xl font-extrabold text-dark-800 tracking-tight bg-gradient-to-r from-pink-500 via-orange-400 to-fuchsia-500 bg-clip-text text-transparent"
                    style={{ fontFamily: "'Rubik', 'Raleway', 'Roboto', sans-serif" }}
                >
                    {children}
                </h2>
            </div>
            {subtitle && (
                <div className="ml-6 mt-1 text-base md:text-lg text-dark-600 font-medium opacity-80">
                    {subtitle}
                </div>
            )}
        </div>
    );
}

// Utilisation :
// <SectionTitle subtitle="Découvrez nos produits les plus appréciés">Nos Best Sellers</SectionTitle>