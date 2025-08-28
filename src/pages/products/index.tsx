// pages/products/index.tsx
import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import DashboardLayout from '@/layouts/_dashboard';
import type { GetStaticProps } from 'next';
import { motion } from 'framer-motion';
import { fadeInBottom } from '@/lib/framer-motion/fade-in-bottom';
import { useTranslation } from 'next-i18next';
import type { NextPageWithLayout, UpdateProfileInput } from '@/types';
import Layout from '@/layouts/_layout';
import ProductList from '@/components/product/product-list';// Ajuste ce chemin selon ton projet
import CategoryFilter from '@/components/product/category-filter';//

const ProductsPage: NextPageWithLayout = () => {
    const { t } = useTranslation('common');
    return (
        <div>
            <CategoryFilter />
            <ProductList />
        </div>
    );
}
ProductsPage.authorization = true;
ProductsPage.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
    return {
        props: {
            ...(await serverSideTranslations(locale!, ['common'])),
        },
    };
};

export default ProductsPage;