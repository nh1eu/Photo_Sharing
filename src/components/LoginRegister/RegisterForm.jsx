import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import AlertMessage from "../Layout/AlertMessage";

const RegisterForm = () => {
  // Context
  const { registerUser } = useContext(AuthContext);

  // Local state
  const [registerForm, setRegisterForm] = useState({
    login_name: "",
    password: "",
    confirmPassword: "",
    first_name: "",
    last_name: "",
    location: "",
    description: "",
    occupation: "",
  });

  const [alert, setAlert] = useState(null);

  const { login_name, password, confirmPassword, first_name, last_name, location, description, occupation } = registerForm;

  const onChangeRegisterForm = (event) =>
    setRegisterForm({
      ...registerForm,
      [event.target.name]: event.target.value,
    });

  const register = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setAlert({ type: "danger", message: "Passwords do not match" });
      setTimeout(() => setAlert(null), 5000);
      return;
    }

    try {
      const registerData = await registerUser(registerForm);
      // console.log(registerData);
      if (!registerData.success) {
        setAlert({ type: "danger", message: registerData.message });
        setTimeout(() => setAlert(null), 5000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form className="my-4" onSubmit={register}>
        <AlertMessage info={alert} />
        <input
          type="text"
          placeholder="Login Name"
          name="login_name"
          required
          value={login_name}
          onChange={onChangeRegisterForm}
        />
        <div style={{ display: "flex" }}>
          <input
            type="password"
            placeholder="Password"
            name="password"
            required
            value={password}
            onChange={onChangeRegisterForm}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            required
            value={confirmPassword}
            onChange={onChangeRegisterForm}
          />
        </div>
        <div style={{ display: "flex" }}>
          <input
            type="text"
            placeholder="First name"
            name="first_name"
            required
            value={first_name}
            onChange={onChangeRegisterForm}
          />
          <input
            type="text"
            placeholder="Last Name"
            name="last_name"
            value={last_name}
            onChange={onChangeRegisterForm}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Location"
            name="location"
            value={location}
            onChange={onChangeRegisterForm}
          />
        </div>
        <div>
          <textarea
            type="text"
            placeholder="Description"
            name="description"
            value={description}
            onChange={onChangeRegisterForm}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Occupation"
            name="occupation"
            value={occupation}
            onChange={onChangeRegisterForm}
          />
        </div>

        <button variant="success" type="submit">
          Register
        </button>
      </form>
      <p>
        Already have an account?
        <Link to="/login">
          <button variant="info" size="sm" className="m1-2">
            Login
          </button>
        </Link>
      </p>
    </>
  );
};

export default RegisterForm;
