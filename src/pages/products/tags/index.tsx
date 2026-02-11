import { GetStaticProps } from "next";

export default function TagsIndex() {
    return null;
}

export const getStaticProps: GetStaticProps = async () => {
    return {
        redirect: {
            destination: "/",
            permanent: false,
        },
    };
};
