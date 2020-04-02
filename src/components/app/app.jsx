import React, { Component } from 'react';

import './app.css';
import Rooms from '../rooms/rooms';
import Header from '../header/header';
import RegistrationForm from '../registration-form/registration-form';

export default class App extends Component {
    state = {
      showRegistration: false,
    };

    onSignUpClick = () => {
      this.setState( (state) => {
            return {
                showRegistration: !state.showRegistration,
            }
      });
    };

    render() {
      return (
        <>
          <Header onSignUpClick = {this.onSignUpClick}/>
          <RegistrationForm isVisible = {this.state.showRegistration} />
          <Rooms />
        </>
      );
    }
}
