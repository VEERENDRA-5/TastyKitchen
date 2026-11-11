import { Component } from "react";
import { Navigate, replace, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

import "./index.css";

class Login extends Component {
  state = {
    username: "",
    password: "",
    submiterr: false,
    errmsg: "",
    loading: false,
  };

  onChangeUsername = (event) => {
    this.setState({ username: event.target.value });
  };

  onChangePassword = (event) => {
    this.setState({ password: event.target.value });
  };

  submitForm = async (event) => {
    event.preventDefault();

    if (this.state.loading) return; // prevent double click

    this.setState({ loading: true });

    const { username, password } = this.state;
    const userDetails = { username, password };

    const url = `${import.meta.env.VITE_API_URL}/login`;
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userDetails),
    };

    try {
      const response = await fetch(url, options);

      const data = await response.json();

      if (response.ok) {
        Cookies.set("token", data.token, { expires: 1 });
        this.props.navigate("/", { replace: true });
      } else {
        this.setState({
          submiterr: true,
          errmsg: data.message || "Login failed",
          loading: false,
        });
      }
    } catch (error) {
      this.setState({
        submiterr: true,
        errmsg: "Server error",
        loading: false,
      });
    }
  };

  render() {
    const token = Cookies.get("token");
    const { username, password, submiterr, errmsg, loading } = this.state;
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
                required
                id="username"
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
                required
                id="password"
                type="password"
                placeholder="Password"
                className="login-input-field"
                autoComplete="password"
                value={password}
                onChange={this.onChangePassword}
              />
            </div>
            <p
              style={{
                color: "black",
                marginBottom: "10px",
                fontFamily: "Arial, sans-serif",
              }}
            >
              Don't have an account? <a href="./register">Register</a>
            </p>

            <button type="submit" className="login-button" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
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
