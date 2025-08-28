// components/OurServices.tsx
export default function OurServices() {
    const services = [
        {
            title: "E-commerce International",
            description: "Une plateforme pour connecter les entreprises aux marchés africains et mondiaux.",
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-12 h-12 text-blue-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                >
                    <path d="M3 4h18M3 10h18M3 16h18M3 22h18" />
                </svg>
            ),
        },
        {
            title: "Marketplace Multivendeur",
            description: "Un espace où plusieurs vendeurs peuvent présenter et vendre leurs produits.",
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-12 h-12 text-green-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                >
                    <path d="M4 6h16l-1.5 9h-13zM9 21a2 2 0 100-4 2 2 0 000 4zm8 0a2 2 0 100-4 2 2 0 000 4z" />
                </svg>
            ),
        },
        {
            title: "Solutions de Paiement",
            description: "Intégration de paiements locaux et internationaux pour vos transactions.",
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-12 h-12 text-purple-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                >
                    <path d="M2 7h20M2 12h20M2 17h20M6 21h12a2 2 0 002-2V5a2 2 0 00-2-2H6a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
            ),
        },
        {
            title: "Corridors Commerciaux",
            description: "Facilitez vos échanges grâce aux corridors commerciaux connectant plusieurs pays.",
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-12 h-12 text-orange-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                >
                    <path d="M21 16V8a2 2 0 00-2-2H7l-4 4v6a2 2 0 002 2h14a2 2 0 002-2z" />
                    <path d="M3 10h4V6" />
                </svg>
            ),
        },
        {
            title: "Logistique & Transport",
            description: "Solutions pour expédier vos produits en Afrique et à l'international.",
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-12 h-12 text-red-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                >
                    <path d="M3 7h13v10H3zM16 7h5v6h-5zM5 21a2 2 0 100-4 2 2 0 000 4zm12 0a2 2 0 100-4 2 2 0 000 4z" />
                </svg>
            ),
        },
        {
            title: "Investissements & Partenariats",
            description: "Accédez à des opportunités d’investissement et des collaborations stratégiques.",
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-12 h-12 text-teal-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                >
                    <path d="M12 8c-1.1 0-2 .9-2 2v4c0 1.1.9 2 2 2s2-.9 2-2v-4c0-1.1-.9-2-2-2zm0 12a9 9 0 100-18 9 9 0 000 18z" />
                </svg>
            ),
        },
    ];

    return (
        <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-6 text-center">
                <h2 className="text-3xl font-bold mb-12 text-gray-800">
                    Nos Services
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {services.map((service, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-2xl shadow-md p-8 flex flex-col items-center hover:shadow-lg transition"
                        >
                            {service.icon}
                            <h3 className="mt-4 text-xl font-semibold text-gray-800">
                                {service.title}
                            </h3>
                            <p className="mt-2 text-gray-600 text-sm">{service.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
