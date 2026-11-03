import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

import "./index.css";

const Header = (props) => {
  const navigate = useNavigate();
  const onClickLogout = () => {
    Cookies.remove("token");
    navigate("/login", { replace: true });
  };

  return (
    <nav className="header">
      <div className="header-logo-container">
        <img
          src="https://res.cloudinary.com/dnbiwzizv/image/upload/v1782995819/Frame_274_1_d784jk.png"
          className="header-logo"
          height="50"
          width="50"
        />
        <h1 className="header-heading">Tasty Kitchens</h1>
      </div>

      <ul className="header-ul">
        <Link to="/" className="header-a">
          <li className="header-li">Home</li>
        </Link>
        <Link to="/cart" className="header-a">
          <li className="header-li">Cart</li>
        </Link>
      </ul>
      <button className="logout-btn" onClick={onClickLogout}>
        Logout
      </button>
    </nav>
  );
};

export default Header;
