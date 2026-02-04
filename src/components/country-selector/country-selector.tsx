import { useState, useEffect } from 'react';
import Image from 'next/image';
import ModalPortal from '@/components/modal/ModalPortal';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { getAuthToken } from '../../data/client/token.utils';

const token = getAuthToken();
const MySwal = withReactContent(Swal);

export default function CountrySelectorWithDrawer() {
  const router = useRouter();
  const { corridor, category, search } = router.query;

  const [countries, setCountries] = useState<
    { id: number; name: string; code: string }[]
  >([]);
  const [selectedCountry, setSelectedCountry] = useState<{
    id: number;
    name: string;
    code: string;
  } | null>(null);

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCountries() {
      try {
        const API_URL = process.env.NEXT_PUBLIC_REST_API_ENDPOINT;
        if (!API_URL) throw new Error('API endpoint manquant');

        const res = await fetch(`${API_URL}/countries`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) {
          const text = await res.text();
          throw new Error(text);
        }

        const data = await res.json();
        setCountries(data);

        if (router.query.countries_id) {
          const found = data.find(
            (c: any) => c.id === Number(router.query.countries_id),
          );
          setSelectedCountry(found || data[0]);
        } else {
          setSelectedCountry(data[0]);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }

    fetchCountries();
  }, [router.query.countries_id, token]);

  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(searchInput.toLowerCase()),
  );

  const handleSelectCountry = (country: {
    id: number;
    name: string;
    code: string;
  }) => {
    setSelectedCountry(country);
    setDrawerOpen(false);
    setSearchInput('');

    const query: any = {
      ...(corridor ? { corridor } : {}),
      ...(category ? { category } : {}),
      ...(search ? { search } : {}),
      countries_id: country.id,
    };

    MySwal.fire({
      icon: 'info',
      html: `
  <div style="
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    font-size: 15px;
    text-align: center;
  ">
    <span>Pavillon</span>
    <img 
      src="https://flagcdn.com/w40/${country.code.toLowerCase()}.png" 
      width="24"
      height="16"
      style="border-radius:2px"
    />
    <strong>${country.name}</strong>
    <span>sélectionné</span>
  </div>
`,

      confirmButtonText: 'Visiter le pavillon',
      showCancelButton: true,
    }).then((r) => {
      if (r.isConfirmed) {
        router.push({ pathname: '/products/forcategory', query });
      }
    });
  };

  /* 🔥 NOUVEL AJOUT : SweetAlert AVANT ouverture du drawer */
  const handleOpenSelector = () => {
    MySwal.fire({
      icon: 'info',
      title: 'Pavillons',
      text: 'Souhaitez-vous en savoir plus ou visiter les pavillons disponibles ?',
      confirmButtonText: 'Visiter les pavillons',
      cancelButtonText: 'En savoir plus',
      showCancelButton: true,
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        setDrawerOpen(true);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        router.push('/pavillons');
      }
    });
  };

  return (
    <>
      {/* Trigger */}
      <button
        onClick={handleOpenSelector}
        className="flex items-center gap-1 rounded-full border border-neutral-700 bg-neutral-900 px-2 py-1 hover:bg-neutral-800 transition"
      >
        {selectedCountry && (
          <>
            <Image
              src={`https://flagcdn.com/w40/${selectedCountry.code.toLowerCase()}.png`}
              alt={selectedCountry.name}
              width={20}
              height={14}
              className="rounded-sm"
            />
            <svg width="10" height="10" fill="white" viewBox="0 0 24 24">
              <path d="M6.5 9.5 12 15l5.5-5.5h-11Z" />
            </svg>
          </>
        )}
      </button>

      {drawerOpen && (
        <ModalPortal>
          <div
            className="fixed inset-0 z-[9998] bg-black/60 backdrop-blur-sm"
            onClick={() => {
              setDrawerOpen(false);
              setSearchInput('');
            }}
          />

          <div className="fixed top-0 right-0 z-[9999] h-full w-[340px] bg-neutral-950 border-l border-neutral-800 shadow-2xl animate-slide-in-right">
            <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-800">
              <h3 className="text-white text-lg font-semibold">
                Sélection du pavillon
              </h3>
              <button
                onClick={() => {
                  setDrawerOpen(false);
                  setSearchInput('');
                }}
                className="text-neutral-400 hover:text-white text-xl"
              >
                ×
              </button>
            </div>

            <div className="p-4">
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Rechercher un pays..."
                className="w-full rounded-md bg-neutral-900 border border-neutral-700 px-3 py-2 text-sm text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-pink-500"
                autoFocus
              />
            </div>

            <div className="px-2 pb-4 overflow-y-auto h-[calc(100%-140px)]">
              {loading ? (
                <p className="text-center text-neutral-500 text-sm mt-4">
                  Chargement...
                </p>
              ) : filteredCountries.length ? (
                filteredCountries.map((country) => (
                  <div
                    key={country.id}
                    onClick={() => handleSelectCountry(country)}
                    className="flex items-center gap-3 px-4 py-3 rounded-md cursor-pointer hover:bg-neutral-800 transition"
                  >
                    <Image
                      src={`https://flagcdn.com/w40/${country.code.toLowerCase()}.png`}
                      alt={country.name}
                      width={22}
                      height={15}
                      className="rounded-sm"
                    />
                    <span className="text-sm text-white font-medium">
                      {country.name}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-center text-neutral-500 text-sm">
                  Aucun résultat
                </p>
              )}
            </div>
          </div>
        </ModalPortal>
      )}

      <style jsx global>{`
        @keyframes slide-in-right {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }
        .animate-slide-in-right {
          animation: slide-in-right 0.25s ease-out forwards;
        }
      `}</style>
    </>
  );
}
