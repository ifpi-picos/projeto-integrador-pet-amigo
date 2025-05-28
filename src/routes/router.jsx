import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../Pages/home/index.jsx";
import LandingPage from "../Pages/landingPage/landing.jsx";
import Login from "../Pages/login/login.jsx";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<LandingPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/adocao" element={<div>olá geilson</div>} />
        <Route path="/teste" element={<div>404 Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
