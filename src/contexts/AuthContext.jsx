import { createContext, useEffect, useReducer } from "react";
import axios from "axios";
import { authReducer } from "../reducers/authReducer";
import { API_URL, LOCAL_STORAGE_TOKEN_NAME } from "../constraint";
import setAuthToken from "../utils/setAuthToken";
import server from "../lib/fetchModelData";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [authState, dispatch] = useReducer(authReducer, {
    authLoading: true,
    isAuthenticated: false,
    user: null,
  });

  // Authenticate user
  const loadUser = async () => {
    console.log("loadUser", localStorage[LOCAL_STORAGE_TOKEN_NAME]);
    if (localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
      setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME]);
    }

    try {
      console.log("aaaaa");
      const response = await server.fetchModel("/admin");
      server.fetchModel("/admin").then((data) => console.log(data)).catch(error => console.log("err", error));
      console.log("response loadUser", response.data);
      dispatch({
        type: "SET_AUTH",
        payload: { isAuthenticated: true, user: response.data },
      });
    } catch (error) {
      console.log("error loadUser", error);
      localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
      setAuthToken(null);
      dispatch({
        type: "SET_AUTH",
        payload: { isAuthenticated: false, user: null },
      });
    }
  };
  useEffect(() => {
    loadUser();
  }, []);

  // Login
  const loginUser = async (userForm) => {
    try {
      const response = await axios.post(`${API_URL}/admin/login`, userForm);
      console.log("response login", response.data);
      localStorage.setItem(
        LOCAL_STORAGE_TOKEN_NAME,
        response.data
      );

      await loadUser();

      return response;
    } catch (error) {
      console.log("errorrr", error);
      return { success: false, message: error.response.data ?? error.message };
    }
  };

  // Register
  const registerUser = async (userForm) => {
    try {
      const response = await axios.post(`${API_URL}/admin/user`, userForm);
      localStorage.setItem(
        LOCAL_STORAGE_TOKEN_NAME,
        response.data
      );

      await loadUser();

      return response.data;
    } catch (error) {
      console.log("errorrr", error);
      return { success: false, message: error.response.data ?? error.message };
    }
  };

  // Logout
  const logoutUser = () => {
    localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
    dispatch({
      type: "SET_AUTH",
      payload: { isAuthenticated: false, user: null },
    });
  };

  // Context data
  const authContextData = { loginUser, registerUser, logoutUser, authState };

  // Return provider
  return (
    <AuthContext.Provider value={authContextData}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
