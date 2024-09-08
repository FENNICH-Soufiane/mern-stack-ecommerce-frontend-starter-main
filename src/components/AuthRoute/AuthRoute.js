import React from "react";
import Login from "../Users/Forms/Login";


const AuthRoute = ({ children }) => {
  //get user from localstorage
  const user = JSON.parse(localStorage.getItem("userInfo"));
  const isLoggedIn = user?.token ? true : false;
  if (!isLoggedIn) return <Login />;
//   if (!isLoggedIn) return <h1>access denied</h1>;
  return <>{children}</>;
};

export default AuthRoute;