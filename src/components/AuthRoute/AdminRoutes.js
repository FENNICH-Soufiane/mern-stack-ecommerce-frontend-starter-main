import React from "react";



const AdminRoutes = ({ children }) => {
  //get user from localstorage
  const user = JSON.parse(localStorage.getItem("userInfo"));
  const isAdmin = user?.userFound?.isAdmin ? true : false;
  if (!isAdmin) return <h1>Accss Denied, Admin only</h1>;
//   if (!isLoggedIn) return <h1>access denied</h1>;
  return <>{children}</>;
};

export default AdminRoutes;