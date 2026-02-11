import { GetStaticProps } from "next";

export default function TagsIndex() {
    return null;
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
    return {
        redirect: {
            destination: locale ? `/${locale}` : "/",
            permanent: false,
        },
    };
};
