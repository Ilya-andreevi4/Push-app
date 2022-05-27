
import { Routes, Route } from "react-router-dom";
import { Login } from "./Login/Login";
import RegPage from "./Registration/RegPage";
import Main from "./Main/Main";

function AppRoutes() {
  return (
    <div>
        <Routes>  
          <Route path="/" element={<Main />} />
          <Route path="/reg" element={<RegPage />}/>
          <Route path="/log" element={<Login />}/>
        </Routes>
    </div> 
  );
}
export default AppRoutes;