import { Component } from "react";
import { Navigate, replace, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

import "./index.css";

class Login extends Component {
  state = {
    username: "",
    password: "",
    submiterr: "",
    errmsg: "",
  };

  onChangeUsername = (event) => {
    this.setState({ username: event.target.value });
  };

  onChangePassword = (event) => {
    this.setState({ password: event.target.value });
  };

  //  axios.post("http://localhost:5000/login",userDetails)
  //   .then(res => {
  //     Cookies.set("token", res.data.token);
  //   });

  submitForm = async (event) => {
    event.preventDefault();
    const { username, password } = this.state;
    const userDetails = { username, password };

    const url = "http://localhost:5000/login";
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userDetails),
    };

    const response = await fetch(url, options);
    const data = await response.json();

    if (response.ok) {
      Cookies.set("token", data.token, { expires: 1 });
      this.props.navigate("/", { replace: true });
    } else {
      this.setState({ submitErr: true, errMsg: data.message });
    }
  };

  render() {
    const token = Cookies.get("token");
    const { username, password, submiterr, errmsg } = this.state;
    if (token !== undefined) {
      return <Navigate to="/" />;
    }
    return (
      <div className="login-bg-container">
        <div className="login-container">
          <form className="form-container" onSubmit={this.submitForm}>
            <img
              src="https://res.cloudinary.com/dnbiwzizv/image/upload/v1782995819/Frame_274_1_d784jk.png"
              className="login-logo"
              height="50"
              width="50"
            />
            <h1 className="login-heading">Tasty Kitchen</h1>
            <p className="login-head2">
              Welcome back! Please enter your details
            </p>
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
                onChange={this.onChangeUsername}
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
                onChange={this.onChangePassword}
              />
            </div>
            <p style={{ color: "black" }}>
              Don't have an account? <a href="./register">Register</a>
            </p>

            <button type="submit" className="login-button">
              Login
            </button>
            {submiterr && <p className="error-message">{errmsg}</p>}
          </form>
        </div>

        <img
          src="https://res.cloudinary.com/dnbiwzizv/image/upload/v1782466043/ceff20e8367d1981f2a409a617ac848670d29c7e_bpcrqd.jpg"
          className="login-image"
        />
      </div>
    );
  }
}

export default function LoginWithNavigate(props) {
  const navigate = useNavigate();
  return <Login {...props} navigate={navigate} />;
}
