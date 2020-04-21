import './header.css';
import React, {Component} from 'react';
import UserInfo from "../user-info/user-info";

export default class Header extends Component {

  constructor(props) {
    super(props);
    this.onLogOutClick = props.onLogOutClick;
    this.onSignUpClick = props.onSignUpClick;
    this.onSignInClick = props.onSignInClick;
    this.onAdminPanelClick = props.onAdminPanelClick;
    this.onMyProfileClick = props.onMyProfileClick;
  }

  render() {
    let adminButton = null;
    let myProfileButton = null;
    if(localStorage.getItem('isAuthorized') === 'true' && localStorage.getItem('role') === 'admin'){
      adminButton = (
        <div className="col-1.5">
          <button className= "btn btn-warning" onClick={this.onAdminPanelClick}>ADMIN PANEL</button>
        </div>
      );
    }

    if(localStorage.getItem('isAuthorised') === 'true' && localStorage.getItem('role') === 'user'){
      myProfileButton = (
          <div className="col-1 5">
            <button className="btn btn-dark" onClick={this.onMyProfileClick}>MY PROFILE</button>
          </div>
      )
    }
    return(
        <header>
          <div className="container">
            <div className="row">
              <div className="col-6">
                <h1>
                  Welcome to Cheeser Hotel
                </h1>
              </div>
              <div className="col-1.5">
                <button type="button" className="btn btn-primary" onClick={this.onSignInClick} >
                  SIGN IN
                </button>
              </div>
              <div className="col-1.5">
                <button type="button" className="btn btn-success" onClick={this.onSignUpClick} >
                  SIGN UP
                </button>
              </div>
              <div className="col-1.5">
                <button type="button" className="btn btn-danger" onClick={this.onLogOutClick} >
                  LOG OUT
                </button>
              </div>
              {adminButton}
              {myProfileButton}
              <UserInfo/>
            </div>
          </div>
        </header>
    )
  }
};
