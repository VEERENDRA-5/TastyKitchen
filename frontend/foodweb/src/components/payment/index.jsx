import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Cookies from "js-cookie";

import Header from "../header/index.jsx";
import Footer from "../footer/index.jsx";
import { clearCart } from "../../reducers/index.jsx";
import "./index.css";

const Payment = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartList = useSelector((state) => state.orders.cartList);

  useEffect(() => {
    const placeOrder = async () => {
      if (cartList.length === 0) return;

      try {
        const token = Cookies.get("token");
        const items = cartList.map((item) => ({
          foodId: item.id,
          name: item.name,
          price: item.cost,
          quantity: item.count,
        }));
        const totalAmount = cartList.reduce(
          (acc, item) => acc + item.count * item.cost,
          0,
        );

        await axios.post(
          `${import.meta.env.VITE_API_URL}/orders`,
          { items, totalAmount },
          { headers: { Authorization: `Bearer ${token}` } },
        );
      } catch (err) {
        console.error("Failed to save order:", err);
      } finally {
        dispatch(clearCart());
      }
    };

    placeOrder();
  }, []);

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
