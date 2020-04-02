import './registration-form.css';
import React, { Component } from 'react';

export default class RegistrationForm extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { isVisible } = this.props;
    if (isVisible) {
      return (
        <div className="container">
          <div className="col-4"> </div>
          <div className="col-6">
            <form>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                />
              </div>
              <button type="submit" className="btn btn-primary">Submit</button>
            </form>
          </div>
          <div className="col-2" />
        </div>
      );
    }
    return null;
  }
}
