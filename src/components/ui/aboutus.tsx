import Button from '@/components/ui/button';

interface HamburgerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    isToggle?: boolean;
}

export default function Hamburger({ isToggle, ...props }: HamburgerProps) {
    return (
        <Button variant="icon" aria-label="Hamburger" {...props} className='bg-white border border-pink-5 rounded-md w-10 h-10 flex items-center justify-center  hover:bg-pink-50 transition group-hover:scale-110'>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-pink-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M12 19a7 7 0 110-14 7 7 0 010 14z"
                />
            </svg>
        </Button>
    );
}
