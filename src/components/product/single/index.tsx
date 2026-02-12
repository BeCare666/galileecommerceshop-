import { staggerTransition } from '@/lib/framer-motion/stagger-transition';
import placeholder from '@/assets/images/placeholders/product.svg';
import { motion } from 'framer-motion';
import ProductDetailsPaper from '@/components/product/product-details-paper';
import ProductInformation from '@/components/product/product-information';
import ProductSocialShare from '@/components/product/product-social-share';
import ProductQuestions from '@/components/questions/product-questions';
import AverageRatings from '@/components/review/average-ratings';
import ProductReviews from '@/components/review/product-reviews';
import Image from '@/components/ui/image';
import { LongArrowIcon } from '@/components/icons/long-arrow-icon';
import routes from '@/config/routes';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import Link from 'next/link';

import {
  fadeInBottom,
  fadeInBottomWithScaleX,
  fadeInBottomWithScaleY,
} from '@/lib/framer-motion/fade-in-bottom';
import { Product } from '@/types';
import { isEmpty } from 'lodash';
import { useSanitizeContent } from '@/lib/sanitize-content';

type SingleProps = {
  product: Product;
};

export function getPreviews(gallery: any[], image: any) {
  if (!isEmpty(gallery) && Array.isArray(gallery)) return gallery;
  if (!isEmpty(image)) return [image, {}];
  return [{}, {}];
}
function InfoRow({ label, value, icon }: any) {
  return (
    <div className="group flex items-center justify-between rounded-xl border border-light-500/50 dark:border-dark-400/50 bg-white/60 dark:bg-dark-200/60 px-4 py-3 backdrop-blur transition hover:shadow-md">
      <div className="flex items-center gap-2 text-sm font-medium opacity-80">
        <span>{icon}</span>
        {label}
      </div>
      <div className="text-sm text-right">{value}</div>
    </div>
  );
}

const Single: React.FC<SingleProps> = ({ product }) => {
  const { t } = useTranslation('common');
  const router = useRouter();

  const {
    id,
    name,
    slug,
    image,
    gallery,
    description,
    created_at,
    updated_at,
    ratings,
    rating_count,
    total_reviews,
    tags,
    type,
    video,
  } = product;

  const previews = getPreviews(gallery, image);
  const content = useSanitizeContent({ description: description });

  return (
    <div className="relative">
      {/* Luxury ambient background */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.08),transparent_40%),radial-gradient(circle_at_80%_30%,rgba(168,85,247,0.08),transparent_45%)]" />

      <div className="h-full min-h-screen px-4 md:px-6 lg:px-10 lg:pt-8 pb-28">
        {/* Back bar — glass premium */}
        <div className="sticky top-0 z-20 -mx-4 mb-4 -mt-2 flex items-center backdrop-blur-xl bg-white/70 dark:bg-neutral-950/70 border-b border-gray-200/60 dark:border-neutral-800 px-4 py-4 sm:static sm:border-0 sm:bg-transparent sm:backdrop-blur-0">
          <button
            onClick={() => router.push(routes?.home)}
            className="group inline-flex items-center gap-2 rounded-2xl border border-gray-200 dark:border-neutral-800 bg-white/80 dark:bg-neutral-900/80 px-4 py-2 text-sm font-semibold text-gray-700 hover:text-black dark:text-gray-300 hover:dark:text-white transition"
          >
            <LongArrowIcon className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            {t('text-back')}
          </button>
        </div>

        {/* Media Grid — ultra luxe frame */}
        <motion.div
          variants={staggerTransition()}
          initial="hidden"
          animate="show"
          className="grid gap-5 sm:grid-cols-2 xl:grid-cols-2"
        >
          {previews?.map((img) => (
            <motion.div
              key={img.id}
              variants={fadeInBottomWithScaleX()}
              className="relative aspect-[3/2] overflow-hidden rounded-3xl border border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-[0_20px_60px_rgba(0,0,0,0.06)]"
            >
              <Image
                alt={name}
                fill
                quality={100}
                src={img?.url ?? placeholder}
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
            </motion.div>
          ))}

          {video?.length
            ? video.map((item: any, index: number) => (
                <div
                  key={`product-video-${index}`}
                  className="relative aspect-[3/2] overflow-hidden rounded-3xl border border-gray-200 dark:border-neutral-800 bg-black shadow-[0_20px_60px_rgba(0,0,0,0.12)]"
                >
                  {item.url.includes('iframe') ? (
                    <div
                      className="product-video-iframe h-full w-full"
                      dangerouslySetInnerHTML={{ __html: item.url }}
                    />
                  ) : (
                    <div className="product-video-iframe h-full w-full">
                      <video className="h-full w-full object-cover" controls src={item.url} />
                    </div>
                  )}
                </div>
              ))
            : null}
        </motion.div>

        {/* Content zone */}
        <motion.div
          variants={fadeInBottom()}
          initial="hidden"
          animate="show"
          className="justify-center py-10 lg:flex lg:flex-col"
        >
          {/* Mobile details */}
          <div className="rounded-3xl border border-gray-200 dark:border-neutral-800 bg-gradient-to-br from-white to-gray-50 dark:from-neutral-900 dark:to-neutral-950 p-5 shadow-[0_10px_40px_rgba(0,0,0,0.05)] lg:hidden">
            <ProductDetailsPaper product={product} />
          </div>

          <div className="lg:mx-auto 3xl:max-w-[1300px]">
            <div className="w-full rtl:space-x-reverse lg:flex lg:space-x-16 xl:space-x-24">
              {/* Description — luxury reading card */}
              <div className="block 3xl:max-w-[720px]">
                {content ? (
                  <div className="rounded-3xl border border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 md:p-8 leading-[1.9em] text-gray-700 dark:text-gray-300 shadow-[0_10px_40px_rgba(0,0,0,0.05)] react-editor-description"
                    dangerouslySetInnerHTML={{ __html: content }}
                  />
                ) : (
                  ''
                )}

                <ProductSocialShare
                  productSlug={slug}
                  className="mt-6 border-t border-gray-200 dark:border-neutral-800 pt-6"
                />
              </div>

              {/* Information card */}
              <div className="flex-shrink-0 pt-6 lg:pt-0 lg:min-w-[380px] lg:max-w-[520px]">
                <div className="rounded-3xl border border-gray-200 dark:border-neutral-800 bg-gradient-to-br from-white to-gray-50 dark:from-neutral-900 dark:to-neutral-950 p-6 shadow-[0_15px_50px_rgba(0,0,0,0.06)]">
                  <ProductInformation
                    tags={tags}
                    created_at={created_at}
                    updated_at={updated_at}
                    layoutType={type?.name}
                    //@ts-ignore
                    icon={type?.icon}
                    className=""
                  />
                </div>


              </div>
            </div>
                    {/* 💎 PRODUCT INFO — ULTRA MODERN CARD */}
          <div className="relative mt-8 overflow-hidden rounded-3xl border border-light-400/60 dark:border-dark-400/60 bg-white/70 dark:bg-dark-300/60 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.06)]">

            {/* gradient accent line */}
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand via-indigo-500 to-fuchsia-500" />

            <div className="p-5 md:p-7">

              {/* HEADER */}
              <div className="mb-7 flex items-center justify-between">
                <div>
                  <h3 className="text-xl md:text-2xl font-semibold tracking-tight text-dark dark:text-light">
                    Informations produit
                  </h3>
                  <p className="text-xs text-dark/50 dark:text-light/50 mt-1">
                    Détails officiels & statut vendeur
                  </p>
                </div>

                <span className="rounded-full border border-brand/30 bg-brand/10 px-4 py-1.5 text-xs font-semibold text-brand backdrop-blur">
                  FICHE PREMIUM
                </span>
              </div>

              {/* GRID */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                {/* PRICE */}
                <InfoRow
                  label="Prix"
                  icon="💰"
                  value={
                    product?.sale_price ? (
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-extrabold text-brand">
                          {product.sale_price} $
                        </span>
                        <span className="text-sm line-through opacity-60">
                          {product.price} $
                        </span>
                      </div>
                    ) : (
                      <span className="font-semibold">{product.price} $</span>
                    )
                  }
                />

                {/* STOCK */}
                <InfoRow
                  label="Disponibilité"
                  icon="📦"
                  value={
                    <span className={`font-semibold ${product?.in_stock ? 'text-emerald-600' : 'text-red-500'}`}>
                      {product?.in_stock ? 'En stock' : 'Indisponible'}
                    </span>
                  }
                />

                {/* SELLER STATUS */}
                <InfoRow
                  label="Statut vendeur"
                  icon="🏪"
                  value={
                    <span className={`font-semibold ${product?.shop?.is_active ? 'text-blue-600' : 'text-red-500'}`}>
                      {product?.shop?.is_active ? 'Actif' : 'Suspendu'}
                    </span>
                  }
                />

                {/* VERIFIED */}
                <InfoRow
                  label="Vérification"
                  icon="✔️"
                  value={<span className="font-semibold text-indigo-600">Vérifié</span>}
                />

                {/* CERTIFICATION */}
                <InfoRow
                  label="Certification"
                  icon="🛡️"
                  value={
                    product?.shop?.documents?.commerce_register ? (
                      <a
                        href={product.shop.documents.commerce_register.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-semibold text-amber-600 underline hover:opacity-80"
                      >
                        Voir document
                      </a>
                    ) : (
                      <span className="opacity-50">Non certifié</span>
                    )
                  }
                />

                {/* SKU */}
                <InfoRow
                  label="SKU"
                  icon="🏷️"
                  value={<span className="font-mono">{product?.sku ?? '—'}</span>}
                />

                {/* SHOP */}
                <InfoRow
                  label="Boutique"
                  icon="🧭"
                  value={
                    <Link
                      href={routes.shopUrl(product?.shop?.slug)}
                      className="font-semibold text-brand hover:underline"
                    >
                      {product?.shop?.name}
                    </Link>
                  }
                />

                {/* LOCATION */}
                <InfoRow
                  label="Localisation"
                  icon="📍"
                  value={`${product?.shop?.address?.city}, ${product?.shop?.address?.country}`}
                />

                {/* UPDATED */}
                <InfoRow
                  label="Mise à jour"
                  icon="🕒"
                  value={new Date(product?.updated_at).toISOString().slice(0, 10)}
                />

              </div>
            </div>
          </div>
            {/* Reviews + Questions — stacked luxury sections */}
            <div className="mt-10 space-y-10">
              <div className="rounded-3xl border border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 md:p-8 shadow-[0_10px_40px_rgba(0,0,0,0.05)]">
                <AverageRatings
                  ratingCount={rating_count}
                  totalReviews={total_reviews}
                  ratings={ratings}
                />
              </div>

              <div className="rounded-3xl border border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 md:p-8 shadow-[0_10px_40px_rgba(0,0,0,0.05)]">
                <ProductReviews productId={id} />
              </div>

              <div className="rounded-3xl border border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 md:p-8 shadow-[0_10px_40px_rgba(0,0,0,0.05)]">
                <ProductQuestions
                  productId={product?.id}
                  shopId={product?.shop?.id}
                />
              </div>
            </div>
          </div>

          {/* Mobile share duplicate (kept logic) */}
          <ProductSocialShare
            productSlug={slug}
            className="mt-8 border-t border-gray-200 dark:border-neutral-800 pt-6 lg:hidden"
          />
        </motion.div>
      </div>

      {/* Sticky bottom bar — ultra luxe */}
      <motion.div
        variants={fadeInBottomWithScaleY()}
        initial="hidden"
        animate="show"
        className="sticky bottom-0 right-0 z-10 hidden w-full border-t border-gray-200/70 dark:border-neutral-800 bg-white/85 dark:bg-neutral-950/85 backdrop-blur-xl px-8 py-5 shadow-[0_-10px_40px_rgba(0,0,0,0.08)] lg:flex"
      >
        <div className="mx-auto w-full max-w-[1300px]">
          <ProductDetailsPaper product={product} />
        </div>

      </motion.div>
    </div>
  );
};

export default Single;
