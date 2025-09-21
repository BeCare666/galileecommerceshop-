import Banner from '@/components/authors/banner';
import Nav from '@/components/authors/nav';
import Products from '@/components/authors/products';
import { getStaticPaths, getStaticProps } from '@/data/ssr/shop.ssr';
import Layout from '@/layouts/_layout';
import type { NextPageWithLayout } from '@/types';
import type { InferGetStaticPropsType } from 'next';
export { getStaticPaths, getStaticProps };

const ShopPage: NextPageWithLayout<
  InferGetStaticPropsType<typeof getStaticProps>
> = ({ shop }) => {
  const { name, logo_image_url, cover_image_url, slug } = shop;
  return (
    <>
      <Banner
        coverImage={cover_image_url}
        logo={logo_image_url}
        name={name}
        shopId={shop?.id}
      />
      <Nav slug={slug} />
      <div className="h-full">
        <div className="flex h-full pt-6 focus:outline-none md:pt-8 lg:pt-10">
          <Products shopId={shop.id} />
        </div>
      </div>
    </>
  );
};

ShopPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default ShopPage;
