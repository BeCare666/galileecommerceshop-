"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Logo from "@/assets/logo/logo_white.png";
const TARGET_DATE = new Date();
TARGET_DATE.setHours(TARGET_DATE.getHours() + 6); // comme ton image (~1h30)

export default function ComingSoonCountdown() {
    const [timeLeft, setTimeLeft] = useState(getTimeRemaining());

    function getTimeRemaining() {
        const total = TARGET_DATE.getTime() - new Date().getTime();

        const seconds = Math.floor((total / 1000) % 60);
        const minutes = Math.floor((total / 1000 / 60) % 60);
        const hours = Math.floor((total / (1000 * 60 * 60)) % 24);

        return { total, hours, minutes, seconds };
    }

    useEffect(() => {
        const interval = setInterval(() => {
            const remaining = getTimeRemaining();
            setTimeLeft(remaining);

            if (remaining.total <= 0) {
                clearInterval(interval);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const format = (num: number) => String(num).padStart(2, "0");

    return (
        <div className="relative w-full h-screen flex items-center justify-center bg-gradient-to-b from-[#020617] to-[#020c2c] overflow-hidden">

            {/* Badge PRO */}
            <div className="hidden absolute top-0 left-0 bg-gradient-to-r from-pink-500 to-orange-400 text-white text-xs px-6 py-1 rotate-[-45deg] -translate-x-6 translate-y-6 shadow-lg">
                Pro
            </div>

            <div className="text-center">

                {/* Title */}
                <h1 className="text-white text-4xl md:text-5xl font-semibold tracking-widest">
                    <Image src={Logo} alt="Coming Soon" width={250} height={100} className="mx-auto mb-4" />
                </h1>

                <p className="text-gray-400 tracking-[0.4em] mt-2 text-md font-bold">
                    Bientôt disponible
                </p>

                {/* Divider */}
                <div className="w-48 h-[1px] bg-gray-600 mx-auto mt-4 mb-10 opacity-40" />

                {/* Timer */}
                <div className="flex items-center justify-center gap-6">

                    <TimeCircle value={format(timeLeft.hours)} label="HOURES" />
                    <Separator />
                    <TimeCircle value={format(timeLeft.minutes)} label="MINUTES" />
                    <Separator />
                    <TimeCircle value={format(timeLeft.seconds)} label="SECONDES" />

                </div>

                {/* Reflection */}
                <div className="flex items-center justify-center gap-6 mt-4 opacity-20 blur-[1px] scale-y-[-1]">
                    <TimeCircle value={format(timeLeft.hours)} label="" />
                    <Separator />
                    <TimeCircle value={format(timeLeft.minutes)} label="" />
                    <Separator />
                    <TimeCircle value={format(timeLeft.seconds)} label="" />
                </div>

            </div>
        </div>
    );
}

function TimeCircle({ value, label }: { value: string; label: string }) {
    return (
        <div className="flex flex-col items-center">
            <div className="
        w-20 h-20 md:w-24 md:h-24 
        rounded-full 
        flex items-center justify-center 
        text-white text-2xl font-semibold
        bg-gradient-to-b from-blue-500 to-blue-800
        shadow-[inset_0_4px_10px_rgba(255,255,255,0.2),0_8px_20px_rgba(0,0,0,0.5)]
      ">
                {value}
            </div>

            {label && (
                <span className="text-gray-400 text-xs mt-2 tracking-widest">
                    {label}
                </span>
            )}
        </div>
    );
}

function Separator() {
    return (
        <div className="text-white text-3xl font-bold -mt-6">:</div>
    );
}