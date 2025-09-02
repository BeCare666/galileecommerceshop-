import React, { useEffect, useRef, useState } from 'react';
import * as am5 from '@amcharts/amcharts5';
import * as am5map from '@amcharts/amcharts5/map';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import am5geodata_worldLow from '@amcharts/amcharts5-geodata/worldLow';
import axios from 'axios';
import { useRouter } from 'next/router';
import { PageLoader } from '@/components/ui/loader/spinner/spinner';
// Token pour l'API  <PageLoader showText={false} />
import { getAuthToken, removeAuthToken } from '../../data/client/token.utils';
const token = getAuthToken(); // 🔁 Remplace par ton token
interface MapChartProps {
  closeModal: () => void;
  setMapIsOk: React.Dispatch<React.SetStateAction<boolean>>;
}
const corridorsTable: any[] = [];

const MapWithCorridors: React.FC<MapChartProps> = (
  { closeModal },
  { setMapIsOk }: { setMapIsOk: (val: boolean) => void },
) => {
  const router = useRouter();
  const chartRef = useRef<HTMLDivElement>(null);
  const [highlightCodes, setHighlightCodes] = useState<string[]>([]);
  const [selectedCorridors, setSelectedCorridors] = useState<any[] | null>(
    null,
  );
  const [selectedCountryCode, setSelectedCountryCode] = useState<string | null>(
    null,
  );

  useEffect(() => {
    const fetchCorridors = async () => {
      try {
        const API_URL = process.env.NEXT_PUBLIC_REST_API_ENDPOINT;
        if (!API_URL) {
          throw new Error("NEXT_PUBLIC_REST_API_ENDPOINT n'est pas défini !");
        }
        const res = await axios.get(`${API_URL}/corridors`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const corridors = res.data;
        corridorsTable.push(...corridors);
        console.log('Corridors fetched:', corridors);
        const countryCodes = new Set<string>();
        const fromCountryIdsN = corridors.map((c: any) => c);
        const fromCountryIdsNX = fromCountryIdsN[0].map((c: any) => c);
        if (corridorsTable.length > 0) {
          setMapIsOk(true);
        }
        fromCountryIdsNX.forEach((corridor: any) => {
          if (corridor.from_countries_code)
            countryCodes.add(corridor.from_countries_code);
          if (corridor.to_countries_code)
            countryCodes.add(corridor.to_countries_code);
        });

        setHighlightCodes(Array.from(countryCodes));
      } catch (error) {
        console.error('Erreur lors du chargement des corridors :', error);
      }
    };

    fetchCorridors();
  }, []);

  useEffect(() => {
    const root = am5.Root.new(chartRef.current!);
    root.setThemes([am5themes_Animated.new(root)]);

    const chart = root.container.children.push(
      am5map.MapChart.new(root, {
        panX: 'translateX',
        panY: 'translateY',
        wheelY: 'zoom',
        pinchZoom: true,
        projection: am5map.geoMercator(),
      }),
    );

    const polygonSeries = chart.series.push(
      am5map.MapPolygonSeries.new(root, {
        geoJSON: am5geodata_worldLow,
        valueField: 'value',
      }),
    );

    polygonSeries.mapPolygons.template.setAll({
      tooltipText: '{name}',
      interactive: true,
      strokeWidth: 0.25,
    });

    polygonSeries.mapPolygons.template.set('fill', am5.color(0x2196f3));
    polygonSeries.mapPolygons.template.adapters.add('fill', (fill, target) => {
      const dataContext = target.dataItem?.dataContext as { id?: string };
      const id = dataContext?.id;
      if (highlightCodes.includes(id as any)) {
        return am5.color(0xff9900);
      }
      return fill;
    });
    polygonSeries.mapPolygons.template.events.on('click', (ev) => {
      const dataContext = ev.target.dataItem?.dataContext as { id?: string };
      const id = dataContext?.id;
      if (!id) return;

      if (highlightCodes.includes(id)) {
        const fromCountryIdsN = corridorsTable.map((c: any) => c);
        const fromCountryIdsNX = fromCountryIdsN[0].map((c: any) => c);
        const corridorsOfCountry = fromCountryIdsNX.filter(
          (corridor: any) =>
            corridor.from_countries_code === id ||
            corridor.to_countries_code === id,
        );

        if (corridorsOfCountry.length > 0) {
          setSelectedCorridors(corridorsOfCountry);
          setSelectedCountryCode(id);
        } else {
          alert(`No corridor found for ${id}`);
        }
      }
    });

    return () => root.dispose();
  }, [highlightCodes]);

  // Fonction pour rediriger vers la page produit filtrée
  const handleVisitClick = (corridor: any) => {
    setSelectedCorridors(null);
    // Ferme la modale avant la navigation
    closeModal();
    close();
    router.push({
      pathname: '/products/forcategory',
      query: {
        corridor_id: corridor.id, // selon ta donnée
        //countries_id: corridor.from_countries_id, // ou à adapter selon ce que tu souhaites
        // categories: à ajouter si tu veux filtrer par catégorie
      },
    });
  };
  return (
    <div
      style={{
        background: 'linear-gradient(135deg, #0f1a3f, #1b254f)',
        minHeight: '100vh',
        padding: '20px 10px',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        color: '#e1e6f9',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 20,
      }}
    >
      <span
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          fontSize: '20px',
          fontWeight: 600,
          color: '#e0e7ff',
          margin: '20px 0',
        }}
      >
        <svg
          width="22"
          height="22"
          fill="#60a5fa"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2zm0 2a8 8 0 0 1 7.938 7H12V4zm-1 0v5H4.062A8 8 0 0 1 11 4zm0 14v-5h7.938A8 8 0 0 1 11 18zm-7.938-7A8 8 0 0 1 11 6v5H4.062zm7.938 7v-5h7.938A8 8 0 0 1 11 18zM12 12h0" />
          <circle cx="12" cy="12" r="1.5" fill="#60a5fa" />
        </svg>
        <p>Our trade corridors</p>
      </span>

      {/* Carte */}
      <div
        ref={chartRef}
        style={{
          width: '100%',
          maxWidth: 1200,
          height: 550,
          background: 'linear-gradient(135deg, #0f1a3f, #1b254f)',

          overflow: 'hidden',
        }}
      ></div>

      {/* Modal corridors  boxShadow: "0 8px 20px rgba(15, 26, 63, 0.7)",*/}
      {selectedCorridors && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modalTitle"
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(10, 15, 40, 0.85)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backdropFilter: 'blur(8px)',
            padding: 20,
          }}
          onClick={() => setSelectedCorridors(null)}
        >
          <div
            style={{
              background: '#1e293b',
              padding: 30,
              width: '100%',
              maxWidth: 840,
              maxHeight: '80vh',
              overflowY: 'auto',
              borderRadius: 2,
              boxShadow:
                '0 20px 50px rgba(0, 123, 255, 0.5), 0 0 10px #3b82f6aa inset',
              color: '#e0e7ff',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h6
              id="modalTitle"
              style={{
                marginBottom: 30,
                marginRight: 8,
                textAlign: 'center',
                fontSize: 28,
                fontWeight: '700',
                color: '#60a5fa',
                letterSpacing: 0.6,
                textShadow: '0 0 6px #60a5fa88',
                alignItems: 'center',
                display: 'flex',
              }}
            >
              Corridors related to{' '}
              <span
                style={{
                  color: '#38bdf8',
                  fontWeight: '800',
                  textTransform: 'uppercase',
                  marginLeft: '8px',
                }}
              >
                {selectedCountryCode}
              </span>
              <button
                onClick={() => setSelectedCorridors(null)}
                style={{
                  padding: '7px 13px',
                  background:
                    'linear-gradient(90deg, #3b82f6, #60a5fa, #3b82f6)',
                  border: 'none',
                  borderRadius: 2,
                  color: '#fff',
                  fontWeight: '3',
                  fontSize: 10,
                  cursor: 'pointer',
                  boxShadow: '0 8px 20px #60a5faaa',
                  transition: 'background 0.3s ease',
                  position: 'absolute',
                  top: 20,
                  right: 30,
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background =
                    'linear-gradient(90deg, #60a5fa, #3b82f6, #60a5fa)')
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background =
                    'linear-gradient(90deg, #3b82f6, #60a5fa, #3b82f6)')
                }
              >
                x
              </button>
            </h6>

            {selectedCorridors.map((c, index) => (
              <div
                key={index}
                style={{
                  marginBottom: 24,
                  padding: 24,
                  borderRadius: 6,
                  background:
                    'linear-gradient(135deg, #334155 0%, #1e293b 100%)',
                  boxShadow: '0 6px 20px rgba(56, 189, 248, 0.2)',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  cursor: 'default',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.03)';
                  e.currentTarget.style.boxShadow =
                    '0 8px 25px rgba(56, 189, 248, 0.5)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'none';
                  e.currentTarget.style.boxShadow =
                    '0 6px 20px rgba(56, 189, 248, 0.2)';
                }}
              >
                {/* Titre avec drapeaux */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    gap: 12,
                    marginBottom: 16,
                    textAlign: 'center',
                  }}
                >
                  {c.from_countries_code && (
                    <>
                      <img
                        src={`https://flagcdn.com/w40/${c.from_countries_code.toLowerCase()}.png`}
                        alt={c.from_countries_code}
                        width={32}
                        height={22}
                        style={{ boxShadow: '0 0 6px #60a5fa77' }}
                      />
                      <span
                        style={{
                          fontWeight: '700',
                          fontSize: 20,
                          color: '#7dd3fc',
                        }}
                      >
                        {c.from_countries_code.toUpperCase()}
                      </span>
                    </>
                  )}

                  <span
                    style={{
                      fontSize: 24,
                      color: '#60a5fa',
                      fontWeight: '700',
                      margin: '0 8px',
                    }}
                  >
                    →
                  </span>

                  {c.to_countries_code && (
                    <>
                      <img
                        src={`https://flagcdn.com/w40/${c.to_countries_code.toLowerCase()}.png`}
                        alt={c.to_countries_code}
                        width={32}
                        height={22}
                        style={{ boxShadow: '0 0 6px #60a5fa77' }}
                      />
                      <span
                        style={{
                          fontWeight: '700',
                          fontSize: 20,
                          color: '#7dd3fc',
                        }}
                      >
                        {c.to_countries_code.toUpperCase()}
                      </span>
                    </>
                  )}
                </div>

                {/* Infos détaillées */}
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px',
                    padding: '16px',
                    backgroundColor: '#0f172a',
                    borderRadius: '12px',
                    width: '100%',
                    maxWidth: '500px',
                    margin: '0 auto',
                  }}
                >
                  {/* Bloc info */}
                  {[
                    {
                      icon: (
                        <svg
                          width="20"
                          height="20"
                          fill="#60a5fa"
                          viewBox="0 0 24 24"
                        >
                          <path d="M3 6l3-3h12l3 3v15a1 1 0 01-1 1H4a1 1 0 01-1-1V6zm2 2v11h14V8H5zm4 2h6v2H9v-2z" />
                        </svg>
                      ),
                      title: 'Customs',
                      value: c.douanes || 'N/A',
                    },
                    {
                      icon: (
                        <svg
                          width="20"
                          height="20"
                          fill="#facc15"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2l9 21H3L12 2zm0 3.84L6.24 20h11.52L12 5.84zM11 10h2v5h-2v-5zm0 6h2v2h-2v-2z" />
                        </svg>
                      ),
                      title: 'Taxes',
                      value: c.taxes || 'N/A',
                    },
                    {
                      icon: (
                        <svg
                          width="20"
                          height="20"
                          fill="#4ade80"
                          viewBox="0 0 24 24"
                        >
                          <path d="M4 4h16v2H4V4zm0 4h12v2H4V8zm0 4h16v2H4v-2zm0 4h12v2H4v-2z" />
                        </svg>
                      ),
                      title: 'Logistics',
                      value: c.logistique || 'N/A',
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        backgroundColor: '#1e293b',
                        padding: '12px 16px',
                        borderRadius: '8px',
                      }}
                    >
                      {item.icon}
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span
                          style={{
                            color: '#cbd5e1',
                            fontWeight: 600,
                            fontSize: '14px',
                          }}
                        >
                          {item.title} :
                        </span>
                        <span
                          style={{
                            color: '#94a3b8',
                            fontSize: '13px',
                            marginTop: '2px',
                          }}
                        >
                          {item.value}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Bouton Visiter */}
                <div style={{ marginTop: 16, textAlign: 'center' }}>
                  <button
                    onClick={() => handleVisitClick(c)}
                    style={{
                      padding: '10px 25px',
                      background:
                        'linear-gradient(90deg, #3b82f6, #60a5fa, #3b82f6)',
                      border: 'none',
                      borderRadius: 4,
                      color: '#fff',
                      fontWeight: '700',
                      fontSize: 16,
                      cursor: 'pointer',
                      boxShadow: '0 6px 18px #60a5faaa',
                      transition: 'background 0.3s ease',
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background =
                        'linear-gradient(90deg, #60a5fa, #3b82f6, #60a5fa)')
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background =
                        'linear-gradient(90deg, #3b82f6, #60a5fa, #3b82f6)')
                    }
                  >
                    Visit this corridor
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MapWithCorridors;
