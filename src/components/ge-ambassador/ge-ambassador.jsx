import Image from "next/image";
import Firstimage from "@/assets/images/ge-ambassador/thefirstimage.png";
import Treeimage from "@/assets/images/ge-ambassador/treeimage.png";
import Treewhiteimage from "@/assets/images/ge-ambassador/treewhiteimage.png";
import Mockup from "@/assets/images/ge-ambassador/treewhiteimage.png";
import BgImage from "@/assets/images/ge-ambassador/quesque.png";
import { useState } from 'react';
import { useRouter } from "next/router";
export default function AproposSection() {
    const [open, setOpen] = useState(false);
    const router = useRouter();
    async function handlGotoregister(params) {
        router.push('/ge-ambassadeur/ge-ambassadeur');
    }
    return (
        <>
            <section className="relative flex flex-col md:flex-row items-stretch min-h-[420px] bg-[#07131F]">

                {/* ==== TEXTE ==== */}
                <div
                    className="
            relative w-full md:w-1/2 flex items-center
            p-10 overflow-visible z-20

            /* MOBILE → texte centré sur l’image */
            justify-center text-left
            absolute md:relative
            inset-0 md:inset-auto
        "
                >

                    {/* Dégradé DESKTOP */}
                    <div
                        className="
                absolute top-0 left-0 h-full w-[180%]
                bg-gradient-to-r from-black via-black to-transparent
                pointer-events-none
                hidden md:block
            "
                    />

                    {/* Dégradé MOBILE */}
                    <div
                        className="
                absolute inset-0 
                bg-gradient-to-b from-black/70 via-black/50 to-transparent
                md:hidden
                z-0
            "
                    />

                    <div className="relative z-20 text-white max-w-[500px]">


                        <h3 className="text-left font-extrabold text-[24px] md:text-[30px] leading-[32px] md:leading-[38px] mb-3 ">
                            GE AMBASSADOR<br />
                            Devenez ambassadeur de galileecommerce.com
                        </h3>

                        <div className="h-[2px] w-[80px] bg-white/15 mb-3 mx-auto md:mx-0" />

                        <p className="text-left text-[#D1D5DB] text-[14px] md:text-[15px] leading-[22px] mb-6">
                            Vous aurez l’opportunité de revendre nos solutions via des outils dédiés.
                        </p>
                    </div>
                </div>

                {/* ==== IMAGE ==== */}
                <div
                    className="
            relative w-full md:w-1/2 md:min-h-[420px]
            flex items-center justify-center overflow-hidden z-0
        "
                >
                    <div className="relative w-full h-full">

                        {/* MOBILE → image parfaitement visible **/}
                        <Image
                            src={Firstimage}
                            alt=""
                            className="
                        block md:hidden
                        w-full h-auto
                        object-cover object-center max-w-[120%]
                    "
                            priority
                        />

                        {/* DESKTOP → ta version exacte */}
                        <Image
                            src={Firstimage}
                            alt=""
                            fill
                            className="
                        hidden md:block
                        object-cover object-right
                        max-w-[120%] translate-x-[10px]
                    "
                            priority
                        />

                    </div>
                </div>

            </section>


            <section
                className="relative flex flex-col md:flex-row items-stretch min-h-[420px] bg-[#07131F]"
                style={{ fontFamily: "sans-serif" }}
            >

                <div className="relative text-white rounded-xl overflow-hidden shadow-xl p-6 md:p-12 w-full h-full min-h-[420px]">

                    {/* Background image */}
                    <div className="absolute inset-0 z-10 h-full w-full">
                        <Image
                            src={BgImage}
                            alt="Background"
                            fill
                            className="object-cover object-center opacity-100"
                            priority
                        />
                    </div>


                    {/* Orange bar */}
                    <div className="w-[35px] h-[6px] bg-orange-500 rounded-full mb-6"></div>


                    {/* Title */}
                    <h2 className="text-[24px] md:text-[30px] font-extrabold leading-tight mb-4 ">
                        Qu’est‑ce que le programme <br /> GE Ambassador ?
                    </h2>


                    {/* Divider */}
                    <div className="w-full h-[2px] bg-white/30 mb-6"></div>


                    {/* Text content */}
                    <p className="text-[14px] md:text-[16px] leading-[22px] md:leading-[26px] text-gray-200 mb-4">
                        Le Programme Galilée Ecommerce Ambassador (GE Ambassador) sur inscription
                        est destiné aux personnes ayant des affinités avec des réseaux familiaux,
                        communautaires, amicaux ou professionnels, souhaitant revendre nos produits
                        et services dans ces différents réseaux. Les ambassadeurs agissent comme
                        des partenaires d’affaires de galileecommerce.com pour promouvoir,
                        proposer et commercialiser ses offres auprès d’un large éventail de clients.
                    </p>


                    <p className="text-[14px] md:text-[16px] leading-[22px] md:leading-[26px] text-gray-200">
                        Le contrat des ambassadeurs repose sur leurs compétences en matière de
                        marketing relationnel, d’expertise en développement commercial, de capacités
                        opérationnelles et de couverture réseau. En rejoignant le programme Galilée
                        Ambassador, vous bénéficierez de primes de performance, d’outils et de
                        ressources dédiés, de fonds pour développer votre réseau, de programmes de
                        formation et d’un encadrement sur mesure donnant lieu à des partenariats
                        bénéfiques, et des certifications.
                    </p>
                </div>
            </section>



            <section className="hidden relative flex flex-col md:flex-row items-stretch min-h-[420px] bg-[#07131F]">

                {/* ==== TEXTE ==== */}
                <div
                    className="
            relative w-full md:w-1/2 flex items-center
            p-10 overflow-visible z-20

            /* MOBILE → texte centré sur l’image */
              text-left
            absolute md:relative
            inset-0 md:inset-auto
        "
                >

                    {/* Dégradé DESKTOP */}
                    <div
                        className="
                absolute top-0 left-0 h-full w-[180%]
                bg-gradient-to-r from-black via-black to-transparent
                pointer-events-none
                hidden md:block
            "
                    />

                    {/* Dégradé MOBILE */}
                    <div
                        className="
                absolute inset-0 
                bg-gradient-to-b from-black/70 via-black/50 to-transparent
                md:hidden
                z-0
            "
                    />

                    <div className="relative z-20 text-white max-w-[500px]">
                        <div className="w-[140px] h-[6px] bg-[#FF7A2D] mb-3 rounded-full mx-auto md:mx-0" />

                        <h3 className="text-left font-extrabold text-[24px] md:text-[30px] leading-[32px] md:leading-[38px] mb-3">
                            COMMENT<br />
                            ça<br />
                            MARCHE<br />

                        </h3>

                        <div className="h-[2px] w-[80px] bg-white/15 mb-3 mx-auto md:mx-0" />

                    </div>
                </div>

                {/* ==== IMAGE ==== */}
                <div
                    className="
            relative w-full md:w-1/2 md:min-h-[420px]
            flex items-center justify-center overflow-hidden z-0
        "
                >
                    <div className="relative w-full h-full">

                        {/* MOBILE → image parfaitement visible **/}
                        <Image
                            src={Treeimage}
                            alt=""
                            className="
                        block md:hidden
                        w-full h-auto
                        object-cover object-center max-w-[120%]
                    "
                            priority
                        />

                        {/* DESKTOP → ta version exacte */}
                        <Image
                            src={Treeimage}
                            alt=""
                            fill
                            className="
                        hidden md:block
                        object-cover object-right
                        max-w-[120%] translate-x-[10px]
                    "
                            priority
                        />

                    </div>
                </div>

            </section>
            <section className="relative flex flex-col md:flex-row items-stretch min-h-[420px] bg-[#07131F]">

                {/* ==== TEXTE ==== */}
                <div
                    className="
            relative w-full md:w-1/2 flex items-center
            p-10 overflow-visible z-20

            /* MOBILE → texte centré sur l’image */
             text-left
            absolute md:relative
            inset-0 md:inset-auto
        "
                >

                    {/* Dégradé DESKTOP */}
                    <div
                        className="
                absolute top-0 left-0 h-full w-[180%]
                bg-gradient-to-r from-white via-white to-transparent
                pointer-events-none
                hidden md:block
            "
                    />

                    {/* Dégradé MOBILE */}
                    <div
                        className="
                absolute inset-0 
                bg-gradient-to-b from-white/70 via-white/50 to-transparent
                md:hidden
                z-0
            "
                    />

                    <div className="relative z-20 text-white max-w-[500px]">
                        <div className="w-[140px] h-[6px] bg-[#FF7A2D] mb-3 rounded-full mx-auto md:mx-0" />

                        <h3 className="text-black text-left font-extrabold text-[24px] md:text-[30px] leading-[32px] md:leading-[38px] mb-3">
                            COMMENT<br />
                            ça<br />
                            MARCHE<br />

                        </h3>

                        <div className="h-[2px] w-[80px] bg-white/15 mb-3 mx-auto md:mx-0" />

                    </div>
                </div>

                {/* ==== IMAGE ==== */}
                <div
                    className="
            relative w-full md:w-1/2 md:min-h-[420px]
            flex items-center justify-center overflow-hidden z-0
        "
                >
                    <div className="relative w-full h-full">

                        {/* MOBILE → image parfaitement visible **/}
                        <Image
                            src={Treewhiteimage}
                            alt=""
                            className="
                        block md:hidden
                        w-full h-auto
                        object-cover object-center max-w-[120%]
                    "
                            priority
                        />

                        {/* DESKTOP → ta version exacte */}
                        <Image
                            src={Treewhiteimage}
                            alt=""
                            fill
                            className="
                        hidden md:block
                        object-cover object-right
                        max-w-[120%] translate-x-[10px]
                    "
                            priority
                        />

                    </div>
                </div>

            </section>
            <section className="w-full min-h-screen bg-white flex justify-center items-center p-4 md:p-10 font-sans">
                <div className="w-full max-w-5xl bg-white shadow-xl p-6 md:p-10 grid grid-cols-1 md:grid-cols-2 gap-6 border border-black rounded-sm">
                    {/* LEFT SIDE */}
                    <div>
                        <div className="text-[80px] font-light leading-none mb-2">1</div>


                        <h3 className="font-semibold text-[16px] mb-1" >Rejoignez le réseau GE Ambassador</h3>
                        <p className="text-[14px] mb-4">
                            Rejoignez gratuitement le réseau Galileecommerce.com en créant votre compte
                            <br /> GE Ambassador
                        </p>


                        <p className="italic font-semibold text-[14px] mb-6 cursor-pointer color-blue" onClick={handlGotoregister}>
                            Devenez GE Ambassador
                        </p>


                        <div className="text-[80px] font-light leading-none mb-2">3</div>


                        <h3 className="font-semibold text-[16px] mb-1">Contactez l’équipe GE Ambassador</h3>
                        <p className="text-[14px]">
                            Après votre inscription au programme GE Ambassador et une fois les critères de l’étape 2 remplis,
                            contactez l’équipe GE Ambassador pour définir la meilleure stratégie à adopter.
                            <br />
                            <br />
                            Contactez l’équipe du programme GE Ambassador
                        </p>
                    </div>


                    {/* RIGHT SIDE */}
                    <div>
                        <div className="text-[80px] font-light leading-none mb-2">2</div>


                        <h3 className="font-semibold text-[16px] mb-1">
                            Commercialisez nos offres pour devenir Ambassador de Galileecommerce.com
                        </h3>


                        <p className="text-[14px] mb-4">
                            Pour être considéré comme Ambassadeur GE agréé, vous devez satisfaire aux critères suivants :
                        </p>


                        <ul className="text-[14px] list-disc ml-5 mb-4">
                            <li>Développer un réseau de clients</li>
                            <li>Revendre nos produits et services dans ce réseau</li>
                            <li>Proposer des outils de fidélisation aux clients</li>
                        </ul>


                        <h2 className="font-bold text-[18px] mb-4">COMMENT ÇA MARCHE ?</h2>


                        <div className="w-full flex  mt-4">
                            <Image src={Mockup} alt="Illustration" className="w-44 h-auto" />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );










}
