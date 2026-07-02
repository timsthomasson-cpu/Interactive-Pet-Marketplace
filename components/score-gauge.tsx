// Circular gauge showing how this product compares to the top scorer in its
// Best For group. percent = productScore / topScoreInGroup × 100.
// The top scorer always shows 100%; other products show relative distance.
// rawScore is shown as a subtitle so the underlying 1–5 score stays traceable.
//
// accentColor accepts any Tailwind text-color class (e.g. "text-green-700").
// Used for category-specific accents on Best For pages. Site-wide CTAs,
// buttons, and badges continue using our brand "trust" blue.
export function ScoreGauge({
  percent,
  rawScore,
  size = 110,
  accentColor = "text-trust-500",
}: {
  percent: number;
  rawScore: number;
  size?: number;
  accentColor?: string;
}) {
  const stroke = 10;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="currentColor"
            className="text-coral-200"
            strokeWidth={stroke}
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="currentColor"
            className={accentColor}
            strokeWidth={stroke}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold text-slate-900">{percent}%</span>
        </div>
      </div>
      <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-slate-500">
        Overall Score *
      </p>
      <p className="text-[11px] text-slate-400">Score: {rawScore.toFixed(2)} / 5.0</p>
    </div>
  );
}

// Horizontal bar showing one weighted criterion's score as a percentage of 5.
// barColor accepts a Tailwind bg-color class for the fill — defaults to our
// brand blue, can be overridden per category page.
export function ScoreBar({
  label,
  weight,
  score,
  barColor = "bg-trust-500",
}: {
  label: string;
  weight: string;
  score: number; // 1–5
  barColor?: string;
}) {
  const pct = Math.round((score / 5) * 100);
  return (
    <div>
      <div className="flex items-baseline justify-between text-xs">
        <span className="font-medium text-slate-700">
          {label} <span className="text-slate-400">({weight})</span>
        </span>
        <span className="font-semibold text-slate-900">{pct}%</span>
      </div>
      <div className="mt-0.5 h-1.5 w-full overflow-hidden rounded-full bg-coral-100">
        <div
          className={`h-full rounded-full ${barColor}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
