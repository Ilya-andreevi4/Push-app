
import { Routes, Route } from "react-router-dom";
import Home from "./Home/Home";
import { Login } from "./Login/Login";
import RegPage from "./Registration/RegPage";

function AppRoutes() {

  return (
    <Routes>  
          <Route path="/" element={<Home />} />
          <Route path="/reg" element={<RegPage />}/>
          <Route path="/log" element={<Login />}/>
    </Routes>
  );
}
export default AppRoutes;