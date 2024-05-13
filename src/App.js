import './App.css';

import React from "react";
import { Grid, Typography, Paper } from "@mui/material";
import { BrowserRouter as Router, Route, Routes, useParams } from "react-router-dom";

import TopBar from "./components/TopBar";
import UserDetail from "./components/UserDetail";
import UserList from "./components/UserList";
import UserPhotos from "./components/UserPhotos";
import AuthContextProvider from './contexts/AuthContext';
import LoginRegister from './components/LoginRegister/LoginRegister';
import ProtectedRoute from './routing/ProtectedRoute';

const App = () => {
  return (
    <AuthContextProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginRegister authRoute={"login"} />} />
          <Route path="/register" element={<LoginRegister authRoute={"register"} />} />

          <Route path="/users/:userId" element={<ProtectedRoute><UserDetailWithParams /></ProtectedRoute>} />
          <Route path="/photo/photosOfUser/:userId" element={<ProtectedRoute><UserPhotos /></ProtectedRoute>} />
          <Route path="*" element={<ProtectedRoute></ProtectedRoute>} />

        </Routes>
      </Router>
    </AuthContextProvider>
  );
};

const UserDetailWithParams = () => {
  const { userId } = useParams();
  return <UserDetail userId={userId} />;
};

const UserPhotosWithParams = () => {
  const { userId } = useParams();
  return <UserPhotos userId={userId} />;
};


export default App;
