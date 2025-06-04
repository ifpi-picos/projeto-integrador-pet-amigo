import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../Pages/home/index.jsx";
import LandingPage from "../Pages/landingPage/landing.jsx";
import BadRequest from "../Pages/badRequest/error.jsx";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<LandingPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="*" element={<BadRequest/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
