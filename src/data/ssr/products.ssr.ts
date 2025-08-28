import invariant from 'tiny-invariant';
import client from '@/data/client';
import type {
  GetStaticPaths,
  GetStaticProps,
} from 'next';
import { Product } from '@/types';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

// Cette fonction est appelée au build
type ParsedQueryParams = {
  productSlug: string;
};

export const getStaticPaths: GetStaticPaths<ParsedQueryParams> = async ({
  locales,
}) => {
  invariant(locales, 'locales is not defined');
  const { data } = await client.products.all({ limit: 100 });
  const paths = data?.flatMap((product) =>
    locales?.map((locale) => ({
      params: { productSlug: product.slug },
      locale,
    }))
  );
  return {
    paths,
    fallback: 'blocking',
  };
};

type PageProps = {
  product: Product;
};

export const getStaticProps: GetStaticProps<
  PageProps,
  ParsedQueryParams
> = async ({ params, locale }) => {
  const { productSlug } = params!;

  try {
    // Ici, tu récupères directement le produit (type Product)
    const product = await client.products.get({ slug: productSlug, language: locale });
    return {
      props: {
        product,
        ...(await serverSideTranslations(locale!, ['common'])),
      },
      revalidate: 60,
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};
