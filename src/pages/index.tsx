import type {
  CategoryQueryOptions,
  NextPageWithLayout,
  ProductQueryOptions,
  SettingsQueryOptions,
} from '@/types';
import HomePage from '@/components/home-page/home-page';
import FreeShipping from '@/components/free-shipping/free-shipping';
import LimitedOffer from '@/components/limited-offer/limited-offer';
import PromoBannier from '@/components/promo-bannier/promo-bannier';
import TitleComponent from '@/components/title-component/title-component';
import BestHomeSellers from '@/components/best-home-sellers/best-home-sellers';
import type { GetStaticProps } from 'next';
import Layout from '@/layouts/_layout';
import { useProducts } from '@/data/product';
import Grid from '@/components/product/grid';
import { useRouter } from 'next/router';
import Seo from '@/layouts/_seo';
import routes from '@/config/routes';
import client from '@/data/client';
import { dehydrate, QueryClient } from 'react-query';
import { API_ENDPOINTS } from '@/data/client/endpoints';
import CategoryFilter from '@/components/product/category-filter';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import PreloaderWrapper from '@/components/loader/preloaderWrapper';
import { GlobeIcon } from '@/components/icons/globe';
import Button from '@/components/ui/button';
import Modal from '@/components/modal/modal';
import React, { useState } from 'react';
import Footer from '@/components/footer/footer';
import Services from '@/components/services/services';
import Howtowork from '@/components/howtowork/howtowork';
import AboutUs from '@/components/about-us/about-section';
export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const queryClient = new QueryClient();
  try {
    await Promise.all([
      queryClient.prefetchQuery(
        [API_ENDPOINTS.SETTINGS, { language: locale }],
        ({ queryKey }) =>
          client.settings.all(queryKey[1] as SettingsQueryOptions),
      ),

      queryClient.prefetchInfiniteQuery(
        [API_ENDPOINTS.CATEGORIES, { limit: 100, language: locale }],
        ({ queryKey }) =>
          client.categories.all(queryKey[1] as CategoryQueryOptions),
      ),
      queryClient.prefetchInfiniteQuery(
        [API_ENDPOINTS.PRODUCTS, { language: locale }],
        ({ queryKey }) =>
          client.products.all(queryKey[1] as ProductQueryOptions),
      ),
    ]);
    return {
      props: {
        ...(await serverSideTranslations(locale!, ['common'])),
        dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
      },
      revalidate: 60, // In seconds
    };
  } catch (error) {
    //* if we get here, the product doesn't exist or something else went wrong
    return {
      notFound: true,
    };
  }
};

function Products() {
  const { query } = useRouter();
  const { products, loadMore, hasNextPage, isLoadingMore, isLoading } =
    useProducts({
      ...(query.category && { categories: query.category }),
      ...(query.price && { price: query.price }),
      sortedBy: 'DESC',
    });
  console.log('Products', products);
  return (
    <Grid
      products={products}
      limit={30}
      onLoadMore={loadMore}
      hasNextPage={hasNextPage}
      isLoadingMore={isLoadingMore}
      isLoading={isLoading}
    />
  );
}

// TODO: SEO text gulo translation ready hobe kina? r seo text gulo static thakbe or dynamic?
const Home: NextPageWithLayout = () => {
  const [open, setOpen] = useState(false);
  const [mapIsOk, setMapIsOk] = useState(false);
  return (
    <>
      <Seo
        title="galileecommerce"
        description="L'incontournable plateforme digitale pour le commerce en Afrique"
        url={routes.home}
      />
      {/*  */}

      <PreloaderWrapper>
        <CategoryFilter />
        <HomePage />
        <TitleComponent subtitle="Découvrez les nouveautés">
          Nouveautés
        </TitleComponent>
        <Products />
        <TitleComponent subtitle="Qui nous sommes et ce que nous faisons">
          À propos de nous
        </TitleComponent>
        <AboutUs />
        <FreeShipping />
        <TitleComponent subtitle="Découvrez nos offres limitées">
          Offre Limitée
        </TitleComponent>
        <LimitedOffer />
        <TitleComponent subtitle="Découvrez comment ça marche chez galileecommerce">
          Comment ça marche ?
        </TitleComponent>
        <Howtowork />
        <TitleComponent subtitle="Voici nos meilleurs produits en promotion">
          Promotions
        </TitleComponent>
        <PromoBannier />
        <TitleComponent subtitle="Découvrez nos produits les plus populaires">
          Meilleures Ventes
        </TitleComponent>
        <BestHomeSellers />
        <TitleComponent subtitle="Voici nos services">
          Nos services
        </TitleComponent>
        <Services />
        <TitleComponent subtitle="Découvrez les nouveautés">
          Nouveautés
        </TitleComponent>
        <Products />
        <Footer />
        <Button
          variant="icon"
          aria-label="Globe"
          onClick={() => setOpen(true)}
          className="hidden md:flex fixed bottom-4 right-4 z-[9999]"
        >
          <div className="flex flex-col items-center justify-center">
            <GlobeIcon className="h-8 w-8 p-2" />
            <span className="text-xs mt-1">Corridors</span>
            <Modal
              isOpen={open}
              onClose={() => setOpen(false)}
              mapIsOk={mapIsOk}
              setMapIsOk={setMapIsOk}
            />
          </div>
        </Button>

        {/** Uncomment the line below to enable the promotional slider */}
        {/**<PromotionalSlider /> * */}
      </PreloaderWrapper>
    </>
  );
};

Home.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Home;
