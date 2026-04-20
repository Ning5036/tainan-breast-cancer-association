interface Props {
  className?: string;
  size?: number;
}

export default function PinkRibbon({ className = "", size = 24 }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M32 8C32 8 18 18 18 30C18 42 32 38 32 38C32 38 46 42 46 30C46 18 32 8 32 8Z"
        fill="currentColor"
      />
      <path d="M26 38L32 58L38 38" fill="currentColor" opacity="0.7" />
    </svg>
  );
}
