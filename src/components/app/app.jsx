import React, { Component } from 'react';

import './app.css';
import Rooms from '../rooms/rooms';
import Header from '../header/header';
import RegistrationForm from '../registration-form/registration-form';
import SignInForm from '../sign-in-form/sign-in-form';
import AdminPanel from "../admin-panel/admin-panel";

export default class App extends Component {
    state = {
      showRegistration: false,
      showLogIn: false,
      showRooms: true,
      showAdminPanel: false,
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
    };

    onAdminPanelClick = (event) => {
      console.log('a');
      this.setState((state) => {
          return {
              showLogIn: false,
              showRegistration: false,
              showRooms: !state.showRooms,
              showAdminPanel:  !state.showAdminPanel,
          }
      })
    };

    afterRegistrationAction = () => {
      this.setState({
        showLogIn: true,
        showRegistration: false,
      })
    };

    render() {
      const rooms = this.state.showRooms ? <Rooms /> : null;
      const adminPanel = this.state.showAdminPanel ? <AdminPanel/> : null;
      return (
        <React.Fragment>
          <Header
              onSignUpClick = {this.onSignUpClick}
              onSignInClick ={this.onLoginClick}
              onAdminPanelClick = {this.onAdminPanelClick}
          />
          <RegistrationForm
              isVisible = {this.state.showRegistration}
              afterRegistrationAction = {this.afterRegistrationAction}
          />
          <SignInForm
              isVisible = {this.state.showLogIn}
          />
            {adminPanel}
            {rooms}
        </React.Fragment>
      );
    }
}
