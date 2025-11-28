// src/pages/products/tags/[tagSlug].tsx
import { GetStaticPaths, GetStaticProps } from 'next';
import { dehydrate, QueryClient } from 'react-query';
import invariant from 'tiny-invariant';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import client from '@/data/client';
import { API_ENDPOINTS } from '@/data/client/endpoints';
import { useProducts } from '@/data/product';
import Grid from '@/components/product/grid';
import Layout from '@/layouts/_layout';
import type { NextPageWithLayout, ProductQueryOptions, Tag } from '@/types';

type ParsedQueryParams = {
  tagSlug: string;
};

type PageProps = {
  tag: Tag;
};

export const getStaticPaths: GetStaticPaths<ParsedQueryParams> = async ({
  locales,
}) => {
  const safeLocales = Array.isArray(locales) && locales.length ? locales : ['fr'];

  let tags: Array<{ slug: string }> = [];
  try {
    const res = await client.tags.all({ limit: 100 });
    tags = (res?.data ?? []) as Array<{ slug: string }>;
  } catch (err) {
    console.error('Erreur récupération tags:', err);
    tags = [];
  }

  const paths =
    tags.length > 0
      ? tags.flatMap((tag) =>
        safeLocales.map((locale) => ({
          params: { tagSlug: tag.slug },
          locale,
        }))
      )
      : [];

  return {
    paths,
    fallback: 'blocking', // permet de générer à la volée si pas dans paths
  };
};

export const getStaticProps: GetStaticProps<PageProps, ParsedQueryParams> = async ({
  params,
  locale,
}) => {
  const queryClient = new QueryClient();
  const { tagSlug } = params!;

  try {
    const tag = await client.tags.get({ slug: tagSlug, language: locale });
    if (!tag) {
      return { notFound: true };
    }

    await queryClient.prefetchInfiniteQuery(
      [API_ENDPOINTS.PRODUCTS, { tags: tagSlug, language: locale }],
      ({ queryKey }) => client.products.all(queryKey[1] as ProductQueryOptions)
    );

    return {
      props: {
        tag,
        dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
        ...(await serverSideTranslations(locale!, ['common'])),
      },
      revalidate: 60,
    };
  } catch (error) {
    console.error('Erreur getStaticProps [tagSlug]:', error);
    return { notFound: true };
  }
};

const TagPage: NextPageWithLayout<PageProps> = ({ tag }) => {
  const { products, paginatorInfo, isLoading, loadMore, hasNextPage, isLoadingMore } =
    useProducts({ tags: tag.slug }, { staleTime: Infinity });

  return (
    <>
      <div className="flex flex-col items-center justify-between gap-1.5 px-4 pt-5 xs:flex-row md:px-6 md:pt-6 lg:px-7 3xl:px-8">
        <h2 className="font-medium capitalize text-dark-100 dark:text-light">
          #{tag.name}
        </h2>
        <div>
          Total {paginatorInfo?.total} produit(s) trouvé(s)
        </div>
      </div>
      <Grid
        products={products}
        onLoadMore={loadMore}
        hasNextPage={hasNextPage}
        isLoadingMore={isLoadingMore}
        isLoading={isLoading}
      />
    </>
  );
};

TagPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default TagPage;
