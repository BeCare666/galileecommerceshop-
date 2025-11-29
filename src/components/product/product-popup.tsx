import Image from '@/components/ui/image';
import routes from '@/config/routes';
import { useModalState } from '@/components/modal-views/context';
import AnchorLink from '@/components/ui/links/anchor-link';
import ProductSocialShare from '@/components/product/product-social-share';
import ProductInformation from '@/components/product/product-information';
import { ShoppingCartIcon } from '@/components/icons/shopping-cart-icon';
import ProductThumbnailGallery from '@/components/product/product-thumbnail-gallery';
import AddToCart from '@/components/cart/add-to-cart';
import placeholder from '@/assets/images/placeholders/product.svg';
import { isFree } from '@/lib/is-free';
import FreeDownloadButton from '@/components/product/free-download-button';
import { DownloadIcon } from '@/components/icons/download-icon';
import pluralize from 'pluralize';
import { useProduct } from '@/data/product';
import ProductPopupLoader from '@/components/product/product-popup-loader';
import isEmpty from 'lodash/isEmpty';
import FavoriteButton from '@/components/favorite/favorite-button';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { useSanitizeContent } from '@/lib/sanitize-content';
import BestSellerGrid from '@/components/best-home-sellers/best-home-sellers';
import TitleComponent from '@/components/title-component/title-component';
function getPreviews(gallery: any[], image: any) {
  if (!isEmpty(gallery) && Array.isArray(gallery)) return gallery;
  if (!isEmpty(image)) return [image];
  return [{}];
}

export default function ProductPopupDetails() {
  const { data } = useModalState();
  const { t } = useTranslation('common');
  const { product, isLoading } = useProduct(data.slug);
  const content = useSanitizeContent({
    description: product?.description as string,
  });
  if (!product && isLoading) return <ProductPopupLoader />;
  if (!product) return <div>{t('text-not-found')}</div>;
  const {
    id,
    name,
    description,
    slug,
    image,
    shop,
    updated_at,
    created_at,
    gallery,
    orders_count,
    total_downloads,
    tags,
    preview_url,
    type,
    price,
    sale_price,
    is_external,
    external_product_url,
    external_product_button_text,
  } = product ?? {};
  const isFreeItem = isFree(sale_price ?? price);
  const previews = getPreviews(gallery, image);
  console.log('product in popup:', product);
  return (
    <div className="flex max-w-full flex-col bg-light text-left dark:bg-dark-250 xs:max-w-[430px] sm:max-w-[550px] md:max-w-[600px] lg:max-w-[960px] xl:max-w-[1200px] 2xl:max-w-[1266px] 3xl:max-w-[1460px]">
      <div className="-mx-2.5 flex flex-wrap items-center bg-light-300 py-3 ltr:pl-4 ltr:pr-16 rtl:pl-16 rtl:pr-4 dark:bg-dark-100 md:py-4 ltr:md:pl-6 rtl:md:pr-6 lg:-mx-4 lg:py-5 ltr:xl:pl-8 rtl:xl:pr-8">
        <h2
          title={name}
          className="truncate px-2.5 py-1 text-base font-medium text-dark dark:text-light md:text-lg ltr:lg:pl-4 ltr:lg:pr-5 rtl:lg:pl-5 rtl:lg:pr-4 3xl:text-xl"
        >
          <AnchorLink
            href={slug ? routes.productUrl(slug) : '#'}
            className="transition-colors hover:text-brand"
          >
            {name}
          </AnchorLink>
        </h2>
        <div className="flex flex-shrink-0 items-center px-2.5 py-1">
          <div className="relative flex h-5 w-5 flex-shrink-0 md:h-6 md:w-6">
            <Image
              alt={name}
              fill
              quality={100}
              src={image?.url ?? placeholder}
              className="rounded-full object-cover"
            />
          </div>
          <h3
            title={name}
            className="text-13px font-medium text-dark-600 ltr:pl-2 rtl:pr-2 dark:text-light-800 ltr:md:pl-2.5 rtl:md:pr-2.5"
          >
            <AnchorLink
              href={routes.shopUrl(shop?.slug)}
              className="hover:text-accent transition-colors"
            >
              {shop?.name}
            </AnchorLink>
          </h3>

          <FavoriteButton productId={product?.id} />
        </div>
      </div>
      <div className="flex flex-col p-4 rtl:space-x-reverse md:p-6 lg:flex-row lg:space-x-7 xl:space-x-8 xl:p-8 3xl:space-x-10">
        <div className="mb-4 w-full shrink-0 items-center justify-center overflow-hidden md:mb-6 lg:mb-auto lg:max-w-[480px] xl:flex xl:max-w-[570px] 2xl:max-w-[650px] 3xl:max-w-[795px]">
          <ProductThumbnailGallery gallery={previews} />
        </div>
        <div className="flex shrink-0 flex-col justify-between text-13px lg:w-[400px] xl:w-[520px] 3xl:w-[555px]">
          <div className="pb-7 xs:pb-8 lg:pb-10">
            {content && (
              <div
                className="react-editor-description pb-5 leading-[1.9em] rtl:text-right dark:text-light-600 xl:pb-6 3xl:pb-8"
                dangerouslySetInnerHTML={{ __html: content }}
              />
            )}
            {!is_external && (
              <div className="hidden flex space-x-6 border-t border-light-500 py-3 rtl:space-x-reverse dark:border-dark-500 md:py-4 3xl:py-5">
                {!isFreeItem && (
                  <div className="flex items-center tracking-[.1px] text-dark dark:text-light">
                    <ShoppingCartIcon className="h-[18px] w-[18px] text-dark-900 ltr:mr-2.5 rtl:ml-2.5 dark:text-light-800" />
                    {pluralize(t('text-sale'), orders_count, true)}
                  </div>
                )}
                <div className="hidden flex items-center tracking-[.1px] text-dark dark:text-light">
                  <DownloadIcon className="h-[18px] w-[18px] text-dark-900 ltr:mr-2.5 rtl:ml-2.5 dark:text-light-800" />
                  {pluralize(t('text-download'), total_downloads, true)}
                </div>
              </div>
            )}
            {/* 🔥 BLOC INFOS PRODUIT — VERSION ULTRA PREMIUM backdrop-blur-xl border border-light-300 shadow-[0_8px_30px_rgba(0,0,0,0.04)]*/}
            <div className="relative mt-6 w-full bg-white/70  dark:border-dark-400  dark:bg-dark-300/60">

              {/* BARRE LATÉRALE PREMIUM */}
              <div className="hidden absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-brand to-brand/40 rounded-l-2xl"></div>

              <div className="p-2 md:p-2">

                {/* HEADER */}
                <div className="mb-6 flex items-center justify-between">
                  <h3 className="text-xl md:text-2xl font-semibold text-dark-900 dark:text-light tracking-tight">
                    Informations du produit
                  </h3>

                  {/* BADGE PREMIUM */}
                  <span className="rounded-full bg-brand/10 px-4 py-1.5 text-xs font-semibold text-brand border border-brand/30 shadow-sm">
                    Fiche
                  </span>
                </div>

                <div className="space-y-6 text-sm">

                  {/* PRIX */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 font-medium text-dark-700 dark:text-light-800">
                      <svg className="h-5 w-5 text-brand" fill="none" strokeWidth="2" stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path d="M12 8c-1.657 0-3 1.343-3 3h6c0-1.657-1.343-3-3-3z"></path>
                        <path d="M6 11a6 6 0 0 1 12 0"></path>
                        <path d="M6 11h12"></path>
                      </svg>
                      Prix
                    </div>

                    {product?.sale_price ? (
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-brand">{product.sale_price} $</span>
                        <span className="text-sm line-through text-gray-500">{product.price} $</span>
                      </div>
                    ) : (
                      <span className="text-lg font-semibold text-dark dark:text-light">
                        {product.price} $
                      </span>
                    )}
                  </div>

                  {/* STOCK */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 font-medium text-dark-700 dark:text-light-800">
                      <svg className="h-5 w-5 text-emerald-600" fill="none" strokeWidth="2" stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path d="M12 22s8-4 8-10V5l-8-3L4 5v7c0 6 8 10 8 10z"></path>
                      </svg>
                      Disponibilité
                    </div>

                    <span className={`text-sm font-semibold ${product?.in_stock ? 'text-emerald-600' : 'text-red-500'}`}>
                      {product?.in_stock ? 'En stock' : 'Inddisponible'}
                    </span>
                  </div>

                  {/* VENDEUR ACTIF */}
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-2 font-medium text-dark-700 dark:text-light-800">
                      <svg className="h-5 w-5 text-blue-500" fill="none" strokeWidth="2" stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path d="M5 13l4 4L19 7"></path>
                      </svg>
                      Statut du vendeur
                    </div>

                    <span className={`text-sm font-semibold ${product?.shop?.is_active ? 'text-blue-600' : 'text-red-500'}`}>
                      {product?.shop?.is_active ? 'Vendeur actif' : 'Vendeur suspendu'}
                    </span>
                  </div>

                  {/* VENDEUR VÉRIFIÉ */}
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-2 font-medium text-dark-700 dark:text-light-800">
                      <svg className="h-5 w-5 text-indigo-500" fill="none" strokeWidth="2" stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path d="M9 12l2 2 4-4"></path>
                        <circle cx="12" cy="12" r="9"></circle>
                      </svg>
                      Vérification
                    </div>

                    <span className="text-sm font-semibold text-indigo-600">
                      Vendeur vérifié
                    </span>
                  </div>

                  {/* VENDEUR CERTIFIÉ (commerce_register présent) */}
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-2 font-medium text-dark-700 dark:text-light-800">
                      <svg className="h-5 w-5 text-amber-500" fill="none" strokeWidth="2" stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path d="M12 2l7 4v6c0 5-4 9-7 10-3-1-7-5-7-10V6l7-4z"></path>
                      </svg>
                      Certification légale
                    </div>

                    {product?.shop?.documents?.commerce_register ? (
                      <a
                        href={product?.shop?.documents?.commerce_register?.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-semibold text-amber-600 underline hover:text-amber-700"
                      >
                        Prévisualiser
                      </a>
                    ) : (
                      <span className="text-sm font-semibold text-gray-400">
                        Non certifié
                      </span>
                    )}
                  </div>


                  {/* SKU **/}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 font-medium text-dark-700 dark:text-light-800">
                      <svg className="h-5 w-5 text-indigo-600" fill="none" strokeWidth="2" stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path d="M3 7l1.664 12A2 2 0 0 0 6.655 21h10.69a2 2 0 0 0 1.992-1.74L21 7H3z"></path>
                      </svg>
                      Référence (SKU)
                    </div>

                    <span className="text-sm font-semibold text-dark dark:text-light">
                      {product?.sku ?? '—'}
                    </span>
                  </div>

                  {/* BOUTIQUE */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 font-medium text-dark-700 dark:text-light-800">
                      <svg className="h-5 w-5 text-blue-600" fill="none" strokeWidth="2" stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path d="M4 21v-7a2 2 0 0 1 2-2h3v9h6v-9h3a2 2 0 0 1 2 2v7"></path>
                        <path d="M16 3H8l-4 5h16l-4-5z"></path>
                      </svg>
                      B space
                    </div>

                    <Link
                      href={routes.shopUrl(product?.shop?.slug)}
                      className="text-sm font-semibold text-brand hover:underline"
                    >
                      {product?.shop?.name}
                    </Link>
                  </div>

                  {/* LOCALISATION */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 font-medium text-dark-700 dark:text-light-800">
                      <svg className="h-5 w-5 text-rose-600" fill="none" strokeWidth="2" stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path d="M12 21s-6-5.686-6-10a6 6 0 1 1 12 0c0 4.314-6 10-6 10z"></path>
                        <circle cx="12" cy="11" r="2"></circle>
                      </svg>
                      Localisation
                    </div>

                    <span className="text-sm text-dark dark:text-light">
                      {product?.shop?.address?.city}, {product?.shop?.address?.country}
                    </span>
                  </div>

                  {/* DATE */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 font-medium text-dark-700 dark:text-light-800">
                      <svg className="h-5 w-5 text-orange-500" fill="none" strokeWidth="2" stroke="currentColor"
                        viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="9"></circle>
                        <path d="M12 7v5l3 2"></path>
                      </svg>
                      Dernière mise à jour
                    </div>

                    <span className="text-sm text-dark dark:text-light">
                      {new Date(product?.updated_at).toLocaleDateString()}
                    </span>
                  </div>

                </div>

              </div>
            </div>

            <div className="border-t border-light-500 pt-5 dark:border-dark-500">
              <ProductSocialShare productSlug={slug} />
            </div>
          </div>
          <div className="flex flex-col-reverse items-center xs:flex-row xs:gap-2.5 xs:pb-4 md:flex-nowrap md:gap-3.5 lg:gap-4 3xl:pb-14">
            {is_external ? (
              external_product_url ? (
                <Link
                  href={external_product_url}
                  target="_blank"
                  className="transition-fill-colors pointer-events-auto relative mt-2.5 flex min-h-[46px] w-full flex-1 cursor-pointer items-center justify-center gap-2 rounded bg-brand px-4 py-3 font-semibold text-white opacity-100 duration-200 hover:bg-brand-dark focus:bg-brand-dark xs:mt-0 sm:h-12 md:px-5"
                >
                  {external_product_button_text}
                </Link>
              ) : (
                <span className="text-gray-400 cursor-not-allowed mt-2.5 w-full flex-1 xs:mt-0">
                  {external_product_button_text}
                </span>
              )
            ) : !isFreeItem ? (
              <AddToCart
                item={product}
                toastClassName="-mt-10 xs:mt-0"
                className="mt-2.5 w-full flex-1 xs:mt-0"
              />
            ) : (
              <FreeDownloadButton
                productId={id}
                productSlug={slug}
                productName={name}
                className="mt-2.5 w-full flex-1 xs:mt-0"
              />
            )}


            {Boolean(preview_url) && (
              <a
                href={preview_url}
                rel="noreferrer"
                target="_blank"
                className="transition-fill-colors flex min-h-[46px] w-full flex-1 items-center justify-center gap-2 rounded border border-light-500 bg-transparent px-4 py-3 font-semibold text-dark duration-200 hover:bg-light-400 hover:text-brand focus:bg-light-500 dark:border-dark-600 dark:text-light dark:hover:bg-dark-600 dark:focus:bg-dark-600 sm:h-12 md:px-5"
              >
                {t('text-live-preview')}
              </a>
            )}
          </div>

        </div>
      </div>
      {/**      <TitleComponent subtitle="Découvrez nos produits les plus appréciés">The Best Sellers</TitleComponent>
      <BestSellerGrid />**/}
    </div>
  );
}
