'use client';

import { useState } from 'react';

export default function FloatingSettingsButton() {
  const [hover, setHover] = useState(false);

  return (
    <div className="fixed top-1/2 right-5 transform -translate-y-1/2 z-50">
      <button
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className="relative flex items-center justify-center w-14 h-14 bg-pink-500 rounded-full shadow-lg hover:scale-110 transition-transform"
      >
        {/* Icon settings qui tourne */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-7 h-7 text-white animate-spin-slow"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4v2m0 12v2m8-8h-2M4 12H2m15.364-6.364l-1.414 1.414M6.05 17.95l-1.414 1.414m12.728 0l-1.414-1.414M6.05 6.05L4.636 7.464"
          />
        </svg>

        {/* Texte qui apparaît au hover */}
        <span
          className={`absolute -left-56 w-48 bg-white text-gray-900 px-3 py-2 rounded-lg shadow-lg text-sm font-medium transition-all duration-500 ${
            hover ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
          }`}
        >
          Voir les produits d’origine
        </span>
      </button>

      {/* Tailwind custom animation */}
      <style jsx>{`
        .animate-spin-slow {
          animation: spin 60s linear infinite;
        }
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
