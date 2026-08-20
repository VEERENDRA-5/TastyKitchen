import { useState } from "react";
import { Navigate, replace, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";

import "./index.css";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/register", {
        username,
        password,
        email,
      });
      alert(res.data.message);
      navigate("/login");
    } catch (err) {
      alert("Error: " + (err.response?.data?.error || err.message));
    }
  };

  const onChangeUsername = (event) => {
    setUsername(event.target.value);
  };

  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const onChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  //   submitForm = async (event) => {
  //     event.preventDefault();
  //     const { username, password } = this.state;
  //     const userDetails = { username, password };
  //     const url = "https://apis.ccbp.in/login";
  //     const options = {
  //       method: "POST",
  //       body: JSON.stringify(userDetails),
  //     };
  //     const response = await fetch(url, options);
  //     const data = await response.json();
  //     if (response.ok === true) {
  //       const { history } = this.props;
  //       Cookies.set("token", data.jwt_token, { expires: 1 });
  //       this.props.navigate("/", { replace: true });
  //     } else {
  //       this.setState({ submiterr: true, errmsg: data.error_msg });
  //     }
  //   };

  return (
    <div className="login-bg-container">
      <div className="login-container">
        <form className="form-container" onSubmit={submitForm}>
          <img
            src="https://res.cloudinary.com/dnbiwzizv/image/upload/v1782995819/Frame_274_1_d784jk.png"
            className="login-logo"
            height="50"
            width="50"
          />
          <h1 className="login-heading">Tasty Kitchen</h1>
          <p className="login-head2">Welcome back! Please enter your details</p>
          <div className="login-input-container">
            <label htmlFor="username" className="login-label">
              USERNAME
            </label>
            <input
              type="text"
              placeholder="Username"
              className="login-input-field"
              autoComplete="username"
              value={username}
              onChange={onChangeUsername}
            />
          </div>
          <div className="login-input-container">
            <label htmlFor="password" className="login-label">
              PASSWORD
            </label>
            <input
              type="password"
              placeholder="Password"
              className="login-input-field"
              autoComplete="password"
              value={password}
              onChange={onChangePassword}
            />
          </div>
          <div className="login-input-container">
            <label htmlFor="email" className="login-label">
              Email
            </label>
            <input
              type="email"
              placeholder="Email"
              className="login-input-field"
              value={email}
              onChange={onChangeEmail}
            />
          </div>
          <p style={{ color: "black" }}>
            Already Registered <a href="./login">Login</a>
          </p>

          <button type="submit" className="login-button">
            Register
          </button>
        </form>
      </div>

      <img
        src="https://res.cloudinary.com/dnbiwzizv/image/upload/v1782466043/ceff20e8367d1981f2a409a617ac848670d29c7e_bpcrqd.jpg"
        className="login-image"
      />
    </div>
  );
};

export default Register;
