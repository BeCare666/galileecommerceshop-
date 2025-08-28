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
  const { mutate: becomeSeller, isLoading } = useMutation(client.becomeSeller.post, {
    onSuccess: (data: any) => {
      console.log('data', data)
      toast.success(data?.message || "Vous êtes maintenant vendeur !");
    },
    onError: (error: any) => {
      toast.error(error?.message || "Une erreur est survenue.");
    },
  });


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
            <p className="text-lg leading-[1.7] md:leading-[2] lg:leading-[2.2] font-normal mt-3 text-justify">
              Join Galileecommerce and become a seller on the platform that connects Africa and the world.
              Take advantage of optimized logistics, easy access to millions of products, and boost your sales today!
            </p>

            {banner?.button1Name ? (
              <div className="flex mt-7 justify-center lg:justify-start">
                <button
                  type="button"
                  className=" bg-pink-600 hover:bg-pink-700 focus:ring-4 focus:ring-pink-300 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
                  onClick={() => becomeSeller()}
                >
                  Become Seller
                </button>

              </div>
            ) : null}
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
