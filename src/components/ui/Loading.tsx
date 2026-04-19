import { Heart } from "lucide-react";

export default function Loading({ text = "載入中..." }: { text?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-4">
      <div className="relative">
        <Heart className="w-8 h-8 text-primary animate-pulse" fill="#E8A0B4" />
      </div>
      <p className="text-sm text-charcoal/50">{text}</p>
    </div>
  );
}
