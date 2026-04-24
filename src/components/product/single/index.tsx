import React from "react";
import placeholder from '@/assets/images/placeholders/product.svg';
import Certificat from '@/assets/images/certificat.svg';
import Verified from '@/assets/images/verified.svg';
import Notverified from '@/assets/images/notverified.png';
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
import { useMemo, useCallback } from "react";
import Link from 'next/link';
import {
  ChevronLeft, ZoomIn, ChevronDown,
  ChevronUp,
  ChevronRight,
  Share2,
  BadgeCheck,
  RefreshCcw, ShieldCheck, Lock, CreditCard, Store,
  Instagram, Music2, Facebook, Twitter, Linkedin, Copy, X
} from 'lucide-react';
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
              className="relative h-[420px] w-full flex items-center justify-center overflow-hidden rounded-lg bg-gray-100 border"
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
                  className="object-contain"
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
            <div className="flex gap-2 border-b border-gray-200 dark:border-neutral-700 hidden">
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
                  {cert?.validityPeriod || '25/04/2025 - 24/05/2027'}
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
function CertificateBadgeheader({ cert, onClick }: any) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center justify-center gap-2 p-3 rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900 hover:bg-blue-100 dark:hover:bg-blue-950/40 transition text-center h-full"
    >
      <div className="relative w-5 h-5">
        <Image
          alt={cert?.label}
          fill
          quality={100}
          src={cert?.badgeIcon}
          className="object-contain"
        />
      </div>
      <span className="hidden text-xs font-semibold text-gray-700 dark:text-gray-300">
        {cert?.label}
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
function ProductPrepair({ data }: { data: any[] }) {
  return (
    <div className="mt-6">
      <h2 className="text-lg font-semibold mb-4">
        Délai de préparation de la commande
      </h2>

      <div className="border border-gray-200 dark:border-gray-800">
        {data.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className={`grid ${row.length === 1
              ? 'grid-cols-2'
              : row.length === 2
                ? 'grid-cols-2 md:grid-cols-4'
                : 'grid-cols-2 md:grid-cols-6'
              }`}
          >
            {row.map((item: any, i: number) => (
              <React.Fragment key={i}>
                <div className="p-3 text-xs text-gray-500 border">
                  {item.label}
                </div>
                <div className="p-3 text-sm font-medium border">
                  {item.value}
                </div>
              </React.Fragment>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
function ProductTimeShipping({ data }: { data: any[] }) {
  return (
    <div className="mt-6">
      <h2 className="text-lg font-semibold mb-4">
        Emballage et livraison
      </h2>

      <div className="border border-gray-200 dark:border-gray-800">
        {data.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className={`grid ${row.length === 1
              ? 'grid-cols-2'
              : row.length === 2
                ? 'grid-cols-2 md:grid-cols-4'
                : 'grid-cols-2 md:grid-cols-6'
              }`}
          >
            {row.map((item: any, i: number) => (
              <React.Fragment key={i}>
                <div className="p-3 text-xs text-gray-500 border">
                  {item.label}
                </div>
                <div className="p-3 text-sm font-medium border">
                  {item.value}
                </div>
              </React.Fragment>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
function ProductSpecs({ data }: { data: any[] }) {
  return (
    <div className="mt-6">
      <h2 className="text-lg font-semibold mb-4">
        Caractéristiques du produit
      </h2>

      <div className="border border-gray-200 dark:border-gray-800">
        {data.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className={`grid ${row.length === 1
              ? 'grid-cols-2'
              : row.length === 2
                ? 'grid-cols-2 md:grid-cols-4'
                : 'grid-cols-2 md:grid-cols-6'
              }`}
          >
            {row.map((item: any, i: number) => (
              <React.Fragment key={i}>
                <div className="p-3 text-xs text-gray-500 border">
                  {item.label}
                </div>
                <div className="p-3 text-sm font-medium border">
                  {item.value}
                </div>
              </React.Fragment>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
function ShareItem({
  icon,
  label,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center gap-2 active:scale-95 transition"
    >
      <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
        {icon}
      </div>
      <span className="text-xs text-gray-700">{label}</span>
    </button>
  );
}
function FacebookIcon() {
  return <span className="text-sm font-bold text-blue-600">f</span>;
}

function TwitterIcon() {
  return <span className="text-sm font-bold text-black">X</span>;
}

function WhatsappIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 32 32" fill="currentColor" {...props}>
      <path d="M19.11 17.56c-.28-.14-1.65-.82-1.91-.91-.26-.1-.45-.14-.64.14-.19.28-.73.91-.89 1.1-.16.19-.32.21-.6.07-.28-.14-1.18-.43-2.25-1.38-.83-.74-1.39-1.65-1.55-1.93-.16-.28-.02-.43.12-.57.13-.13.28-.32.42-.48.14-.16.19-.28.28-.47.09-.19.05-.36-.02-.5-.07-.14-.64-1.55-.88-2.12-.23-.56-.47-.48-.64-.49l-.55-.01c-.19 0-.5.07-.76.36-.26.28-1 1-1 2.43s1.03 2.82 1.17 3.01c.14.19 2.02 3.09 4.89 4.33.68.29 1.21.47 1.62.6.68.22 1.3.19 1.79.12.55-.08 1.65-.67 1.88-1.32.23-.65.23-1.2.16-1.32-.07-.12-.26-.19-.54-.33zM16 3C8.82 3 3 8.82 3 16c0 2.82.92 5.42 2.47 7.54L4 29l5.64-1.48A12.93 12.93 0 0016 29c7.18 0 13-5.82 13-13S23.18 3 16 3z" />
    </svg>
  );
}
const transformCertificates = (certData: any) => {
  if (!certData) return [];

  const all = [
    ...(certData.supplier || []),
    ...(certData.product || []),
  ];

  return all.map((cert: any) => ({
    badgeIcon: cert.badgeIcon,
    label: cert.label,
    description: cert.description || cert.label,
    type: cert.type,
    certificateType:
      cert.certificateScope === "supplier"
        ? "Certificat fournisseur"
        : "Certificat produit",
    validityPeriod: cert.validityPeriod,
    certificationAuthority: cert.certificationAuthority || "N/A",
    applicableSectors: cert.applicableSectors || "N/A",
    applicableRegions: cert.applicableRegions || "N/A",
    certificationNorms: cert.certificationNorms || "N/A",
    advantages: cert.advantages || cert.label,
    images:
      cert.images?.length > 0
        ? cert.images
        : cert.media?.url
          ? [cert.media.url]
          : [],
  }));
};
function ProductInfoSection({
  onOpenDrawer,
  name,
  price,
  sale_price,
  unit,
  isCategorie,
  rating_count,
  reviewsinstorage,
  certificates,
  onSelectCertificate,
  onCloseCash,
  total_reviews,
  negotiable_price,
}: {
  isCategorie?: boolean;
  name?: string;
  price?: number;
  sale_price?: number;
  unit?: string;
  rating_count?: number;
  reviewsinstorage?: string;
  onOpenDrawer: () => void;
  onSelectCertificate: (idx: number) => void; // 👈 AJOUT
  onCloseCash: () => void;
  certificates: any[];
  total_reviews?: number;
  negotiable_price?: boolean;
}) {
  const [openx, setOpenx] = useState(true);
  const [shareOpen, setShareOpen] = useState(false);

  const [openProtections, setOpenProtections] = useState(false);
  const share = (url: string) => {
    window.open(url, '_blank');
    setShareOpen(false);
  };
  //console.log('isCategorie', isCategorie);

  const currentUrl =
    typeof window !== 'undefined'
      ? encodeURIComponent(window.location.href)
      : '';

  return (
    <>
      <div className="bg-[#f5f5f5]">
        {/* PRIX */}{/* PRIX */}

        <div className="bg-gray-200 p-4 mt-4 flex justify-between">

          {/* 🔥 CAS 1 : PRIX NÉGOCIABLE */}
          {negotiable_price ? (
            <div>
              <div className="text-lg font-semibold">Prix négociable</div>
              <div className="text-sm text-gray-600">
                Contactez-nous pour une offre personnalisée {' '}
              </div>
            </div>
          ) : (
            <>
              {/* 🔥 CAS 2 : PROMO */}
              {sale_price ? (
                <>
                  <div>
                    <div className="text-lg font-semibold text-[#E4127A]">
                      {sale_price.toLocaleString()} $
                    </div>
                    <div className="text-sm text-gray-600 hidden">
                      {unit} {isCategorie}
                    </div>
                  </div>

                  <div>
                    <div className="text-lg font-semibold line-through text-gray-500">
                      {price?.toLocaleString()} $
                    </div>
                    <div className="text-sm text-gray-600 line-through hidden">
                      {unit} {isCategorie}
                    </div>
                  </div>
                </>
              ) : (
                /* 🔥 CAS 3 : PRIX NORMAL */
                <div>
                  <div className="text-lg font-semibold">
                    {price?.toLocaleString()} $
                  </div>
                  <div className="text-sm text-gray-600">
                    {unit} {isCategorie}
                  </div>
                </div>
              )}
            </>
          )}

        </div>

        {/* HEADER */}
        <div className="bg-white mt-3 px-4 py-4">
          <div className="flex justify-between items-start gap-2">

            <div className="flex-1">
              {openx && (
                <h2 className="text-[18px] font-semibold leading-tight text-gray-900 line-clamp-2">
                  {name}
                </h2>
              )}
              {!openx && (
                <h2 className="text-[18px] font-semibold leading-tight text-gray-900">
                  {name}
                </h2>
              )}

              <p className="text-sm text-gray-500 mt-2 hidden">
                {total_reviews} avis
              </p>

              {/*BADGE CERTIFIÉ Link href="#target-component" scroll={false}*/}
              {certificates.length > 0 ? (
                <div onClick={onCloseCash} className="inline-flex items-center gap-2 bg-gray-100 px-3 py-1.5 mt-2 rounded">
                  {certificates.map((cert, idx) => (
                    <CertificateBadgeheader
                      key={idx}
                      cert={cert}
                      onClick={() => onSelectCertificate(idx)}
                    />
                  ))}
                  <span className="text-sm text-orange-600 font-medium">
                    certifié
                  </span>
                  <ChevronRight className="w-4 h-4 text-orange-600" />
                </div>
              ) : (<div onClick={onCloseCash} className="inline-flex items-center gap-2 bg-gray-100 px-3 py-1.5 mt-2 rounded">
                {certificates.map((cert, idx) => (
                  <CertificateBadgeheader
                    key={idx}
                    cert={cert}

                  />
                ))}
                <span className="text-sm text-red font-medium">
                  Non certifié
                </span>
                <ChevronRight className="w-4 h-4 text-orange-600" />
              </div>)}


            </div>

            {/* ACTIONS */}
            <div className="flex items-center gap-2">

              <button onClick={() => setOpenx(!openx)} className="p-2">
                {openx ? (
                  <ChevronUp className="w-5 h-5 text-gray-600" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-600" onClick={() => setOpenx(!openx)} />
                )}
              </button>

              <button onClick={() => setShareOpen(true)} className="p-2">
                <Share2 className="w-5 h-5 text-gray-600" />
              </button>

            </div>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="h-2 bg-gray-200" />

        {/* TAILLE */}
        <div className="bg-white px-4 py-4 flex justify-between items-center">
          <div>
            <div className="text-lg font-semibold">Taille (1) </div>
            <button onClick={onOpenDrawer} className="mt-2 inline-block bg-gray-200 px-4 py-2 rounded text-sm">
              Personnalisé
            </button>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-500" onClick={onOpenDrawer} />
        </div>

        <div className="h-2 bg-gray-200" />

        {/* EXPÉDITION */}
        <div className="bg-white px-4 py-4">
          <div className="text-lg font-semibold mb-3">Commandez maintenant ! </div>

          <div className="bg-gray-100 rounded-xl p-4 text-sm text-gray-600 leading-relaxed">
            <a
              href={`mailto:marketplace@galileecommerce.com?subject=Demande%20d'expédition%20-%20${encodeURIComponent(
                name || ''
              )}&body=${encodeURIComponent(
                `Bonjour,

              Je souhaite obtenir des informations concernant l'expédition de ce produit :

              - Produit : ${name}
              - Prix : ${negotiable_price
                  ? 'À négocier'
                  : (sale_price || price)?.toLocaleString() + ' $'
                }
              - Unité : ${unit}

              Merci de me communiquer les options de livraison, délais et coûts.

              Cordialement`
              )}`}
              className="inline-flex items-center gap-1 underline font-medium text-[#E4127A] hover:opacity-80"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 12H8m8 0l-4 4m4-4l-4-4"
                />
              </svg>
              Contacter Galiléecommerce
            </a>
          </div>
        </div>

        <div className="h-2 bg-gray-200" />

        {/* PROTECTIONS */}
        <div className="bg-white px-4 py-4 flex justify-between items-start">
          <div>
            <div className="text-lg font-semibold mb-3">
              Protections pour ce produit
            </div>

            {/* PROTECTIONS GRID */}
            {openProtections && (
              <>
                <div className="flex items-center gap-2 text-sm text-gray-700 mb-2">
                  <ShieldCheck className="w-4 h-4" />
                  Paiements sécurisés
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <RefreshCcw className="w-4 h-4" />
                  Politique de remboursement
                </div>
              </>
            )}
          </div>
          <button onClick={() => setOpenProtections(!openProtections)} className="p-2">
            {openProtections ? (
              <ChevronDown className="w-5 h-5 text-gray-600" onClick={() => setOpenProtections(false)} />
            ) : (
              <ChevronRight className="w-5 h-5 text-gray-500 mt-1" onClick={() => setOpenProtections(true)} />

            )}
          </button>

        </div>

        {/* SHARE MODAL */}
        {
          shareOpen && (
            <div className="fixed inset-0 z-50 flex items-end">

              {/* OVERLAY */}
              <div
                className="absolute inset-0 bg-black/40"
                onClick={() => setShareOpen(false)}
              />

              {/* SHEET */}
              <div className="relative w-full bg-white rounded-t-2xl pt-4 pb-6 px-4">

                {/* HANDLE */}
                <div className="w-10 h-1.5 bg-gray-300 rounded-full mx-auto mb-4" />

                {/* TITLE */}
                <div className="text-center text-[16px] font-semibold mb-5">
                  Partager
                </div>

                {/* GRID */}
                <div className="grid grid-cols-4 gap-6 text-center">

                  {/* ITEM */}
                  <ShareItem
                    icon={<FacebookIcon />}
                    label="Facebook"
                    onClick={() =>
                      share(`https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`)
                    }
                  />

                  <ShareItem
                    icon={<TwitterIcon />}
                    label="Twitter"
                    onClick={() =>
                      share(`https://twitter.com/intent/tweet?url=${currentUrl}`)
                    }
                  />

                  <ShareItem
                    icon={<WhatsappIcon className="w-5 h-5 text-green-500" />}
                    label="WhatsApp"
                    onClick={() => share(`https://wa.me/?text=${currentUrl}`)}
                  />

                  <ShareItem
                    icon={<Music2 className="w-5 h-5" />}
                    label="TikTok"
                    onClick={() => share(`https://www.tiktok.com/`)}
                  />

                  <ShareItem
                    icon={<Instagram className="w-5 h-5" />}
                    label="Instagram"
                    onClick={() => share(`https://www.instagram.com/`)}
                  />

                </div>

                {/* CANCEL */}
                <button
                  onClick={() => setShareOpen(false)}
                  className="mt-6 w-full text-center text-gray-500 text-sm"
                >
                  Annuler
                </button>
              </div>
            </div>
          )
        }
      </div >
    </>
  );
}

const Single: React.FC<SingleProps> = ({ product }) => {
  const { t } = useTranslation('common');
  const router = useRouter();
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const [selectedCertIdx, setSelectedCertIdx] = useState<number | null>(null);
  const [open, setOpen] = useState(false);
  const [cashOpen, setCashOpen] = useState(true);
  const API_URL = process.env.NEXT_PUBLIC_REST_API_ENDPOINT;
  const reviewsinstorage = localStorage.getItem('reviewsinstorage');
  if (!API_URL) throw new Error("NEXT_PUBLIC_REST_API_ENDPOINT n'est pas défini !");
  const API_BASE = `${API_URL}`;
  const token = getAuthToken();
  //if (!token) router.push('/login'); changer
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
    commerce_register,
    logo_url,
    country,
    table_content,
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
  function parseSpecsTable(html: string) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');

    const rows = Array.from(doc.querySelectorAll('tr'));

    return rows.map((row) => {
      const cells = Array.from(row.querySelectorAll('th, td'))
        .map((cell) => cell.textContent?.trim() || '')
        .filter(Boolean);

      const pairs: { label: string; value: string }[] = [];

      for (let i = 0; i < cells.length; i += 2) {
        pairs.push({
          label: cells[i] || '',
          value: cells[i + 1] || '',
        });
      }

      return pairs;
    });
  }
  const html = `${product.table_content}`; // ton HTML
  const html1 = `${product.embaEditor}`; // ton HTML
  const html2 = `${product.timeOutEditor}`; // ton HTML
  const datatable_content = parseSpecsTable(html);
  const embaEditor = parseSpecsTable(html1);
  const timeOutEditor = parseSpecsTable(html2);
  const allMedia = [
    ...previews.map((img: any) => ({ type: 'image', url: img?.url ?? placeholder, id: img?.id })),
    ...(video?.length ? video.map((item: any) => ({ type: 'video', url: item.url, id: item.id })) : []),
  ];

  {/*  const productSpecs = [
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
  ];*/}
  const verifiedIsCategorie = ['2', '300', '1', '9', '15', '16'];

  const isCategorie = product.categories.some((cat: any) =>
    verifiedIsCategorie.includes(String(cat.categories_id))
  );

  //console.log('isCategorie', isCategorie);
  const certificates = product?.certificates
    ? [
      ...(product.certificates.supplier || []),
      ...(product.certificates.product || []),
    ].map((cert: any) => ({
      badgeIcon: cert.badgeIcon,
      label: cert.label,
      description: cert.description || cert.label,
      type: cert.type,
      certificateType:
        cert.certificateScope === "supplier"
          ? "Certificat fournisseur"
          : "Certificat produit",
      validityPeriod: cert.validityPeriod,
      certificationAuthority: cert.certificationAuthority || "N/A",
      applicableSectors: cert.applicableSectors || "N/A",
      applicableRegions: cert.applicableRegions || "N/A",
      certificationNorms: cert.certificationNorms || "N/A",
      advantages: cert.advantages || cert.label,
      images:
        cert.images?.length > 0
          ? cert.images
          : cert.media?.url
            ? [cert.media.url]
            : [],
    }))
    : [];



  function getMembershipDuration(createdAt: string): string {
    const createdDate = new Date(createdAt);
    const now = new Date();

    // Différence totale en millisecondes
    const diffMs = now.getTime() - createdDate.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24)); // total jours
    const diffMonths = (now.getFullYear() - createdDate.getFullYear()) * 12 + (now.getMonth() - createdDate.getMonth());
    const diffYears = now.getFullYear() - createdDate.getFullYear();

    // Ajustement pour l'anniversaire
    const hasHadAnniversary =
      now.getMonth() > createdDate.getMonth() ||
      (now.getMonth() === createdDate.getMonth() && now.getDate() >= createdDate.getDate());
    const years = hasHadAnniversary ? diffYears : diffYears - 1;

    if (years > 0) {
      return years === 1 ? "1 an" : `${years} ans`;
    } else if (diffMonths > 0) {
      return diffMonths === 1 ? "1 mois" : `${diffMonths} mois`;
    } else {
      return diffDays <= 1 ? "1 jour" : `${diffDays} jours`;
    }
  }

  // Exemple d'utilisation
  const duration = useMemo(() => getMembershipDuration(product.created_at), [product.created_at]);
  return (
    <>
      {/*bg-black/5*/}
      <div className="relative  bg-white dark:bg-neutral-950">
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
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 ">
            {/* LEFT - Image Gallery + Bottom Content */}
            <div className="lg:col-span-2 space-y-6">
              <div className="relative w-full bg-[#eef2f6] rounded-md p-3 flex items-center justify-between hidden lg:flex">
                {/* LEFT */}
                <div className="flex items-center gap-3">
                  {/* Logo */}
                  <div className="w-12 h-12 bg-white rounded flex items-center justify-center overflow-hidden">
                    <Image
                      src={product?.logo_url || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQf1fiSQO7JfDw0uv1Ae_Ye-Bo9nhGNg27dwg&s'} // remplace par ton image
                      alt="logo"
                      className="object-contain w-full h-full"
                      width={20}
                      height={20}
                    />
                  </div>

                  {/* Infos */}
                  <div className="flex flex-col">
                    {/* Nom */}
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm text-gray-900 uppercase line-clamp-2 w-[250px] ">
                        {product.name}
                      </span>

                      <span className="text-xs text-gray-500">
                        {product.country} · {duration} sur galileecommerce.com.
                      </span>
                    </div>

                    {/* Stats */}
                    <div className="text-xs text-gray-600 mt-1 flex items-center gap-4">
                      <span>Temps de réponse ≤ 3h</span>
                      <span>Taux de livraison dans les délais ≥ 100%</span>
                    </div>
                  </div>
                </div>

                {/* RIGHT */}
                <div className="absolute top-0 right-0 flex items-center gap-2 text-blue-600 text-sm font-medium bg-white px-3 py-1  mb-43">
                  <span>
                    {certificates.length > 0 ? (
                      <Image
                        src={Verified} // remplace par ton image
                        alt="logo"
                        className="object-contain w-full h-full"
                        width={50}
                        height={50}
                      />
                    ) : (
                      <Image
                        src={Notverified} // remplace par ton image
                        alt="logo"
                        className="object-contain w-8 h-12"
                        width={8}
                        height={12}
                      />
                    )}

                  </span>
                </div>
              </div>
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

                  className="relative w-full  aspect-[4/3] overflow-hidden  bg-gray-100 group"
                >
                  <Image
                    alt={name}
                    fill
                    src={allMedia[selectedImageIdx]?.url ?? placeholder}
                    className="object-cover transition-transform duration-300 group-hover:scale-150"
                    style={zoomStyle}
                    onMouseMove={handleMouseMove}
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
                    <ChevronLeft className="w-4 h-4 text-gray-400" />
                  </button>

                  <button
                    onClick={() =>
                      setSelectedImageIdx((prev) =>
                        prev === allMedia.length - 1 ? 0 : prev + 1
                      )
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white shadow hover:scale-110"
                  >
                    <ChevronRight className="w-4 h-4 text-gray-400" />
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
              <ProductInfoSection
                onOpenDrawer={() => setOpen(true)} name={product.name}
                price={product.price} sale_price={product.sale_price} unit={product.unit}
                isCategorie={isCategorie} onSelectCertificate={setSelectedCertIdx}
                onCloseCash={() => setCashOpen(false)}
                certificates={transformCertificates(product.certificates)} // 🔥 ICI
                total_reviews={total_reviews}
                negotiable_price={product.negotiable_price}
              />
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
              <div className="lg:col-span-1 hidden">
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
                            {!product.negotiable_price ? (
                              <>
                                <span className="hidden text-xs text-gray-600">$</span>
                                <span className="text-2xl font-bold text-[#E4127A]">
                                  {product.sale_price} $  {product.unit} unité(s)
                                </span>
                              </>

                            ) : (
                              <span className="text-2xl font-bold text-[#E4127A]">
                                A negocier
                              </span>
                            )}


                          </div>
                          {!product.negotiable_price ? (
                            <>
                              <span className="text-xs line-through text-gray-400">
                                {product.price} $  {product.unit} unité(s)
                              </span>
                            </>

                          ) : (
                            <span className="text-xs text-gray-400">
                              Le prix est à negocier
                            </span>
                          )}

                        </div>
                      ) : (
                        <div className="space-y-1">
                          <div className="text-xs text-gray-600 dark:text-gray-400">Prix</div>
                          <div className="flex items-baseline gap-2">
                            {!product.negotiable_price ? (
                              <>
                                <span className="text-2xl font-bold text-gray-900 dark:text-white">
                                  {product.price}
                                </span>
                                <span className="text-xs text-gray-600">$</span>
                              </>

                            ) : (
                              <span className="text-xs text-gray-400">
                                Le prix est à negocier
                              </span>
                            )}

                          </div>
                        </div>
                      )}
                    </div>

                    {/* Taille */}
                    <div className="pb-4 mb-4 border-b border-gray-200 dark:border-neutral-700">
                      <div className="text-xs font-semibold text-gray-900 dark:text-white mb-2">Taille</div>
                      <button onClick={() => setOpen(true)} className="px-3 py-2 rounded-lg border border-gray-300 dark:border-neutral-700 text-xs font-medium text-gray-700 dark:text-gray-300 hover:border-gray-400">
                        Personnalisé
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
                          <div className="flex h-10 w-10 items-center justify-center  bg-green-50 dark:bg-green-500/10">
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
              <ProductSpecs data={datatable_content} />
              <ProductPrepair data={embaEditor} />
              <div id="target-component"></div>
              <ProductTimeShipping data={timeOutEditor} />
              {/* Certifications Section */}
              <div className="space-y-3" >
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
                <div className="grid grid-cols-3 gap-3" onClick={() => setCashOpen(false)}>
                  {certificates.map((cert, idx) => (
                    <CertificateBadge
                      key={idx}
                      cert={cert}
                      onClick={() => setSelectedCertIdx(idx)}
                    />
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-6">
                {allMedia.map((media: any, idx: number) => (
                  <motion.div
                    key={idx}
                    onMouseMove={handleMouseMove}
                    className="relative w-full aspect-[4/3] overflow-hidden bg-gray-100 group"
                  >
                    {media.type === 'image' ? (
                      <Image
                        alt={`Product ${idx}`}
                        fill
                        src={media.url}
                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                        style={zoomStyle}
                      />
                    ) : (
                      <div className="w-full h-full bg-black flex items-center justify-center text-white text-2xl">
                        ▶
                      </div>
                    )}

                    {/* OPTION HOVER (tu peux garder ou supprimer) */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <span className="text-5xl text-gray-400 opacity-0 group-hover:opacity-100">
                        +
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
              {/* Certificate Modal */}
              <CertificateModal
                cert={selectedCertIdx !== null ? certificates[selectedCertIdx] : null}
                isOpen={selectedCertIdx !== null}
                onClose={() => {
                  setSelectedCertIdx(null);
                  setCashOpen(true);
                }}
              />


              {/* Protection Section */}
              <div className=" border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0B0B0C] p-4 shadow-sm">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wide mb-4">
                  Protection
                </h3>

                <div className="space-y-3">

                  {/* Paiement sécurisé */}
                  <div className="group flex items-start gap-3 p-3 transition-all duration-300 hover:bg-gray-50 dark:hover:bg-white/5">

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

                    <div className="space-y-1">
                      <div className="text-2xl text-gray-600 dark:text-gray-400 font-bold">
                        Prix
                      </div>

                      {/* 🔥 CAS 1 : PRIX NÉGOCIABLE */}
                      {product.negotiable_price ? (
                        <>
                          <div className="text-2xl font-bold text-[#E4127A]">
                            À négocier
                          </div>
                          <span className="text-xs text-gray-400">
                            Contactez-nous pour une offre personnalisée
                          </span>
                        </>
                      ) : (
                        <>
                          {/* 🔥 CAS 2 : PROMO */}
                          {product.sale_price ? (
                            <>
                              <div className="flex items-baseline gap-2">
                                <span className="text-xl font-bold text-[#E4127A]">
                                  {product.sale_price} $ / {product.unit}{" "}
                                  {isCategorie}
                                </span>
                              </div>

                              <span className="text-xs line-through text-gray-400">
                                {product.price} $ / {product.unit}{" "}
                                {isCategorie}
                              </span>
                            </>
                          ) : (
                            /* 🔥 CAS 3 : PRIX NORMAL */
                            <div className="flex items-baseline gap-2">
                              <span className="text-xl font-bold text-gray-900 dark:text-white">
                                {product.price} $ / {product.unit}{" "}
                                {isCategorie}
                              </span>
                            </div>
                          )}
                        </>
                      )}

                    </div>

                  </div>

                  {/* Taille */}
                  <div className="pb-4 mb-4 border-b border-gray-200 dark:border-neutral-700">
                    <div className="text-xs font-semibold text-gray-900 dark:text-white mb-2">Taille</div>
                    <button onClick={() => setOpen(true)} className="px-3 py-2 rounded-lg border border-gray-300 dark:border-neutral-700 text-xs font-medium text-gray-700 dark:text-gray-300 hover:border-gray-400">
                      Personnalisé
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
                      className="text-blue-600 dark:text-blue-400 font-semibold hover:underline text-xs block hidden"
                    >
                      {product?.shop?.name}
                    </Link>
                    <div className="text-gray-600 dark:text-gray-400 text-xs mt-2">
                      {certificates.length > 0 ? (
                        <Image
                          alt="Verified"
                          className="w-20 h-50 object-contain"
                          src={Verified}
                          width={20}
                          height={50}
                        />
                      ) : (
                        <Image
                          alt="Verified"
                          className="w-20 h-50 object-contain"
                          src={Notverified}
                          width={20}
                          height={50}
                        />
                      )}


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
        {cashOpen && (
          <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 px-3 py-2 md:hidden">
            <div className="flex items-center gap-3">

              {/* Bouton gauche */}
              <button className="flex flex-col items-center justify-center text-xs text-gray-700 min-w-[70px]">
                <Store className="w-5 h-5 mb-1" />
                <span className="text-[11px]">Le B space</span>
              </button>

              {/* Bouton centre */}
              <button onClick={handleOpenQuestion} className="flex-1 h-10 rounded-full border border-gray-300 text-gray-800 text-sm font-medium bg-white hover:bg-gray-50 transition">
                Discuter en ligne
              </button>

              {/* Bouton droite */}
              <button onClick={handleSubmit} className="flex-1 h-10 rounded-full bg-orange-600 text-white text-sm font-semibold hover:bg-orange-700 transition">
                Demander
              </button>

            </div>
          </div>
        )}

      </div>
      <ProductDrawer
        open={open}
        onClose={() => setOpen(false)}
        product={product}
        onSubmit={handleInquiry}
      />
      <Footer />
      <style jsx global>{`
  @media (max-width: 768px) {
    .fullWidthMobile {
      padding-left: -1rem !important;
      padding-right: -1rem !important;
    }
  }
`}</style>
    </>
  );
};

export default Single;