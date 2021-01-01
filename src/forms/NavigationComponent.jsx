import React, { Component } from "react";
import { BrowserRouter as  Link } from "react-router-dom";
import NumberIcon1 from "../assets/one.png";
import NumberIcon2 from "../assets/two.png";
import NumberIcon3 from "../assets/three.png";
import "./formStyle.css";

export default class NavigationComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
        formValid:false,
        data:""
    };
  }

 
  render() {
    return (
      <>
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
      </>
    );
  }
}
