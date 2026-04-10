"use client";
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import productPlaceholder from '@/assets/logo/logo_red.png';
import productPlaceholderx from '@/assets/logo/logo_white.png';
import LanguageSwitcher from '@/components/ui/language-switcher';
import CategoryMegaMenu from '@/components/category-ega-enu/category-ega-enu';
import LoginMenu from '@/components/ui/login-button';
import Link from 'next/link';
import { useSearch } from '@/components/search/search-view';
import { useMe } from '@/data/user';
import { useCart } from '@/components/cart/lib/cart.context';
import { useDrawer } from '@/components/drawer-views/context';
import { useIsMounted } from '@/lib/hooks/use-is-mounted';
import Modal from '@/components/modal/modal';
import CountrySelector from '@/components/country-selector/country-selector';
import { useModalAction } from '@/components/modal-views/context';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import HeaderMenu from "./headerMenu";
import HeaderMenuX from "./headersx";
import { useRouter } from 'next/router';
import routes from '@/config/routes';
import { Globe, Sparkles, Store, X } from 'lucide-react';
import { createPortal } from "react-dom";
export default function GalileeHeader() {
  const [query, setQuery] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [cartCount, setCartCount] = useState(0);
  const drawerRef = useRef<HTMLDivElement | null>(null);
  const [isHoverCategories, setIsHoverCategories] = useState(false);
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { openSearch } = useSearch();
  const { isAuthorized } = useMe();
  const isMounted = useIsMounted();
  const { openDrawer } = useDrawer();
  const { totalItems } = useCart();
  const [openDropdown, setOpenDropdown] = useState(false);
  const [openC, setOpenC] = useState(false);
  const [mapIsOk, setMapIsOk] = useState(false);
  const { openModal } = useModalAction();
  const [showSearch, setShowSearch] = useState(false);
  const [isHoverCategoriesx, setIsHoverCategoriesx] = useState(false);
  const productPlaceholderx = productPlaceholder.src;
  const router = useRouter()
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  console.log("isAuthorized", isAuthorized)
  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current); // annule le hide si en cours
      timeoutRef.current = null;
    }
    setIsHoverCategoriesx(true);
  };

  const navMainRef = useRef<HTMLDivElement | null>(null);
  const navStickyRef = useRef<HTMLDivElement | null>(null);
  const scrollNav = (direction: 'left' | 'right') => {
    const target =
      navStickyRef.current &&
        navStickyRef.current.offsetParent !== null
        ? navStickyRef.current
        : navMainRef.current;

    if (!target) return;

    target.scrollBy({
      left: direction === 'left' ? -300 : 300,
      behavior: 'smooth',
    });
  };


  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsHoverCategoriesx(false);
      timeoutRef.current = null;
    }, 300); // délai avant de cacher
  };

  const handleMouseEnterNox = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current); // annule le hide si en cours
      timeoutRef.current = null;
    }
    //setIsHoverCategoriesx(true);
    setIsHoverCategories(true)
  };


  const MySwal = withReactContent(Swal);
  const handleMouseLeaveNox = () => {
    timeoutRef.current = setTimeout(() => {
      //setIsHoverCategoriesx(false);
      setIsHoverCategories(false)
      timeoutRef.current = null;
    }, 300); // délai avant de cacher
  };
  const [openMarches, setOpenMarches] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Function to controle MySwal.fire
  const become_seller = () => {
    if (isAuthorized) {
      router.push('/become_seller/become_seller');
    } else {
      MySwal.fire({
        icon: 'info',
        title: 'Devenir fournisseur',
        text: 'Souhaitez-vous en savoir plus ou devenir fournisseur ?',
        confirmButtonText: 'Devenir fournisseur',
        cancelButtonText: 'En savoir plus',
        showCancelButton: true,
        reverseButtons: true,
      }).then((result) => {
        if (result.isConfirmed) {
          router.push('/become_seller/become_seller');
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          router.push('/become-seller');
        }
      });
    }
  }
  const become_ambassador = () => {
    if (isAuthorized) {
      router.push('/ge-ambassadeur/register');
    } else {
      MySwal.fire({
        icon: 'info',
        title: 'Devenir ambassadeur',
        text: 'Souhaitez-vous en savoir plus ou devenir ambassadeur ?',
        confirmButtonText: 'Devenir ambassadeur',
        cancelButtonText: 'En savoir plus',
        showCancelButton: true,
        reverseButtons: true,
      }).then((result) => {
        if (result.isConfirmed) {
          router.push('/ge-ambassadeur/register');
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          router.push('/ge-ambassador');
        }
      });
    }
  }
  // Function to controle MySwal.fire
  const visiteCorridors = () => {
    if (isAuthorized) {
      router.push('/corridors_');
    } else {
      MySwal.fire({
        icon: 'info',
        title: 'Corridors',
        text: 'Souhaitez-vous en savoir plus ou visiter les corridors ?',
        confirmButtonText: 'Visiter les corridors',
        cancelButtonText: 'En savoir plus',
        showCancelButton: true,
        reverseButtons: true,
      }).then((result) => {
        if (result.isConfirmed) {
          router.push('/corridors_');
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          router.push('/corridors');
        }
      });
    }
  }
  // Ferme le dropdown si clic en dehors.
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenMarches(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);





  const items = [
    { label: 'Les produits les plus récherchés sur galileecommerce :', href: '#' },
    { label: 'Préfabriqués', href: '/prefabriques' },
    { label: 'Ligne de production', href: '/ligne-production' },
    { label: 'Habillement', href: '/habillement' },
    { label: 'Électronique', href: '/electronique' },
    { label: 'Maison', href: '/maison' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 150) { // déclenchement après 150px de scroll
        setShowSearch(true);
      } else {
        setShowSearch(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setDrawerOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);
  // Fermer le menu si clic à l’extérieur
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  {/* Top bar 
  const items = [
    {
      label: 'Préfabriqués',
      href: '/prefabriques',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 h-4 mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M3 9.75L12 4.5l9 5.25v10.5H3V9.75z" />
        </svg>
      ),
    },
    {
      label: 'Ligne de production',
      href: '/ligne-production',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 h-4 mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      ),
    },
    {
      label: 'Habillement',
      href: '/habillement',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 h-4 mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M16 4l4 4-8 8-4-4 8-8zM2 20h20" />
        </svg>
      ),
    },
    {
      label: 'Électronique',
      href: '/electronique',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 h-4 mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M12 2v20M5 7h14M5 17h14" />
        </svg>
      ),
    },
    {
      label: 'Maison',
      href: '/maison',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 h-4 mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M3 9.75L12 3l9 6.75V21H3V9.75z" />
        </svg>
      ),
    },
  ];
  */ }
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : '';
  }, [drawerOpen]);
  function useMounted() {
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);
    return mounted;
  }
  // Empêche le rendu SSR pour éviter l’hydration error
  const mounted = useMounted();
  if (!mounted) return null;
  const isHomePage = router.pathname === '/';
  const isProductsPage = router.pathname.startsWith('/products');
  //console.log("isHomePage", isHomePage, "isProductsPage", isProductsPage)
  // Toutes les routes qui ne doivent pas afficher le header
  //if (!isHomePage || isProductsPage) {
  //  return null;

  //}
  return (
    <>

      <header
        className={`w-full sticky top-0 z-40 transition-colors duration-300  transition-none mb-[0px]
       ${isHoverCategories || showSearch || isProductsPage ? 'bg-white text-black' : 'bg-gray-900 text-white'}`}
      >
        {' '}
        {/* Top bar */}
        {isHomePage && (


          <div
            className={`w-full 
          ${isHoverCategories || showSearch ? 'hidden' : 'block bg-pink-700 text-white'}`}
          >
            <div
              className="
              max-w-7xl mx-auto
              flex items-center justify-between
              flex-nowrap
              px-4 py-2
            "
            >

              {/* Message gauche  Le leader africain de l&apos;e-commerce */}
              <div className="flex items-center gap-2 flex-shrink-0 whitespace-nowrap">
                <Globe className="w-4 h-4 md:w-5 md:h-5 text-white/90" />
                <span className="text-[10px] md:text-base font-medium">
                  Le leader de l&apos;e-commerce
                </span>
              </div>

              {/* Message droite Acheter n&apos;a jamais été aussi simple */}
              <div className="flex items-center gap-2 flex-shrink-0 whitespace-nowrap">
                <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-white/90" />
                <span className="text-[10px] md:text-base font-medium">
                  Acheter n&apos;est jamais simple
                </span>
              </div>

            </div>
          </div>

        )}


        <div className="max-w-[1780px] px-3 lg:py-3 md:py-3 flex items-center justify-between mt-5">
          {/* Logo + desktop nav */}
          <div className="flex items-center gap-5">

            <div className="flex items-center gap-3">
              <Image
                src={mounted && (isHoverCategories || showSearch) ? productPlaceholder : productPlaceholderx}
                alt="Logo"
                width={mounted && (isHoverCategories || showSearch) ? 164 : 200}
                height={mounted && (isHoverCategories || showSearch) ? 130 : 100}

                className="object-contain group-hover:brightness-0"
              />
            </div>


          </div>

          {/* Right */}
          <div className="flex items-center gap-4">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Rechercher sur galileecommerce.com ..."
              onClick={openSearch}
              className={`
          hidden lg:block w-full bg-white-600 flex-1 rounded-full  
          text-gray-900 placeholder-gray-500  focus:outline-none focus:ring-2 focus:ring-pink-500
          transition-all duration-500 ease-in-out
          ${showSearch || isProductsPage ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"}
        `}
            />
            <div
              className={`
            ml-2 lg:hidden transition-all duration-500 ease-in-out
            ${showSearch ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"}
          `}
              onClick={openSearch}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="6"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </div>
            <div className="flex items-center gap-2 border border-gray-700 rounded px-2 py-1 hover:border-pink-500 transition-colors group-hover:border-black">
              <LanguageSwitcher />
            </div>
            {!isAuthorized && (
              <div className="hidden md:flex gap-4 items-center text-sm">
                <button
                  className="hover:scale-105 transition-transform group-hover:text-black"
                  onClick={() => //openModal('LOGIN_VIEW')
                    router.push('/login')
                  }
                >
                  Connexion
                </button>
                <button
                  className="hover:scale-105 transition-transform group-hover:text-black"
                  onClick={() => //openModal('REGISTER')
                    router.push('/register')
                  }
                >
                  Créer un compte
                </button>
              </div>
            )}

            {/* Icons */}
            {mounted && (
              <>
                <div className="flex items-center gap-4">
                  {/* Wishlist */}
                  <div className="hidden relative hover:scale-110 transition-transform cursor-pointer">
                    <svg
                      className={`w-7 h-7   group-hover:text-black
                            ${isHoverCategories || showSearch ? 'bg-white text-black' : 'bg-gray-900 text-white'}`}
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M12 21s-7-4.35-9-7.11C-1 9.5 5 4 8 7c1 1 2 2 4 2s3-1 4-2c3-3 9 2.5 5 6.89C19 16.65 12 21 12 21z"
                        fill="currentColor"
                      />
                    </svg>

                    <span className=" absolute -top-1 -right-2 bg-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                      {wishlistCount}
                    </span>
                  </div>

                  {/* Cart */}
                  <div
                    className="relative hover:scale-110 transition-transform cursor-pointer"
                    onClick={() => openDrawer('CART_VIEW')}
                  >
                    <svg
                      className={`w-7 h-7   group-hover:text-black
                            ${isHoverCategories || showSearch || isProductsPage ? 'bg-white text-black' : 'bg-gray-900 text-white'}`}
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M6 6h15l-1.5 9h-12L6 6zM9 20a1 1 0 100-2 1 1 0 000 2zm8 0a1 1 0 100-2 1 1 0 000 2z"
                        fill="currentColor"
                      />
                    </svg>

                    <span className="absolute -top-1 -right-2 bg-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                      {isMounted && totalItems}
                    </span>
                  </div>
                  {isAuthorized && (
                    <div className="hidden lg:block">
                      <LoginMenu />
                    </div>
                  )}
                </div>

                {/* Mobile burger */}
                <button
                  aria-label="Ouvrir le menu"
                  className="lg:hidden p-2 rounded-md border border-gray-700 hover:bg-gray-800 transition group-hover:border-black group-hover:text-black"
                  onClick={() => setDrawerOpen(true)}
                >
                  <svg
                    className="w-6 h-6"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    fill="none"
                    strokeWidth={2}
                  >
                    <path
                      d="M3 6h18M3 12h18M3 18h18"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </>
            )}

          </div>
        </div>

        {/* Search bar bg-gray-800 bg-pink-600*/}
        {!isProductsPage && (
          <HeaderMenuX />
        )}


        <div className="hidden bg-gray-800 py-4 relative">
          <div className="px-6 flex items-center h-14 relative">

            {/* Desktop nav max-w-[1780px]   */}
            <nav
              className="
          flex gap-3 text-xs text-gray-200 h-7 px-2 flex items-center
          overflow-x-auto whitespace-nowrap scrollbar-hide
          lg:overflow-visible lg:whitespace-normal lg:gap-9 lg:text-sm lg:relative lg:right-2
        "
            >
              <Link
                href="#"
                onMouseEnter={handleMouseEnterNox}
                onMouseLeave={handleMouseLeaveNox}
              >
                <CategoryMegaMenu />
              </Link>

              <Link
                href="/suivi_orders"
                className={`px - 2 py - 1 rounded transition - colors ${isHoverCategories ? 'bg-white text-black' : 'text-white'
                  }`}
              >
                Suivi des commandes
              </Link>
              <Link href="/termes_conditions" className="inline-block px-2 py-1 rounded transition-colors text-white">
                Conditions générales
              </Link>
              <Link href="/policy" className="inline-block px-2 py-1 rounded transition-colors text-white">
                Politique de confidentialité
              </Link>
              <Link href="/charte" className="inline-block px-2 py-1 rounded transition-colors text-white">
                Charte des vendeurs
              </Link>
              <Link href="/guide" className="inline-block px-2 py-1 rounded transition-colors text-white">
                Le guide
              </Link>
              <Link href="/faq" className="inline-block px-2 py-1 rounded transition-colors text-white">
                F.A.Q
              </Link>
              <div className="relative inline-block" ref={dropdownRef}>
                {/* Bouton */}
                <Link
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenMarches((prev) => !prev);
                  }}
                  className="inline-block px-2 py-1 rounded transition-colors text-white"
                >
                  Marchés{" "}
                  <span
                    className={`ml-1 transition-transform duration-300 ${openMarches ? "rotate-180" : ""
                      }`}
                  >
                    ▼
                  </span>
                </Link>

                {/* Dropdown */}
                <div
                  className={`absolute top-full left-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg z-50 transition-all duration-300 origin-top transform ${openMarches
                    ? "scale-y-100 opacity-100"
                    : "scale-y-0 opacity-0 pointer-events-none"
                    }`}
                >
                  <ul className="py-2">
                    <li>
                      <Link
                        href="/products/forcategory?shop_id=30001"
                        className="block px-4 py-2 hover:bg-gray-100"
                        onClick={() => setOpenMarches(false)}
                      >
                        Galilé Market
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/products/forcategory"
                        className="block px-4 py-2 hover:bg-gray-100"
                        onClick={() => setOpenMarches(false)}
                      >
                        Global Market
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <Link
                href="#"
                className={`px - 2 py - 1 flex items - center rounded transition - colors ${isHoverCategories ? 'bg-white text-black' : 'text-white'
                  }`}
              >
                Pavillons
                <CountrySelector />
              </Link>

              <Link

                href="#"
                className={`px - 2 py - 1 rounded transition - colors ${isHoverCategories ? 'bg-white text-black' : 'text-white'
                  }`}
              >
                <button
                  type="button"
                  onClick={visiteCorridors}
                  className="inline-block px-2 py-1 rounded transition-colors text-white hover:bg-white/10"
                >
                  Corridors
                </button>

              </Link>

              <Link
                href=""
                className={`px - 2 py - 1 rounded transition - colors ${isHoverCategories ? 'bg-white text-black' : 'text-white'
                  }`}

              >
                Centrale d’achat
              </Link>

              <Link
                href="/become-seller"
                className={`px - 2 py - 1 rounded transition - colors ${isHoverCategories ? 'bg-white text-black' : 'text-white'
                  }`}
              >
                Devenir fournisseur
              </Link>
              <Link
                href="ge-ambassador"
                className={` px - 2 py - 1 rounded transition - colors ${isHoverCategories ? 'bg-white text-black' : 'text-white'
                  }`}
              >
                Devenir Ambassadeur
              </Link>

              {/* Ton dropdown reste inchangé */}
            </nav>

            {/* Input + Plus */}
            <div className="hidden ml-[140px] lg:ml-[5px] flex-1 flex justify-center items-center gap-3 h-full">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Rechercher sur galileecommerce.com ...."
                className="max-w-[450px] w-full bg-gray-600 flex-1 rounded-full px-4 py-2 text-gray-900 placeholder-white  focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-200"
                onClick={openSearch}
              />
              <div>

              </div>
              <button
                className="rounded-[5px] px-4 py-2 bg-gray-600 text-white font-medium shadow-lg hover:scale-105 transition-transform flex items-center gap-1"
                onClick={() => setOpen(!open)}
              >
                <span className="hidden lg:block">Plus</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-three-dots-vertical"
                  viewBox="0 0 16 16"
                >
                  <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
                </svg>
              </button>
            </div>
          </div>
        </div>


        {/* Dropdown 
      {open && (
        <div className="absolute right-0 mt-2 w-56 bg-white text-black rounded-md shadow-lg z-50">
          <ul className="py-2 text-sm">
            {items.map((item, idx) => (
              <li key={idx}>
                <Link
                  href={item.href}
                  className="px-4 py-2 flex items-center hover:bg-gray-100 cursor-pointer"
                  onClick={() => setOpen(false)}
                >
                  {item.icon}
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
        */}

        {/* Mobile Drawer */}
        {
          drawerOpen && (
            <div className="fixed inset-0 z-[1000] flex">
              <HeaderMenu
                drawerOpen={drawerOpen}
                setDrawerOpen={setDrawerOpen}
                isAuthorized={isAuthorized}
                openMarches={openMarches}
                setOpenMarches={setOpenMarches}
                openC={openC}
                setOpenC={setOpenC}
                mapIsOk={mapIsOk}
                setMapIsOk={setMapIsOk}
                CountrySelector={CountrySelector}
                productPlaceholderx={productPlaceholderx}

                router={router}
              />

            </div>
          )
        }
      </header >

      {mounted && isHoverCategoriesx && (
        <div className={` grid grid-cols-4 w-full text-white z-100 mt-[9px]
         ${isHoverCategories ? 'block bg-white text-black' : ''}`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}

        >
          <button className="w-full px-2 py-3 bg-[#1a0f1f] text-[10px] sm:text-xs md:text-sm lg:text-base font-semibold">
            <Link href="/centrale-achat#chooseId1">
              Centrale d’achat
            </Link>

          </button>
          <button className="w-full px-2 py-3 bg-[#2b3243] text-[10px] sm:text-xs md:text-sm lg:text-base font-semibold">
            <Link href="/centrale-achat#chooseId1">
              Choisir une campagne
            </Link>

          </button>
          <button className="w-full px-2 py-3 bg-[#1a0b15] text-[10px] sm:text-xs md:text-sm lg:text-base font-semibold">
            <Link href="/centrale-achat#chooseId3">
              Formalités et assurance
            </Link>

          </button>
          <button className="w-full px-2 py-3 bg-[#3b4b60] text-[10px] sm:text-xs md:text-sm lg:text-base font-semibold">
            <Link href="/centrale-achat#chooseId4">
              Payer sur Galileecommerce.com
            </Link>

          </button>

        </div >
      )
      }

    </>
  );
}
