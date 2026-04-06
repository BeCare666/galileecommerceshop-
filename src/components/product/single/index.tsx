import placeholder from '@/assets/images/placeholders/product.svg';
import Certificat from '@/assets/images/certificat.svg';
import Verified from '@/assets/images/verified.svg';
import { motion } from 'framer-motion';
import ProductDetailsPaper from '@/components/product/product-details-paper';
import ProductInformation from '@/components/product/product-information';
import ProductSocialShare from '@/components/product/product-social-share';
import ProductDrawer from '@/components/product/single/premiumDrawer';
import ProductQuestions from '@/components/questions/product-questions';
import AverageRatings from '@/components/review/average-ratings';
import ProductReviews from '@/components/review/product-reviews';
import Image from '@/components/ui/image';
import { getAuthToken, removeAuthToken } from '@/data/client/token.utils';
import { LongArrowIcon } from '@/components/icons/long-arrow-icon';
import AddToCart from '@/components/cart/add-to-cart';
import routes from '@/config/routes';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, ZoomIn, ShieldCheck, Lock, CreditCard } from 'lucide-react';
import Footer from '@/components/footer/footer';
import { Product } from '@/types';
import { isEmpty } from 'lodash';
import { useSanitizeContent } from '@/lib/sanitize-content';
import toast from 'react-hot-toast';
import { useState, useEffect } from "react";
import { useModalAction } from '@/components/modal-views/context';
import { useMe } from '@/data/user';
type SingleProps = {
  product: Product;
};

export function getPreviews(gallery: any[], image: any) {
  if (!isEmpty(gallery) && Array.isArray(gallery)) return gallery;
  if (!isEmpty(image)) return [image, {}];
  return [{}, {}];
}

const fadeInBottom = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.5 } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};


function SpecGrid({ specs }: any) {
  return (
    <div className="grid grid-cols-2 gap-2">
      {specs?.map((spec: any, idx: number) => (
        <div key={idx} className="flex flex-col gap-1 text-xs">
          <span className="text-gray-600 dark:text-gray-400 font-medium">
            {spec.label}
          </span>
          <span className="text-gray-900 dark:text-white font-semibold">
            {spec.value}
          </span>
        </div>
      ))}
    </div>
  );
}

function CertificateModal({ cert, isOpen, onClose }: any) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });

  if (!isOpen) return null;

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? (cert?.images?.length || 1) - 1 : prev - 1));
    setIsZoomed(false);
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev === (cert?.images?.length || 1) - 1 ? 0 : prev + 1));
    setIsZoomed(false);
  };

  const certificateImage = cert?.images?.[currentSlide] || cert?.image || placeholder;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setIsZoomed(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white dark:bg-neutral-900 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-neutral-700 sticky top-0 bg-white dark:bg-neutral-900">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">Certificats</h2>
            <span className="text-blue-600">
              <Image
                alt="Certificat"
                className="w-5 h-5"
                src={Certificat}
                width={20}
                height={20}
              />
            </span>
            <button className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
              ⓘ
            </button>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 dark:hover:bg-neutral-800 rounded"
          >
            ✕
          </button>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
          {/* Left - Certificate Image Carousel */}
          <div className="space-y-4">
            {/* Image Container with Zoom */}
            <div
              className="relative aspect-[3/4] overflow-hidden rounded-lg bg-gray-100 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 group cursor-zoom-in"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              onClick={() => setIsZoomed(!isZoomed)}
            >
              <div
                className={`w-full h-full transition-all duration-300 ${isZoomed ? 'scale-[2.5]' : 'scale-100'
                  }`}
                style={
                  isZoomed
                    ? {
                      transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                    }
                    : {}
                }
              >
                <Image
                  alt="Certificate"
                  fill
                  quality={100}
                  src={certificateImage}
                  className="object-cover"
                />
              </div>

              {/* Zoom Icon */}
              {!isZoomed && (
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="p-2 rounded-full bg-black/80 hover:bg-black text-white">
                    <ZoomIn className="w-5 h-5" />
                  </div>
                </div>
              )}

              {/* Close Zoom Text */}
              {isZoomed && (
                <div className="absolute bottom-3 left-3 text-xs text-white bg-black/70 px-2 py-1 rounded">
                  Cliquez pour fermer le zoom
                </div>
              )}
            </div>

            {/* Navigation Buttons */}
            <div className="hidden flex items-center justify-between gap-2">
              <button
                onClick={handlePrevSlide}
                className="p-2 hover:bg-gray-100 dark:hover:bg-neutral-800 rounded transition active:scale-95"
              >
                <ChevronLeft className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              </button>
              <div className="flex gap-1">
                <span className="text-xs text-gray-600 dark:text-gray-400">
                  {currentSlide + 1} / {cert?.images?.length || 1}
                </span>
              </div>
              <button
                onClick={handleNextSlide}
                className="p-2 hover:bg-gray-100 dark:hover:bg-neutral-800 rounded transition active:scale-95"
              >
                <ChevronRight className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              </button>
            </div>

            {/* Image Thumbnails */}
            {cert?.images?.length > 1 && (
              <div className="flex gap-2 overflow-x-auto py-2">
                {cert.images.map((img: string, idx: number) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setCurrentSlide(idx);
                      setIsZoomed(false);
                    }}
                    className={`flex-shrink-0 w-12 h-12 rounded border-2 transition ${currentSlide === idx
                      ? 'border-blue-600'
                      : 'border-gray-200 dark:border-neutral-700 hover:border-gray-400'
                      }`}
                  >
                    <Image
                      alt={`Thumb ${idx}`}
                      fill
                      quality={80}
                      src={img}
                      className="object-cover rounded"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right - Certificate Details */}
          <div className="space-y-6">
            {/* Tabs */}
            <div className="flex gap-2 border-b border-gray-200 dark:border-neutral-700">
              {['CSA', 'CE', 'CWB'].map((tab) => (
                <button
                  key={tab}
                  className={`px-4 py-2 text-sm font-medium border-b-2 transition ${tab === cert?.type
                    ? 'text-gray-900 dark:text-white border-gray-900 dark:border-white'
                    : 'text-gray-600 dark:text-gray-400 border-transparent hover:text-gray-900'
                    }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Certificate Info */}
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 block mb-1">
                  Type de certificat:
                </label>
                <p className="text-sm text-gray-900 dark:text-white">
                  {cert?.certificateType || 'Autorisé par le fabricant'}
                </p>
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 block mb-1">
                  Période de validité
                </label>
                <p className="text-sm text-gray-900 dark:text-white">
                  {cert?.validityPeriod || '25/04/2025 - 24/05/2026'}
                </p>
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 block mb-1">
                  Autorité de certification
                </label>
                <p className="text-sm text-gray-900 dark:text-white">
                  {cert?.certificationAuthority || 'Other'}
                </p>
              </div>

              {/* Alert Box */}
              <div className="bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-900 rounded-lg p-3">
                <p className="text-xs font-semibold text-orange-600 dark:text-orange-400 mb-2">
                  🔔 Aperçu du certificat
                </p>
                <div className="text-xs text-gray-700 dark:text-gray-300 space-y-2">
                  <div>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      Secteurs applicables:
                    </span>{' '}
                    {cert?.applicableSectors || 'Fabrication de produits de soudage'}
                  </div>
                  <div>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      Régions applicables:
                    </span>{' '}
                    {cert?.applicableRegions || 'Marché canadien et nord-américain'}
                  </div>
                  <div>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      Normes de certification:
                    </span>{' '}
                    {cert?.certificationNorms ||
                      'Normes telles que « W471 » (structures en acier) et « W59 » (procédés de soudage) de l\'Association canadienne de normalisation (CSA)'}
                  </div>
                  <div>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      Avantages:
                    </span>{' '}
                    {cert?.advantages ||
                      'Démontrer que les produits respectent des normes rigoureuses en matière de qualité et de sécurité de la soudure'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function CertificateBadge({ cert, onClick }: any) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center justify-center gap-2 p-3 rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900 hover:bg-blue-100 dark:hover:bg-blue-950/40 transition text-center h-full"
    >
      <div className="relative w-12 h-12">
        <Image
          alt={cert?.label}
          fill
          quality={100}
          src={cert?.badgeIcon}
          className="object-contain"
        />
      </div>
      <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
        {cert?.label}
      </span>
      <span className="text-xs text-gray-600 dark:text-gray-400">
        {cert?.description}
      </span>
    </button>
  );
}
function VisaLogo() {
  return (
    <svg viewBox="0 0 48 32" className="h-4 w-9" aria-label="Visa">
      <rect width="48" height="32" rx="6" fill="#1434CB" />
      <text
        x="50%"
        y="52%"
        textAnchor="middle"
        dominantBaseline="middle"
        fontFamily="Arial, Helvetica, sans-serif"
        fontWeight="800"
        fontSize="14"
        fill="#fff"
      >
        VISA
      </text>
    </svg>
  );
}

function MastercardLogo() {
  return (
    <svg viewBox="0 0 48 32" className="h-4 w-9" aria-label="Mastercard">
      <rect width="48" height="32" rx="6" fill="#fff" stroke="#e5e7eb" />
      <circle cx="20" cy="16" r="8" fill="#EB001B" />
      <circle cx="28" cy="16" r="8" fill="#F79E1B" />
    </svg>
  );
}

function AmexLogo() {
  return (
    <svg viewBox="0 0 48 32" className="h-4 w-9" aria-label="American Express">
      <rect width="48" height="32" rx="6" fill="#2E77BC" />
      <text
        x="50%"
        y="52%"
        textAnchor="middle"
        dominantBaseline="middle"
        fontFamily="Arial, Helvetica, sans-serif"
        fontWeight="800"
        fontSize="10"
        fill="#fff"
      >
        AMEX
      </text>
    </svg>
  );
}

function DiscoverLogo() {
  return (
    <svg viewBox="0 0 48 32" className="h-4 w-9" aria-label="Discover">
      <rect width="48" height="32" rx="6" fill="#fff" stroke="#e5e7eb" />
      <path d="M32 8c0 8-8 8-8 16h16c0-8-8-8-8-16z" fill="#ff7a00" />
      <text
        x="13"
        y="19"
        fontFamily="Arial, Helvetica, sans-serif"
        fontWeight="800"
        fontSize="8"
        fill="#111827"
      >
        DISCOVER
      </text>
    </svg>
  );
}

function PayPalLogo() {
  return (
    <svg viewBox="0 0 48 32" className="h-4 w-9" aria-label="PayPal">
      <rect width="48" height="32" rx="6" fill="#fff" stroke="#e5e7eb" />
      <path d="M16 22h7.5c4 0 6.5-2.2 6.5-5.4 0-3.1-2.5-4.6-6.3-4.6H19l-.8 4.6h4.6c1.2 0 2 .5 2 1.4 0 1.2-1.2 2-2.8 2H18l-2 2z" fill="#003087" />
      <path d="M18 22l2-12h6.1c3.7 0 6.3 1.5 6.3 4.6 0 .4 0 .8-.1 1.1 0 0-1.9-2.1-5.2-2.1H22.5l-.7 4.1h4.6c1.6 0 2.7.7 2.7 1.9 0 .5-.1 1-.3 1.4H18z" fill="#009cde" opacity="0.9" />
    </svg>
  );
}
function ProductSpecs() {
  const data = [
    { label: 'Utilisation', value: 'Atelier, usine', label2: 'Matériel', value2: 'Acier' },
    { label: 'Type de produit', value: 'Structure en acier', label2: 'Garantie', value2: '1 AN' },
    {
      label: 'Service après - vente',
      value: 'Support technique en ligne, Installation sur site, Formation sur place',
      label2: 'Solution de projet Capacité',
      value2: '3D modèle conception',
    },
    { label: 'Style de conception', value: 'Moderne', label2: 'Application', value2: 'Entrepôt, Atelier' },
    { label: "Point d'origine", value: 'Liaoning, China', label2: 'Marque nom', value2: 'SYLY' },
    { label: 'Numéro de Type', value: 'Q235B Q355B', label2: 'Product name', value2: 'Warehouse Workshop Prefab Metal Buildings' },
    { label: 'Certificate', value: 'ISO9001:2008', label2: 'Color', value2: 'Optional' },
  ];

  return (
    <div className="mt-6">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Caractéristiques du produit
      </h2>

      <div className="border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden">
        {data.map((row, index) => (
          <div
            key={index}
            className={`grid grid-cols-2 md:grid-cols-4 ${index % 2 === 0
              ? 'bg-gray-50 dark:bg-white/5'
              : 'bg-white dark:bg-[#0B0B0C]'
              }`}
          >
            {/* Col 1 */}
            <div className="p-3 text-xs text-gray-500 dark:text-gray-400 border-b md:border-b-0 md:border-r border-gray-200 dark:border-gray-800">
              {row.label}
            </div>

            <div className="p-3 text-sm font-medium text-gray-900 dark:text-white border-b md:border-b-0 md:border-r border-gray-200 dark:border-gray-800">
              {row.value}
            </div>

            {/* Col 2 */}
            <div className="p-3 text-xs text-gray-500 dark:text-gray-400 border-b md:border-b-0 md:border-r border-gray-200 dark:border-gray-800">
              {row.label2}
            </div>

            <div className="p-3 text-sm font-medium text-gray-900 dark:text-white border-b md:border-b-0 border-gray-200 dark:border-gray-800">
              {row.value2}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
const Single: React.FC<SingleProps> = ({ product }) => {
  const { t } = useTranslation('common');
  const router = useRouter();
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const [selectedCertIdx, setSelectedCertIdx] = useState<number | null>(null);
  const [open, setOpen] = useState(false);
  const API_URL = process.env.NEXT_PUBLIC_REST_API_ENDPOINT;
  if (!API_URL) throw new Error("NEXT_PUBLIC_REST_API_ENDPOINT n'est pas défini !");
  const API_BASE = `${API_URL}`;
  const token = getAuthToken();
  //if (!token) router.push('/login');
  //useEffect(() => {
  //}, [token, router]);
  const handleInquiry = async (data: any) => {
    const toastId = toast.loading('Envoi de la demande...');
    if (!token) {
      router.push('/login');
    }
    try {
      const res = await fetch(`${API_BASE}/inquiries`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error('Erreur serveur');
      }

      toast.success('Demande envoyée au fournisseur ✅', {
        id: toastId,
      });

    } catch (error) {
      console.error(error);

      toast.error('Échec de l’envoi ❌', {
        id: toastId,
      });
    }
  };
  // ✅ SUBMIT
  const handleSubmit = () => {
    const sizeSelected = product.unit;
    const payload = {
      product_id: product.id,
      product_name: product.name,
      shop_id: product.shop_id,

      quantity: 1,
      unit: product.unit,
      unit_price: product.sale_price / product.unit,
      total: product.sale_price,

      selected_options: {
        size: product.sale_price / sizeSelected,
      },
    };

    handleInquiry(payload);
    //onClose();
  };
  const { openModal } = useModalAction();
  const { isAuthorized } = useMe();

  const handleOpenQuestion = () => {
    if (!isAuthorized) {
      openModal('LOGIN_VIEW');
      return;
    }

    openModal('QUESTION_FORM', {
      product_id: product?.id,
      shop_id: product?.shop?.id,
    });
  };
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
  console.log(product);
  const previews = getPreviews(gallery, image);
  const content = useSanitizeContent({ description: description });
  const [zoomStyle, setZoomStyle] = useState({ transformOrigin: 'center' })
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    ;
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

    setZoomStyle({
      transformOrigin: `${x}% ${y}%`,
    });
  };
  const allMedia = [
    ...previews.map((img: any) => ({ type: 'image', url: img?.url ?? placeholder, id: img?.id })),
    ...(video?.length ? video.map((item: any) => ({ type: 'video', url: item.url, id: item.id })) : []),
  ];

  const productSpecs = [
    { label: 'Type', value: type?.name || 'N/A' },
    { label: 'SKU', value: product?.sku || 'N/A' },
    {
      label: 'Certification', value: product?.shop?.documents?.commerce_register ? 'Non certifié' : `<div className="text-gray-600 dark:text-gray-400 text-xs mt-2">
                        <Image
                          alt="Verified"
                          className="w-20 h-50 object-contain"
                          src={Verified}
                          width={20}
                          height={50}
                        />

                      </div>`
    },
    { label: 'Localisation', value: `${product?.shop?.address?.city}` },
  ];
  const verifiedIsCategorie = ['2', '300', '1', '9', '15', '16'];

  const isCategorie = product.categories.some((cat: any) =>
    verifiedIsCategorie.includes(String(cat.categories_id))
  );

  //console.log('isCategorie', isCategorie);
  const certificates = [
    {
      badgeIcon: 'https://s.alicdn.com/@sc04/kf/H4d63ce257be542828ef4196e9c3d45cdw.png',
      label: 'CSA',
      description: 'Conforme en mat...',
      type: 'CSA',
      certificateType: 'Autorisé par le fabricant',
      validityPeriod: '25/04/2025 - 24/05/2026',
      certificationAuthority: 'Canadian Standards Association',
      applicableSectors: 'Fabrication de produits de soudage',
      applicableRegions: 'Marché canadien et nord-américain',
      certificationNorms: 'Normes telles que « W471 » (structures en acier) et « W59 » (procédés de soudage) de l\'Association canadienne de normalisation (CSA)',
      advantages: 'Démontrer que les produits respectent des normes rigoureuses en matière de qualité et de sécurité de la soudure',
      images: [
        'https://sc04.alicdn.com/kf/H23a933f51d434bc782389c7a91ef6b3bz.jpg',
      ],
    },
    {
      badgeIcon: 'https://s.alicdn.com/@sc04/kf/Hdbbb6a106e8d4515be692063768d8fd4J.png',
      label: 'CE',
      description: 'Conforme aux nor...',
      type: 'CE',
      certificateType: 'Autorisé par le fabricant',
      validityPeriod: '25/04/2025 - 24/05/2026',
      certificationAuthority: 'European Commission',
      applicableSectors: 'Fabrication de produits de soudage',
      applicableRegions: 'Marché européen',
      certificationNorms: 'Conformité européenne EN ISO',
      advantages: 'Accès au marché européen et reconnaissance internationale',
      images: [
        'https://sc04.alicdn.com/kf/H4900deeef2a64f67bbe85e6175d14fb27.png',
      ],
    },
    {
      badgeIcon: 'https://s.alicdn.com/@sc04/kf/H01e7137dcba34b9a9182d0fd0aa347f8L.png',
      label: 'CWB',
      description: 'Excellence en sou...',
      type: 'CWB',
      certificateType: 'Autorisé par le fabricant',
      validityPeriod: '25/04/2025 - 24/05/2026',
      certificationAuthority: 'Canadian Welding Bureau',
      applicableSectors: 'Fabrication de produits de soudage',
      applicableRegions: 'Marché nord-américain',
      certificationNorms: 'Normes CWB AWS D1.1/D1.5',
      advantages: 'Excellence en soudage et qualification professionnelle',
      images: [
        'https://sc04.alicdn.com/kf/H9015e98f1148421ea0a874ee3f4d2a52p.jpg',
      ],
    },
  ];

  return (
    <>
      <div className="relative bg-white dark:bg-neutral-950">
        <div className="h-full min-h-screen px-4 sm:px-6 lg:px-8 py-6">
          {/* Back button */}
          <div className="hidden mb-6 flex items-center">
            <button
              onClick={() => router.push(routes?.home)}
              className="group inline-flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition"
            >
              <LongArrowIcon className="h-4 w-4" />
              {t('text-back')}
            </button>
          </div>

          {/* Main Grid: Image (left + bottom content) + Sidebar (right sticky) */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* LEFT - Image Gallery + Bottom Content */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex gap-6">

                {/* Thumbnails verticales */}
                <div className="flex flex-col gap-2 hidden lg:flex">
                  {allMedia.map((media: any, idx: number) => (
                    <motion.button
                      key={idx}
                      onClick={() => setSelectedImageIdx(idx)}
                      className={`relative w-20 h-20 mt-5 overflow-hidden transition-all ${selectedImageIdx === idx
                        ? 'ring-2 ring-[#E4127A]'
                        : 'ring-1 ring-gray-200 dark:ring-neutral-700 hover:ring-gray-300'
                        }`}
                    >
                      {media.type === 'image' ? (
                        <Image
                          alt={`Product ${idx}`}
                          fill
                          src={media.url}
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-black flex items-center justify-center text-white">
                          ▶
                        </div>
                      )}
                    </motion.button>
                  ))}
                </div>

                {/* Image principale */}

                <motion.div
                  onMouseMove={handleMouseMove}
                  className="relative w-full aspect-[4/3] overflow-hidden rounded-lg bg-gray-100 group"
                >
                  <Image
                    alt={name}
                    fill
                    src={allMedia[selectedImageIdx]?.url ?? placeholder}
                    className="object-cover transition-transform duration-300 group-hover:scale-150"
                    style={zoomStyle}
                  />

                  {/* NAVIGATION */}
                  <button
                    onClick={() =>
                      setSelectedImageIdx((prev) =>
                        prev === 0 ? allMedia.length - 1 : prev - 1
                      )
                    }
                    className="absolute left-3 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white shadow hover:scale-110"
                  >
                    ←
                  </button>

                  <button
                    onClick={() =>
                      setSelectedImageIdx((prev) =>
                        prev === allMedia.length - 1 ? 0 : prev + 1
                      )
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white shadow hover:scale-110"
                  >
                    →
                  </button>

                  {/* ACTIONS */}
                  <div className="hidden absolute top-3 right-3 flex gap-2 z-20 opacity-0 group-hover:opacity-100">
                    <button className="p-2 rounded-full bg-white shadow">♡</button>
                    <button className="p-2 rounded-full bg-white shadow">⛶</button>
                  </div>

                  {/* CURSOR + */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <span className="text-5xl text-gray-400 opacity-0 group-hover:opacity-100">
                      +
                    </span>
                  </div>
                </motion.div>
              </div>

              {/* Description Section */}
              {content ? (
                <div className="space-y-2">
                  <h1 className="font-bold text-gray-900 dark:text-white uppercase tracking-wide">
                    {product.name}
                  </h1>

                  <h3 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wide">
                    Description
                  </h3>

                  <div
                    className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed prose max-w-none"
                    dangerouslySetInnerHTML={{ __html: content }}
                  />
                </div>
              ) : null}
              {/* RIGHT - Pricing Sidebar (Sticky) */}
              <div className="lg:col-span-1 lg:hidden">
                <motion.div
                  variants={fadeInBottom}
                  initial="hidden"
                  animate="show"
                  className="sticky top-6 space-y-4"
                >
                  {/* Price Card */}
                  <div className="bg-white dark:bg-neutral-900 rounded-lg p-4">
                    {/* Prix */}
                    <div className="pb-4 mb-4 border-b border-gray-200 dark:border-neutral-700">
                      {product?.sale_price ? (
                        <div className="space-y-1">
                          <div className="text-xs text-gray-600 dark:text-gray-400">Prix</div>
                          <div className="flex items-baseline gap-2">
                            <span className="hidden text-xs text-gray-600">$</span>
                            <span className="text-2xl font-bold text-[#E4127A]">
                              {product.sale_price} $ / {product.unit} unité(s)
                            </span>

                          </div>
                          <span className="text-xs line-through text-gray-400">
                            {product.price} $ / {product.unit} unité(s)
                          </span>
                        </div>
                      ) : (
                        <div className="space-y-1">
                          <div className="text-xs text-gray-600 dark:text-gray-400">Prix</div>
                          <div className="flex items-baseline gap-2">
                            <span className="text-2xl font-bold text-gray-900 dark:text-white">
                              {product.price}
                            </span>
                            <span className="text-xs text-gray-600">$</span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Taille */}
                    <div className="pb-4 mb-4 border-b border-gray-200 dark:border-neutral-700">
                      <div className="text-xs font-semibold text-gray-900 dark:text-white mb-2">Taille</div>
                      <button onClick={() => setOpen(true)} className="px-3 py-2 rounded-lg border border-gray-300 dark:border-neutral-700 text-xs font-medium text-gray-700 dark:text-gray-300 hover:border-gray-400">
                        Customized
                      </button>
                    </div>

                    {/* Disponibilité */}
                    <div className="pb-4 mb-4 border-b border-gray-200 dark:border-neutral-700">
                      <div className="text-xs font-semibold text-gray-900 dark:text-white mb-2">Disponibilité</div>
                      <div className="flex items-center gap-1">
                        <span className={`w-2 h-2 rounded-full ${product?.in_stock ? 'bg-green-500' : 'bg-red-500'}`} />
                        <span className={`text-xs font-medium ${product?.in_stock ? 'text-green-600' : 'text-[#E4127A]'}`}>
                          {product?.in_stock ? 'En stock' : 'Indisponible'}
                        </span>
                      </div>
                    </div>

                    {/* Fournisseur Status */}
                    <div className="pb-4 mb-4 border-b border-gray-200 dark:border-neutral-700">
                      <div className="text-xs font-semibold text-gray-900 dark:text-white mb-2">Fournisseur</div>
                      <div className="flex items-center gap-1">
                        <span className={`w-2 h-2 rounded-full ${product?.shop?.is_active ? 'bg-blue-500' : 'bg-red-500'}`} />
                        <span className={`text-xs font-medium ${product?.shop?.is_active ? 'text-blue-600' : 'text-[#E4127A]'}`}>
                          {product?.shop?.is_active ? 'Actif' : 'Suspendu'}
                        </span>
                      </div>
                    </div>

                    {/* Shop Info */}
                    <div className="pb-4 mb-4 border-b border-gray-200 dark:border-neutral-700 text-xs">
                      <div className="text-gray-600 dark:text-gray-400 mb-1 font-semibold">Fournisseur</div>
                      <Link
                        href={routes.shopUrl(product?.shop?.slug)}
                        className="text-blue-600 dark:text-blue-400 font-semibold hover:underline text-xs block"
                      >
                        {product?.shop?.name}
                      </Link>
                      <div className="text-gray-600 dark:text-gray-400 text-xs mt-2">
                        <Image
                          alt="Verified"
                          className="w-20 h-50 object-contain"
                          src={Verified}
                          width={20}
                          height={50}
                        />

                      </div>
                      <div className="hidden text-gray-600 dark:text-gray-400 text-xs">2 ans · 🇨🇳 CN</div>
                    </div>

                    {/* Buttons    */}
                    <div className="space-y-2">
                      {isCategorie ? (
                        <button onClick={handleSubmit} className="w-full bg-[#E4127A] hover:bg-orange-500 text-white font-bold py-2.5 rounded-lg transition text-sm">
                          Envoyer une demande
                        </button>
                      ) : (
                        <AddToCart
                          item={{
                            ...product,
                            id: String(product.id), // 🛠️ forcer id en string
                          }}
                          renderButton={(params: {
                            onClick: () => void;
                            isLoading: boolean;
                            disabled: boolean;
                            success: boolean;
                            price?: string;
                          }) => {
                            const { onClick, isLoading, disabled, price } = params;
                            return (
                              <button
                                onClick={onClick}
                                disabled={disabled}
                                className="flex items-center justify-center w-full bg-[#E4127A] hover:bg-orange-500 text-white font-bold py-2.5 rounded-lg transition text-sm"
                              >
                                <svg
                                  width="22"
                                  height="22"
                                  fill="white"
                                  viewBox="0 0 24 24"
                                  className="text-pink-500"
                                >
                                  <path
                                    d="M6 6h15l-1.5 9h-13z"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                  />
                                  <circle cx="9" cy="20" r="1" fill="white" />
                                  <circle cx="18" cy="20" r="1" fill="wite" />
                                </svg>
                                <span> Ajouter au panier</span>
                              </button>
                            );
                          }}
                        />
                      )}

                      <button onClick={handleOpenQuestion} className="w-full border border-gray-300 dark:border-neutral-700 text-gray-900 dark:text-gray-100 font-semibold py-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-neutral-900 transition text-sm">
                        Discuter ici
                      </button>
                    </div>
                    { /** protect**/}
                    <div className="mt-5 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0B0B0C] shadow-sm overflow-hidden">

                      {/* Header */}
                      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-gray-800">
                        <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                          Protection des commandes galileecommerce.com
                        </h3>
                        <ChevronRight className="w-4 h-4 text-gray-400" />
                      </div>

                      {/* Content */}
                      <div className="p-4 space-y-5">

                        {/* Paiements sécurisés */}
                        <div className="flex gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 dark:bg-green-500/10">
                            <CreditCard className="w-5 h-5 text-green-600 dark:text-green-400" />
                          </div>

                          <div>
                            <div className="text-sm font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                              Paiements sécurisés

                              {/* Fake logos (tu peux remplacer par images réelles) */}
                              <div className="flex gap-1 ml-2">
                                <div className="flex items-center gap-3">
                                  <div className="flex items-center gap-2">
                                    <div className=" overflow-hidden shadow-sm ring-1 ring-gray-200 bg-white">
                                      <VisaLogo />
                                    </div>
                                    <div className=" overflow-hidden shadow-sm ring-1 ring-gray-200 bg-white">
                                      <MastercardLogo />
                                    </div>
                                    <div className=" overflow-hidden shadow-sm ring-1 ring-gray-200 bg-white">
                                      <AmexLogo />
                                    </div>
                                    <div className=" overflow-hidden shadow-sm ring-1 ring-gray-200 bg-white">
                                      <DiscoverLogo />
                                    </div>
                                    <div className=" overflow-hidden shadow-sm ring-1 ring-gray-200 bg-white">
                                      <PayPalLogo />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">
                              Chaque paiement effectué sur galileecommerce.com est sécurisé grâce
                              à un cryptage SSL avancé et des normes PCI DSS.
                            </p>
                          </div>
                        </div>

                        {/* Protection remboursement */}
                        <div className="flex gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-500/10">
                            <ShieldCheck className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                          </div>

                          <div>
                            <div className="text-sm font-semibold text-gray-900 dark:text-white">
                              Protection de remboursement
                            </div>

                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">
                              Obtenez un remboursement si votre commande n'est pas expédiée,
                              introuvable ou arrive avec des problèmes liés au produit.
                            </p>
                          </div>
                        </div>

                        {/* Footer */}
                        <div className="text-[11px] text-gray-400 dark:text-gray-500 pt-2 border-t border-gray-100 dark:border-gray-800">
                          Seules les commandes passées et payées via galileecommerce.com sont
                          protégées gratuitement par notre garantie commerciale.
                        </div>

                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
              {/* Caractéristiques Section */}
              <ProductSpecs />
              <div className="hidden space-y-2 ">
                <h3 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wide">Caractéristiques</h3>
                <SpecGrid specs={productSpecs} />
              </div>

              {/* Certifications Section */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white">Certificats</h3>
                  <span className="text-blue-600">
                    <Image
                      alt="Certificat"
                      className="w-5 h-5"
                      src={Certificat}
                      width={20}
                      height={20}
                    />
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {certificates.map((cert, idx) => (
                    <CertificateBadge
                      key={idx}
                      cert={cert}
                      onClick={() => setSelectedCertIdx(idx)}
                    />
                  ))}
                </div>
              </div>

              {/* Certificate Modal */}
              <CertificateModal
                cert={selectedCertIdx !== null ? certificates[selectedCertIdx] : null}
                isOpen={selectedCertIdx !== null}
                onClose={() => setSelectedCertIdx(null)}
              />


              {/* Protection Section */}
              <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0B0B0C] p-4 shadow-sm">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wide mb-4">
                  Protection
                </h3>

                <div className="space-y-3">

                  {/* Paiement sécurisé */}
                  <div className="group flex items-start gap-3 p-3 rounded-xl transition-all duration-300 hover:bg-gray-50 dark:hover:bg-white/5">

                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-black/5 dark:bg-white/10">
                      <Lock className="w-5 h-5 text-green dark:text-white" />
                    </div>

                    <div>
                      <div className="text-sm font-semibold text-gray-900 dark:text-white">
                        Paiements sécurisés
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Cryptage SSL & protection des données
                      </p>
                    </div>
                  </div>

                  {/* Protection acheteur */}
                  <div className="group flex items-start gap-3 p-3 rounded-xl transition-all duration-300 hover:bg-gray-50 dark:hover:bg-white/5">

                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-black/5 dark:bg-white/10">
                      <ShieldCheck className="w-5 h-5 text-green dark:text-white" />
                    </div>

                    <div>
                      <div className="text-sm font-semibold text-gray-900 dark:text-white">
                        Protection acheteur
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Remboursement garanti en cas de problème
                      </p>
                    </div>
                  </div>

                </div>
              </div>

              {/* Product Information */}
              <motion.div
                variants={fadeInBottom}
                initial="hidden"
                animate="show"
              >
                <ProductInformation
                  tags={tags}
                  created_at={created_at}
                  updated_at={updated_at}
                  layoutType={type?.name}
                  //@ts-ignore
                  icon={type?.icon}
                  className="text-xs"
                />
              </motion.div>

              {/* Reviews - Full width */}
              <div className="mt-16 space-y-6">
                <motion.div
                  variants={fadeInBottom}
                  initial="hidden"
                  animate="show"
                >
                  <AverageRatings
                    ratingCount={rating_count}
                    totalReviews={total_reviews}
                    ratings={ratings}
                  />
                </motion.div>

                <motion.div
                  variants={fadeInBottom}
                  initial="hidden"
                  animate="show"
                >
                  <ProductReviews productId={id} />
                </motion.div>

                <motion.div
                  variants={fadeInBottom}
                  initial="hidden"
                  animate="show"
                >
                  <ProductQuestions
                    productId={product?.id}
                    shopId={product?.shop?.id}
                    onAskQuestion={handleOpenQuestion}
                  />
                </motion.div>
              </div>

              {/* Social Share */}
              <ProductSocialShare productSlug={slug} className="lg:hidden mt-4 pt-4 border-t" />
            </div>

            {/* RIGHT - Pricing Sidebar (Sticky) */}
            <div className="lg:col-span-1 hidden lg:block ">
              <motion.div
                variants={fadeInBottom}
                initial="hidden"
                animate="show"
                className="sticky top-6 space-y-4"
              >
                {/* Price Card */}
                <div className="bg-white dark:bg-neutral-900 rounded-lg p-4">
                  {/* Prix */}
                  <div className="pb-4 mb-4 border-b border-gray-200 dark:border-neutral-700">
                    {product?.sale_price ? (
                      <div className="space-y-1">
                        <div className="text-xs text-gray-600 dark:text-gray-400">Prix</div>
                        <div className="flex items-baseline gap-2">
                          <span className="hidden text-xs text-gray-600">$</span>
                          <span className="text-2xl font-bold text-[#E4127A]">
                            {product.sale_price} $ / {product.unit} unité(s)
                          </span>

                        </div>
                        <span className="text-xs line-through text-gray-400">
                          {product.price} $ / {product.unit} unité(s)
                        </span>
                      </div>
                    ) : (
                      <div className="space-y-1">
                        <div className="text-xs text-gray-600 dark:text-gray-400">Prix</div>
                        <div className="flex items-baseline gap-2">
                          <span className="text-2xl font-bold text-gray-900 dark:text-white">
                            {product.price}
                          </span>
                          <span className="text-xs text-gray-600">$</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Taille */}
                  <div className="pb-4 mb-4 border-b border-gray-200 dark:border-neutral-700">
                    <div className="text-xs font-semibold text-gray-900 dark:text-white mb-2">Taille</div>
                    <button onClick={() => setOpen(true)} className="px-3 py-2 rounded-lg border border-gray-300 dark:border-neutral-700 text-xs font-medium text-gray-700 dark:text-gray-300 hover:border-gray-400">
                      Customized
                    </button>
                  </div>

                  {/* Disponibilité */}
                  <div className="pb-4 mb-4 border-b border-gray-200 dark:border-neutral-700">
                    <div className="text-xs font-semibold text-gray-900 dark:text-white mb-2">Disponibilité</div>
                    <div className="flex items-center gap-1">
                      <span className={`w-2 h-2 rounded-full ${product?.in_stock ? 'bg-green-500' : 'bg-red-500'}`} />
                      <span className={`text-xs font-medium ${product?.in_stock ? 'text-green-600' : 'text-[#E4127A]'}`}>
                        {product?.in_stock ? 'En stock' : 'Indisponible'}
                      </span>
                    </div>
                  </div>

                  {/* Fournisseur Status */}
                  <div className="pb-4 mb-4 border-b border-gray-200 dark:border-neutral-700">
                    <div className="text-xs font-semibold text-gray-900 dark:text-white mb-2">Fournisseur</div>
                    <div className="flex items-center gap-1">
                      <span className={`w-2 h-2 rounded-full ${product?.shop?.is_active ? 'bg-blue-500' : 'bg-red-500'}`} />
                      <span className={`text-xs font-medium ${product?.shop?.is_active ? 'text-blue-600' : 'text-[#E4127A]'}`}>
                        {product?.shop?.is_active ? 'Actif' : 'Suspendu'}
                      </span>
                    </div>
                  </div>

                  {/* Shop Info */}
                  <div className="pb-4 mb-4 border-b border-gray-200 dark:border-neutral-700 text-xs">
                    <div className="text-gray-600 dark:text-gray-400 mb-1 font-semibold">Fournisseur</div>
                    <Link
                      href={routes.shopUrl(product?.shop?.slug)}
                      className="text-blue-600 dark:text-blue-400 font-semibold hover:underline text-xs block"
                    >
                      {product?.shop?.name}
                    </Link>
                    <div className="text-gray-600 dark:text-gray-400 text-xs mt-2">
                      <Image
                        alt="Verified"
                        className="w-20 h-50 object-contain"
                        src={Verified}
                        width={20}
                        height={50}
                      />

                    </div>
                    <div className="hidden text-gray-600 dark:text-gray-400 text-xs">2 ans · 🇨🇳 CN</div>
                  </div>

                  {/* Buttons    */}
                  <div className="space-y-2">
                    {isCategorie ? (
                      <button onClick={handleSubmit} className="w-full bg-[#E4127A] hover:bg-orange-500 text-white font-bold py-2.5 rounded-lg transition text-sm">
                        Envoyer une demande
                      </button>
                    ) : (
                      <AddToCart
                        item={{
                          ...product,
                          id: String(product.id), // 🛠️ forcer id en string
                        }}
                        renderButton={(params: {
                          onClick: () => void;
                          isLoading: boolean;
                          disabled: boolean;
                          success: boolean;
                          price?: string;
                        }) => {
                          const { onClick, isLoading, disabled, price } = params;
                          return (
                            <button
                              onClick={onClick}
                              disabled={disabled}
                              className="flex items-center justify-center w-full bg-[#E4127A] hover:bg-orange-500 text-white font-bold py-2.5 rounded-lg transition text-sm"
                            >
                              <svg
                                width="22"
                                height="22"
                                fill="white"
                                viewBox="0 0 24 24"
                                className="text-pink-500"
                              >
                                <path
                                  d="M6 6h15l-1.5 9h-13z"
                                  stroke="currentColor"
                                  strokeWidth="1.5"
                                />
                                <circle cx="9" cy="20" r="1" fill="white" />
                                <circle cx="18" cy="20" r="1" fill="wite" />
                              </svg>
                              <span> Ajouter au panier</span>
                            </button>
                          );
                        }}
                      />
                    )}
                    <button onClick={handleOpenQuestion} className="w-full border border-gray-300 dark:border-neutral-700 text-gray-900 dark:text-gray-100 font-semibold py-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-neutral-900 transition text-sm">
                      Discuter ici
                    </button>
                  </div>
                  { /** protect**/}
                  <div className="mt-5 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0B0B0C] shadow-sm overflow-hidden">

                    {/* Header */}
                    <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-gray-800">
                      <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                        Protection des commandes galileecommerce.com
                      </h3>
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    </div>

                    {/* Content */}
                    <div className="p-4 space-y-5">

                      {/* Paiements sécurisés */}
                      <div className="flex gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 dark:bg-green-500/10">
                          <CreditCard className="w-5 h-5 text-green-600 dark:text-green-400" />
                        </div>

                        <div>
                          <div className="text-sm font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                            Paiements sécurisés

                            {/* Fake logos (tu peux remplacer par images réelles) */}
                            <div className="flex gap-1 ml-2">
                              <div className="flex items-center gap-3">
                                <div className="flex items-center gap-2">
                                  <div className=" overflow-hidden shadow-sm ring-1 ring-gray-200 bg-white">
                                    <VisaLogo />
                                  </div>
                                  <div className=" overflow-hidden shadow-sm ring-1 ring-gray-200 bg-white">
                                    <MastercardLogo />
                                  </div>
                                  <div className=" overflow-hidden shadow-sm ring-1 ring-gray-200 bg-white">
                                    <AmexLogo />
                                  </div>
                                  <div className=" overflow-hidden shadow-sm ring-1 ring-gray-200 bg-white">
                                    <DiscoverLogo />
                                  </div>
                                  <div className=" overflow-hidden shadow-sm ring-1 ring-gray-200 bg-white">
                                    <PayPalLogo />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">
                            Chaque paiement effectué sur galileecommerce.com est sécurisé grâce
                            à un cryptage SSL avancé et des normes PCI DSS.
                          </p>
                        </div>
                      </div>

                      {/* Protection remboursement */}
                      <div className="flex gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-500/10">
                          <ShieldCheck className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        </div>

                        <div>
                          <div className="text-sm font-semibold text-gray-900 dark:text-white">
                            Protection de remboursement
                          </div>

                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">
                            Obtenez un remboursement si votre commande n'est pas expédiée,
                            introuvable ou arrive avec des problèmes liés au produit.
                          </p>
                        </div>
                      </div>

                      {/* Footer */}
                      <div className="text-[11px] text-gray-400 dark:text-gray-500 pt-2 border-t border-gray-100 dark:border-gray-800">
                        Seules les commandes passées et payées via galileecommerce.com sont
                        protégées gratuitement par notre garantie commerciale.
                      </div>

                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
      <ProductDrawer
        open={open}
        onClose={() => setOpen(false)}
        product={product}
        onSubmit={handleInquiry}
      />
      <Footer />
    </>
  );
};

export default Single;