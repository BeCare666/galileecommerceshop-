import React, { ReactNode, useEffect, useState, FC } from 'react';
import { createPortal } from 'react-dom';

interface ModalPortalProps {
    children: ReactNode;
}

const ModalPortal: FC<ModalPortalProps> = ({ children }) => {
    const [mounted, setMounted] = useState(false);
    const [modalRoot, setModalRoot] = useState<HTMLElement | null>(null);

    useEffect(() => {
        setMounted(true);
        setModalRoot(document.getElementById('modal-root'));
    }, []);

    if (!mounted || !modalRoot) return null;

    return createPortal(children, modalRoot);
};

export default ModalPortal;
