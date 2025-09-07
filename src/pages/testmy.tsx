import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import productPlaceholder from '@/assets/logo/ilogo.png';
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
import routes from '@/config/routes';
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
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : '';
  }, [drawerOpen]);

  return (
    <header
      className={`w-full sticky top-0 z-50 transition-colors duration-300
    ${isHoverCategories ? 'bg-white text-black' : 'bg-gray-900 text-white'}`}
    >
      {' '}
      {/* Top bar */}
      <div className="max-w-[1780px] px-3 py-3 flex items-center justify-between">
        {/* Logo + desktop nav */}
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-3">
            <Image
              src={productPlaceholder}
              alt="Logo"
              width={164}
              height={84}
              className="object-contain group-hover:brightness-0"
            />
          </div>

          {/* Desktop nav */}
          <nav className="hidden lg:flex gap-9 text-sm text-gray-200 relative">
            {/* Liens principaux */}
            <Link
              href="#"
              className={`px-2 py-1 rounded transition-colors ${
                isHoverCategories
                  ? 'bg-white text-black'
                  : 'bg-gray-900 text-white'
              }`}
            >
              Suivi des commandes
            </Link>
            <Link
              href="#"
              className={`px-2 py-1 flex items-center rounded transition-colors ${
                isHoverCategories
                  ? 'bg-white text-black'
                  : 'bg-gray-900 text-white'
              }`}
            >
              Pavillons
              <CountrySelector />
            </Link>

            <Link
              onClick={() => setOpenC(true)}
              href="#"
              className={`px-2 py-1 rounded transition-colors ${
                isHoverCategories
                  ? 'bg-white text-black'
                  : 'bg-gray-900 text-white'
              }`}
            >
              Corridors
              <Modal
                isOpen={openC}
                onClose={() => setOpenC(false)}
                mapIsOk={mapIsOk}
                setMapIsOk={setMapIsOk}
              />
            </Link>

            {/* Dropdown A propos */}
            <div
              className="relative"
              onMouseEnter={() => setOpenDropdown(true)}
              onMouseLeave={() => setOpenDropdown(false)}
            >
              <button
                className={`px-2 py-1 rounded transition-colors flex items-center gap-1 ${
                  isHoverCategories
                    ? 'bg-white text-black'
                    : 'bg-gray-900 text-white'
                }`}
              >
                A propos
                <span
                  className={`ml-1 transition-transform ${openDropdown ? 'rotate-180' : ''}`}
                >
                  ▼
                </span>
              </button>

              {openDropdown && (
                <div className="absolute top-full left-0 mt-1 w-56 rounded-md shadow-lg bg-white z-50">
                  <ul className="py-2">
                    <li>
                      <Link
                        href={routes.becomeSeller}
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                      >
                        Devenir fournisseur
                      </Link>
                    </li>
                    <li>
                      <Link
                        href={routes.mega}
                        className={`px-2 py-1 rounded transition-colors ${
                          isHoverCategories
                            ? 'bg-white text-black'
                            : 'bg-gray-900 text-white'
                        }`}
                      >
                        Centrale d’achat
                      </Link>
                    </li>
                    <li>
                      <Link
                        href={routes.services}
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                      >
                        Services
                      </Link>
                    </li>
                    <li>
                      <Link
                        href={routes.productscategory}
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                      >
                        Les produits
                      </Link>
                    </li>
                    <li>
                      <Link
                        href={routes.authors}
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                      >
                        Les meilleurs vendeurs
                      </Link>
                    </li>
                    <li>
                      <Link
                        href={routes.contact}
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                      >
                        Centre d’assistance
                      </Link>
                    </li>
                    <li>
                      <Link
                        href={routes.help}
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                      >
                        Aides
                      </Link>
                    </li>
                    <li>
                      <Link
                        href={routes.terms}
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                      >
                        Terms & Conditions
                      </Link>
                    </li>
                    <li>
                      <Link
                        href={routes.privacy}
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                      >
                        Politique de confidentialité
                      </Link>
                    </li>
                    <li>
                      <Link
                        href={routes.licensing}
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                      >
                        Contrat de licence
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </nav>
        </div>

        {/* Right */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 border border-gray-700 rounded px-2 py-1 hover:border-pink-500 transition-colors group-hover:border-black">
            <LanguageSwitcher />
          </div>
          {!isAuthorized && (
            <div className="hidden md:flex gap-4 items-center text-sm">
              <button className="hover:scale-105 transition-transform group-hover:text-black">
                Connexion
              </button>
              <button className="hover:scale-105 transition-transform group-hover:text-black">
                Créer un compte
              </button>
            </div>
          )}

          {/* Icons */}
          <div className="flex items-center gap-4">
            {/* Wishlist */}
            <div className="relative hover:scale-110 transition-transform cursor-pointer">
              <svg
                className={`w-7 h-7   group-hover:text-black
                            ${isHoverCategories ? 'bg-white text-black' : 'bg-gray-900 text-white'}`}
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M12 21s-7-4.35-9-7.11C-1 9.5 5 4 8 7c1 1 2 2 4 2s3-1 4-2c3-3 9 2.5 5 6.89C19 16.65 12 21 12 21z"
                  fill="currentColor"
                />
              </svg>

              <span className="absolute -top-1 -right-2 bg-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
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
                            ${isHoverCategories ? 'bg-white text-black' : 'bg-gray-900 text-white'}`}
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
        </div>
      </div>
      {/* Search bar */}
      <div className="bg-gray-800 py-4 relative">
        <div className="max-w-[1780px] mx-auto px-6 flex items-center h-14 relative">
          {/* Toutes les catégories */}
          <div
            className="absolute flex items-center h-full"
            onMouseEnter={() => setIsHoverCategories(true)}
            onMouseLeave={() => setIsHoverCategories(false)}
          >
            <CategoryMegaMenu />
          </div>

          {/* Input + Plus */}
          <div className="ml-[140px] lg:ml-[5px] flex-1 flex justify-center items-center gap-3 h-full">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Rechercher ...."
              className="max-w-[150px] lg:max-w-[400px] w-full w-[10px] bg-gray-600 flex-1 rounded-full px-4 py-2 text-gray-900 placeholder-gray-500 shadow-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-200"
              onClick={openSearch}
            />
            <button
              className="rounded-[5px] px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-medium shadow-lg hover:scale-105 transition-transform flex items-center gap-1"
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

          {/* LoginMenu */}
          <div className="absolute right-6 flex items-center h-full">
            <span className="hidden lg:block">Mon compte &nbsp;</span>
            <LoginMenu />
          </div>
        </div>
      </div>
      {/* Dropdown */}
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
      {/* Mobile Drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-[1000] flex">
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/50"
            onClick={() => setDrawerOpen(false)}
          />

          {/* Drawer */}
          <div
            ref={drawerRef}
            className={`fixed top-0 right-0 w-72 h-full bg-gray-900 text-white shadow-lg transform transition-transform duration-300 ease-in-out z-[1001] ${
              drawerOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
          >
            <div className="flex flex-col h-full">
              {/* Header with logo + close */}
              <div className="flex items-center justify-between px-4 py-4 border-b border-gray-700">
                <div className="flex items-center gap-2">
                  <Image
                    src={productPlaceholder}
                    alt="Logo"
                    width={164}
                    height={84}
                  />
                </div>
                <button
                  onClick={() => setDrawerOpen(false)}
                  className="text-gray-400 hover:text-white"
                >
                  ✕
                </button>
              </div>

              {/* Navigation */}
              <nav className="flex flex-col gap-4 px-4 py-6">
                {[
                  'Suivi des commandes',
                  'Marché',
                  'Pavillons',
                  'Corridors',
                  'Centrale d’achat',
                  'Devenir fournisseur',
                ].map((item, idx) => (
                  <a key={idx} className="hover:text-pink-500 transition">
                    {item}
                  </a>
                ))}
              </nav>

              {/* Spacer */}
              <div className="flex-grow"></div>

              {/* Connexion / Créer un compte */}
              {isAuthorized && (
                <div className="px-4 py-6 border-t border-gray-700 flex flex-col gap-3">
                  <button className="w-full py-2 px-4 rounded bg-pink-600 hover:bg-pink-700 transition">
                    Devenir fournisseur
                  </button>
                  <button className="w-full py-2 px-4 rounded bg-gray-700 hover:bg-gray-600 transition">
                    Devenir ambassadeur
                  </button>
                </div>
              )}
              {!isAuthorized && (
                <div className="px-4 py-6 border-t border-gray-700 flex flex-col gap-3">
                  <button className="w-full py-2 px-4 rounded bg-pink-600 hover:bg-pink-700 transition">
                    Connexion
                  </button>
                  <button className="w-full py-2 px-4 rounded bg-gray-700 hover:bg-gray-600 transition">
                    Créer un compte
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
