// MonComposant.jsx
import Image from "next/image";
import Pavillons from "@/assets/images/pavillons/pav1.jpg";
import Pavillonsx from "@/assets/images/pavillons/hommeblackred.jpg";
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
            <section className="relative w-full h-[100vh] flex items-center justify-start text-white overflow-hidden">
                {/* Image de fond responsive */}
                <div className="absolute inset-0">
                    <Image
                        src={Pavillons}
                        alt="Pavillons"
                        fill
                        className="object-cover object-right hidden md:block"
                        priority
                        quality={100}
                    />
                    <Image
                        src={Pavillonsx}
                        alt="Pavillons mobile"
                        fill
                        className="object-cover object-center md:hidden"
                        priority
                        quality={100}
                    />
                </div>

                {/* Overlay pour contraste du texte 
                <div className="absolute inset-0 bg-black/40" />
                    */}
                {/* Contenu texte */}
                <div className="relative z-10 px-6 md:px-20 max-w-xl">
                    <h2 className="text-4xl md:text-5xl font-extrabold leading-tight mb-6">
                        Visitez les pavillons pays <br /> déjà fonctionnels.
                    </h2>
                    <p className="text-lg md:text-xl font-medium">
                        De nouveaux pavillons en cours d’aménagement ouvriront prochainement
                    </p>
                </div>
            </section>



            {/* SECTION 2 : Pavillons Africains */}
            <section className="py-10 px-6 md:px-16 bg-gray-50">
                <h2 className="text-5xl md:text-4xl font-bold mb-8 ml-10">
                    Trouvez les fournisseurs par pavillon
                </h2>
                <div className="items-start grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-8 text-center ml-0">
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
                            <p className="text-sm font-medium ">{flag.name}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* SECTION 3 : Pavillons fonctionnels */}
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

            <section className="w-full bg-white text-black px-11 md:px-[110px] py-12">
                {/* Bloc principal */}
                <div className="max-w-5xl mx-auto flex flex-col">
                    {/* Titre principal */}
                    <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold leading-snug mb-10">
                        Rechercher les produits d’origine selon <br />
                        les régions du monde
                    </h1>

                    {/* Liste des régions */}
                    <ul className="space-y-4 text-base md:text-lg font-medium text-gray-900">
                        {["Made in Africa", "Made in Asia", "Made in America", "Made in Europe"].map((region, index) => (
                            <li
                                key={index}
                                className="relative cursor-pointer transition-all duration-300 hover:text-purple-700 hover:translate-x-2"
                            >
                                {region}
                                {/* Petite ligne d’animation au survol */}
                                <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-purple-700 transition-all duration-300 hover:w-full"></span>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            <section className="w-full bg-white text-black px-11 md:px-11 lg:px-[110px] py-12">
                {/* Conteneur principal */}
                <div className="max-w-6xl mx-auto">
                    {/* Titre principal */}
                    <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold leading-snug mb-10">
                        Rechercher les produits <br />
                        d’origine par pays
                    </h1>

                    {/* Grille des pays ***/}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-y-4 gap-x-16 text-base md:text-lg font-medium">
                        {/* Colonne gauche */}
                        <div className="space-y-4">
                            <p className="hover:text-purple-700 transition-colors duration-300 cursor-pointer">Made in France</p>
                            <p className="hover:text-purple-700 transition-colors duration-300 cursor-pointer">Made in Cameroon</p>
                            <p className="hover:text-purple-700 transition-colors duration-300 cursor-pointer">Made in Benin</p>
                            <p className="hover:text-purple-700 transition-colors duration-300 cursor-pointer">Made in Turkey</p>
                            <p className="hover:text-purple-700 transition-colors duration-300 cursor-pointer">Made in Germany</p>
                        </div>

                        {/* Colonne droite */}
                        <div className="space-y-4">
                            <p className="hover:text-purple-700 transition-colors duration-300 cursor-pointer">Made in India</p>
                            <p className="hover:text-purple-700 transition-colors duration-300 cursor-pointer">Made in England</p>
                            <p className="hover:text-purple-700 transition-colors duration-300 cursor-pointer">Made in Canada</p>
                            <p className="hover:text-purple-700 transition-colors duration-300 cursor-pointer">Made in USA</p>
                            <p className="hover:text-purple-700 transition-colors duration-300 cursor-pointer">Made in Italia</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
