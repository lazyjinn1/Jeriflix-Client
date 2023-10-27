import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";




export const MainView = () => {
<<<<<<< Updated upstream
  const [movies, setMovies] = useState([
    {
      _id: { "$oid": "65286702197c5ca4202d2fab" },
      Title: "Silence of the Lambs",
      Description: "A young FBI cadet must receive the help of an incarcerated and manipulative cannibal killer.",
      Genre: {
        Name: "Thriller",
        Description: "Thriller films, also known as suspense films or suspense thrillers, are a broad film genre that involves excitement and suspenece in the audience."
      },
      Director: {
        Name: "Jonathan Demme",
        Bio: "Robert Jonathan Demme was an American director, producer, and screenwriter.",
        Birth: "1944",
        Death: "2017"
      },
      ImagePath: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/uS9m8OBk1A8eM9I042bx8XXpqAq.jpg',
      Featured: true
    },
    {
      _id: { "$oid": "6528705b197c5ca4202d2fac" },
      Title: "RRR",
      Description: "A fictional history of two legendary revolutionaries' journey away from home before they began fighting for their country in the 1920s.",
      Genre: {
        Name: "Action",
        Description: "Spectacular physical action; a narrative emphasis on fights, chases, and explosions; and a combination of state-of-the-art special effects."
      },
      Director: {
        Name: "S.S. Rajamouli",
        Bio: "Koduri Srisaila Sri Rajamouli is an Indian film director and screenwriter who primarily works in Telugu cinema and is known for his action, fantasy, and epic genre films. He is the highest grossing Indian director of all time and the highest-paid director in India.",
        Birth: "1973",
        Death: "Alive"
      },
      ImagePath: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/nQKW2sabIClUsrQl3Y3i5LQgf5l.jpg",
      Featured: true
    },
    {
      _id: { "$oid": "65287564e04aa0da05c89bfa" },
      Title: "Circle",
      Description: "Held captive and faced with their imminent executions, fifty strangers are forced to choose the one person among them who deserves to live.",
      Genre: {
        Name: "Thriller",
        Description: "A Thriller film, also known as a suspense film or a suspense thriller, is a broad film genre that involves excitement and suspense in the audience."
      },
      Director: {
        Name: "Aaron Hann",
        Bio: "No bio found",
        Birth: "No birth year found",
        Death: "No death year found"
      },
      ImagePath: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/hbIL53MdZFJXsgxXaSOVuApWTs8.jpg",
      Featured: true
    },
    {
      _id: { "$oid": "652878637d471dace9494ee0" },
      Title: "The Notebook",
      Description: "A poor yet passionate young man falls in love with a rich young woman, giving her a sense of freedom. However, social differences soon get in the way.",
      Genre: {
        Name: "Romance",
        Description: "Romance films are love stories. They center around two protagonists exploring some of the elements of love like relationships, sacrifice, marriage, obsession, or destruction"
      },
      Director: {
        Name: "Nick Cassavetes",
        Bio: "Nicholas David Rowland Cassavetes is an American actor, director, and writer",
        Birth: "1959",
        Death: "Alive"
      },
      ImagePath: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/rNzQyW4f8B8cQeg7Dgj3n6eT5k9.jpg",
      Featured: false
    },
    {
      _id: { "$oid": "652878637d471dace9494ee1" },
      Title: "Elemental",
      Description: "Follows Ember and Wade, in a city where fire-, water-, earth-, and air-residents live together.",
      Genre: {
        Name: "Fantasy",
        Description: "Films that belong to the fantasy genre with fantastic themes, usually magic, supernatural events, mythology, folklore, or exotic fantasy worlds."
      },
      Director: {
        Name: "Peter Sohn",
        Bio: "Peter Sohn is an American filmmaker, animator, and voice actor, best known for his work at Pixar Animation Studios.",
        Birth: "1977",
        Death: "Alive"
      },
      ImagePath: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/4Y1WNkd88JXmGfhtWR7dmDAo1T2.jpg",
      Featured: true
    },
    {
      _id: { "$oid": "652878637d471dace9494ee2" },
      Title: "Princess Mononoke",
      Description: "On a journey to find the cure for a Tatarigami's curse, Ashitaka finds himself in the middle of a war between the forest gods and Tatara, a mining colony. In this quest he also meets San, the Mononoke Hime.",
      Genre: {
        Name: "Fantasy",
        Description: "Films that belong to the fantasy genre with fantastic themes, usually magic, supernatural events, mythology, folklore, or exotic fantasy worlds."
      },
      Director: {
        Name: "Hayao Miyazaki",
        Bio: "Hayao Miyazaki is a Japanese animator, filmmaker, and manga artist. A co-founder of Studio Ghibli, he has attained international acclaim as a masterful storyteller and creator of Japanese animated feature films, and is widely regarded as one of the most accomplished filmmakers in the history of animation.",
        Birth: "1941",
        Death: "Alive"
      },
      ImagePath: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/cdclY72b6L5Y3ObGWAjoxsjgsgR.jpg",
      Featured: true
    },
    {
      _id: { "$oid": "652878637d471dace9494ee3" },
      Title: "Persona 3 The Movie: #4 Winter of Rebirth",
      Description: "The season changes to winter. Makoto makes a decision in order to greet the spring that is waiting beyond.",
      Genre: {
        Name: "Drama",
        Description: "The drama genre features stories with high stakes and many conflicts. They're plot-driven and demand that every character and scene move the story forward."
      },
      Director: {
        Name: "Tomohisa Taguchi",
        Bio: "Tomohisa Taguchi is a Japanese animator, director, storyboard artist, and screenwriter",
        Birth: "1985",
        Death: "Alive"
      },
      ImagePath: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/ybPwH1cav2kVxvYF9eexjWjajCe.jpg",
      Featured: false
    },
    {
      _id: { "$oid": "652878637d471dace9494ee4" },
      Title: "John Wick: Chapter 4",
      Description: "John Wick uncovers a path to defeating The High Table. But before he can earn his freedom, Wick must face off against a new enemy with powerful alliances across the globe and forces that turn old friends into foes.",
      Genre: {
        Name: "Action",
        Description: "Spectacular physical action; a narrative emphasis on fights, chases, and explosions; and a combination of state-of-the-art special effects and stunt-work"
      },
      Director: {
        Name: "Chad Stahelski",
        Bio: "Chad Stahelski is an American stuntman and film director. He directed the 2014 film John Wick and its three sequels. He has worked as a stuntman, stunt coordinator, and second unit director on several films",
        Birth: "1968",
        Death: "Alive"
      },
      ImagePath: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/vZloFAK7NmvMGKE7VkF5UHaz0I.jpg",
      Featured: false
    },
    {
      _id: { "$oid": "652878637d471dace9494ee5" },
      Title: "Hereditary",
      Description: "When Ellen, the matriarch of the Graham family, passes away, her daughter's family begins to unravel cryptic and increasingly terrifying secrets about their ancestry.",
      Genre: {
        Name: "Horror",
        Description: "Horror films may incorporate incidents of physical violence and psychological terror; they may be studies of deformed, disturbed, psychotic, or evil characters; stories of terrifying monsters or malevolent animals; or mystery thrillers that use atmosphere to build suspense."
      },
      Director: {
        Name: "Ari Aster",
        Bio: "Ari Aster is an American filmmaker. Stylistically, his films are notable for combining horror and dark humor, and for their unsettling and unsparing depictions of graphic violence.",
        Birth: "1986",
        Death: "Alive"
      },
      ImagePath: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/p9fmuz2Oj3HtEJEqbIwkFGUhVXD.jpg",
      Featured: true
    },
    {
      _id: { "$oid": "652878637d471dace9494ee6" },
      Title: "Midsommar",
      Description: "Several friends travel to Sweden to study as anthropologists a summer festival that is held every ninety years in the remote hometown of one of them. What begins as a dream vacation in a place where the sun never sets, gradually turns into a dark nightmare as the mysterious inhabitants invite them to participate in their disturbing festive activities.",
      Genre: {
        Name: "Horror",
        Description: "Horror films may incorporate incidents of physical violence and psychological terror; they may be studies of deformed, disturbed, psychotic, or evil characters; stories of terrifying monsters or malevolent animals; or mystery thrillers that use atmosphere to build suspense."
      },
      Director: {
        Name: "Ari Aster",
        Bio: "Ari Aster is an American filmmaker. Stylistically, his films are notable for combining horror and dark humor, and for their unsettling and unsparing depictions of graphic violence.",
        Birth: "1986",
        Death: "Alive"
      },
      ImagePath: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/7LEI8ulZzO5gy9Ww2NVCrKmHeDZ.jpg",
      Featured: true
    },
    {
      Title: "Inception",
      Description: "A thief who enters the dreams of others to obtain secrets is offered the opportunity to have his criminal history erased as payment for a seemingly impossible heist: the implantation of another person's idea into a target's subconscious.",
      Genre: {
        Name: "Science Fiction",
        Description: "Films that explore speculative concepts such as advanced technology, time travel, parallel universes, and extraterrestrial life."
      },
      Director: {
        Name: "Christopher Nolan",
        Bio: "Christopher Edward Nolan is a British-American film director, producer, and screenwriter. He is one of the highest-grossing directors in history and among the most acclaimed and influential filmmakers of the 21st century.",
        Birth: "1970",
        Death: "Alive"
      },
      ImagePath: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg",
      Featured: true
    },
    {
      Title: "The Dark Knight",
      Description: "When the menace known as The Joker emerges from his mysterious past, he wreaks havoc and chaos on the people of Gotham. The Dark Knight must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
      Genre: {
        Name: "Action",
        Description: "Spectacular physical action; a narrative emphasis on fights, chases, and explosions; and a combination of state-of-the-art special effects and stunt-work."
      },
      Director: {
        Name: "Christopher Nolan",
        Bio: "Christopher Edward Nolan is a British-American film director, producer, and screenwriter. He is one of the highest-grossing directors in history and among the most acclaimed and influential filmmakers of the 21st century.",
        Birth: "1970",
        Death: "Alive"
      },
      ImagePath: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
      Featured: true
    },
    {
      Title: "The Matrix",
      Description: "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.",
      Genre: {
        Name: "Science Fiction",
        Description: "Films that explore speculative concepts such as advanced technology, time travel, parallel universes, and extraterrestrial life."
      },
      Director: {
        Name: "The Wachowskis",
        Bio: "Lana Wachowski and Lilly Wachowski, known together professionally as The Wachowskis, are American film and television directors, writers, and producers. They are best known for creating The Matrix series.",
        Birth: "1965 (Lana) & 1967 (Lilly)",
        Death: "Alive"
      },
      ImagePath: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
      Featured: true
    },
    {
      Title: "Pulp Fiction",
      Description: "The lives of two mob hitmen, a boxer, a gangster's wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
      Genre: {
        Name: "Crime",
        Description: "Crime films feature the actions of criminals, particularly bank robbers, underworld figures, or ruthless hoodlums who operate outside the law, stealing and murdering their way through life."
      },
      Director: {
        Name: "Quentin Tarantino",
        Bio: "Quentin Jerome Tarantino is an American filmmaker and screenwriter. He is widely considered one of the greatest filmmakers of his generation.",
        Birth: "1963",
        Death: "Alive"
      },
      ImagePath: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg",
      Featured: true
    },
    {
      Title: "The Shawshank Redemption",
      Description: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
      Genre: {
        Name: "Drama",
        Description: "The drama genre features stories with high stakes and many conflicts. They're plot-driven and demand that every character and scene move the story forward."
      },
      Director: {
        Name: "Frank Darabont",
        Bio: "Frank Darabont is a Hungarian-American film director, screenwriter, and producer. He is best known for his work on the Stephen King adaptations The Shawshank Redemption, The Green Mile, and The Mist.",
        Birth: "1959",
        Death: "Alive"
      },
      ImagePath: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/lyQBXzOQSuE59IsHyhrp0qIiPAz.jpg",
      Featured: true
    },
    {
      Title: "The Lord of the Rings: The Fellowship of the Ring",
      Description: "A meek Hobbit from the Shire and eight companions set out on a journey to destroy the powerful One Ring and save Middle-earth from the Dark Lord Sauron.",
      Genre: {
        Name: "Fantasy",
        Description: "Films that belong to the fantasy genre with fantastic themes, usually magic, supernatural events, mythology, folklore, or exotic fantasy worlds."
      },
      Director: {
        Name: "Peter Jackson",
        Bio: "Sir Peter Robert Jackson is a New Zealand film director, screenwriter, and film producer. He is best known as the director, writer, and producer of The Lord of the Rings trilogy and The Hobbit trilogy.",
        Birth: "1961",
        Death: "Alive"
      },
      ImagePath: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/6oom5QYQ2yQTMJIbnvbkBL9cHo6.jpg",
      Featured: true
    },
    {
      Title: "Forrest Gump",
      Description: "The presidencies of Kennedy and Johnson, the events of Vietnam, Watergate, and other history unfold through the perspective of an Alabama man with an IQ of 75.",
      Genre: {
        Name: "Drama",
        Description: "The drama genre features stories with high stakes and many conflicts. They're plot-driven and demand that every character and scene move the story forward."
      },
      Director: {
        Name: "Robert Zemeckis",
        Bio: "Robert Lee Zemeckis is an American film director, producer, and screenwriter. He is known for pioneering the use of visual effects in filmmaking.",
        Birth: "1952",
        Death: "Alive"
      },
      ImagePath: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg",
      Featured: true
    },
    {
      Title: "Gladiator",
      Description: "A former Roman General sets out to exact vengeance against the corrupt emperor who murdered his family and sent him into slavery.",
      Genre: {
        Name: "Action",
        Description: "Spectacular physical action; a narrative emphasis on fights, chases, and explosions; and a combination of state-of-the-art special effects and stunt-work."
      },
      Director: {
        Name: "Ridley Scott",
        Bio: "Sir Ridley Scott is an English film director and producer. He is known for his stylish visuals and an obsession for detail, which is a frequent subject of parody.",
        Birth: "1937",
        Death: "Alive"
      },
      ImagePath: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/ty8TGRuvJLPUmAR1H1nRIsgwvim.jpg",
      Featured: true
    },
    {
      Title: "The Godfather",
      Description: "An organized crime dynasty's aging patriarch transfers control of his clandestine empire to his reluctant son.",
      Genre: {
        Name: "Crime",
        Description: "Crime films feature the actions of criminals, particularly bank robbers, underworld figures, or ruthless hoodlums who operate outside the law, stealing and murdering their way through life."
      },
      Director: {
        Name: "Francis Ford Coppola",
        Bio: "Francis Ford Coppola is an American film director, producer, and screenwriter. He is a central figure in the New Hollywood wave of filmmaking.",
        Birth: "1939",
        Death: "Alive"
      },
      ImagePath: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
      Featured: true
    },
    {
      Title: "Inglorious Bastards",
      Description: "In Nazi-occupied France during World War II, a plan to assassinate Nazi leaders by a group of Jewish U.S. soldiers coincides with a theater owner's vengeful plans for the same.",
      Genre: {
        Name: "War",
        Description: "War films are a film genre concerned with warfare, typically about naval, air, or land battles, with combat scenes central to the drama."
      },
      Director: {
        Name: "Quentin Tarantino",
        Bio: "Quentin Jerome Tarantino is an American filmmaker and screenwriter. He is widely considered one of the greatest filmmakers of his generation.",
        Birth: "1963",
        Death: "Alive"
      },
      ImagePath: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/ewTgmYE6Ei2yHKqYffPwzLwtUrZ.jpg",
      Featured: true
    },
    {
      Title: "The Revenant",
      Description: "In the 1820s, a frontiersman on a fur trading expedition in the uncharted wilderness fights for survival after being mauled by a bear and left for dead by members of his own hunting team.",
      Genre: {
        Name: "Adventure",
        Description: "Adventure films are exciting stories with new experiences or exotic locales. They often involve dangerous situations and physical feats."
      },
      Director: {
        Name: "Alejandro González Iñárritu",
        Bio: "Alejandro González Iñárritu is a Mexican filmmaker known for his unique and innovative approach to storytelling. He is one of the most acclaimed directors in the industry.",
        Birth: "1963",
        Death: "Alive"
      },
      ImagePath: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/wkA03WX3IdHYMX2gIxaCwqowQX.jpg",
      Featured: true
    },
    {
      Title: "Interstellar",
      Description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival as Earth faces a global food crisis.",
      Genre: {
        Name: "Science Fiction",
        Description: "Films that explore speculative concepts such as advanced technology, time travel, parallel universes, and extraterrestrial life."
      },
      Director: {
        Name: "Christopher Nolan",
        Bio: "Christopher Edward Nolan is a British-American film director, producer, and screenwriter. He is one of the highest-grossing directors in history and among the most acclaimed and influential filmmakers of the 21st century.",
        Birth: "1970",
        Death: "Alive"
      },
      ImagePath: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/4pWbfjzUkusGXAZQoduARaI0qu2.jpg",
      Featured: true
    },
    {
      Title: "The Matrix Reloaded",
      Description: "Neo and his allies race against time before the machines discover the city of Zion and destroy it. While seeking the truth about the Matrix, Neo must save Trinity from a dark fate.",
      Genre: {
        Name: "Science Fiction",
        Description: "Films that explore speculative concepts such as advanced technology, time travel, parallel universes, and extraterrestrial life."
      },
      Director: {
        Name: "The Wachowskis",
        Bio: "Lana Wachowski and Lilly Wachowski, known together professionally as The Wachowskis, are American film and television directors, writers, and producers. They are best known for creating The Matrix series.",
        Birth: "1965 (Lana) & 1967 (Lilly)",
        Death: "Alive"
      },
      ImagePath: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/9TGHDvWrqKBzwDxDodHYXEmOE6J.jpg",
      Featured: true
    },
    {
      Title: "Avatar",
      Description: "A paraplegic marine dispatched to the moon Pandora on a unique mission becomes torn between following his orders and protecting the world he feels is his home.",
      Genre: {
        Name: "Science Fiction",
        Description: "Films that explore speculative concepts such as advanced technology, time travel, parallel universes, and extraterrestrial life."
      },
      Director: {
        Name: "James Cameron",
        Bio: "James Francis Cameron is a Canadian filmmaker and environmentalist. He is best known for making science fiction and epic films, including Titanic, Avatar, and the Terminator series.",
        Birth: "1954",
        Death: "Alive"
      },
      ImagePath: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/kyeqWdyUXW608qlYkRqosgbbJyK.jpg",
      Featured: true
    }
  ]);
=======
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [user, setUser] = useState([null]);

  if(!user){
    return <LoginView />;
  }

  useEffect(() => {
    fetch('https://jeriflix.onrender.com/movies')
      .then((response) => response.json())
      .then((data) => {
        const MoviesFromApi = data.map((movie) => {
          return {
            ID: movie._id,
            Title: movie.Title,
            Description: movie.Description,
            ImagePath: movie.ImagePath,
            Director: movie.Director.Name,
            Genre: movie.Genre.Name
          };
        });
        setMovies(MoviesFromApi);
      });
  }, []);

>>>>>>> Stashed changes

  

  if (selectedMovie) {
<<<<<<< Updated upstream
=======
    let similarMovies = movies.filter((simMovie) => {
      return (simMovie.Genre === selectedMovie.Genre && simMovie!== selectedMovie)
    })

    console.log(similarMovies);
    
>>>>>>> Stashed changes
    return (
      <MovieView movieData={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
    );
  }

  if (movies.length === 0) {
    return <div>Movie list is empty!</div>;
  }

  

  return (
    <div class = "MovieCard-grid">
      {movies.map((movie) => (
        <MovieCard
          key={movie._id}
          movieData={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
      
    </div>
  );
};
