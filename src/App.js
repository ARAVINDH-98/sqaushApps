import React, { Component } from "react";
import PersonalDetailsForm from "./forms/personalDetailsForm";
import CompanyDetailsForm from "./forms/companyDetials";
import EmailVerificationForm from "./forms/emailVerification";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import NumberIcon1 from "./assets/one.png";
import NumberIcon2 from "./assets/two.png";
import NumberIcon3 from "./assets/three.png";
import "./App.css";

class App extends Component {
  
  render() {
    return (
      <div className="App">
        <Router>
          <div className="d-flex justify-content-around navLinksBg">
            <div className="row">
              <div className="navLinks">
                <img className="numberIcon" src={NumberIcon1} alt="one" />
                <Link className="linkName" to="/personalDetails">
                  Personal Details
                </Link>
              </div>
              <div className="navLinks">
                <span><img className="numberIcon" src={NumberIcon2} alt="two" /></span>
                <Link className="linkName" to="/companyDetails">
                  Company Details
                </Link>
              </div>
              <div className="navLinks">
                <img className="numberIcon" src={NumberIcon3} alt="three" />
                <Link className="linkName" to="/emailVerification">
                  Email Verification
                </Link>
              </div>
            </div>
          </div>
            <Route exact path="/" component={PersonalDetailsForm}></Route>
            <Route
              path="/personalDetails"
              component={PersonalDetailsForm}
            ></Route>
            <Route
              path="/companyDetails"
              component={CompanyDetailsForm}
            ></Route>
            <Route
              path="/emailVerification"
              component={EmailVerificationForm}
            ></Route>
        </Router>
      </div>
    );
  }
}

export default App;
