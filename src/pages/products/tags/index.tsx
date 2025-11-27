export function getStaticProps() {
    return {
        redirect: {
            destination: '/',
            permanent: false,
        },
    };
}

export default function TagsIndex() {
    return null;
}
