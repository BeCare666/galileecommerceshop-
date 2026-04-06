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
    console.log("isHomePage", isHomePage, "isProductsPage", isProductsPage)
    // Toutes les routes qui ne doivent pas afficher le header
    //if (!isHomePage || isProductsPage) {
    //  return null;
    //}
    return (
        <>

            <header
                className={`w-full sticky top-0 z-40 transition-colors duration-300  transition-none mb-[0px] md:mb-[12px]
       ${isHoverCategories || showSearch ? 'bg-white text-black' : 'bg-gray-900 text-white'}`}
            >
                {' '}
                {/* Search bar bg-gray-800 bg-pink-600*/}
                <div className={`lg:py-4 transition-all duration-500 ease-in-out
         ${showSearch ? "bg-white text-black" : "bg-gradient-to-b from-[#222034] to-[#0d0d14] text-white"}
        `}>
                    <div className="lg:px-6 flex items-center h-16 relative">
                        {/* ⬅️ Bouton scroll gauche */}
                        <button
                            type="button"
                            onClick={() => scrollNav('left')}
                            className="absolute left-0 z-10 h-full px-2 bg-gradient-to-r from-black/70 to-transparent text-white hover:scale-110 transition"
                        >
                            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M15.5 19L8.5 12L15.5 5" />
                            </svg>
                        </button>
                        <nav
                            ref={navMainRef}
                            className={`
            flex items-center gap-3 text-[10px] lg:text-sm text-gray-200  
            overflow-x-auto overflow-y-visible whitespace-nowrap
            scrollbar-hide  /* cache la scrollbar sur mobile/tablette */
            relative left-1
            lg:left-auto lg:relative lg:right-2 lg:gap-9
           ${showSearch ? "hidden -translate-y-4 pointer-events-none bg-white text-black" : ""}
        `}
                        >
                            <Link
                                href="#"
                                onMouseEnter={handleMouseEnterNox}
                                onMouseLeave={handleMouseLeaveNox}
                                className="inline-block lg:px-2 py-1"
                            >
                                <CategoryMegaMenu />
                            </Link>
                            <Link href="/" className="inline-block px-2 py-1 rounded transition-colors text-white">
                                Accueil
                            </Link>
                            <Link href="/suivi_orders" className="inline-block px-2 py-1 rounded transition-colors text-white">
                                Suivi des commandes
                            </Link>
                            <div className="relative">
                                <button
                                    type="button"
                                    onClick={() => setOpenMarches(true)}
                                    className="inline-flex items-center gap-1 px-2 py-1 rounded transition-colors text-white hover:text-pink-400"
                                >
                                    Global Market
                                    <span className={`transition-transform ${openMarches ? "rotate-180" : ""}`}>
                                        ▼
                                    </span>
                                </button>

                                {openMarches &&
                                    createPortal(
                                        <>
                                            {/* BACKDROP */}
                                            <div
                                                className="fixed inset-0 bg-black/60 backdrop-blur-md z-[9998] animate-fadeIn"
                                                onClick={() => setOpenMarches(false)}
                                            />

                                            {/* MODAL */}
                                            <div className="fixed inset-0 flex items-center justify-center z-[9999] px-4">
                                                <div
                                                    ref={dropdownRef}
                                                    className="relative w-full max-w-md rounded-2xl 
                       bg-gradient-to-b from-[#222034] to-[#0d0d14]
                       border border-white/10
                       shadow-2xl shadow-black/50
                       p-6 animate-scaleIn"
                                                    onClick={(e) => e.stopPropagation()}
                                                >
                                                    {/* Close Button */}
                                                    <button
                                                        onClick={() => setOpenMarches(false)}
                                                        className="absolute top-4 right-4 text-gray-400 hover:text-white transition"
                                                    >
                                                        <X size={20} />
                                                    </button>

                                                    {/* Title */}
                                                    <h2 className="text-xl font-semibold text-white mb-6 text-center">
                                                        Choisir un marché
                                                    </h2>

                                                    {/* Options */}
                                                    <div className="space-y-3">
                                                        <Link
                                                            href="/products/forcategory?shop_id=30001"
                                                            onClick={() => setOpenMarches(false)}
                                                            className="flex items-center gap-3 p-4 rounded-xl 
                           bg-white/5 hover:bg-white/10
                           border border-white/10
                           transition-all duration-300 group"
                                                        >
                                                            <Store className="text-pink-400 group-hover:scale-110 transition" size={20} />
                                                            <div>
                                                                <p className="text-white font-medium">Galilé Market</p>
                                                                <p className="text-gray-400 text-sm">
                                                                    Marché officiel GalileeCommerce
                                                                </p>
                                                            </div>
                                                        </Link>

                                                        <Link
                                                            href="/products/forcategory"
                                                            onClick={() => setOpenMarches(false)}
                                                            className="flex items-center gap-3 p-4 rounded-xl 
                           bg-white/5 hover:bg-white/10
                           border border-white/10
                           transition-all duration-300 group"
                                                        >
                                                            <Globe className="text-blue-400 group-hover:scale-110 transition" size={20} />
                                                            <div>
                                                                <p className="text-white font-medium">Global Market</p>
                                                                <p className="text-gray-400 text-sm">
                                                                    Marché international
                                                                </p>
                                                            </div>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </>,
                                        document.body
                                    )}
                            </div>



                            <Link href="#" className="inline-block px-2 py-1 flex items-center rounded transition-colors text-white">
                                Pavillons
                                <CountrySelector />
                            </Link>

                            <Link

                                href="#"
                                className="inline-block px-2 py-1 rounded transition-colors text-white"
                            >
                                <button
                                    type="button"
                                    onClick={visiteCorridors}
                                    className="inline-block px-2 py-1 rounded transition-colors text-white hover:bg-white/10"
                                >
                                    Corridors
                                </button>

                            </Link>

                            <Link href="#" className="inline-block px-2 py-1 rounded transition-colors text-white"
                                onMouseEnter={handleMouseEnter}   // si on survole le menu → annule hide
                                onMouseLeave={handleMouseLeave}   // si on quitte → démarre le hide
                            >
                                Centrale d’achat
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
                            <Link href="#" className="inline-block px-2 py-1 rounded transition-colors text-white">
                                <button
                                    type="button"
                                    onClick={become_seller}
                                    className="inline-block px-2 py-1 rounded transition-colors text-white hover:bg-white/10"
                                >
                                    Devenir fournisseur
                                </button>

                            </Link>
                            <Link href="#" className="inline-block px-2 py-1 rounded transition-colors text-white">
                                <button
                                    type="button"
                                    onClick={become_ambassador}
                                    className="inline-block px-2 py-1 rounded transition-colors text-white hover:bg-white/10"
                                >
                                    Devenir ambassadeur
                                </button>
                            </Link>

                            {/* A propos */}
                            <div
                                className="hidden  relative inline-block lg:block hidden"
                                onMouseEnter={() => setOpenDropdown(true)}
                                onMouseLeave={() => setOpenDropdown(false)}
                            >
                                <button
                                    onClick={() => openDrawer('MOBILE_MENU')}
                                    //onClick={() => setOpenDropdown((s) => !s)}
                                    className={`hidden px-2 py-1 rounded transition-colors flex items-center gap-1 ${isHoverCategories ? 'bg-white text-black' : 'text-white'} text-xs lg:text-sm`}
                                    aria-haspopup="true"

                                >
                                    A propos
                                    <span className={`ml-1 transition-transform ${openDropdown ? 'rotate-180' : ''}`}>▼</span>
                                </button>

                                {/*  {openDropdown && (
                <div className="absolute top-full left-0 mt-1 w-56 max-w-[90vw] lg:w-56 rounded-md shadow-lg bg-white z-[9999] lg:z-50 text-sm">
                  <ul className="py-2">
                    <li>
                      <Link href={routes.becomeSeller} className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                        Devenir fournisseur
                      </Link>
                    </li>
                    <li>
                      <Link href={routes.mega} className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                        Centrale d’achat
                      </Link>
                    </li>
                    <li>
                      <Link href={routes.services} className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                        Services
                      </Link>
                    </li>
                    <li>
                      <Link href={routes.productscategory} className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                        Les produits
                      </Link>
                    </li>
                    <li>
                      <Link href={routes.authors} className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                        Les meilleurs vendeurs
                      </Link>
                    </li>
                    <li>
                      <Link href={routes.contact} className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                        Centre d’assistance
                      </Link>
                    </li>
                    <li>
                      <Link href={routes.help} className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                        Aides
                      </Link>
                    </li>
                    <li>
                      <Link href={routes.terms} className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                        Terms & Conditions
                      </Link>
                    </li>
                    <li>
                      <Link href={routes.privacy} className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                        Politique de confidentialité
                      </Link>
                    </li>
                  </ul>
                </div>
              )}*/}
                            </div>

                        </nav>
                        {/* ➡️ Bouton scroll droite */}

                        <nav
                            ref={navStickyRef}
                            className={` lg:ml-9
        flex items-center gap-3 text-[8px] lg:text-sm text-gray-200 px-2
        overflow-x-auto overflow-y-visible whitespace-nowrap
        relative left-1
        lg:left-auto lg:relative lg:right-2 lg:gap-9
       ${showSearch ? " translate-y-0" : "hidden -translate-y-4 pointer-events-none"}
        `}
                            style={{ scrollbarWidth: "none" }} // Firefox
                        >
                            {items.map((item, idx) => (
                                <Link
                                    key={idx}
                                    href={item.href}
                                    className={`inline-block px-2 py-1 
                ${showSearch ? "text-black" : ""}
              `}
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </nav>
                        <button
                            type="button"
                            onClick={() => scrollNav('right')}
                            className="absolute right-0 z-10 h-full px-2 bg-gradient-to-l from-black/70 to-transparent text-white hover:scale-110 transition"
                        >
                            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M8.5 5L15.5 12L8.5 19" />
                            </svg>
                        </button>
                    </div >
                </div>



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
