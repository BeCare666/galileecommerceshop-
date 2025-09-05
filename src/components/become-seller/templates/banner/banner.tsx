import {
  ChevronRight,
  ChevronRightNew,
} from '@/components/icons/chevron-right';
import Badge from '@/components/ui/badge';
import Image from '@/components/ui/image';
import Link from '@/components/ui/link';
// import { Routes } from '@/config/routes';
import { BecomeSellerPageOptions } from '@/types';
import dynamic from 'next/dynamic';
// const JoinButton = dynamic(
//   () => import('@/components/layouts/menu/join-button'),
//   { ssr: false },
// );
import { useTranslation } from 'next-i18next';
import { cn } from '@/lib/cn';
import Glow from '@/components/ui/glow';
import Button from '@/components/ui/button';
import { fixDynamicLink } from '@/lib/fix-dynamic-link';
import { useIsRTL } from '@/lib/locals';
import client from '@/data/client';
import toast from 'react-hot-toast';
import { useMutation } from 'react-query';

interface BannerProps extends Pick<BecomeSellerPageOptions, 'banner'> {
  className?: string;
}

const Banner = ({ banner, className }: BannerProps) => {
  const { t } = useTranslation('common');
  const { isRTL } = useIsRTL();
  const { mutate: becomeSeller, isLoading } = useMutation(
    client.becomeSeller.post,
    {
      onSuccess: (data: any) => {
        console.log('data', data);
        toast.success(data?.message || 'Vous êtes maintenant vendeur !');
      },
      onError: (error: any) => {
        toast.error(error?.message || 'Une erreur est survenue.');
      },
    },
  );

  return (
    <section className={cn('relative py-20', className)}>
      <Glow className="bg-[#BDE4DC] opacity-50 w-[200px] top-1/2 left-0 " />
      <Glow className="bg-[#F0DC72] opacity-20 w-[120px] top-[10%] left-1/2" />
      <Glow className="bg-[#BDE4DC] opacity-50 w-[150px] top-auto left-auto right-[3%] bottom-[12%]" />
      <div className="mx-auto max-w-[94.75rem] px-4 relative z-10">
        <div className="flex items-center justify-between gap-10 text-center lg:text-left">
          <div className="max-w-[530px] md:max-w-[650px] mx-auto xl:mx-0 xl:max-w-[724px]  text-center lg:text-left rtl:lg:text-right">
            <h1 className="[&>span]:text-brand text-3xl md:text-4xl xl:text-6xl font-bold tracking-[-0.4px] text-dark dark:text-light !leading-[1.25]">
              Start your online business with Galilé E-commerce.
            </h1>
            <section className="bg-gradient-to-r from-blue-50 to-white py-16 px-6 md:px-12 lg:px-20">
              <div className="max-w-6xl mx-auto text-center">
                {/* Titre */}
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Rejoignez{' '}
                  <span className="text-blue-600">Galileecommerce</span>
                </h2>
                <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
                  Devenez vendeur sur la plateforme qui connecte{' '}
                  <strong>l’Afrique et le monde</strong>. Profitez d’une
                  logistique optimisée, accédez facilement à des millions de
                  produits, et boostez vos ventes dès aujourd’hui !
                </p>

                {/* Cartes Avantages */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                  {/* Marché Mondial */}
                  <div className="bg-white shadow-lg rounded-2xl p-6 flex flex-col items-center text-center hover:shadow-xl transition">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-10 h-10 text-blue-600 mb-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 2a10 10 0 100 20 10 10 0 000-20zM2 12h20M12 2c2.5 3 2.5 17 0 20M12 2c-2.5 3-2.5 17 0 20"
                      />
                    </svg>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      Marché Mondial
                    </h3>
                    <p className="text-sm text-gray-600">
                      Accédez à une clientèle internationale et développez vos
                      ventes partout.
                    </p>
                  </div>

                  {/* Logistique Optimisée */}
                  <div className="bg-white shadow-lg rounded-2xl p-6 flex flex-col items-center text-center hover:shadow-xl transition">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-10 h-10 text-green-600 mb-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 10h18M5 6h14l1.5 4.5H3.5L5 6zm2 10a2 2 0 104 0 2 2 0 00-4 0zm10 0a2 2 0 104 0 2 2 0 00-4 0z"
                      />
                    </svg>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      Logistique Optimisée
                    </h3>
                    <p className="text-sm text-gray-600">
                      Bénéficiez de solutions de livraison rapides et fiables.
                    </p>
                  </div>

                  {/* Catalogue Géant */}
                  <div className="bg-white shadow-lg rounded-2xl p-6 flex flex-col items-center text-center hover:shadow-xl transition">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-10 h-10 text-purple-600 mb-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 2h12a1 1 0 011 1v18l-7-3-7 3V3a1 1 0 011-1z"
                      />
                    </svg>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      Catalogue Géant
                    </h3>
                    <p className="text-sm text-gray-600">
                      Vendez aux côtés de millions de produits déjà disponibles.
                    </p>
                  </div>

                  {/* Boostez vos Revenus */}
                  <div className="bg-white shadow-lg rounded-2xl p-6 flex flex-col items-center text-center hover:shadow-xl transition">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-10 h-10 text-red-600 mb-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 17l6-6 4 4 6-6M4 21h16"
                      />
                    </svg>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      Boostez Vos Revenus
                    </h3>
                    <p className="text-sm text-gray-600">
                      Augmentez vos bénéfices avec des outils marketing
                      performants.
                    </p>
                  </div>
                </div>

                {/* CTA */}
                {banner?.button1Name ? (
                  <div className="mt-12">
                    <button
                      onClick={() => becomeSeller()}
                      className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-xl shadow-lg hover:bg-blue-700 transition transform hover:-translate-y-1"
                    >
                      Devenir Vendeur
                    </button>
                  </div>
                ) : null}
              </div>
            </section>
          </div>

          {banner?.image?.original ? (
            <div className=" lg:block">
              <Image
                src="https://galileecommerce.netlify.app/img/presentation-reunion-femme-noire-pour-idees-collaboration-affaires-.avif"
                alt={banner?.image?.original ?? ''}
                width={630}
                height={680}
                quality={100}
                sizes="(max-width: 768px) 100vw"
                className="object-contain max-h-[680px]"
              />
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
};

export { Banner };
