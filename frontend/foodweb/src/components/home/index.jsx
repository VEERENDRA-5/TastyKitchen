import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

import Header from "../header/index.jsx";
import Footer from "../footer/index.jsx";
import Banner from "../banner/index.jsx";
import PopularList from "../popularlist/index.jsx";
import "./index.css";

function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      navigate("/login", { replace: true });
    }
  }, [navigate]);  

  
 
  return (<>
    <Header  />
    <div className="home-container"> 
      <Banner />
       <PopularList/>
     
    </div>
   
    <Footer/>
    </>
  );
}


export default Home;