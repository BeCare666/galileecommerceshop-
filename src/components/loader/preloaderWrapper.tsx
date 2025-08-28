'use client';

import { useEffect, useState } from 'react';
import Preloader from './loader'; // adapte le chemin selon ton arborescence

const PreloaderWrapper = ({ children }: { children: React.ReactNode }) => {
    const [showPreloader, setShowPreloader] = useState(false);

    useEffect(() => {
        const alreadyShown = sessionStorage.getItem('preloaderShown');
        if (!alreadyShown) {
            setShowPreloader(true);
            sessionStorage.setItem('preloaderShown', 'true');

            const timer = setTimeout(() => {
                setShowPreloader(false);
            }, 10000); // 10 secondes

            return () => clearTimeout(timer);
        }
    }, []);

    if (showPreloader) {
        return <Preloader />;
    }

    return <>{children}</>;
};

export default PreloaderWrapper;
