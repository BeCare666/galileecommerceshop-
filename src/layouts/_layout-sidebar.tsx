import React, { useEffect, useState, useRef } from 'react';
import { useDrawer } from '@/components/drawer-views/context';
import { CloseIcon } from '@/components/icons/close-icon';
import { DiscoverIcon } from '@/components/icons/discover-icon';
import { FeedIcon } from '@/components/icons/feed-icon';
import { HelpIcon } from '@/components/icons/help-icon';
import { HomeIcon } from '@/components/icons/home-icon';
import { PaperPlaneIcon } from '@/components/icons/paper-plane-icon';
import CountrySelector from '@/components/country-selector/country-selector';
import { PeopleIcon } from '@/components/icons/people-icon';
import { ProductIcon } from '@/components/icons/product-icon';
import { SettingIcon } from '@/components/icons/setting-icon';
import ActiveLink from '@/components/ui/links/active-link';
import Link from '@/components/ui/link';
import Logo from '@/components/ui/logo';
import Scrollbar from '@/components/ui/scrollbar';
import routes from '@/config/routes';
import Copyright from '@/layouts/_copyright';
import cn from 'classnames';
import { useTranslation } from 'next-i18next';
import { useWindowSize } from 'react-use';
import Modal from '@/components/modal/modal';
import {
  isMultiLangEnable,
  checkIsMaintenanceModeComing,
  checkIsScrollingStart,
  RESPONSIVE_WIDTH,
} from '@/lib/constants';
import { useAtom } from 'jotai';
import { twMerge } from 'tailwind-merge';

interface NavLinkProps {
  href: string;
  title?: string;
  icon: React.ReactNode;
  isCollapse?: boolean;
  children?: React.ReactNode;
  onClick?: () => void;
}

function NavLink({
  href,
  icon,
  title,
  isCollapse,
  children,
  onClick,
}: NavLinkProps) {
  return (
    <div className="relative">
      <ActiveLink
        href={href}
        className="my-0.5 flex items-center gap-1 px-4 py-3 hover:bg-light-300 hover:dark:bg-dark-300 xs:px-6 sm:my-1 sm:gap-1.5 sm:px-7 lg:gap-2 xl:my-0.5"
        activeClassName="text-dark-100 active-text-dark dark:active-text-light dark:text-light-400 font-medium bg-light-400 dark:bg-dark-400 hover:bg-light-600 hover:dark:bg-dark-500"
      >
        <span
          className={cn(
            'flex flex-shrink-0 items-center justify-start',
            isCollapse ? 'w-8 xl:w-auto' : 'w-auto xl:w-8',
          )}
        >
          {icon}
        </span>

        {/* Si title existe, on l’affiche */}
        {title && (
          <span
            className={cn(
              'text-dark-100 dark:text-light-400',
              isCollapse ? 'inline-flex xl:hidden' : 'hidden xl:inline-flex',
            )}
          >
            {title}
          </span>
        )}

        {/* Si children existe, on l’affiche aussi */}
        {children && (
          <span
            className={cn(
              'text-dark-100 dark:text-light-400',
              isCollapse ? 'inline-flex xl:hidden' : 'hidden xl:inline-flex',
            )}
          >
            {children}
          </span>
        )}
      </ActiveLink>
    </div>
  );
}

export function Sidebar({
  isCollapse,
  className = 'hidden sm:flex fixed bottom-0 z-20',
}: {
  isCollapse?: boolean;
  className?: string;
}) {
  const { t } = useTranslation('common');
  const { width } = useWindowSize();
  const [underMaintenanceIsComing] = useAtom(checkIsMaintenanceModeComing);
  const [isScrolling] = useAtom(checkIsScrollingStart);
  const [open, setOpen] = useState(false);
  const [mapIsOk, setMapIsOk] = useState(false);
  //sm:w-60
  return (
    <aside
      className={twMerge(
        cn(
          'h-full flex-col justify-between overflow-y-auto border-r border-light-400 bg-light-100 pt-[92px] text-dark-900 dark:border-0 dark:bg-dark-200',
          isCollapse ? 'xl:w-[75px]' : 'sm:w-[75px] xl:w-60',
          width >= RESPONSIVE_WIDTH && underMaintenanceIsComing && !isScrolling
            ? 'pt-[9.625rem]'
            : '',
          className,
        ),
      )}
    >
      <Scrollbar className="relative h-full w-full">
        <div className="flex h-full w-full flex-col">
          <nav className="flex flex-col gap-1 mt-4">
            {/* Home */}
            <NavLink
              title="Accueil"
              href={routes.home}
              isCollapse={isCollapse}
              icon={<HomeIcon className="h-5 w-5 text-pink-500" />}
            />

            {/* About Us */}
            {/* About Us */}
            <NavLink
              title="A propos"
              href={routes.about}
              isCollapse={isCollapse}
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-pink-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M12 19a7 7 0 110-14 7 7 0 010 14z"
                  />
                </svg>
              }
            />

            {/* Parvions 
            <NavLink
              title="Parvions"
              href="#"
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-blue-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.5 19.5l19-7.5-19-7.5 5 7.5-5 7.5z"
                  />
                </svg>
              }
            >
              Parvions
              <CountrySelector />
            </NavLink>
*/}
            {/* Corridors 
            <NavLink
              title="Corridors"
              href="#"
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-green-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              }
              onClick={() => setOpen(true)}>
              Corridors
              <Modal isOpen={open} onClose={() => setOpen(false)}
                mapIsOk={mapIsOk}
                setMapIsOk={setMapIsOk} />
            </NavLink>
*/}
            {/* Méga centrale d’achat 
            <NavLink
              title="Méga centrale d’achat"
              href={routes.mega}
              isCollapse={isCollapse}
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-purple-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h18v4H3V3zm0 6h18v12H3V9z"
                  />
                </svg>
              }
            />
*/}
            {/* Devenir fournisseur 
            <NavLink
              title="Devenir fournisseur"
              href={routes.becomeSeller}
              isCollapse={isCollapse}
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-yellow-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8v10m-6 4h12"
                  />
                </svg>
              }
            />*/}

            {/* Services 
            <NavLink
              title="Services"
              href={routes.services}
              isCollapse={isCollapse}
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-pink-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.75 17L9 21l3-1.5L15 21l-.75-4M4 10h16M4 6h16M4 14h16"
                  />
                </svg>
              }
            />
*/}
            {/* All Products */}
            <NavLink
              title="Les produits"
              href={routes.productscategory}
              isCollapse={isCollapse}
              icon={<ProductIcon className="h-5 w-5 text-pink-500" />}
            />
            {/* Top Authors */}
            <NavLink
              title="Les meilleurs vendeurs"
              href={routes.authors}
              isCollapse={isCollapse}
              icon={<PeopleIcon className="h-5 w-5 text-pink-500" />}
            />

            {/* Contact */}
            <NavLink
              title="Centre d’assistance"
              href={routes.contact}
              isCollapse={isCollapse}
              icon={<PaperPlaneIcon className="h-5 w-5 text-pink-500" />}
            />

            {/* Settings 
            <NavLink
              title="Settings"
              href={routes.profile}
              isCollapse={isCollapse}
              icon={<SettingIcon className="h-5 w-5 text-pink-500" />}
            />
*/}
            {/* Help */}
            <NavLink
              title="Aides"
              href={routes.help}
              isCollapse={isCollapse}
              icon={<HelpIcon className="h-5 w-5 text-pink-500" />}
            />

            {/* Terms & Privacy */}
            <NavLink
              title="Terms & Conditions"
              href={routes.terms}
              isCollapse={isCollapse}
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-pink-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              }
            />
            <NavLink
              title="Politique de confidentialité"
              href={routes.privacy}
              isCollapse={isCollapse}
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-pink-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 11c0-1.657-1.343-3-3-3s-3 1.343-3 3 1.343 3 3 3 3-1.343 3-3z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 11v10"
                  />
                </svg>
              }
            />

            {/* Additional pages */}
            <NavLink
              title="Contrat de licence"
              href={routes.licensing}
              isCollapse={isCollapse}
              icon={<ProductIcon className="h-5 w-5 text-pink-500" />}
            />
            {/* <NavLink title="Shipping Policy" href={routes.privacy} isCollapse={isCollapse} icon={<ProductIcon className="h-5 w-5 text-pink-500" />} />*/}
          </nav>
        </div>
      </Scrollbar>

      {/* Footer */}
      <footer
        className={cn(
          'flex-col border-t border-light-400 pt-2 pb-2 text-center dark:border-dark-400',
          isCollapse ? 'flex xl:hidden' : 'hidden xl:flex',
        )}
      >
        <nav className="flex items-center justify-center gap-5 pb-1.5 text-13px font-medium capitalize tracking-[0.2px]">
          <ActiveLink
            href={routes.terms}
            className="block py-2 text-dark-700 hover:text-dark-100 dark:hover:text-brand"
          >
            Termes & Conditions
          </ActiveLink>
          <ActiveLink
            href={routes.privacy}
            className="block py-2 text-dark-700 hover:text-dark-100 dark:hover:text-brand"
          >
            Politique de confidentialité
          </ActiveLink>
          <ActiveLink
            href={routes.help}
            className="block py-2 text-dark-700 hover:text-dark-100 dark:hover:text-brand"
          >
            Aides
          </ActiveLink>
        </nav>
        <Copyright className="px-1 text-xs font-medium text-dark-800/80 dark:text-dark-700" />
      </footer>
    </aside>
  );
}

export default function SidebarDrawerView() {
  const { closeDrawer } = useDrawer();
  const { t } = useTranslation();
  return (
    <>
      <div className="flex h-[70px] items-center justify-between py-2 px-5 xs:px-7">
        <Logo />
        <div className="ml-3 flex h-7 items-center">
          <button
            type="button"
            className="-m-2 p-2 text-dark-900 outline-none transition-all hover:text-dark dark:text-dark-800 hover:dark:text-light-200"
            onClick={closeDrawer}
          >
            <span className="sr-only">{t('text-close-panel')}</span>
            <CloseIcon className="h-4 w-4" />
          </button>
        </div>
      </div>
      <Sidebar isCollapse={true} className="flex text-13px" />
    </>
  );
}
