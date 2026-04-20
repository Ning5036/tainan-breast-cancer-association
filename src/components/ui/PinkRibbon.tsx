interface Props {
  className?: string;
  size?: number;
}

export default function PinkRibbon({ className = "", size = 24 }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 700 1130"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Rotate slightly clockwise (~12°) around center to straighten */}
      <g transform="rotate(12, 350, 530)">
        {/* Left loop of the ribbon */}
        <path
          d="M210 99C210 99 204 68 165 39C137 32 112 36 81 58C39 89 37 113 37 121C53 185 66 172 79 182C79 182 79 181 79 181C79 181 90 105 210 99Z"
          fill="currentColor"
          opacity="0.75"
        />
        {/* Main body: right side going down */}
        <path
          d="M165 39C176 51 189 74 202 102C276 277 187 561 130 780C130 780 108 858 114 876C119 893 139 913 183 953C222 988 266 1014 273 1047L333 513C333 513 340 268 339 220C337 171 323 106 250 73C216 57 189 44 165 39Z"
          fill="currentColor"
        />
        {/* Left side going down-right */}
        <path
          d="M79 181C79 181 56 152 37 121C37 130 31 223 31 223C31 223 26 288 69 340C111 391 261 584 549 777C549 777 619 827 639 828C639 828 674 678 667 624C667 624 584 594 337 401C90 208 79 181 79 181Z"
          fill="currentColor"
          opacity="0.85"
        />
      </g>
    </svg>
  );
}
