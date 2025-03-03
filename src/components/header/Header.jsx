import "./style.scss";

import ContentWrapper from "../contentWrapper/ContentWrapper";
import logo from "../../assets/imdb-logo.svg";

const Header = () => {
  return (
    <header className={`header top`}>
      <ContentWrapper>
        <div className="logo">
          <img src={logo} alt="" />
        </div>
        <ul className="menuItems">
          <li className="menuItem">Movies</li>
          <li className="menuItem">TV Shows</li>
        </ul>
      </ContentWrapper>
    </header>
  );
};

export default Header;
