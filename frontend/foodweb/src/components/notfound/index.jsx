import { useNavigate } from "react-router-dom";

import "./index.css";

const Notfound = () => {
  const navigate = useNavigate();
  return (
    <div className="notFound">
      <img src="https://res.cloudinary.com/dnbiwzizv/image/upload/v1783615570/erroring_1_krllfb.png" />

      <h1>Not Found</h1>
      <p>
        We are sorry, the page you requested could not be found.Please go back
        to the homepage
      </p>
      <button onClick={() => navigate("/")}>Return home</button>
    </div>
  );
};

export default Notfound;
