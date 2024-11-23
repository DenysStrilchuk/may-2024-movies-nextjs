'use client';

import {useState} from "react";
import {useRouter} from "next/navigation";

import {Genre} from "@/app/components/genres/Genre";
import {Loader} from "../../common/loader";
import {useGenres} from "@/app/hooks/use-genres/useGenres";
import styles from './GenresList.module.css';
import {Routes} from "@/app/utils/routes";

const GenresList = () => {
  const {genres, loading, error} = useGenres();
  const [activeGenreId, setActiveGenreId] = useState<number | null>(null);
  const router = useRouter();

  const handleGenreClick = (genreId: number) => {
    setActiveGenreId(genreId);
    router.push(`${Routes.GENRES}/${genreId}`);
  };

  if (loading) {
    return <Loader/>;
  }

  if (error) {
    return <div className={styles.errorText}>Error: {error}</div>;
  }

  return (
    <div className={styles.genres}>
      {genres.map(genre => (
        <Genre
          key={genre.id}
          genre={genre}
          isActive={genre.id === activeGenreId}
          onGenreClick={() => handleGenreClick(genre.id)}
        />
      ))}
    </div>
  );
};

export {GenresList};
