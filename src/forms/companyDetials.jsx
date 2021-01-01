import React, { Component } from "react";
import "react-phone-input-2/lib/style.css";
import { Redirect } from "react-router-dom";
import "./formStyle.css";

export default class companyDetailsForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      companyDetailsForm: {
        companyName: "",
        emailId: "",
        jobTitle: "",
        yearsOfExp: "",
        terms: false,
      },
      companyDetailsError: {
        companyName: "",
        emailId: "",
        jobTitle: "",
        yearsOfExp: "",
        terms: "",
      },
      navigateToNext: false,
      removeAlert: true,
      goBack:false
    };
  }

  componentDidMount=()=>{
    const userName = localStorage.getItem('userName');
    const country = localStorage.getItem('country');
    const gender = localStorage.getItem('gender');
    const state = localStorage.getItem('state');
    const phoneNo = localStorage.getItem('phone no');
    if(userName && country && gender && state && phoneNo){
      this.setState({removeAlert:false});
    }
  }

  handleChange = (event, data) => {
    const target = event.target;
    const name = target.name;
    var value = "";
    if (target.checked) {
      value = target.checked;
    } else {
      value = target.value;
    }
    const { companyDetailsForm } = this.state;
    this.setState({
      companyDetailsForm: { ...companyDetailsForm, [name]: value },
      removeAlert: true,
    });
  };

  submitForm = (e) => {
    e.preventDefault();
    this.setLocalStorage();
  };

  handleChangeTerms = (e) => {
    const { companyDetailsForm } = this.state;
    if (e.target.checked) {
      this.setState({
        companyDetailsForm: { ...companyDetailsForm, terms: true },
        removeAlert: true,
      });
    }
  };

  setLocalStorage = () => {
    localStorage.setItem(
      "CompanyName",
      this.state.companyDetailsForm.companyName
    );
    localStorage.setItem("Email", this.state.companyDetailsForm.emailId);
    localStorage.setItem(
      "Experience",
      this.state.companyDetailsForm.yearsOfExp
    );
    localStorage.setItem("Job Title", this.state.companyDetailsForm.jobTitle);
  };

  fieldValidation = () => {
    let fieldValidationErrors = this.state.companyDetailsError;
    let companyDetailsForm = this.state.companyDetailsForm;

    if (this.state.companyDetailsForm.companyName === "") {
      fieldValidationErrors.companyName = "Please enter your company name";
    } else {
      fieldValidationErrors.companyName = "";
    }
    if (this.state.companyDetailsForm.emailId === "") {
      fieldValidationErrors.emailId = "Please senter email id";
    } else {
      fieldValidationErrors.emailId = "";
    }
    if (this.state.companyDetailsForm.jobTitle === "") {
      fieldValidationErrors.jobTitle = "Please enter your job title";
    } else {
      fieldValidationErrors.jobTitle = "";
    }
    if (this.state.companyDetailsForm.yearsOfExp === "") {
      fieldValidationErrors.yearsOfExp =
        "Please enter your years of experience";
    } else {
      fieldValidationErrors.yearsOfExp = "";
    }
    if (this.state.companyDetailsForm.terms === false) {
      fieldValidationErrors.terms = "Please select the above check box";
    } else {
      fieldValidationErrors.terms = "";
    }
    this.setState({
      companyDetailsError: fieldValidationErrors,
      companyDetailsForm: companyDetailsForm,
    });
    this.checkNaviagteNext();
  };

  checkNaviagteNext = () => {
    if (
      this.state.companyDetailsForm.companyName !== "" &&
      this.state.companyDetailsForm.emailId !== "" &&
      this.state.companyDetailsForm.jobTitle !== "" &&
      this.state.companyDetailsForm.yearsOfExp !== "" &&
      this.state.companyDetailsForm.terms === true
    ) {
      this.setState({ navigateToNext: true });
    }
  };

  render() {
    if (this.state.navigateToNext) {
      return <Redirect to="/emailVerification" />;
    }else  if (this.state.goBack) {
      return <Redirect to="/personalDetails" />;
    }
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
       
        <div className="row">
          <div className="container p-3 mt-5 mb-5">
            <div className="text-center w-100">
              <h3>Add your company details here!</h3>
              <h5>
                Welcome to Squash Apps. Please enter below mentioned details to
                continue
              </h5>
            </div>
          </div>
        </div>
        
        <div className="row d-flex justify-content-center">
          <div className="company-form-container">
            <form onSubmit={this.submitForm} className="formStyle">
              <div className=" col-md-12">
                <div className="form-group">
                  <label htmlFor="companyName">Company Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="companyName"
                    aria-describedby="companyName"
                    name="companyName"
                    placeholder="Please enter your company name "
                    onChange={this.handleChange}
                  />
                </div>
                <span
                  hidden={this.state.companyDetailsForm.companyName}
                  className="text-danger"
                >
                  {this.state.companyDetailsError.companyName}
                </span>
              </div>
              <div className=" col-md-12">
                <div className="form-group">
                  <label htmlFor="Email">Email Id</label>
                  <input
                    type="email"
                    className="form-control"
                    id="emailId"
                    name="emailId"
                    aria-describedby="emailID"
                    placeholder="ABC@gXYZ.COM "
                    onChange={this.handleChange}
                  />
                </div>
                <span
                  hidden={this.state.companyDetailsForm.emailId}
                  className="text-danger"
                >
                  {this.state.companyDetailsError.emailId}
                </span>
              </div>
              <div className=" col-md-12">
                <div className="form-group">
                  <label htmlFor="jobTitle">Job Title</label>
                  <input
                    type="title"
                    className="form-control"
                    id="jobTitle"
                    name="jobTitle"
                    aria-describedby="JobTitle"
                    onChange={this.handleChange}
                  />
                </div>
                <span
                  hidden={this.state.companyDetailsForm.jobTitle}
                  className="text-danger"
                >
                  {this.state.companyDetailsError.jobTitle}
                </span>
              </div>
              <div className=" col-lg-12 col-md-12">
                <div className="form-group">
                  <label htmlFor="experience">Years of Experience</label>
                  <input
                    type="number"
                    className="form-control"
                    id="experience"
                    name="yearsOfExp"
                    aria-describedby="experience"
                    placeholder="Please enter your years of experience "
                    onChange={this.handleChange}
                  />
                </div>
                <span
                  hidden={this.state.companyDetailsForm.yearsOfExp}
                  className="text-danger"
                >
                  {this.state.companyDetailsError.yearsOfExp}
                </span>
              </div>
              <div className=" col-lg-12 col-md-12">
                <div className="form-group">
                  <input
                    type="checkBox"
                    className="p-2 mr-2"
                    id="terms"
                    aria-describedby="terms"
                    onClick={(e) => this.handleChangeTerms(e)}
                  />
                  <label htmlFor="experience">
                    I accept the <a href="#">Terms & Conditions</a>
                  </label>
                </div>
                <span
                  hidden={this.state.companyDetailsForm.terms}
                  className="text-danger"
                >
                  {this.state.companyDetailsError.terms}
                </span>
              </div>
              <div className="footerButtons">
                <div className="col-md-12 w-100">
                  <div className="d-flex">
                    <button
                      className="backBtn"
                      onClick={()=>{this.setState({goBack:true})}}
                    >
                      Back
                    </button>
                    <button
                      className="sendOTPBbtn"
                      type="submit"
                      onClick={this.fieldValidation}
                    >
                      send OTP
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </>
    );
  }
}
