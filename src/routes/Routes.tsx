import { Routes, Route } from "react-router-dom";
import Home from "./Home/Home";
import { Login } from "./Login/Login";
import Registration from "./Registration/Registration";

function AppRoutes() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/reg" element={<Registration />}/>
      <Route path="/log" element={<Login />}/>
    </Routes>
  );
}
export default AppRoutes;