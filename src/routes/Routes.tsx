
import { Routes, Route } from "react-router-dom";
import Main from "./Main/Main";
import { Login } from "./Login/Login";
import RegPage from "./Registration/RegPage";

function AppRoutes() {

  return (
    <div className="Content">
        <Routes>  
          <Route path="/" element={<Main />} />
          <Route path="/reg" element={<RegPage />}/>
          <Route path="/log" element={<Login />}/>
        </Routes>
    </div> 
  );
}
export default AppRoutes;