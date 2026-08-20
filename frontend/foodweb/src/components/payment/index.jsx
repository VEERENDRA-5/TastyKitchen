import { useNavigate } from "react-router-dom";

import Header from "../header/index.jsx";
import Footer from "../footer/index.jsx";
import "./index.css";

const Payment = () => {
  const navigate = useNavigate();
  return (
    <>
      <Header />
      <div className="payment-bg">
        <img src="https://res.cloudinary.com/dnbiwzizv/image/upload/v1783616603/check-circle.1_1_utcsrz.png" />
        <h1>Order Successful</h1>
        <button onClick={() => navigate("/")}>Return home</button>
      </div>
      <Footer />
    </>
  );
};

export default Payment;
