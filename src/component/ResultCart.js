
// Add sayfasında film aratınca çıkan sonuçların ekranı

import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";

const ResultCart = ({ movie }) => {
  const {watchlist, watched,addMovieToWatchlist,addMovieToWatched}=useContext(GlobalContext);

  const storedMovieWatched = watched.find((o) => o.id === movie.id);
  const storedmovie= watchlist.find((o)=> o.id === movie.id) ?   
   true
  : !!storedMovieWatched;

  return (
    <div className="result-card">
      <div className="poster-wrapper">
        {movie.poster_path ? (
          <img
            src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
            alt={`${movie.poster_path}`}
          />
        ) : (
          <div className="filler-poster"></div>   //üçlü if
        )}
      </div>
      <div className="info">
        <div className="header">
          <h3 className="title">{ movie.title}</h3>
          <h4 className="release-date">{movie.release_date ? movie.release_date.substring(0, 4) /*Tarihin ilk 4 hanesini almaya yarar.*/ : "-"}</h4>  
          <h4 className="release-date">IMDB: <b>{movie.vote_average ? movie.vote_average : "-" }</b></h4>  {/* IMDB  varsa değerini yoksa "-"  yazdırır.*/}
          <h4 className="overview"> KONU: <b>"{movie.overview ? movie.overview : "-"}"</b></h4>
        </div>
        <div className="controls">
           <button className="btn" disabled={storedmovie} onClick={()=>addMovieToWatchlist(movie)}   >İzlenecekler Listesine Ekle</button>
           <button className="btn" disabled={storedMovieWatched} onClick={() => addMovieToWatched(movie)}>İzlenenler Listesine Ekle</button>
        </div>  {/* disabled kullanma nedeni bir butona tıklanınca mesela izleme listesine eklenince bir daha tıklanamasın kapansın tıklma özelliği */}
      </div>
    </div>
  );
};

export default ResultCart;
