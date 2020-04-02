import './header.css';
import React, {Component} from 'react';

export default class Header extends Component {

  constructor(props) {
    super(props);
    this.onSignUpClick = props.onSignUpClick;

  }

  render() {
      return(
          <header>
            <div className="container">
              <div className="row">
                <div className="col-8">
                  <h1>
                    Welcome to Cheeser Hotel
                  </h1>
                </div>
                <div className="col-1.5">
                  <button type="button" className="btn btn-primary" >
                    SIGN IN
                  </button>
                </div>
                <div className="col-1.5">
                  <button type="button" className="btn btn-success" onClick={this.onSignUpClick} >
                    SIGN UP
                  </button>
                </div>
              </div>
            </div>
          </header>
      )
  }
 };
