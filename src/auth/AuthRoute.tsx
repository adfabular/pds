import { Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import { Suspense, lazy } from "react";
import Loading from "../pages/Loading";
const Register = lazy(() => import("../pages/Register"));

function AuthRoute() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Login />} />
      <Route
        path="/register"
        element={
          <Suspense fallback={<Loading />}>
            <Register />
          </Suspense>
        }
      />
      <Route path="*" element={<Login />} />
    </Routes>
  );
}

export default AuthRoute;
