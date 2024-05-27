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

function App() {
    return ( <
            div className = "font-['Poppins']" >
            <
            Router >
            <
            Routes >
            <
            Route path = "/"
            element = { < LandingPage > < /LandingPage>}></Route >
                <
                Route path = "/Dashboard"
                element = { < Dashboard > < /Dashboard>}></Route >
                    <
                    Route path = "/TermsCondition"
                    element = { < Terms > < /Terms>}></Route >

                        <
                        Route path = "/User_SignUp"
                        element = { < User_SignUp / > }
                        /> <
                        Route path = "/Model_Upload"
                        element = { < Model_Upload / > }
                        /> <
                        Route path = "/Login"
                        element = { < Login / > }
                        /> <
                        Route path = "/ViewModels"
                        element = { < ViewModel / > }
                        /> <
                        Route path = "/DesignerProfile"
                        element = { < DesignerProfile / > }
                        /> <
                        Route path = "/model/:modelId"
                        element = { < ModelDetail / > }
                        /> <
                        /Routes> <
                        /Router> <
                        /div>
                    );
                }

                export default App;