export default function Logo({ size = 36 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 44 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="lg-bg" x1="0" y1="0" x2="44" y2="44" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="55%" stopColor="#4f46e5" />
          <stop offset="100%" stopColor="#7c3aed" />
        </linearGradient>
        <linearGradient id="lg-top" x1="0" y1="0" x2="0" y2="22" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="white" stopOpacity="0.2" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <filter id="lg-glow">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* Background pill */}
      <rect width="44" height="44" rx="12" fill="url(#lg-bg)" />
      {/* Top shine */}
      <rect width="44" height="22" rx="12" fill="url(#lg-top)" />

      {/* 
        CLEANSTACK logo mark:
        - Bold "C" arc on the left = "Clean"
        - Three descending right-aligned bars = "Stack" layers
        Together they form a unified mark
      */}

      {/* C arc — clean bold curve */}
      <path
        d="M26 12 C20 12 14 15.5 14 22 C14 28.5 20 32 26 32"
        stroke="white"
        strokeWidth="3.2"
        strokeLinecap="round"
        fill="none"
        filter="url(#lg-glow)"
      />

      {/* Stack bars — 3 horizontal lines, tapering right */}
      {/* Top bar */}
      <line x1="26" y1="16" x2="33" y2="16"
        stroke="white" strokeWidth="2.8" strokeLinecap="round" opacity="1" />
      {/* Middle bar */}
      <line x1="26" y1="22" x2="33" y2="22"
        stroke="white" strokeWidth="2.8" strokeLinecap="round" opacity="0.7" />
      {/* Bottom bar — shorter, fades */}
      <line x1="26" y1="28" x2="31" y2="28"
        stroke="white" strokeWidth="2.8" strokeLinecap="round" opacity="0.4" />
    </svg>
  );
}
