"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import heroImage from "@/assets/images/background8.webp";
import AboutSection from "@/components/about-us/about-section";
import { UserIcon } from '@/components/icons/user-icon';
import { useModalAction } from '@/components/modal-views/context';
import AuthorizedMenu from '@/components/ui/auth-menu';
import Button from '@/components/ui/button';
import { useMe } from '@/data/user';
import { useIsMounted } from '@/lib/hooks/use-is-mounted';
import ImageHomePagebackground from '@/assets/images/about-us.jpg';
import axios from 'axios';
import Swal from 'sweetalert2';

export default function HeroStats() {
    const { openModal } = useModalAction();
    const { me, isAuthorized, isLoading } = useMe();

    const showAlert = () => {
        Swal.fire({
            title: "✅ Félicitations !",
            text: "Vous faites déjà partie de la grande famille Galileecommerce. Merci de contribuer à connecter l’Afrique au monde.",
            imageUrl: "https://unsplash.it/400/200",
            imageWidth: 400,
            imageHeight: 200,
            imageAlt: "Galileecommerce",
            confirmButtonText: "Continuer 🚀",
            confirmButtonColor: "#7e3af2", // Violet premium
        });
    };
    const sectionRef = useRef(null);
    const [inView, setInView] = useState(false);

    const stats = [
        {
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-10 h-10 text-purple-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="1.5"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 0v20m0-20C9 7 7 10 7 12c0 2 2 5 5 5s5-3 5-5c0-2-2-5-5-5z"
                    />
                </svg>
            ),
            value: 54,
            label: "Pays africains connectés",
        },
        {
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-10 h-10 text-purple-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="1.5"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 7h18M3 7l1 12h16l1-12M8 7V5a4 4 0 118 0v2"
                    />
                </svg>
            ),
            value: 60000,
            label: "Fournisseurs attendus",
        },
        {
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-10 h-10 text-purple-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="1.5"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 16V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8m18 0a2 2 0 01-2 2H5a2 2 0 01-2-2m18 0V8M3 16V8"
                    />
                </svg>
            ),
            value: 500000,
            label: "Produits d’ici 2030",
        },
        {
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-10 h-10 text-purple-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="1.5"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 5v14m7-7H5"
                    />
                </svg>
            ),
            value: 120,
            label: "Corridors",
        },
    ];

    const [counts, setCounts] = useState(new Array(stats.length).fill(0));

    // Observer
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setInView(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.3 }
        );
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    // Compteur animé
    useEffect(() => {
        if (!inView) return;

        const duration = 2000;
        const frameRate = 30;
        const totalFrames = Math.round(duration / (1000 / frameRate));

        let frame = 0;
        const interval = setInterval(() => {
            frame++;
            setCounts(
                stats.map((s) =>
                    Math.min(Math.round((s.value / totalFrames) * frame), s.value)
                )
            );
            if (frame === totalFrames) clearInterval(interval);
        }, 1000 / frameRate);

        return () => clearInterval(interval);
    }, [inView]);

    return (
        <section className="py-16 overflow-hidden">
            <div className="container mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-4">
                <div className="grid md:grid-cols-2 gap-10 items-center">
                    {/* Texte */}
                    <div>
                        <h1 className="text-3xl md:text-5xl font-bold mb-5 leading-tight">
                            Galileecommerce.com connecte l’Afrique au monde
                        </h1>
                        <p className="text-gray-600 mb-8">
                            Galileecommerce.com permet aux entreprises d’aller à la rencontre
                            des <span className="font-semibold">54 pays de la ZLECAf</span>, en pleine expansion.
                            Notre mission est de renforcer l’efficacité des chaînes de valeur du commerce,
                            faciliter l’accès aux informations de marché en temps réel,
                            connecter producteurs et consommateurs, et offrir des solutions
                            financières innovantes pour une Afrique compétitive.
                        </p>
                        <div className="flex flex-wrap gap-4 mt-5">
                            {isAuthorized && me && !isLoading && (
                                <button className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition"
                                    onClick={showAlert}>
                                    Rejoindre la plateforme
                                </button>
                            )}
                            {!isAuthorized && !me && (
                                <button className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition"
                                    onClick={() => openModal('REGISTER')}>
                                    Rejoindre la plateforme
                                </button>
                            )}

                            <button className="flex items-center gap-2 text-purple-600 font-semibold">
                                <span className="w-6 h-6 rounded-full border border-purple-600 flex items-center justify-center">
                                    ▶
                                </span>
                                Découvrir plus
                            </button>
                        </div>
                    </div>

                    {/* Image */}
                    <div className="flex justify-center">
                        <div className="w-full max-w-sm">
                            <Image
                                src={heroImage}
                                alt="Commerce Afrique"
                                className="object-cover w-full h-auto shadow-lg"
                                priority

                            />
                        </div>
                    </div>
                </div>

                {/* Statistiques */}
                <div
                    ref={sectionRef}
                    className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
                >
                    {stats.map((stat, idx) => (
                        <div
                            key={idx}
                            className="p-4 rounded-xl shadow-md hover:shadow-lg transition bg-white"
                        >
                            <div className="flex justify-center mb-3">{stat.icon}</div>
                            <div className="text-3xl md:text-4xl font-bold text-purple-600 mb-1">
                                {counts[idx].toLocaleString()}+
                            </div>
                            <div className="text-gray-600 font-medium">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>
            <AboutSection />
        </section>
    );
}
