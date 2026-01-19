export const LogoSVG = ({
  width,
  height,
  className,
}: {
  width?: number;
  height?: number;
  className?: string;
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 200"
      width={width || 200}
      height={height || 200}
      className={className}
    >
      <defs>
        <linearGradient id="planetGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4F46E5" />
          <stop offset="100%" stopColor="#9333EA" />
        </linearGradient>

        <linearGradient id="orbitGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#F97316" />
          <stop offset="100%" stopColor="#FB923C" />
        </linearGradient>
      </defs>

      <circle cx="100" cy="100" r="60" fill="url(#planetGradient)" />

      <ellipse
        cx="100"
        cy="100"
        rx="90"
        ry="35"
        fill="none"
        stroke="url(#orbitGradient)"
        strokeWidth="6"
        transform="rotate(-20 100 100)"
      />

      <text
        x="100"
        y="112"
        textAnchor="middle"
        fontSize="42"
        fontFamily="monospace"
        fill="#ffffff"
        fontWeight="bold"
      >
        &gt;_
      </text>
    </svg>
  );
};
