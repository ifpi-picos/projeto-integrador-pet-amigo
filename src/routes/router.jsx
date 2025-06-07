// Remova a importação do BrowserRouter daqui
import { Routes, Route } from "react-router-dom"; 

// Importe suas páginas
import LandingPage from "../Pages/landingPage/landing.jsx";
import Home from "../Pages/home/index.jsx";
import Feed from "../Pages/feed/feed.jsx";
import BadRequest from "../Pages/badRequest/error.jsx";

// Renomeei o componente para AppRoutes para clareza, mas você pode manter Router se preferir
const AppRoutes = () => {
  return (
    // Removido o <BrowserRouter> que estava aqui
    <Routes>
      <Route index element={<LandingPage />} />
      <Route path="/home" element={<Home />} />
      <Route path="/feed" element={<Feed />} />
      <Route path="*" element={<BadRequest />} />
    </Routes>
  );
};

export default AppRoutes; // Exporte o novo nome