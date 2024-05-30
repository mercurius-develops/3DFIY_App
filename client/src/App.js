import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { User_SignUp } from "./pages/User_SignUp";
import { Model_Upload } from "./pages/Model_Upload";
import { Login } from "./pages/Login";
import { LandingPage } from "./pages/LandingPage";
import { ViewModel } from "./pages/ViewModel";
import { Dashboard } from "./pages/Dashboard";
import { Terms } from "./pages/Terms";

import { DesignerProfile } from './pages/DesignerProfile';
import { ModelDetail } from './pages/ModelDetail';
import { ModelDetail1 } from './pages/1';
import { ModelDetail2 } from './pages/2';
import { Seller_SignUp } from './pages/Seller_SignUp';

import { UpdateModel } from './Management/UpdateModel';
function App() {
  return (
    <div className="font-['Poppins']">
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage></LandingPage>}></Route>
          <Route path="/Dashboard" element = { < Dashboard />}></Route >
          <Route path="/TermsCondition" element = { <Terms/>}></Route >
          <Route path="/User_SignUp" element={<User_SignUp />} />
          <Route path="/seller-signup" element={<Seller_SignUp />} />
          <Route path="/Model_Upload" element={<Model_Upload />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/ViewModels" element={<ViewModel />} />
          <Route path="/DesignerProfile" element={<DesignerProfile />} />
          <Route path="/model/0" element={<ModelDetail />} />
          <Route path="/model/1" element={<ModelDetail1 />} />
          <Route path="/model/3" element={<ModelDetail2 />} />


          <Route path="/updateModel/:modelId" element={<UpdateModel />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;