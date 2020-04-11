import './registration-form.css';
import React, { Component } from 'react';

const SEND_REGISTRATION_INFO_URL = 'http://localhost:9999/user';

export default class RegistrationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      repeatPassword: '',
    }
  }

  onRepeatPasswordChange = (event) => {
    const {value}  = event.target;

    this.setState({
        repeatPassword: value
      });

    if(this.state.password !== event.target.value){
      const label = document.getElementById('labelForInputPassword2');
      this.styleDisabled(label);
      this.disableBtn('signUpBtn');
    } else {
      const label = document.getElementById('labelForInputPassword2');
      this.styleEnabled(label);
      this.enableBtn('signUpBtn');
    }
  }

  disableBtn = (btnId) => {
    const submitBtn = document.getElementById(btnId);
    submitBtn.disabled = true;
  }

  enableBtn = (btnId) => {
    const submitBtn = document.getElementById(btnId);
    submitBtn.disabled = false;
  }

  styleDisabled = (el) => {
    el.style.color = "red";
    el.innerHTML = "Password mismatch"
  }

  styleEnabled = (el) => {
    el.style.color = "green";
    el.innerHTML = "Congratulation!"
  }

  onPasswordChange = (event) => {
    this.setState({
      password: event.target.value
    });
  }

  onPhoneChange = (event) => {
    console.log('a');
    var phoneRegexp = /^\+375[0-9]{9}$/;
    const phoneNumber = event.target.value;
    let res = Boolean( phoneNumber.match(phoneRegexp));
    if (!res ){
      let el = document.getElementById('labelForPhone');
      el.style.color = 'red';
      el.innerHTML = 'Incorrect Phone Number'
    } else {
      let el = document.getElementById('labelForPhone');
      el.style.color = 'green';
      el.innerHTML = 'Correct Phone Number'
    }
    this.setState({
      isPhoneCorrect: res,
    })
  }

  onRegistrationFormSubmit = (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const surname = event.target.surname.value;
    const patronymic = event.target.patronymic.value;
    const phone = event.target.phone.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    


    fetch(SEND_REGISTRATION_INFO_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        mode: "no-cors",
        body: JSON.stringify({name, surname, patronymic,phone,email, password}),
    })
    .then((resp) => alert('Thank you for registration'))
    .catch((err) => alert('Sorry something wrong'));

    this.props.afterRegistrationAction();  
  }

  render() {
    const { isVisible } = this.props;
    if (isVisible) {
      return (
        <div className="container">
          <div className="col-6"></div>
          <div className="col-6">
            <form onSubmit = {this.onRegistrationFormSubmit}>

              <div className="form-group">
              <label htmlFor="name" id="labelForName">Nmae</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Name"
                  id="name"
                  name="name"
                />  
              </div>
              <div className="form-group">
              <label htmlFor="surname" id="labelForSurname">Surname</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Surname"
                  id="surname"
                  name="surname"
                />  
              </div>
              <div className="form-group">
              <label htmlFor="patronymic" id="labelForPatronymic">Patronymic</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Patronymic"
                  id="patronymic"
                  name="patronymic"
                />  
              </div>
              <div className="form-group">
                <label htmlFor="phone" id="labelForPhone">Phone</label>
                <input
                  type="phone"
                  className="form-control"
                  aria-describedby="emailHelp"
                  placeholder="Phone number"
                  name="phone"
                  id="phone"
                  onChange = {this.onPhoneChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                  name="email"
                />
              </div>
              <div className="form-group">
                <label htmlFor="inputPassword1">Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  id="inputPassword1"
                  name="password"
                  onChange = {this.onPasswordChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="inputPassword2" id="labelForInputPassword2">Repeat password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  id="inputPassword2"
                  onChange = {this.onRepeatPasswordChange}
                />
              </div>

              <button type="submit" id= "signUpBtn" className="btn btn-primary" disabled>REGISTER</button>
            </form>

          </div>
        </div>
      );
    }
    return null;
  }
}
