import { useRouter } from 'next/router';

export default function TestLocales() {
    const router = useRouter();

    return (
        <div>
            <h1>Locales from router:</h1>
            <pre>{JSON.stringify(router.locales, null, 2)}</pre>
            <h2>Current locale:</h2>
            <p>{router.locale}</p>
        </div>
    );
}
