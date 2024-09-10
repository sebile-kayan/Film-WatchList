import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <div className="container">
        <div className="inner-content">
          <div className="brand">
            <Link to={"/"}>İzlenecekler</Link>
            {/* Link React Router kütüphanesinden gelen bileşendir. Link, sayfa yeniden yüklenmeden yönlendirme yapmayı sağlar. */}
          </div>
          <ul className="nav-links">
            <li>
              <Link to={"/watched"}>İzlenenler</Link>
              {/* Burda link to içine hangi yolu verdiğimiz önemli değil. Çünkü burda kafamızdan bir yol veriyoruz.
                 app.js'te de route içinde path'i, yolu /watched olan link, Watched elementine componentine yönlensin diyoruz.
                         <Route path="/watched" element={<Watched/>}></Route>
                */}
            </li>
            <li>
              <Link to={"/add"} className="btn">
                <i className="fas fa-plus"></i>
              </Link>
              {/* <!-- i simge ve ikon ekleme içindir. ve çalışması için FontAwesome dosyaları import edilmeli lib dosyasına--> */}
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
