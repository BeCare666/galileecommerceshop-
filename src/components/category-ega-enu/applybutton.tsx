// ApplyButton.tsx
import { createPortal } from "react-dom";

interface ApplyButtonProps {
  applyFilter: () => void; // on passe la fonction depuis le parent
}

export default function ApplyButton({ applyFilter }: ApplyButtonProps) {
  return createPortal(
    <button
      className="fixed bottom-4 z-[9999] right-4 w-[120px] h-[48px] bg-pink-500 text-white rounded hover:scale-105 transition flex items-center justify-center shadow-lg"
      onClick={applyFilter}
    >
      Appliquer
    </button>,
    document.body // le bouton est rendu directement dans le body, donc fixed par rapport à la fenêtre
  );
}
