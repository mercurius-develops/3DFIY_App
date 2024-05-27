import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { User_SignUp } from "./pages/User_SignUp";
import { Model_Upload } from "./pages/Model_Upload";
import { Login } from "./pages/Login";
import { LandingPage } from "./pages/LandingPage";
import { ViewModel } from "./pages/ViewModel";
import { Dashboard } from "./pages/Dashboard";
import { Terms } from "./pages/Terms";

function App() {
  return (
    <div className="font-['Poppins']">
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage></LandingPage>}></Route>
          <Route path="/Dashboard" element={<Dashboard></Dashboard>}></Route>
          <Route path="/TermsCondition" element={<Terms></Terms>}></Route>
          
          <Route
            path="/User_SignUp"
            element={<User_SignUp></User_SignUp>}
          ></Route>
          <Route
            path="/Model_Upload"
            element={<Model_Upload></Model_Upload>}
          ></Route>
          <Route path="/Login" element={<Login></Login>}></Route>

          <Route path="/ViewModels" element={<ViewModel></ViewModel>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
