'use client';
import { useRef } from 'react';

interface ProductZoomProps {
  src: string;
  alt?: string;
  zoomLevel?: number; // optionnel, défaut 2
}

export default function ProductZoomStylish({
  src,
  alt,
  zoomLevel = 2,
}: ProductZoomProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current!.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    containerRef.current!.style.backgroundPosition = `${x}% ${y}%`;
  };

  const handleMouseLeave = () => {
    containerRef.current!.style.backgroundPosition = 'center';
  };

  return (
    <div
      ref={containerRef}
      className="w-64 md:w-80 lg:w-96 h-64 md:h-80 lg:h-96 rounded-lg overflow-hidden bg-center bg-no-repeat cursor-zoom-in transition-all duration-500 ease-in-out shadow-lg"
      style={{
        backgroundImage: `url(${src})`,
        backgroundSize: `${zoomLevel * 100}%`,
        transform: 'scale(1)',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Image cachée pour SEO */}
      <img src={src} alt={alt} className="opacity-0 w-full h-full" />
    </div>
  );
}
