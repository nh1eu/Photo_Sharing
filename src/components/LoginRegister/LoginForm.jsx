import React, { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import AlertMessage from "../Layout/AlertMessage";

const LoginForm = () => {
  // Context
  const { loginUser } = useContext(AuthContext);

  // Local state
  const [loginForm, setLoginForm] = useState({
    login_name: "",
    password: "",
  });

  const [alert, setAlert] = useState(null);

  const { login_name, password } = loginForm;

  const onChangeLoginForm = (event) =>
    setLoginForm({ ...loginForm, [event.target.name]: event.target.value });

  const login = async (event) => {
    event.preventDefault();

    try {
      const loginData = await loginUser(loginForm);
      if (!loginData.success) {
        setAlert({ type: "danger", message: loginData.message });
        setTimeout(() => setAlert(null), 5000)
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form className="my-4" onSubmit={login}>
        <AlertMessage info={alert} />
        <div className="my-2">
          <input
            type="text"
            placeholder="Login name"
            name="login_name"
            required
            value={login_name}
            onChange={onChangeLoginForm}
          />
        </div>
        <div className="my-2">
          <input
            type="password"
            placeholder="Password"
            name="password"
            required
            value={password}
            onChange={onChangeLoginForm}
          />
        </div>
        <button variant="success" type="submit">
          Login
        </button>
      </form>
      <p>
        Don't have an account?
        <Link to="/register">
          <button variant="info" size="sm" className="m1-2">
            Register
          </button>
        </Link>
      </p>
    </>
  );
};

export default LoginForm;
