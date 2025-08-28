// components/Services.tsx

export default function Services() {
    return (
        <section className="bg-white text-black py-16 px-6 md:px-12">
            {/* Header */}
            <div className="text-center mb-12">
                <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
                    GalileeCommerce simplifie le e-commerce panafricain. Découvrez nos services conçus pour
                    booster vos activités et connecter les corridors commerciaux.
                </p>
            </div>

            {/* Steps */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
                {/* Step 1 */}
                <div>
                    <div className="flex items-center justify-center w-12 h-12 mx-auto rounded-full bg-pink-500 text-white font-bold">
                        1
                    </div>
                    <h3 className="mt-4 text-lg font-semibold">Inscription Rapide</h3>
                    <p className="text-gray-600 mt-2">
                        Créez un compte sécurisé et commencez à vendre ou acheter sur la plateforme.
                    </p>
                </div>

                {/* Step 2 */}
                <div>
                    <div className="flex items-center justify-center w-12 h-12 mx-auto rounded-full bg-pink-500 text-white font-bold">
                        2
                    </div>
                    <h3 className="mt-4 text-lg font-semibold">Profil Personnalisé</h3>
                    <p className="text-gray-600 mt-2">
                        Ajoutez vos informations commerciales pour bénéficier d’un espace adapté à vos besoins.
                    </p>
                </div>

                {/* Step 3 */}
                <div>
                    <div className="flex items-center justify-center w-12 h-12 mx-auto rounded-full bg-pink-500 text-white font-bold">
                        3
                    </div>
                    <h3 className="mt-4 text-lg font-semibold">Outils & Corridors</h3>
                    <p className="text-gray-600 mt-2">
                        Accédez à nos corridors de commerce, suivez vos transactions et explorez nos outils de croissance.
                    </p>
                </div>

                {/* Step 4 */}
                <div>
                    <div className="flex items-center justify-center w-12 h-12 mx-auto rounded-full bg-pink-500 text-white font-bold">
                        4
                    </div>
                    <h3 className="mt-4 text-lg font-semibold">Développez Votre Business</h3>
                    <p className="text-gray-600 mt-2">
                        Augmentez vos ventes, élargissez votre marché et profitez de nos solutions panafricaines.
                    </p>
                </div>
            </div>

            {/* Bottom Stats */}
            <div className="bg-black text-white rounded-2xl mt-16 p-10 grid grid-cols-1 md:grid-cols-3 gap-8 text-center relative overflow-hidden">
                {/* motif décoratif simple */}
                <div className="absolute top-0 right-0 w-48 h-48 rounded-full border-4 border-pink-500 opacity-20 translate-x-1/3 -translate-y-1/3"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full border-4 border-pink-500 opacity-20 -translate-x-1/3 translate-y-1/3"></div>

                <div>
                    <h3 className="text-3xl font-bold text-pink-400">10k+</h3>
                    <p className="mt-2 text-gray-300">Clients Satisfaits</p>
                </div>
                <div>
                    <h3 className="text-3xl font-bold text-pink-400">200%</h3>
                    <p className="mt-2 text-gray-300">Croissance du Chiffre d’Affaires</p>
                </div>
                <div>
                    <h3 className="text-3xl font-bold text-pink-400">20x</h3>
                    <p className="mt-2 text-gray-300">Développement des Entreprises</p>
                </div>
            </div>
        </section>
    );
}
