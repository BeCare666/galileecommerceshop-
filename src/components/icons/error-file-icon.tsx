import { useIsDarkMode } from '@/lib/hooks/use-is-dark-mode';
import { useIsMounted } from '@/lib/hooks/use-is-mounted';

export const ErrorFileIcon: React.FC<React.SVGAttributes<{}>> = (props) => {
  const isMounted = useIsMounted();
  const { isDarkMode } = useIsDarkMode();

  return (
    <>
      {isMounted && isDarkMode ? (
        <svg
          width="130"
          height="130"
          viewBox="0 0 130 130"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          {...props}
        >
          <rect x="10" y="10" width="110" height="110" rx="15" fill="#ec4899" />
          <line x1="35" y1="35" x2="95" y2="95" stroke="white" strokeWidth="8" />
          <line x1="95" y1="35" x2="35" y2="95" stroke="white" strokeWidth="8" />
        </svg>
      ) : (
        <svg
          width="130"
          height="130"
          viewBox="0 0 130 130"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          {...props}
        >
          <rect x="10" y="10" width="110" height="110" rx="15" fill="#ec4899" />
          <line x1="35" y1="35" x2="95" y2="95" stroke="white" strokeWidth="8" />
          <line x1="95" y1="35" x2="35" y2="95" stroke="white" strokeWidth="8" />
        </svg>
      )}
    </>
  );
};
