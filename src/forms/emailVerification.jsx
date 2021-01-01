import React, { Component } from "react";

import "react-phone-input-2/lib/style.css";
import { Redirect } from "react-router-dom";
import "./formStyle.css";

export default class emailVerification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      otpValue: "",
      otpEnterted: false,
      otpError: "",
      removeAlert: false,
      successAlert: false,
      goBack:false
    };
  }

  componentDidMount=()=>{
    const CompanyName = localStorage.getItem('CompanyName');
    const Email = localStorage.getItem('Email');
    const Experience = localStorage.getItem('Experience');
    const JobTitle = localStorage.getItem('Job Title');
    if(CompanyName && Email && Experience && JobTitle){ 
      this.setState({removeAlert:true});
    }
  }

  submitForm = (e) => {
    e.preventDefault();
    this.setLocalStorage();
    if (this.state.otpValue.length === 5) {
      this.setState({ successAlert: true });
    }else{
      this.setState({otpError:"Please Enter Valid OTP"})
      this.setState({ otpEnterted: false });
    }
  };

  setLocalStorage = () => {
    localStorage.setItem("OTP", this.state.otpValue);
  };

  handleChange = (event, data) => {
    const target = event.target;
    const name = target.name;
    var value = target.value;
    this.setState({ otpValue: value, removeAlert: true });
    this.otpValidation(name, value);
  };

  otpValidation = (name, value) => {
    if (this.state.otpValue !== "") {
      this.setState({ otpError: "" });
      this.setState({ otpEnterted: true });
    } else {
      this.setState({ otpError: "Enter valid OTP" });
      this.setState({ otpEnterted: false });
    }
  };

  render() {
    if (this.state.goBack) {
      return <Redirect to="/companyDetails" />;
    }
    let className = this.state.otpEnterted
      ? "sendOTPBbtn"
      : "sendOTPBbtnDisabled";
    return (
      <>
        {this.state.removeAlert ? (
          ""
        ) : (
          <div
            className="alert alert-success alert-dismissible fade show"
            role="alert"
          >
            <strong>Success!</strong> You have updated your personal details
            <button
              type="button"
              className="close"
              data-dismiss="alert"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        )}
        {this.state.successAlert ? (
          <div
          className="alert alert-success alert-dismissible fade show"
          role="alert"
        >
          <strong>Success!</strong> You have logged into our application
          <button
            type="button"
            className="close"
            data-dismiss="alert"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        ) : (
          ""
        )}
        <div className="row">
          <div className="container p-3 mt-5 mb-5">
            <div className="text-center w-100">
              <h3>Enter Your OTP</h3>
              <h5>
                For your security, we need to verify your identity. We sent a
                5-digit
                <br />
                Code to your mail Id. Please Enter it below
              </h5>
            </div>
          </div>
        </div>
        <div className="row d-flex justify-content-center">
          <div className="company-form-container">
            <form onSubmit={this.submitForm} className="formStyle">
              <div className=" col-md-12 col-12 text-center">
                <div className="form-group">
                  <label htmlFor="otpCode">Enter you code</label>
                </div>
              </div>
              <div className=" col-md-12 col-12 d-flex justify-content-center">
                <div className="form-group">
                  <input
                    type="number"
                    className="form-control"
                    id="otp1"
                    name="otp1"
                    maxLength="5"
                    onChange={this.handleChange}
                    aria-describedby="otpCode"
                  />
                  {this.state.otpEnterted ? (
                    ""
                  ) : (
                    <span
                      hidden={this.state.otpEnterted}
                      className="text-danger"
                    >
                      {this.state.otpError}
                    </span>
                  )}
                </div>
              </div>

              <div className="footerButtons">
                <div className="col-md-12 w-100">
                  <div className="d-flex">
                    <button className="backBtn" onClick={()=>{this.setState({goBack:true})}}>Back</button>
                    <button
                      type="submit"
                      className={className}
                      disabled={!this.state.otpEnterted}
                    >
                      Verify
                    </button>
                  </div>
                </div>
              </div>
            </form>
            {/* <form onSubmit={this.submitForm} className="formStyle">
              <div className=" col-md-12">
                <div className="form-group">
                 
              </div>
              <div className=" col-md-12">
                <div className="form-group">
                 
                </div>
              </div>
              <div className=" col-md-12">
                <div className="form-group">
                  
                </div>
              </div>
              <div className=" col-md-12">
                <div className="form-group">
                  
                </div>
              </div>
              
            </form> */}
          </div>
        </div>
      </>
    );
  }
}
