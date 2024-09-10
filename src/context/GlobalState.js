/*BU CONTEXT ADLI KLASÖRÜ OLUŞTRUMA NEDENİMİZ MESELA ADD.JS İÇİNDEKİ ÇIKTILARI DİĞER SAYFALARDA DA KULLANICAZ İZLEME LİSTESİNE EKLEYE BASINCA  O VERİLER DİĞER BİR SAYFAYA VERİ GETİRECEK. 
BUNUN İÇİN CONTEXT OLUŞTURDUL GLOBAL YANİ GENELDE ÇALIŞACAK. Oluşturduğumuzu da app.js te route ile sarıcaz ve tüm componentlere sayfalara app.js üzerinden gönderilsin. 
React'te bağlam (context) API'si, bileşenler arasında props kullanmadan veri paylaşmanın bir yoludur.

GlobalContext oluşturup useReducer kullanarak global bir durum yönetimi sağlamak istiyoruz. 
GlobalContext ile bir "watch list" ve "watched" listesi gibi global durumları yönetebilir ve bunları farklı bileşenlerde kullanabilirsiniz.
Ayrıca, global durumu güncellemek için bir reducer fonksiyonu kullanacağız.*/

import { createContext, useEffect, useReducer } from "react";
import AppReducer from "./AppReducer";
import { json } from "react-router-dom";
import { type } from "@testing-library/user-event/dist/type";

//! Create Context- global context oluşturma:
export const GlobalContext = createContext();

//  localStorage, tarayıcıda veri saklamak için kullanılan bir API'dir ve sayfa yenilense bile veriler kalıcı olarak saklanır. State değiştiğinde veriler kaybolmasın diye local storage kullanıyoruz oraya kaydediyoruz.
const initialState = {
  //başlangıç değeri state'i
  watchlist: localStorage.getItem("watchlist")
    ? JSON.parse(localStorage.getItem("watchlist"))
    : [], //Eğer sayfa yenilendiğinde vs local storagede veri varsa yani daha önce veri eklenmişse onları getirir. eklenmemişse boş döndürür. İzlenenler sayfasında verilerin kalıcı olmasını sağlar veriler sayfa yenilenince de durur.
  watched: localStorage.getItem("watched")
  ? JSON.parse(localStorage.getItem("watched"))
  : [], // wachlist ve watched adlı iki durum, state bulunuyor.
};
//! provider components
export const GlobalProvider = (props) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  useEffect(() => {
    localStorage.setItem("watchlist", JSON.stringify(state.watchlist));
    localStorage.setItem("watched", JSON.stringify(state.watched));
  }, [state]);

  const addMovieToWatchlist = (movie) => {
    dispatch({ type: "ADD_MOVIE_TO_WATCHLIST", payload: movie });
  };

  const removeMovieFromWatchlist = (id) => {
    dispatch({ type: "REMOVE_MOVIE_TO_WATCHLIST", payload: id }); // id'ye göre silme işlemi yapacağız.
  };

  const addMovieToWatched = (movie) => {
    dispatch({ type: "ADD_MOVIE_TO_WATCHED", payload: movie });
  };

  const moveToWatchlist=(movie)=>{
    dispatch({ type: "MOVE_TO_WATCHED", payload: movie });

  }
  const removeMovieFromWatched = (id) => {
    dispatch({ type: "REMOVE_MOVIE_FROM_WATCHED", payload: id });
  };

  /*Dispatch: Store'da bir action'ı tetiklemek için kullanılan yöntemdir.
dispatch(action) çağrısı, belirli bir action'ı reducer'a gönderir.*/

  return (
    <GlobalContext.Provider
      value={{
        watchlist: state.watchlist,
        watched: state.watched,
        addMovieToWatchlist,
        addMovieToWatched,
        removeMovieFromWatchlist,
        moveToWatchlist,
        removeMovieFromWatched,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};
