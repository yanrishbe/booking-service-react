import React, { Component } from 'react';

import './app.css';
import Rooms from '../rooms/rooms';
import Header from '../header/header';
import RegistrationForm from '../registration-form/registration-form';
import SignInForm from '../sign-in-form/sign-in-form';

export default class App extends Component {
    state = {
      showRegistration: false,
      showLogIn: false,
    };

    onSignUpClick = () => {

      this.setState( (state) => {
        return {
          showRegistration: !state.showRegistration,
          showLogIn: false,
        }
      });
    };

    onLoginClick = () => {
      this.setState( (state) => {
        return {
          showLogIn: !state.showLogIn,
          showRegistration: false,
        }
      });
    }

    afterRegistrationAction = () => {
      this.setState({
        showLogIn: true,
        showRegistration: false,
      })
    }

    render() {

      return (
        <>
          <Header onSignUpClick = {this.onSignUpClick} onSignInClick ={this.onLoginClick}/>
          <RegistrationForm isVisible = {this.state.showRegistration} afterRegistrationAction = {this.afterRegistrationAction}/>
          <SignInForm isVisible = {this.state.showLogIn}/>
          <Rooms />
        </>
      );
    }
}
