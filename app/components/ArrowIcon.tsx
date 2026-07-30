type ArrowIconProps = {
  direction?: "up-right" | "down-right" | "right" | "left";
};

export default function ArrowIcon({ direction = "up-right" }: ArrowIconProps) {
  const path =
    direction === "down-right"
      ? "M5 5l8 8m0-6v6H7"
      : direction === "left"
        ? "M15 9H5m4-4-4 4 4 4"
      : direction === "right"
        ? "M3 9h10m-4-4 4 4-4 4"
        : "M5 13l8-8m-6 0h6v6";

  return (
    <svg aria-hidden="true" data-direction={direction} viewBox="0 0 18 18" width="18" height="18">
      <path
        d={path}
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.4"
      />
    </svg>
  );
}
