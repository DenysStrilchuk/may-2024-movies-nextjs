"use client";

import {FC} from "react";
import {StarRating} from "star-rating-react-ts";

interface StarRatingComponentProps {
  rating: number;
  size?: number;
}

const StarRatingComponent: FC<StarRatingComponentProps> = ({rating, size = 20}) => {
  const customTheme = {
    colors: {
      backgroundDefault: "lightgray",
      backgroundColorActive: "#D8A127",
      backgroundColorHover: "#275ed8",
    },
    size,
  };

  return (
    <StarRating
      numStars={5}
      initialRating={rating / 2}
      readOnly={true}
      theme={customTheme}
    />
  );
};

export {StarRatingComponent};
