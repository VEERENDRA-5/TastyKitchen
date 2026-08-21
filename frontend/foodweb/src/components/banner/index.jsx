import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Slider from "react-slick";
import { Circles } from "react-loader-spinner";
import axios from "axios";
import "./index.css";

const Banner = () => {
  const [offersImg, setOffersImg] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // getOffersImg();
    getData();
  }, []);

  const getData = async () => {
    setIsLoading(true);

    try {
      const token = Cookies.get("token");
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/banners`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log(token);
      if (response.status === 200) {
        setOffersImg(response.data);
        setIsLoading(false);
      }
    } catch (err) {
      console.log("ERR :", err);
    }
  };

  // const getOffersImg = async () => {
  //   setIsLoading(true);
  //   const token = Cookies.get("token");
  //   const url = "https://apis.ccbp.in/restaurants-list/offers";
  //   const options = {
  //     method: "GET",
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   };
  //   const response = await fetch(url, options);
  //   if (response.ok) {
  //     const fetchedData = await response.json();
  //     const updatedData = fetchedData.offers.map((offer) => ({
  //       id: offer.id,
  //       imageUrl: offer.image_url,
  //     }));
  //     setOffersImg(updatedData);
  //   }
  //   setIsLoading(false);
  // };
  const settings = {
    dots: true, // show navigation dots
    infinite: true, // loop slides infinitely
    speed: 2000, // transition speed in ms
    slidesToShow: 1, // number of slides visible at once
    slidesToScroll: 1, // number of slides to scroll per action
    autoplay: true, // enable auto play
    autoplaySpeed: 4000, // delay between auto scrolls
  };

  return (
    <div className="banner-container">
      {isLoading ? (
        <div className="loading-con">
          <Circles height={50} width={50} color="orange" />
        </div>
      ) : (
        <Slider {...settings}>
          {offersImg.map((offer) => (
            <div key={offer.id}>
              <img
                src={offer.imageUrl}
                alt={offer.id}
                className="banner-image"
              />
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
};

export default Banner;
