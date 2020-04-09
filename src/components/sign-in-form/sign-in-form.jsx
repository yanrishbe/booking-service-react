import React, { Component } from 'react';

const SIGN_IN_SEND_FORM = 'cheeser';
class SignInForm extends Component {

  onSignInFormSubmit = (event) => {
    event.preventDefault();

    const email = event.target.email.value;
    const password = event.target.password.value;

    fetch(SIGN_IN_SEND_FORM, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({email, password}),
    })
    .then((resp) => resp.json())
    .then((body) => {
      localStorage.setItem('role', body.userRole);
      localStorage.setItem('isAuthorized', body.isAuthorized);
    })
    .catch((err) => {
      alert(err);
      localStorage.setItem('isAuthorized', false);
    })
  }

  render() {
    const { isVisible } = this.props;

    if (isVisible) {
      return (
        <div className="container">
          <div className="col-6"></div>
          <div className="col-6">
            <form onSubmit={this.onSignInFormSubmit}>
              <div className="form-group">
                <label for="signInEmail">Email address</label>
                <input type="email" class="form-control" id="signInEmail" aria-describedby="emailHelp" placeholder="Enter email" />
              </div>
              <div className="form-group">
                <label for="sigInPassword">Password</label>
                <input type="password" class="form-control" id="sigInPassword" placeholder="Password" />
              </div>
              <button type="submit" class="btn btn-primary">SIGN IN</button>
            </form>        
          </div>
        </div>
      )
    }
    return null;
  }
}  

export default SignInForm;