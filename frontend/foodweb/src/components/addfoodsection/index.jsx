import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";

import { faStar } from "@fortawesome/free-solid-svg-icons";
import Cookies from "js-cookie";

import { useDispatch } from "react-redux";

import Header from "../header/index.jsx";
import Footer from "../footer/index.jsx";

import { addItem } from "../../reducers/index.jsx";

import "./index.css";

const Addfood = () => {
  const [foodlist, setfoodlist] = useState({});
  const [loading, setloading] = useState("false");
  const { id } = useParams();

  useEffect(() => {
    getData();
  }, []);

  const dispatch = useDispatch();

  const getData = async () => {
    try {
      const token = Cookies.get("token");
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/restaurantsmenu/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (response.status === 200) {
        setfoodlist(response.data);
        setloading(false);
      }
    } catch (err) {
      console.log("ERR :", err);
    }
  };

  return (
    <>
      <Header />
      <div className="add-sec-bg">
        <div className="add-banner">
          <img src={`${foodlist.imageUrl}`} className="add-banner-img" />
          <div>
            <h1>{foodlist.name}</h1>
            <p>{foodlist.cuisine}</p>
            <p>{foodlist.location}</p>
            <div
              style={{
                display: "flex",
                gap: "10px",
                alignItems: "center",
              }}
              className="compliements"
            >
              <div>
                <div
                  className="rating-div"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "10px",
                    alignItems: "center",
                  }}
                >
                  <FontAwesomeIcon
                    icon={faStar}
                    beat
                    style={{ color: "rgb(255, 255, 255)" }}
                  />
                  <p>{foodlist.rating} rating</p>
                </div>
                <p style={{ marginLeft: "10px" }} className="rating-div">
                  {foodlist.reviewsCount} reviews
                </p>
              </div>
              <div
                className="line"
                style={{
                  width: "1px",
                  backgroundColor: "#ffffff",
                  margin: "0 20px",
                  height: "30px",
                }}
              ></div>
              <div className="rating-div">
                <p>{foodlist.costForTwo}/-</p>
                <p>Cost for two</p>
              </div>
            </div>
          </div>
        </div>
        {foodlist.foodItems && (
          <ul className="fooditems-list">
            {foodlist.foodItems.map((each) => (
              <li key={each.id}>
                <img src={each.imageUrl} className="fooditems-card-img" />
                <div>
                  <h2>{each.name}</h2>
                  <p>{each.foodType}</p>
                  <p>{each.cost}</p>
                  <p>
                    <FontAwesomeIcon
                      icon={faStar}
                      style={{ color: "rgb(223, 172, 44)" }}
                    />{" "}
                    {each.rating}
                  </p>
                  <button
                    onClick={() => {
                      dispatch(addItem({ ...each, count: 1 }));
                      alert(`${each.name} added to cart`);
                    }}
                  >
                    ADD
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Addfood;
