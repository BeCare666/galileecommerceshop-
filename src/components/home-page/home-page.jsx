'use client';
import React from 'react';
import { useRouter } from 'next/router';
import ImageHomePage from '@/assets/images/ecoute.png';
import ImageHomePagebackground from '@/assets/images/imgdownload.jpg';
import { useMe } from '@/data/user';
import { useModalAction } from '@/components/modal-views/context';
export default function HeroBanner() {
  const { openModal } = useModalAction();
  const { me, isAuthorized, isLoading } = useMe();
  const router = useRouter();
  return (
    <div
      className="w-full py-12 px-4 md:px-6 flex flex-col md:flex-row items-center justify-between min-h-[420px] relative bg-center bg-cover"
      style={{ backgroundImage: `url(${ImageHomePagebackground.src})` }}
    >
      {/* Overlay pour lisibilité */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Bloc gauche */}
      <div className="flex-1 max-w-2xl relative z-10 text-white">
        <div className="mb-6">
          <span className="inline-block bg-pink-500 text-white text-xs font-semibold px-5 py-2 rounded-md shadow">
            GALILEECOMMERCE, LEADER DU COMMERCE DIGITAL AFRICAIN
          </span>
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold leading-tight mb-4">
          Connecter les entreprises <br /> aux 54 pays de la ZLECAf
        </h1>
        <p className="text-white/90 mb-8 max-w-lg">
          Galileecommerce.com vous aide à saisir les opportunités du commerce en
          Afrique et dans le monde, en optimisant la chaîne de valeur et en
          simplifiant l’accès aux services financiers innovants.
        </p>
        <div className="flex items-center gap-4 mt-5">
          {isAuthorized && me && !isLoading && (
            <button
              className="bg-pink-500 hover:bg-pink-600 text-white font-semibold px-8 py-3 rounded-md shadow transition"
              onClick={() => router.push('products/forcategory')}
            >
              Faites ici vos achats
            </button>
          )}
          {!isAuthorized && !me && (
            <button
              className="bg-pink-500 hover:bg-pink-600 text-white font-semibold px-8 py-3 rounded-md shadow transition"
              onClick={() => openModal('REGISTER')}
            >
              Inscrivez-vous gratuitement
            </button>
          )}

          <button
            className="flex items-center bg-white shadow px-4 py-3 rounded-full"
            onClick={() => router.push('/about-us')}
          >
            <span className="w-7 h-7 flex items-center justify-center bg-gray-100 rounded-full mr-2">
              <svg
                width="18"
                height="18"
                fill="currentColor"
                className="text-pink-500"
                viewBox="0 0 20 20"
              >
                <circle
                  cx="10"
                  cy="10"
                  r="9"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                />
                <polygon points="8,6 14,10 8,14" fill="currentColor" />
              </svg>
            </span>
            <span className="text-gray-700 font-medium">En savoir plus</span>
          </button>
        </div>
      </div>

      {/* Bloc droit */}
      <div className="flex-1 flex justify-center items-center mt-10 md:mt-0 relative z-10">
        <div className="relative w-[340px] h-[340px] md:w-[420px] md:h-[420px]">
          {/* Décor musical */}
          <img
            src={ImageHomePage.src}
            alt="Décor"
            className="absolute top-0 left-0 w-full h-full object-contain animate-breathe pointer-events-none select-none"
            style={{ zIndex: 1 }}
          />
          {/* Casque */}
          <img
            src={ImageHomePage.src}
            alt="Casque audio"
            className="relative w-full h-full object-contain z-10 animate-breathe pointer-events-none select-none"
            draggable={false}
          />
        </div>
      </div>

      {/* Animation breathe */}
      <style jsx>{`
        @keyframes breathe {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.06);
          }
        }
        .animate-breathe {
          animation: breathe 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
