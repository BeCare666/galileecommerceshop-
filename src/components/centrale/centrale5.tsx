import Image from "next/image";
import Menu5 from "@/assets/images/centrale-achat/menu6.jpg";

export default function HeroSection() {
    return (
        <section className="relative h-screen w-full flex items-center justify-center" id="chooseId4">
            {/* Image de fond */}
            <Image
                src={Menu5}
                alt="Background"
                fill
                className="object-cover"
                priority
            />

            {/* Overlay bleu foncé */}
            <div className="absolute inset-0 bg-[#0a1635]/70"></div>

            {/* Bloc texte */}
            <div className="left-2 relative z-10 max-w-2xl bg-[#2a0d2a]/90 text-white p-8 md:p-10 rounded-md shadow-lg">
                <h1 className="text-xl md:text-2xl font-bold mb-4">
                    Étape 3. Payez sur Galileecommerce.com
                </h1>
                <p className="text-sm md:text-base leading-relaxed">
                    Le règlement des commandes sur <span className="font-semibold">Galileecommerce.com</span>
                    est à la fois simple et sécurisé. Après avoir convenu des modalités de paiement,
                    vous devrez effectuer un premier versement. Le montant restant sera requis lors de
                    l’expédition des articles. <span className="font-semibold">Galileecommerce.com</span>
                    permet d&apos;effectuer des paiements sécurisés grâce à l’assurance commerciale
                    fournie par l’un de ses partenaires assureurs. Une fois le paiement réalisé, vous aurez
                    accès au système de suivi des opérations de A à Z, jusqu&apos;à la livraison finale de vos articles.
                </p>
            </div>
        </section>
    );
}
