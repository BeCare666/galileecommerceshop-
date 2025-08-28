import { useState, useEffect } from 'react';
import Image from 'next/image';
import ModalPortal from '@/components/modal/ModalPortal';
import { useRouter } from 'next/router';
import FilterIcon from '@/components/icons/filter-icon';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);
export default function CountrySelectorWithModal() {
    const router = useRouter();
    const { corridor, category, search } = router.query;

    const [countries, setCountries] = useState<{ id: number; name: string; code: string }[]>([]);
    const [selectedCountry, setSelectedCountry] = useState<{ id: number; name: string; code: string } | null>(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [searchInput, setSearchInput] = useState('');
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        async function fetchCountries() {
            try {
                const API_URL = process.env.NEXT_PUBLIC_REST_API_ENDPOINT;
                if (!API_URL) {
                    throw new Error("NEXT_PUBLIC_REST_API_ENDPOINT n'est pas défini !");
                }
                const res = await fetch(`${API_URL}/countries`);
                const data = await res.json();
                setCountries(data);
                //console.log("var pays =", JSON.stringify(data, null, 2));
                // Sélectionner le pays si déjà dans l'URL
                if (router.query.countries_id) {
                    const found = data.find((c: any) => c.id === Number(router.query.countries_id));
                    setSelectedCountry(found || data[0]);
                } else {
                    setSelectedCountry(data[0]);
                }
            } catch (error) {
                console.error('Country loading error:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchCountries();
    }, [router.query.countries_id]);

    const filteredCountries = countries.filter((country) =>
        country.name.toLowerCase().includes(searchInput.toLowerCase())
    );

    const handleSelectCountry = (country: { id: number; name: string; code: string }) => {
        setSelectedCountry(country);
        setModalOpen(false);
        setSearchInput('');

        // Construire la query avec le bon paramètre : countries_id
        const query: any = {
            ...(corridor ? { corridor } : {}),
            ...(category ? { category } : {}),
            ...(search ? { search } : {}),
            countries_id: country.id, // 👈 Ici on utilise bien l'id, pas le code
        };

        // Redirection vers la page produits avec la bonne query
        MySwal.fire({
            icon: 'info',
            html: `
            <div style="
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 10px;
                font-size: 16px;
                font-weight: 500;
                line-height: 1.4;
            ">
                <span>Pavillon</span>
                <img 
                src="https://flagcdn.com/w40/${country.code.toLowerCase()}.png" 
                alt="${country.name}" 
                width="24" 
                height="16" 
                style="border-radius: 2px; box-shadow: 0 0 2px rgba(0,0,0,0.2);" 
                />
                <span>${country.name} selected</span>
            </div>
            `,

            imageAlt: "Custom image",
            confirmButtonText: "Visit this pavilion.",
            cancelButtonText: 'No thanks',
            showCancelButton: true,
        }).then((result) => {
            if (result.isConfirmed) {
                router.push({
                    pathname: '/products/forcategory',
                    query,
                });
            }
        });


    };

    return (
        <>
            {/* Bouton avec le drapeau du pays sélectionné */}
            <button
                onClick={() => setModalOpen(true)}
                className="flex items-center gap-2 px-3 py-1 text-sm font-medium text-dark-800 bg-white border border-pink-200 rounded dark:bg-dark-300 dark:text-white dark:border-dark-500"
                style={{ width: '80px', height: '30px' }}
            >

                {selectedCountry && (
                    <>
                        <FilterIcon />
                        <Image
                            src={`https://flagcdn.com/w40/${selectedCountry.code.toLowerCase()}.png`}
                            alt={selectedCountry.name}
                            width={20}
                            height={15}
                            className="rounded-sm"
                        />
                    </>
                )}
            </button>

            {modalOpen && (
                <ModalPortal>
                    <div
                        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]"
                        onClick={() => {
                            setModalOpen(false);
                            setSearchInput('');
                        }}
                    >
                        <div
                            className="bg-white dark:bg-dark-300 rounded shadow-lg max-w-xs w-full p-4"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <h3 className="text-lg font-semibold mb-4 text-dark-800 dark:text-white relative">
                                <p className="flex items-center gap-2 text-lg font-semibold text-gray-800">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-6 h-6 text-blue-600"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M3.75 3.75L10.5 3.75M3.75 3.75L3.75 20.25M3.75 3.75L20.25 3.75M20.25 3.75L20.25 16.5M20.25 16.5L14.25 16.5M20.25 16.5L10.5 3.75"
                                        />
                                    </svg>
                                    Explore country pavilion
                                </p>
                                <span
                                    className="absolute top-0 right-0 cursor-pointer text-pink-500 text-xl"
                                    onClick={() => {
                                        setModalOpen(false);
                                        setSearchInput('');
                                    }}
                                >
                                    ×
                                </span>
                            </h3>

                            {/* Champ de recherche */}
                            <input
                                type="text"
                                value={searchInput}
                                onChange={(e) => setSearchInput(e.target.value)}
                                placeholder="Search for a country..."
                                className="w-full mb-4 px-3 py-2 border border-pink-200 rounded text-dark-800 dark:text-white dark:bg-dark-400 dark:border-dark-500 focus:outline-none focus:ring-2 focus:ring-pink-300"
                                autoFocus
                            />

                            {/* Liste des pays */}
                            <ul className="max-h-60 overflow-auto">
                                {loading ? (
                                    <li className="px-3 py-2 text-sm text-center text-gray-500 dark:text-gray-400">
                                        Loading...
                                    </li>
                                ) : filteredCountries.length > 0 ? (
                                    filteredCountries.map((country) => (
                                        <li
                                            key={country.id}
                                            onClick={() => handleSelectCountry(country)}
                                            className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-dark-800 hover:bg-pink-100 dark:text-white dark:hover:bg-dark-600 cursor-pointer rounded"
                                        >
                                            <Image
                                                src={`https://flagcdn.com/w40/${country.code.toLowerCase()}.png`}
                                                alt={country.name}
                                                width={20}
                                                height={15}
                                                className="rounded-sm"
                                            />
                                            <span>{country.name}</span>
                                        </li>
                                    ))
                                ) : (
                                    <li className="px-3 py-2 text-sm text-center text-gray-500 dark:text-gray-400">
                                        No results
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>
                </ModalPortal>
            )}
        </>
    );
}
