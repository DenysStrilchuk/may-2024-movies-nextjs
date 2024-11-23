"use client";

import {FC} from "react";
import {Badge, Stack} from "react-bootstrap";
import {useRouter} from "next/navigation";

import styles from "./GenreBadge.module.css";

interface GenreBadgeProps {
  genreId: number;
  genreName: string;
}

const GenreBadge: FC<GenreBadgeProps> = ({genreId, genreName}) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/genre/${genreId}`);
  };

  return (
    <Stack direction="horizontal" gap={2}>
      <Badge className={styles.badge} onClick={handleClick}>
        {genreName}
      </Badge>
    </Stack>
  );
};

export {GenreBadge};
