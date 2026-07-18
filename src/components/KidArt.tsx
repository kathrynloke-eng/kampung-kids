type MascotMood = "wave" | "cheer" | "think" | "proud";

export function Mascot({
  mood = "wave",
  className = "",
}: {
  mood?: MascotMood;
  className?: string;
}) {
  const arm =
    mood === "cheer"
      ? "translate(0 -6)"
      : mood === "wave"
        ? "rotate(-18 78 70)"
        : "rotate(8 78 70)";

  return (
    <svg
      viewBox="0 0 120 140"
      className={className}
      role="img"
      aria-label="Kampung Kids mascot"
    >
      <ellipse cx="60" cy="128" rx="34" ry="8" fill="#0f766e" opacity="0.18" />
      {/* body */}
      <path
        d="M32 78c0-18 12-30 28-30s28 12 28 30v28c0 8-8 14-28 14s-28-6-28-14V78z"
        fill="#14b8a6"
      />
      <path
        d="M40 86c6 10 34 10 40 0"
        fill="none"
        stroke="#0f766e"
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.35"
      />
      {/* scarf / sash */}
      <path
        d="M38 86c8 14 36 14 44 0"
        fill="none"
        stroke="#fb923c"
        strokeWidth="7"
        strokeLinecap="round"
      />
      {/* head */}
      <circle cx="60" cy="48" r="28" fill="#ffedd5" />
      <circle cx="60" cy="48" r="28" fill="#fdba74" opacity="0.25" />
      {/* hair */}
      <path
        d="M34 46c2-20 18-30 26-30 10 0 22 8 26 24-8-6-16-8-26-6-8 2-16 6-26 12z"
        fill="#0f766e"
      />
      {/* eyes */}
      <circle cx="50" cy="48" r="3.2" fill="#134e4a" />
      <circle cx="70" cy="48" r="3.2" fill="#134e4a" />
      <circle cx="51.2" cy="46.8" r="1" fill="#fff" />
      <circle cx="71.2" cy="46.8" r="1" fill="#fff" />
      {/* cheeks */}
      <circle cx="42" cy="56" r="4" fill="#fb7185" opacity="0.45" />
      <circle cx="78" cy="56" r="4" fill="#fb7185" opacity="0.45" />
      {/* smile */}
      <path
        d={
          mood === "think"
            ? "M52 60c4 2 10 2 14 0"
            : "M50 58c4 8 16 8 20 0"
        }
        fill="none"
        stroke="#134e4a"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      {/* arms */}
      <g transform={arm}>
        <path
          d="M86 82c10 2 16-8 12-16"
          fill="none"
          stroke="#14b8a6"
          strokeWidth="10"
          strokeLinecap="round"
        />
        <circle cx="96" cy="64" r="7" fill="#ffedd5" />
      </g>
      <path
        d="M34 84c-10 4-14 14-8 20"
        fill="none"
        stroke="#14b8a6"
        strokeWidth="10"
        strokeLinecap="round"
      />
      <circle cx="28" cy="104" r="7" fill="#ffedd5" />
      {/* star prop when cheering */}
      {mood === "cheer" || mood === "proud" ? (
        <g className="animate-twinkle">
          <path
            d="M98 34l3.2 6.6 7.3 1-5.3 5.2 1.3 7.2L98 50.6 91.5 54l1.3-7.2-5.3-5.2 7.3-1z"
            fill="#fbbf24"
          />
        </g>
      ) : null}
    </svg>
  );
}

export function PillarGlyph({
  pillar,
  accent,
}: {
  pillar: "culture" | "manners" | "character";
  accent: string;
}) {
  return (
    <svg viewBox="0 0 64 64" className="h-full w-full" aria-hidden>
      <defs>
        <linearGradient id={`g-${pillar}-${accent.replace("#", "")}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={accent} />
          <stop offset="100%" stopColor="#fdba74" />
        </linearGradient>
      </defs>
      <rect
        width="64"
        height="64"
        rx="18"
        fill={`url(#g-${pillar}-${accent.replace("#", "")})`}
      />
      {pillar === "culture" ? (
        <>
          <circle cx="32" cy="28" r="10" fill="#fff" opacity="0.9" />
          <path d="M18 46c6-10 22-10 28 0" stroke="#fff" strokeWidth="4" fill="none" strokeLinecap="round" />
        </>
      ) : pillar === "manners" ? (
        <>
          <path d="M20 34h24" stroke="#fff" strokeWidth="5" strokeLinecap="round" />
          <path d="M28 24l-8 10 8 10" stroke="#fff" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M36 24l8 10-8 10" stroke="#fff" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.7" />
        </>
      ) : (
        <>
          <path
            d="M32 16l4.5 9.2L46 27l-7 6.8 1.7 10.2L32 39.2 23.3 44l1.7-10.2L18 27l9.5-1.8z"
            fill="#fff"
          />
        </>
      )}
    </svg>
  );
}

export function SunnyClouds({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 360 120"
      className={className}
      aria-hidden
      preserveAspectRatio="xMidYMid slice"
    >
      <circle cx="300" cy="36" r="28" fill="#fbbf24" className="animate-pulse-soft" />
      <circle cx="300" cy="36" r="40" fill="#fde68a" opacity="0.35" />
      <g className="animate-drift-slow" fill="#fff" opacity="0.85">
        <ellipse cx="70" cy="48" rx="36" ry="18" />
        <ellipse cx="96" cy="44" rx="22" ry="14" />
        <ellipse cx="48" cy="44" rx="18" ry="12" />
      </g>
      <g className="animate-drift-slower" fill="#fff" opacity="0.7">
        <ellipse cx="190" cy="70" rx="30" ry="14" />
        <ellipse cx="210" cy="66" rx="18" ry="11" />
      </g>
    </svg>
  );
}
