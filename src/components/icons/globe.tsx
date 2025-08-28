import React from 'react';

export function GlobeIcon({ className = '' }: { className?: string }) {
    return (// animate-spin-slow
        <div className='bg-white border border-pink-5 rounded-md w-10 h-10 flex items-center justify-center  hover:bg-pink-50 transition group-hover:scale-110'>
            < svg
                className={`animate-spin-slow ${className} h-9 w-9 text-pink-500`
                }
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10
       10-4.477 10-10S17.523 2 12 2zm0 0c-2.5 2-4 5.5-4 10s1.5 8 4 10m0-20c2.5 2 4 5.5 4 10s-1.5 8-4 10m-8-10h16m-14.5 4h13m-13-8h13"
                />
            </svg >
        </div>
    );
}
