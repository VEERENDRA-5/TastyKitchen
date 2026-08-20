import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faFacebook,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";

import { useNavigate } from "react-router-dom";

import "./index.css";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <div className="footer-container">
      <div className="footer-logo-container">
        <img
          src="https://res.cloudinary.com/dnbiwzizv/image/upload/v1783057911/Frame_275_x0zwwr.png"
          className="footer-logo"
          height="50"
          width="50"
        />
        <h1>Tasty Kitchens</h1>
      </div>

      <p>
        The only thing we are serious about is food.
        <br />
        Contact us on
      </p>
      <ul style={{ listStyleType: "none", display: "flex", gap: "10px" }}>
        <li>
          <a
            href="https://www.instagram.com/tasty_kitchen__home_chef/"
            target="_blank"
          >
            <FontAwesomeIcon
              icon={faInstagram}
              bounce
              style={{ color: "rgb(43, 73, 126)", cursor: "pointer" }}
            />
          </a>
        </li>
        <li>
          <FontAwesomeIcon
            icon={faFacebook}
            bounce
            style={{ color: "rgb(43, 73, 126)", cursor: "pointer" }}
          />
        </li>
        <li>
          <FontAwesomeIcon
            icon={faTwitter}
            bounce
            style={{ color: "rgb(43, 73, 126)", cursor: "pointer" }}
          />
        </li>
      </ul>
    </div>
  );
};

export default Footer;
