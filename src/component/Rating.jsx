import { Star } from "lucide-react";

const Rating = ({ value, size = "small" }) => {
  const stars = [];
  const fullStars = Math.floor(value);
  const hasHalfStar = value % 1 !== 0;

  for (let i = 0; i < 5; i++) {
    if (i < fullStars) {
      stars.push(
        <Star
          key={i}
          className={`${
            size === "small" ? "w-4 h-4" : "w-5 h-5"
          } fill-yellow-400 text-yellow-400`}
        />
      );
    } else if (i === fullStars && hasHalfStar) {
      stars.push(
        <div key={i} className="relative">
          <Star
            className={`${
              size === "small" ? "w-4 h-4" : "w-5 h-5"
            } text-gray-300`}
          />
          <div className="absolute inset-0 overflow-hidden w-1/2">
            <Star
              className={`${
                size === "small" ? "w-4 h-4" : "w-5 h-5"
              } fill-yellow-400 text-yellow-400`}
            />
          </div>
        </div>
      );
    } else {
      stars.push(
        <Star
          key={i}
          className={`${
            size === "small" ? "w-4 h-4" : "w-5 h-5"
          } text-gray-300`}
        />
      );
    }
  }

  return <div className="flex items-center gap-1">{stars}</div>;
};

export default Rating;
