
import { Routes, Route } from "react-router-dom";
// import Main from "./Main/Main";
import { Login } from "./Login/Login";
import RegPage from "./Registration/RegPage";
import MainCopy from "./Main/Main copy";

function AppRoutes() {

  return (
    <div>
        <Routes>  
          <Route path="/" element={<MainCopy />} />
          <Route path="/reg" element={<RegPage />}/>
          <Route path="/log" element={<Login />}/>
        </Routes>
    </div> 
  );
}
export default AppRoutes;