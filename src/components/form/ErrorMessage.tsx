import React from "react";
import { Trash2 } from "lucide-react";
interface ErrorMessageProps {
    message?: string;
    onClear?: () => void; // callback quand l'erreur doit disparaître
}

export default function ErrorMessage({ message, onClear }: ErrorMessageProps) {
    const [show, setShow] = React.useState(false);

    React.useEffect(() => {
        if (message) {
            setShow(true);
        }
    }, [message]);

    // Fonction pour cacher l'erreur (appelée par l'input)
    const clearError = () => {
        if (show) {
            setShow(false);
            if (onClear) onClear();
        }
    };

    if (!show) return <div className="min-h-[18px]" />;

    return (
        <p
            className="text-pink-600 text-sm mt-1 flex items-center gap-2 animate-fadeIn cursor-text"
            onClick={clearError} // optionnel : clique pour cacher
        >
            {message} <span className="text-white cursor-pointer">
                <Trash2 className="w-4 h-4" />
            </span>
        </p>
    );
}