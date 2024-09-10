export default (state, action) => {
  switch (action.type) {
    case "ADD_MOVIE_TO_WATCHLIST":
      return {
        ...state, //tüm statelerin bilgisini alıyoruz.
        watchlist: [...state.watchlist, action.payload],
      };
    /*...state.watchlist: Mevcut watchlist dizisini kopyalar.
        action.payload: Yeni eklenen film (action.payload) dizinin sonuna eklenir. */

    case "REMOVE_MOVIE_TO_WATCHLIST":
      return {
        ...state,
        watchlist: state.watchlist.filter(
          (movie) => movie.id !== action.payload
        ),
      };
    /*state.watchlist.filter((movie) => movie.id !== action.payload): watchlist içindeki filmleri filtreler ve movie.id'si action.payload'a eşit olmayan filmleri yeni bir dizi olarak döner.
      (Eğer movie.id, action.payload'a eşit değilse, bu film yeni watchlist dizisine dahil edilir.
      Eğer movie.id, action.payload'a eşitse, bu film yeni watchlist dizisine dahil edilmez (yani listeden çıkarılır).)
      Yani, action.payload'da belirtilen id'ye sahip filmi listeden çıkarır. */
    case "ADD_MOVIE_TO_WATCHED":    
      return {
        ...state,
        watchlist: state.watchlist.filter(
          (movie) => movie.id !== action.payload.id
        ),
        watched: [...state.watched, action.payload],
      }; // göz butonuna tıklanınca watchlistten sildik ve watched izlendi stateine ekledik


      case "MOVE_TO_WATCHED":    
      return {
        ...state,
        watched: state.watched.filter(
          (movie) => movie.id !== action.payload.id
        ),
        watchlist: [...state.watchlist, action.payload],
      };  //İzlenenlerden silip izleneceklere ekler.

      case "REMOVE_MOVIE_FROM_WATCHED":
      return {
        ...state,
        watched: state.watched.filter((movie) => movie.id !== action.payload),
      };

    default: // Hiçbir case değilse bu çalışmalı.
      return state;
  }
};

/*Redux, JavaScript uygulamaları için bir durum yönetim kütüphanesidir. Uygulamaların durumunu öngörülebilir bir şekilde yönetmek ve güncellemek için kullanılır.
 Redux, özellikle büyük ve karmaşık uygulamalarda durum yönetimini basitleştirmek için tasarlanmıştır.
Redux'ın Temel Kavramları
+Store: Uygulamanın tüm durumunu (state) saklayan tekil bir JavaScript nesnesidir.
Uygulamada sadece bir tane store bulunur.
+State: Uygulamanın mevcut durumunu temsil eder. Bu durum, store'da saklanır ve sadece belirli işlemlerle (actions) güncellenir.
+Actions: Durumu güncellemek için gönderilen nesnelerdir. Bir action, genellikle type ve payload olmak üzere iki anahtardan oluşur.
[type: Eylemin türünü belirten bir string.
payload: Eylemle birlikte taşınan veri.
]
+Reducers: Actions tarafından tetiklenen ve durumu (state) güncelleyen saf fonksiyonlardır. Reducer, mevcut durumu ve action'ı alır, ve yeni durumu döner.
+Dispatch: Store'da bir action'ı tetiklemek için kullanılan yöntemdir.
dispatch(action) çağrısı, belirli bir action'ı reducer'a gönderir.*/
