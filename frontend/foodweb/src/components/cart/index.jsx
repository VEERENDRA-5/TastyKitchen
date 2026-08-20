import Header from "../header/index.jsx";
import Footer from "../footer/index.jsx";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { addItem, deleteItem } from "../../reducers/index.jsx";
import "./index.css";

const Cart = () => {
  const list = useSelector((state) => state.orders.cartList);
  console.log(list);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  return (
    <>
      <Header />
      {list.length !== 0 ? (
        <div className="cart-container">
          <ul className="Order-sec">
            <div className="Order-sec-title">
              <h1>Items</h1>

              <h1>Quantity</h1>

              <h1>Prices</h1>
            </div>
            {list.map((each, index) => (
              <li key={`${each.id}-${index}`}>
                <div className="add-sec">
                  <img src={each.imageUrl} className="Order-sec-img" />
                  <>
                    <h3>{each.name}</h3>
                  </>
                </div>
                <div className="add-sec-quantity">
                  <button
                    className="add-sec-button"
                    onClick={() => dispatch(addItem({ ...each, count: 1 }))}
                  >
                    +
                  </button>
                  <p>{each.count}</p>
                  <button
                    className="add-sec-button"
                    onClick={() => dispatch(deleteItem({ ...each, count: 1 }))}
                  >
                    -
                  </button>
                </div>
                <p>{each.count * each.cost}/-</p>
              </li>
            ))}
            <hr />
            <div className="total-section">
              <h2 className="total-row">
                Total Amount : ₹
                {list.reduce((acc, item) => acc + item.count * item.cost, 0)}
              </h2>
              <button
                className="total-row-button"
                onClick={() => {
                  navigate("/payment", { replace: true });
                }}
              >
                Order
              </button>
            </div>
          </ul>
        </div>
      ) : (
        <div className="cart-container">
          <img
            src="https://res.cloudinary.com/dnbiwzizv/image/upload/v1783616325/cooking_1_kmeq6x.png"
            className="no-ord-img"
          />
          <h1 className="no-ord-h1">No Orders Yet</h1>
          <p className="no-ord-p">
            Your cart is empty. Add something from the <a href="/">menu.</a>
          </p>
        </div>
      )}

      <Footer />
    </>
  );
};

export default Cart;
