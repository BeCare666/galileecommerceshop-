export const FRFlagRound = ({ width = '512px', height = '512px' }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            width={width}
            height={height}
        >
            <g fillRule="evenodd" clipPath="url(#circleClip)">
                <path fill="#0055A4" d="M0 0h170.7v512H0z" />
                <path fill="#fff" d="M170.7 0h170.6v512H170.7z" />
                <path fill="#EF4135" d="M341.3 0H512v512H341.3z" />
            </g>
            <defs>
                <clipPath id="circleClip">
                    <circle cx="256" cy="256" r="256" />
                </clipPath>
            </defs>
        </svg>
    );
};
