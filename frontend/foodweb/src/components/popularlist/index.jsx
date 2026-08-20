import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import Cookies from "js-cookie";
import "./index.css";

const PopularList = () => {
  const [popular, setPopular] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sortBy, setSortBy] = useState("lowest");

  useEffect(() => {
    // getPopularList();
    getdata();
  }, [sortBy]);

  const getdata = async () => {
    setIsLoading(true);

    try {
      const token = Cookies.get("token");
      const response = await axios.get(
        `http://localhost:5000/restaurantsList?sortBy=${sortBy}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (response.status === 200) {
        setPopular(response.data);
        setIsLoading(false);
      }
    } catch (err) {
      console.log("ERR :", err);
    }
  };

  // const getPopularList = async () => {
  // setIsLoading(true);
  // const token = Cookies.get("token");
  // const url = `https://apis.ccbp.in/restaurants-list?sort_by_rating=${sortBy}`;
  // const options = {
  //   method: "GET",
  //   headers: {
  //     Authorization: `Bearer ${token}`,
  //   },
  // };
  // const response = await fetch(url, options);
  // const data = await response.json();
  // const updatedData = data.restaurants.map((restaurant) => ({
  //   costForTwo: restaurant.cost_for_two,
  //   cuisine: restaurant.cuisine,
  //   groupByTime: restaurant.group_by_time,
  //   hasOnlineDelivery: restaurant.has_online_delivery,
  //   hasTableBooking: restaurant.has_table_booking,
  //   id: restaurant.id,
  //   imageUrl: restaurant.image_url,
  //   isDeliveringNow: restaurant.is_delivering_now,
  //   location: restaurant.location,
  //   menuType: restaurant.menu_type,
  //   name: restaurant.name,
  //   opensAt: restaurant.opens_at,
  //   userRating: {
  //     rating: restaurant.user_rating.rating,
  //     ratingColor: restaurant.user_rating.rating_color,
  //     ratingText: restaurant.user_rating.rating_text,
  //     totalReviews: restaurant.user_rating.total_reviews,
  //   },
  // }));
  // setPopular(updatedData);
  // setIsLoading(false);
  // };
  return (
    <div className="popular-list-container">
      <div className="popular-container">
        <h1>Popular Restaurants</h1>
        <div className="popular-select">
          <p>
            Select Your favourite restaurant special dish and make your day
            happy...
          </p>
          <div className="popular-dropdown">
            <label htmlFor="popular">Sort by Ratings : </label>
            <select
              name="popular"
              id="popular"
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="lowest">lowest</option>
              <option value="highest">highest</option>
            </select>
          </div>
        </div>
      </div>
      <div>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <div>
            <ul className="popular-list">
              {popular.map((restaurant) => (
                <li key={restaurant.id}>
                  <Link
                    to={`/addfood/${restaurant.id}`}
                    className="restaurant-item"
                  >
                    <img src={restaurant.imageUrl} alt={restaurant.name} />
                    <div>
                      <h2>{restaurant.name}</h2>
                      <p>{restaurant.cuisine}</p>
                      <p>Cost for two: {restaurant.costForTwo}</p>
                      <p>Rating: {restaurant.userRating.rating}</p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default PopularList;
