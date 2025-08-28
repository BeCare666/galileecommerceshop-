export const AboutIcon: React.FC<React.SVGAttributes<{}>> = (props) => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="#ec4899"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="12" cy="12" r="10" stroke="#ec4899" strokeWidth="2" fill="none" />
      <line x1="12" y1="8" x2="12" y2="8" stroke="#ec4899" strokeWidth="2" strokeLinecap="round" />
      <line x1="12" y1="11" x2="12" y2="16" stroke="#ec4899" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
};
