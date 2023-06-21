import { Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import Home from "../pages/Home";
import { Suspense, lazy } from "react";
import Loading from "../pages/Loading";

const Payslips = lazy(() => import("../pages/Payslips"));
const NotFound = lazy(() => import("../pages/NotFound"));
const ChangePassword = lazy(() => import("../pages/ChangePassword"));
const MyPaySlips = lazy(() => import("../pages/Payslips"));
const PersonalInformation = lazy(() => import("../pages/PersonalInformation"));

function AuthRoute() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Home />} />
      <Route
        path="/payslips"
        element={
          <Suspense fallback={<Loading />}>
            <Payslips />
          </Suspense>
        }
      />
      <Route
        path="/changepassword"
        element={
          <Suspense fallback={<Loading />}>
            <ChangePassword />
          </Suspense>
        }
      />
      <Route
        path="/mypayslips"
        element={
          <Suspense fallback={<Loading />}>
            <MyPaySlips />
          </Suspense>
        }
      />
      <Route
        path="/personalinformation"
        element={
          <Suspense fallback={<Loading />}>
            <PersonalInformation />
          </Suspense>
        }
      />
      <Route
        path="*"
        element={
          <Suspense fallback={<Loading />}>
            <NotFound />
          </Suspense>
        }
      />
    </Routes>
  );
}

export default AuthRoute;
