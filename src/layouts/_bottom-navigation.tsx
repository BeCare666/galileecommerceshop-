import { useRouter } from 'next/router';
import routes from '@/config/routes';
import Button from '@/components/ui/button';
import SearchButton from '@/components/search/search-button';
import CartButton from '@/components/cart/cart-button';
import Aboutus from '@/components/ui/aboutus';

import { HomeIcon } from '@/components/icons/home-icon';
import { AboutIcon } from '@/components/icons/about-us-icon';
import { GlobeIcon } from '@/components/icons/globe';
import { useDrawer } from '@/components/drawer-views/context';
import Modal from '@/components/modal/modal';
import React, { useState } from "react";
export default function BottomNavigation() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const { openDrawer } = useDrawer();
  const [mapIsOk, setMapIsOk] = useState(false);
  return (
    <nav className="sticky bottom-0 z-30 grid h-20 w-full auto-cols-fr grid-flow-col items-center bg-light py-2 text-center dark:bg-dark-250 sm:hidden">
      <Button
        variant="icon"
        aria-label="Home"
        onClick={() => router.push(routes.home)}
      >
        <div className="flex flex-col items-center justify-center">
          <HomeIcon className="h-10 w-10 p-2 bg-white border border-pink-5 rounded-md hover:bg-pink-50 transition group-hover:scale-110" />
          <span className="text-xs mt-1">Accueil</span>
        </div>
      </Button>
      {/** <Button
        variant="icon"
        aria-label="About"
        onClick={() => router.push(routes.about)}
      >
        <div className="flex flex-col items-center justify-center">
          <AboutIcon className="h-10 w-10 p-2 bg-white border border-pink-5 rounded-md hover:bg-pink-50 transition group-hover:scale-110" />
          <span className="text-xs mt-1">A propos</span>
        </div>
      </Button>**/}
      <Button
        variant="icon"
        aria-label="Products"
      //onClick={() => router.push(routes.products)}
      >
        <div className="flex flex-col items-center justify-center">
          <SearchButton />
          <span className="text-xs mt-1">Recherche</span>
        </div>
      </Button>

      <Button
        variant="icon"
        aria-label="Cart"
      >
        <div className="flex flex-col items-center justify-center">
          {router.asPath !== routes.checkout && (
            <CartButton className="mt-1.5" />
          )}
          <span className="text-xs mt-1">Panier</span>
        </div>
      </Button>

      <Button
        variant="icon"
        aria-label="Globe"
        onClick={() => setOpen(true)}
      >
        <div className="flex flex-col items-center justify-center">
          <GlobeIcon className="h-8 w-8 p-2" />
          <span className="text-xs mt-1">Corridors</span>
          <Modal isOpen={open} onClose={() => setOpen(false)}
            mapIsOk={mapIsOk}
            setMapIsOk={setMapIsOk} />
        </div>
      </Button>

      <div className="flex flex-col items-center justify-center"
      >
        <Aboutus onClick={() => openDrawer('MOBILE_MENU')} />
        <span className="text-xs mt-1">A propos</span>
      </div>
    </nav>

  );
}
