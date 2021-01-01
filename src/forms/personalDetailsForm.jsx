import React, { Component } from "react";
import PhoneInput from "react-phone-input-2";
import { Redirect } from "react-router-dom";
import  {  countryArray} from './countryList';
import "react-phone-input-2/lib/style.css";
import "./formStyle.css";

export default class PersonalDetailsForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      personalDetails: {
        userName: "",
        gender: "",
        country: "",
        state: "",
        phoneNo: "",
      },
      personalDetailsError: {
        userNameError: "",
        genderError: "",
        countryError: "",
        stateError: "",
        phoneNoError: "",
      },
      navigateToNext: false,
      formValid: false,
      genderSelected: "",
    };
  }

  handleChangePhone = (phoneNo) => {
    const { personalDetails } = this.state;
    this.setState({
      personalDetails: { ...personalDetails, phoneNo: phoneNo },
    });
  };

  handleChangeinGender = (gender) => {
    const { personalDetails } = this.state;
    this.setState({
      personalDetails: { ...personalDetails, gender: gender },
      genderSelected: gender,
    });
  };

  handleChangeinCountry = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value
    const { personalDetails } = this.state;
    this.setState({
      personalDetails: { ...personalDetails, [name]: value },
    });
  };

  handleChange = (event, data) => {
    const target = event.target;
    const name = target.name;
    var value = "";
    if (target.checked) {
      value = target.checked;
    } else {
      value = target.value;
    }
    const { personalDetails } = this.state;
    this.setState({
      personalDetails: { ...personalDetails, [name]: value },
    });
  };

  fieldValidation = () => {
    let fieldValidationErrors = this.state.personalDetailsError;
    let personalDetails = this.state.personalDetails;

    if (this.state.personalDetails.userName === "") {
      fieldValidationErrors.userNameError = "Please enter your name";
    } else {
      fieldValidationErrors.userNameError = "";
    }
    if (this.state.personalDetails.gender === "") {
      fieldValidationErrors.genderError = "Please select your gender";
    } else {
      fieldValidationErrors.genderError = "";
    }
    if (this.state.personalDetails.country === "") {
      fieldValidationErrors.countryError = "Please select your country";
    } else {
      fieldValidationErrors.countryError = "";
    }
    if (this.state.personalDetails.state === "") {
      fieldValidationErrors.stateError = "Please enter your state";
    } else {
      fieldValidationErrors.stateError = "";
    }
    if (this.state.personalDetails.phoneNo === "") {
      fieldValidationErrors.phoneNoError = "Please enter your phone number";
    } else {
      fieldValidationErrors.phoneNoError = "";
    }
    this.setState({
      personalDetailsError: fieldValidationErrors,
      personalDetails: personalDetails,
    });
    this.checkforNavigateNext();
  };

  checkforNavigateNext = () => {
    if (
      this.state.personalDetailsError.userNameError === "" &&
      this.state.personalDetailsError.stateError === "" &&
      this.state.personalDetailsError.countryError === "" &&
      this.state.personalDetailsError.phoneNoError === "" &&
      this.state.personalDetailsError.genderError === ""
    ) {
      this.setState({ navigateToNext: true });
      this.setState({ formValid: true });
    }
  };
  submitForm = (e) => {
    e.preventDefault();
  };

  setLocalStorage = () => {
    localStorage.setItem("userName", this.state.personalDetails.userName);
    localStorage.setItem("country", this.state.personalDetails.country);
    localStorage.setItem("gender", this.state.personalDetails.gender);
    localStorage.setItem("state", this.state.personalDetails.state);
    localStorage.setItem("phone no", this.state.personalDetails.phoneNo);
  };

  loadCountryOptions = () =>{
    return(
      countryArray.map((country,index)=>{
        return(<option key={index}value={country.code}>{country.name}</option>)
      })
    )
  }
  render() {
    var gender = this.state.genderSelected;
    var maleSelected = "";
    var femaleSelected = "";
    var otherSelected = "";
    if (this.state.navigateToNext) {
      this.setLocalStorage();
      return <Redirect to="/companyDetails" />;
    }
    if (gender !== "") {
      if (gender === "Male") {
        maleSelected = "genderSelected ml-0";
      } else if (gender === "Female") {
        femaleSelected = "genderSelected ";
      } else if (gender === "Other") {
        otherSelected = "genderSelected ";
      }
    }
    return (
      <>
        <div className="row">
          <div className="container p-3 mt-5 mb-1">
            <div className="text-center w-100">
              <h3>Add your Personal details here!</h3>
              <h5>
                Welcome to Squash Apps. Please enter below mentioned details to
                continue
              </h5>
            </div>
          </div>
        </div>
        <div className="row d-flex justify-content-center">
          <div className="form-containe">
            <form onSubmit={this.submitForm} className="formStyle">
               <div className=" col-md-12">
                <div className="form-group">
                  <label htmlFor="fullName">Full Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="userName"
                    id="fullName"
                    value={this.state.personalDetails.userName}
                    aria-describedby="fullName"
                    placeholder="Please enter your Full name "
                    onChange={this.handleChange}
                  />
                </div>
                <span
                  hidden={this.state.personalDetails.userName}
                  className="text-danger"
                >
                  {this.state.personalDetailsError.userNameError}
                </span>
              </div>
              <div className=" col-md-12">
                <div className="form-group">
                  <div className="d-flex">
                    <button
                      className={
                        maleSelected !== "" ? maleSelected : "genderButton ml-0"
                      }
                      type="button"
                      name="gender"
                      onClick={() => this.handleChangeinGender("Male")}
                    >
                      Male
                    </button>
                    <button
                      className={
                        femaleSelected !== "" ? femaleSelected : "genderButton"
                      }
                      name="gender"
                      type="button"
                      onClick={() => this.handleChangeinGender("Female")}
                    >
                      Female
                    </button>
                    <button
                      className={
                        otherSelected !== "" ? otherSelected : "genderButton"
                      }
                      name="gender"
                      type="button"
                      onClick={() => this.handleChangeinGender("Other")}
                    >
                      {" "}
                      Other
                    </button>
                  </div>
                </div>
                <span
                  hidden={this.state.personalDetails.gender}
                  className="text-danger"
                >
                  {this.state.personalDetailsError.genderError}
                </span>
              </div>
              <div className=" col-md-12">
                <div className="form-group">
                  <label htmlFor="Country">Country</label>
                  <select className="form-control" name="country" id="country" onChange={this.handleChangeinCountry}>
                    {this.loadCountryOptions()}
                  </select>
                </div>
                <span
                  hidden={this.state.personalDetails.country}
                  className="text-danger"
                >
                  {this.state.personalDetailsError.countryError}
                </span>
              </div>
              <div className=" col-md-12">
                <div className="form-group">
                  <label htmlFor="State">State</label>
                  <input
                    type="text"
                    className="form-control"
                    id="State"
                    name="state"
                    aria-describedby="State"
                    onChange={this.handleChange}
                    placeholder="Please enter your State"
                  />
                </div>
                <span
                  hidden={this.state.personalDetails.state}
                  className="text-danger"
                >
                  {this.state.personalDetailsError.stateError}
                </span>
              </div>
              <div className=" col-md-12">
                <div className="form-group">
                  <label htmlFor="Phone">Phone</label>
                  <PhoneInput
                    country={"in"}
                    name="phoneNo"
                    onChange={(phoneNo) => this.handleChangePhone(phoneNo)}
                    inputStyle={{ width: "100%" }}
                  />
                </div>
                <span
                  hidden={this.state.personalDetails.phoneNo}
                  className="text-danger"
                >
                  {this.state.personalDetailsError.phoneNoError}
                </span>
              </div>
              <div className="footerButtons">
                <div className=" col-md-12">
                  <div className="d-flex ">
                    <button
                      className="nextBtn"
                      type="submit"
                      onClick={this.fieldValidation}
                    >
                      Next
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
