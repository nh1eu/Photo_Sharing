import React, { useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

const LoginRegister = ({ authRoute }) => {
  const {
    authState: { authLoading, isAuthenticated },
  } = useContext(AuthContext);

  let body;

  // if (authLoading)
  //   body = (
  //     <div>Loading...</div>
  //   );
  if (isAuthenticated) return <Navigate to="/users" />;
  else
    body = (
      <>
        {authRoute === "login" && <LoginForm />}
        {authRoute === "register" && <RegisterForm />}
      </>
    );

  return (
    <div className="landing">
      <h1>Photo sharing</h1>
      {body}
    </div>
  );
}

export default LoginRegister