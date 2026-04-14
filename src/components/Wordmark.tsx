import Image from "next/image";

type Variant = "default" | "business";
type Tone = "light" | "dark";

type Props = {
  // Tailwind text-size class controls overall scale (e.g. "text-2xl")
  className?: string;
  // Slight nudge for the logo if optical alignment differs across fonts
  logoClassName?: string;
  variant?: Variant;
  // Use "dark" on dark surfaces — renders a styled "o" instead of the PNG
  // (the shipped PNG has a non-transparent background).
  tone?: Tone;
};

/**
 * Skyrol wordmark with the "o" replaced by the brand mark.
 * Renders as: Skyr [logo] l
 *
 * The logo is sized via 1em so it always matches the surrounding font size.
 * Vertical nudge keeps it visually centered with the x-height of the text.
 */
export default function Wordmark({
  className = "text-base",
  logoClassName = "",
  variant = "default",
  tone = "light",
}: Props) {
  const accent = variant === "business" ? "text-lagoon" : "text-coral";

  return (
    <span className={`inline-flex items-baseline font-bold tracking-tight leading-none ${className}`}>
      <span>Skyr</span>
      {tone === "dark" ? (
        <span className={accent}>o</span>
      ) : (
        <Image
          src="/skyrol_logo.png"
          alt="o"
          width={64}
          height={64}
          priority
          className={`inline-block align-baseline mx-[0.02em] translate-y-[0.06em] ${logoClassName}`}
          style={{ width: "0.86em", height: "0.86em" }}
        />
      )}
      <span>l</span>
      {variant === "business" && (
        <span className="ml-1.5 px-1.5 py-0.5 rounded text-[0.45em] font-bold bg-lagoon/10 text-lagoon uppercase tracking-wider self-center">
          Business
        </span>
      )}
    </span>
  );
}
