// components/ServicesSections.tsx
import Image from "next/image";
import Servicesimg from "@/assets/images/services/service.png";
import Servicesimgx from "@/assets/images/services/servicesx.png";

export default function ServicesSections() {
    return (
        <div className="w-full flex flex-col gap-10">
            {/* --- Section 1 (fond noir + image) --- */}
            <section className="relative w-full bg-black text-white flex flex-col md:flex-row items-center justify-between px-6 md:px-20 py-12">
                {/* Texte gauche */}
                <div className="w-full md:w-1/2 text-center md:text-left space-y-4 transition-all duration-700 ease-in-out">
                    <h2 className="text-2xl md:text-3xl font-semibold leading-snug">
                        Profitez d’un secteur des services en <br /> pleine expansion dans
                        le monde
                    </h2>
                    <p className="text-base md:text-lg">
                        Visitez les B Spaces dédiés au commerce des services sur <br />
                        <span className="font-bold">Galileecommerce.com</span>
                    </p>
                    <p className="text-base md:text-lg">
                        Découvrez des offres de services dans tous les secteurs clés :{" "}
                        <br />
                        digital, éducation, finance, et plus encore !
                    </p>
                </div>

                {/* Image droite */}
                <div className="relative w-full md:w-1/2 flex justify-center mt-6 md:mt-0 transition-transform duration-700 ease-in-out">
                    <Image
                        src={Servicesimg}
                        alt="Secteur des services"
                        width={600}
                        height={600}
                        className="object-contain"
                        priority
                    />
                </div>
            </section>
            {/* --- Section 2 (fond image) --- */}
            <section
                className="h-[80vh] relative w-full flex items-center px-6 md:px-20 py-12 text-black"
                style={{
                    backgroundImage: `url(${Servicesimgx.src})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                {/* Texte droite */}
                <div
                    className="
                    w-full md:w-1/2
                    text-center md:text-right
                    md:ml-auto
                    transition-all duration-700 ease-in-out
                    "
                >
                    <p className="text-2xl md:text-3xl font-medium leading-snug bg-white/70 p-4 rounded-xl inline-block">
                        Cliquez pour <br />
                        découvrir des <br />
                        milliers d’offres de <br />
                        services commerciaux
                    </p>
                </div>
            </section>

        </div>
    );
}
