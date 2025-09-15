import GeneralLayout from '@/layouts/_general-layout';
import Seo from '@/layouts/_seo';
import routes from '@/config/routes';
import { NextPageWithLayout } from '@/types';
import { useIsRTL } from '@/lib/locals';
import client from '@/data/client';
import toast from 'react-hot-toast';
import { useMutation } from 'react-query';
import Image from 'next/image';
import { useRouter } from 'next/router';

const Glow = ({ className = "" }: { className?: string }) => (
  <span
    className={`absolute h-[200px] blur-[120px] rounded-full -z-10 ${className}`}
  />
);

const BecomeSellerPage: NextPageWithLayout = () => {
  const { isRTL } = useIsRTL();
  const router = useRouter();

  const { mutate: becomeSeller, isLoading } = useMutation(client.becomeSeller.post, {
    onSuccess: (data: any) => {
      // Affiche un toast de succès
      toast.success(data?.message || "Vous êtes désormais fournisseur !");

      // Redirection sécurisée côté client après un petit délai
      if (typeof window !== "undefined") {
        setTimeout(() => {
          window.location.href = "https://galileecommerceadmin-six.vercel.app/fr/login";
        }, 1500); // 1.5s pour laisser le toast visible
      }
    },
    onError: (error: any) => {
      toast.error(error?.message || "Une erreur est survenue.");
    },
  });

  const handleBack = () => {
    if (typeof window !== "undefined") {
      if (window.history.length > 1) {
        router.back();
      } else {
        router.push('/');
      }
    }
  };

  return (
    <div className="bg-[#F9FAFB] dark:bg-dark-100 h-screen w-full overflow-y-auto relative">
      <Seo title="Devenir fournisseur" url={routes.becomeSeller} />

      {/* Bouton retour */}


      {/* Section principale */}
      <section className="relative py-16 px-6 md:px-12 lg:px-20 h-full">
        {/* Glow effects */}
        <Glow className="bg-[#BDE4DC] opacity-40 w-[200px] top-1/2 left-0" />
        <Glow className="bg-[#F0DC72] opacity-20 w-[120px] top-[10%] left-1/2" />
        <Glow className="bg-[#BDE4DC] opacity-40 w-[150px] top-auto left-auto right-[3%] bottom-[12%]" />

        <div className="relative z-10 max-w-[94.75rem] mx-auto h-full flex flex-col lg:flex-row items-center justify-center gap-10">
          {/* Texte */}
          <div className="max-w-xl mx-auto text-center lg:text-left space-y-6">
            <h1 className="text-brand text-3xl md:text-4xl xl:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-tight">
              Lancez votre activité en ligne avec{" "}
              <span className="text-pink-600">Galilé E-commerce</span>.
            </h1>
            <p className="text-lg md:text-xl leading-relaxed text-gray-700 dark:text-gray-300 text-justify">
              Rejoignez Galileecommerce et devenez fournisseur sur la plateforme qui connecte l’Afrique au reste du monde.
              Profitez d’une logistique optimisée, d’un accès facile à des millions de produits,
              et développez vos ventes dès aujourd’hui !
            </p>
            <div className="flex justify-center lg:justify-start gap-4">
              <button
                onClick={handleBack}
                className="flex items-center gap-2 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-full shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition z-50"
              >
                {/* SVG flèche gauche */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
                <span>Retour</span>
              </button>
              <button
                onClick={() => becomeSeller()}
                disabled={isLoading}
                className="bg-pink-600 hover:bg-pink-700 text-white font-medium py-3 px-6 rounded-lg shadow-lg transition transform hover:-translate-y-1 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Chargement..." : "Devenir fournisseur"}
              </button>
            </div>
          </div>

          {/* Image */}
          <div className="w-full max-w-md lg:max-w-lg xl:max-w-xl">
            <Image
              src="https://galileecommerce.netlify.app/img/presentation-reunion-femme-noire-pour-idees-collaboration-affaires-.avif"
              alt="Présentation Femme Noire"
              width={630}
              height={680}
              quality={100}
              className="w-full h-auto object-contain rounded-xl shadow-lg"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

BecomeSellerPage.getLayout = function getLayout(page) {
  return <GeneralLayout>{page}</GeneralLayout>;
};

export default BecomeSellerPage;
