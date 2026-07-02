// Small hand-written line icons used on Best For pages (feature chips and
// criteria weight cards). Kept dependency-free — no icon library installed.
// All icons are 24x24 viewBox, stroke-based, inherit color via currentColor.

type IconProps = { className?: string };

const base = "stroke-current fill-none";

// Renders filled/empty star characters in amber for a given rating (0–5).
// Used in place of a single "★" text char — shows actual star count visually.
// rating >= i → filled amber; rating >= i-0.5 → half (lighter); else gray.
export function StarRating({ rating, className = "text-sm" }: { rating: number; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-px ${className}`} aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <span
          key={i}
          className={
            rating >= i
              ? "text-amber-400"
              : rating >= i - 0.5
              ? "text-amber-200"
              : "text-slate-300"
          }
        >★</span>
      ))}
    </span>
  );
}

export function IconAward({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle className={base} cx="12" cy="8.5" r="5" />
      <path className={base} d="M9 13.5 L6 21 L12 18 L18 21 L15 13.5" />
    </svg>
  );
}

export function IconHand({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path className={base} d="M9 12V5a1.5 1.5 0 0 1 3 0v6M12 11V4a1.5 1.5 0 0 1 3 0v7M15 11.5V6a1.5 1.5 0 0 1 3 0v9c0 3.3-2.7 6-6 6h-1a6 6 0 0 1-5-2.7L4 14.8c-.6-1 0-2.3 1.2-2.4.5 0 1 .2 1.3.6L8 15" />
    </svg>
  );
}

export function IconHeartPulse({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path className={base} d="M20.8 8.6a4.6 4.6 0 0 0-7.9-3.2L12 6.3l-.9-.9a4.6 4.6 0 0 0-7.9 3.2c0 1.4.6 2.7 1.6 3.6l6.4 6.4c.4.4 1 .4 1.4 0l6.4-6.4c1-1 1.6-2.2 1.6-3.6Z" />
      <path className={base} d="M5 12h2.5l1.5-3 2 6 1.5-3H15" />
    </svg>
  );
}

export function IconScale({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path className={base} d="M12 3v18M7 7l-3.5 7a3 3 0 0 0 5.6 1.5M7 7l3.5 7a3 3 0 0 1-5.6 1.5M7 7h10M17 7l-3.5 7a3 3 0 0 0 5.6 1.5M17 7l3.5 7a3 3 0 0 1-5.6 1.5" />
    </svg>
  );
}

export function IconSoundWave({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path className={base} d="M3 12h2M7 9v6M11 6v12M15 9v6M19 12h2" />
    </svg>
  );
}

export function IconUsb({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect className={base} x="4" y="9" width="9" height="6" rx="1.5" />
      <path className={base} d="M13 12h3a3 3 0 0 1 3 3v2M17 17l1.5 1.5L20.5 16.5" />
    </svg>
  );
}

export function IconCatFace({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path className={base} d="M5 9 7 4l3 3.2h4L17 4l2 5" />
      <circle className={base} cx="12" cy="13" r="7" />
      <circle cx="9.5" cy="12.5" r="0.8" className="fill-current stroke-none" />
      <circle cx="14.5" cy="12.5" r="0.8" className="fill-current stroke-none" />
      <path className={base} d="M12 14.5v1.2M10.5 17l1.5-1.3 1.5 1.3" />
    </svg>
  );
}

export function IconSparkleClean({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path className={base} d="M6 4v4M4 6h4M16 14v4M14 16h4" />
      <path className={base} d="M12 3l1.6 4.4L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.6L12 3Z" />
    </svg>
  );
}

export function IconDurability({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path className={base} d="M12 3 4.5 6v5.5c0 4.4 3 7.7 7.5 9.5 4.5-1.8 7.5-5.1 7.5-9.5V6L12 3Z" />
      <path className={base} d="M9.5 12.2 11 14l4-4.5" />
    </svg>
  );
}

export function IconUsers({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle className={base} cx="9" cy="8" r="2.8" />
      <path className={base} d="M3.5 19c0-3 2.5-5 5.5-5s5.5 2 5.5 5" />
      <circle className={base} cx="17" cy="9" r="2.2" />
      <path className={base} d="M15.5 14.2c2.3.3 4 2 4 4.8" />
    </svg>
  );
}

export function IconShieldCheck({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path className={base} d="M12 3 4.5 6v5.5c0 4.4 3 7.7 7.5 9.5 4.5-1.8 7.5-5.1 7.5-9.5V6L12 3Z" />
      <path className={base} d="M9 12l2 2 4-4.5" />
    </svg>
  );
}

export function IconBattery({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect className={base} x="3" y="8" width="15" height="8" rx="2" />
      <path className={base} d="M20 10.5v3" />
      <path className={base} d="M10 10l-2 3h3l-2 3" />
    </svg>
  );
}

export function IconPrivacy({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path className={base} d="M3 12s3.5-6 9-6 9 6 9 6-3.5 6-9 6-9-6-9-6Z" />
      <circle className={base} cx="12" cy="12" r="2.5" />
      <path className={base} d="M4 4l16 16" />
    </svg>
  );
}

export function IconBrain({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      {/* Right hemisphere */}
      <path className={base} d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z" />
      {/* Left hemisphere */}
      <path className={base} d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z" />
    </svg>
  );
}

export function IconHeartHands({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path className={base} d="M4 13c0 4 3.5 6.5 8 8 4.5-1.5 8-4 8-8" />
      <path className={base} d="M4 13c-1-2 0-4.5 2.3-4.9C8 7.8 9.3 9 10 10M20 13c1-2 0-4.5-2.3-4.9C16 7.8 14.7 9 14 10" />
      <path className={base} d="M9 11.5a3 3 0 0 1 6 0c0 2-3 4.5-3 4.5s-3-2.5-3-4.5Z" />
    </svg>
  );
}

export function IconChat({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path className={base} d="M4 5h16v10H9l-4 4V5Z" />
    </svg>
  );
}

// Keyword matcher for product feature chip text (e.g. "5 touch zones",
// "Heartbeat & purring", "USB-C Rechargeable"). Falls back to a generic
// sparkle icon if nothing matches — never blocks rendering.
export function featureIcon(text: string, className?: string) {
  const t = text.toLowerCase();
  if (t.includes("touch") || t.includes("zone")) return <IconHand className={className} />;
  if (t.includes("heartbeat") || t.includes("purr") || t.includes("breath")) return <IconHeartPulse className={className} />;
  if (t.includes("weight") || t.includes("realistic feel")) return <IconScale className={className} />;
  if (t.includes("meow") || t.includes("bark") || t.includes("voice") || t.includes("sound")) return <IconSoundWave className={className} />;
  if (t.includes("usb") || t.includes("charg") || t.includes("rechargeable")) return <IconUsb className={className} />;
  if (t.includes("dementia") || t.includes("cuddly") || t.includes("affordable") || t.includes("realistic")) return <IconCatFace className={className} />;
  return <IconSparkleClean className={className} />;
}
