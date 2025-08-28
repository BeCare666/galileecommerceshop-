export const FRFlag = ({ width = '640px', height = '480px' }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 640 480"
            width={width}
            height={height}
        >
            <g fillRule="evenodd">
                <path fill="#0055A4" d="M0 0h213.3v480H0z" />
                <path fill="#fff" d="M213.3 0h213.4v480H213.3z" />
                <path fill="#EF4135" d="M426.7 0H640v480H426.7z" />
            </g>
        </svg>
    );
};
