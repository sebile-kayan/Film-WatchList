import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";

const MovieControls = ({ movie, type }) => {
  const { removeMovieFromWatchlist, addMovieToWatched,moveToWatchlist,removeMovieFromWatched } =
    useContext(GlobalContext);
  return (
    <div className="inner-card-controls">
      {type === "watchlist" && ( // Amacımız watched ile watchlist ekranında bulunan silme ve göz butonlarının birbirine karışmaması bunun için tür belirledik.
        <>
          <button className="ctrl-btn" onClick={() => addMovieToWatched(movie)}>
            {" "}
            {/*göz olan buton:Watch izlenecek listesinden siler izlendi listesine ekler.*/}
            <i className="fa-fw far fa-eye"></i>
          </button>
          <button //Silme butonu
            className="ctrl-btn"
            onClick={() => removeMovieFromWatchlist(movie.id)} //butona tıklandığında film silinecek.
          >
            <i className="fa-fw fa fa-times"></i>
          </button>
        </>
      )}
      {type === "watched" && (
      <>
        <button className="ctrl-btn" onClick={() => moveToWatchlist(movie)}>
          <i className="fa-fw far fa-eye-slash"></i>
        </button>
        <button
          className="ctrl-btn"
          onClick={() => removeMovieFromWatched(movie.id)}
        >
          <i className="fa-fw fa fa-times"></i>
        </button>
      </>
      )} 
    </div>
  );
};

export default MovieControls;
