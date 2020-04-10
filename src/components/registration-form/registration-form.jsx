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
    const { password } = this.state;

    console.log(value, password);
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

  onRegistrationFormSubmit = (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    const age = event.target.age.value;

    fetch(SEND_REGISTRATION_INFO_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
      mode: "no-cors",
        body: JSON.stringify({email, password}),
      })
      .then((resp) => resp.json())
      .then((body) => {
        alert(body);
      })
      .catch(() => alert('err'));
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
              <div className="form-group">
                <label htmlFor="age">Enter your age</label>
                <input
                  className="form-control"
                  type="number"
                  id="age"
                  placeholder="your age"
                  min = "18"
                  name="age"
                  required
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
