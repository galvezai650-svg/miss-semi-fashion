import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  rating: number;
  size?: "sm" | "md" | "lg";
  showValue?: boolean;
}

const sizeMap = {
  sm: "h-3 w-3",
  md: "h-4 w-4",
  lg: "h-5 w-5",
};

const textSizeMap = {
  sm: "text-xs",
  md: "text-sm",
  lg: "text-base",
};

export default function StarRating({
  rating,
  size = "md",
  showValue = false,
}: StarRatingProps) {
  const stars: React.ReactNode[] = [];
  const clampedRating = Math.max(0, Math.min(5, rating));

  for (let i = 1; i <= 5; i++) {
    if (clampedRating >= i) {
      // Filled star
      stars.push(
        <Star
          key={i}
          className={cn(sizeMap[size], "text-yellow-400 fill-yellow-400")}
        />
      );
    } else if (clampedRating >= i - 0.5) {
      // Half star — overlay technique
      stars.push(
        <span key={i} className="relative inline-block">
          <Star className={cn(sizeMap[size], "text-gray-300")} />
          <span className="absolute inset-0 overflow-hidden" style={{ width: "50%" }}>
            <Star
              className={cn(sizeMap[size], "text-yellow-400 fill-yellow-400")}
            />
          </span>
        </span>
      );
    } else {
      // Empty star
      stars.push(
        <Star key={i} className={cn(sizeMap[size], "text-gray-300")} />
      );
    }
  }

  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center">{stars}</div>
      {showValue && (
        <span className={cn("font-medium text-muted-foreground", textSizeMap[size])}>
          {clampedRating.toFixed(1)}
        </span>
      )}
    </div>
  );
}
