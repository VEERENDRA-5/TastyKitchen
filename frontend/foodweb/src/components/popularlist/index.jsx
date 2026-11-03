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
        `${import.meta.env.VITE_API_URL}/restaurantsList?sortBy=${sortBy}`,
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
