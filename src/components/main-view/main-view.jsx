import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";

export const MainView = () => {
  const [movies, setMovies] = useState([
    { id: 1, title: "Eloquent Javascript" },
    { id: 2, title: "Mastering Javascript Functional Programming" },
    { id: 3, title: "Javascript: The Good Parts" },
    { id: 4, title: "Javascript: The Definitive Guide" },
    { id: 5, title: "The Road to React" }
  ]);

  if (movies.length === 0) {
    return <div>Movie list is empty!</div>;
  }

  return (
    <div>
      {books.map((movie) => (
        <MovieCard key={movie.id} movie={movie}/>
      ))}
    </div>
  );
}