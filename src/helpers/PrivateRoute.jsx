import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = () => {
  let Authorization = localStorage.getItem("adminDataToken");
  return Authorization ? <Outlet /> : <Navigate to="/" />;
};
export default PrivateRoutes;
