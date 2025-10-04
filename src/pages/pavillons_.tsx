// MonComposant.jsx
import Image from "next/image";

export default function MonComposant() {
    // === DRAPEAUX INTERNATIONAUX (avec liens en ligne) ===
    const flagsIntl = [
        { src: "https://flagcdn.com/w40/cn.png", name: "Chine" },
        { src: "https://flagcdn.com/w40/tr.png", name: "Turquie" },
        { src: "https://flagcdn.com/w40/in.png", name: "Inde" },
        { src: "https://flagcdn.com/w40/il.png", name: "Israël" },
        { src: "https://flagcdn.com/w40/kr.png", name: "Corée du Sud" },
        { src: "https://flagcdn.com/w40/my.png", name: "Malaisie" },
        { src: "https://flagcdn.com/w40/th.png", name: "Thaïlande" },
        { src: "https://flagcdn.com/w40/fr.png", name: "France" },
        { src: "https://flagcdn.com/w40/de.png", name: "Allemagne" },
        { src: "https://flagcdn.com/w40/it.png", name: "Italie" },
        { src: "https://flagcdn.com/w40/ma.png", name: "Maroc" },
        { src: "https://flagcdn.com/w40/za.png", name: "Afrique du Sud" },
        { src: "https://flagcdn.com/w40/es.png", name: "Espagne" },
        { src: "https://flagcdn.com/w40/br.png", name: "Brésil" },
        { src: "https://flagcdn.com/w40/id.png", name: "Indonésie" },
        { src: "https://flagcdn.com/w40/ca.png", name: "Canada" },
        { src: "https://flagcdn.com/w40/us.png", name: "États-Unis" },
    ];

    // === DRAPEAUX AFRICAINS ===
    const flagsAfrica = [
        { src: "https://flagcdn.com/w40/cd.png", name: "RDC" },
        { src: "https://flagcdn.com/w40/td.png", name: "Tchad" },
        { src: "https://flagcdn.com/w40/ga.png", name: "Gabon" },
        { src: "https://flagcdn.com/w40/ci.png", name: "Côte d'Ivoire" },
        { src: "https://flagcdn.com/w40/bj.png", name: "Bénin" },
        { src: "https://flagcdn.com/w40/sn.png", name: "Sénégal" },
        { src: "https://flagcdn.com/w40/bi.png", name: "Burundi" },
        { src: "https://flagcdn.com/w40/cv.png", name: "Cap-Vert" },
        { src: "https://flagcdn.com/w40/cf.png", name: "RCA" },
        { src: "https://flagcdn.com/w40/cm.png", name: "Cameroun" },
        { src: "https://flagcdn.com/w40/ng.png", name: "Nigéria" },
        { src: "https://flagcdn.com/w40/tg.png", name: "Togo" },
        { src: "https://flagcdn.com/w40/gq.png", name: "Guinée Équatoriale" },
        { src: "https://flagcdn.com/w40/mg.png", name: "Madagascar" },
        { src: "https://flagcdn.com/w40/cg.png", name: "Congo" },
        { src: "https://flagcdn.com/w40/bf.png", name: "Burkina Faso" },
        { src: "https://flagcdn.com/w40/ne.png", name: "Niger" },
        { src: "https://flagcdn.com/w40/tn.png", name: "Tunisie" },
    ];

    return (
        <div className="w-full">
            {/* SECTION 1 : Drapeaux Internationaux */}
            <section className="py-10 px-6 md:px-16 bg-white">
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-8 text-center">
                    {flagsIntl.map((flag, i) => (
                        <div
                            key={i}
                            className="flex flex-col items-center space-y-2 hover:scale-105 transition-transform"
                        >
                            <Image
                                src={flag.src}
                                alt={flag.name}
                                width={60}
                                height={40}
                                className="w-14 h-10 object-contain shadow-sm"
                            />
                            <p className="text-sm font-medium">{flag.name}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* SECTION 2 : Pavillons Africains */}
            <section className="py-10 px-6 md:px-16 bg-gray-50">
                <h2 className="text-xl md:text-2xl font-bold mb-8">
                    Trouvez les fournisseurs par pavillon
                </h2>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-8 text-center">
                    {flagsAfrica.map((flag, i) => (
                        <div
                            key={i}
                            className="flex flex-col items-center space-y-2 hover:scale-105 transition-transform"
                        >
                            <Image
                                src={flag.src}
                                alt={flag.name}
                                width={60}
                                height={40}
                                className="w-14 h-10 object-contain shadow-sm"
                            />
                            <p className="text-sm font-medium">{flag.name}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* SECTION 3 : Pavillons fonctionnels */}
            <section className="relative bg-red-600 text-white py-12 px-6 md:px-20">
                <div className="grid md:grid-cols-2 items-center gap-8">
                    {/* Texte à gauche */}
                    <div className="space-y-6">
                        <h2 className="text-2xl md:text-4xl font-bold leading-snug">
                            Visitez les pavillons pays <br /> déjà fonctionnels.
                        </h2>
                        <p className="text-base md:text-lg">
                            De nouveaux pavillons en cours <br />
                            d’aménagement ouvriront prochainement
                        </p>
                    </div>

                    {/* Image à droite */}
                    <div className="flex justify-center md:justify-end">
                        <Image
                            src="https://i.ibb.co/2h3k8vF/homme-rouge.png"
                            alt="Homme souriant en costume"
                            width={400}
                            height={400}
                            className="rounded-lg object-cover"
                        />
                    </div>
                </div>
            </section>
        </div>
    );
}
