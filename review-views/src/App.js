import { BrowserRouter, Route, Routes } from "react-router-dom";

import './App.css';
import './App2.css';
import Nav from './components/Nav'
import Signup from "./components/signup";
import Login from "./components/Login";
import AddCompany from "./components/AddCompany";
import PrivateComponent from "./components/PrivateComponent";
import CompanyList from "./components/Company_list";
import UpdateComapany from "./components/Update";
import ComapnyDetail from "./components/Company_detail";
import AddReview from "./components/AddReview";
import { unregister } from "./components/interceptor";
import Reset from  "./components/Reset"
import Newpassword from "./components/Newpassword"

function App() {
  return (
    <BrowserRouter>
      <div>
        {/* <Nav /> */}

        <Routes>
          {/* <Route element={<PrivateComponent/>}>    */}
            <Route path="/" element={<Login />} />
            <Route path="/addcompany" element={<AddCompany />} />
            <Route path="/companylist" element={<CompanyList />}  />
            <Route path="/companydetail/:id" element={<ComapnyDetail />}  />
            <Route path="/signup" element={<Signup />} />
            <Route path="/addreview/:id" element={<AddReview />} />
            <Route path="/reset" element={<Reset />} />
            <Route path="/reset/:token" element={<Newpassword />} />
          {/* </Route> */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
