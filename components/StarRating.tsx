"use client";

import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: number;
  className?: string;
}

export default function StarRating({
  rating,
  maxRating = 5,
  size = 24,
  className,
}: StarRatingProps) {
  // Ensure rating is between 0 and maxRating
  const clampedRating = Math.max(0, Math.min(rating, maxRating));

  return (
    <div
      className={cn("flex items-center", className)}
      role="img"
      aria-label={`Rating: ${clampedRating} out of ${maxRating} stars`}
    >
      {[...Array(maxRating)].map((_, index) => {
        const starValue = index + 1;
        const fillPercentage = Math.min(
          100,
          Math.max(0, (clampedRating - index) * 100)
        );

        return (
          <div key={index} className="relative inline-block">
            {/* Background star (empty) */}
            <Star size={size} className="text-gray-200" strokeWidth={1.5} />

            {/* Foreground star (filled) with clip path for partial fill */}
            <div
              className="absolute top-0 left-0 overflow-hidden"
              style={{ width: `${fillPercentage}%` }}
            >
              <Star
                size={size}
                className="text-yellow-400 fill-yellow-400"
                strokeWidth={1.5}
              />
            </div>
          </div>
        );
      })}

      <span className="ml-2 text-sm text-gray-600">
        {clampedRating.toFixed(1)}
      </span>
    </div>
  );
}
