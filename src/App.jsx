import { BrowserRouter, Route, Routes } from "react-router-dom";

import { PATH } from "./Routes/path";
import AdminRegister from "./Module/Auth/Admin/Register/AdminRegister";
import AdminLogin from "./Module/Auth/Admin/Login/AdminLogin";
import AdminLayout from "./Layout/AdminLayout";
import AdminHome from "./Module/AdminHome/AdminHome";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={PATH.ADMIN} element={<AdminLayout />}>
          <Route index element={<AdminHome />} />
          <Route path={PATH.ADMIN_REGISTER} element={<AdminRegister />} />
          <Route path={PATH.ADMIN_LOGIN} element={<AdminLogin />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
