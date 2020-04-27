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
        this.onHeaderClick = props.onHeaderClick;
    }

    render() {
        let adminButton = null;
        let myProfileButton = null;
        if (localStorage.getItem('isAuthorised') === 'true' && localStorage.getItem('role') === 'admin') {
            adminButton = (
                <div className="col-1.5">
                    <button className="btn btn-warning" onClick={this.onAdminPanelClick}>ADMIN PANEL</button>
                </div>
            );
        }
        if (localStorage.getItem('isAuthorised') === 'true' && localStorage.getItem('role') === 'user') {
            myProfileButton = (
                <div className="col-1 5">
                    <button className="btn btn-dark" onClick={this.onMyProfileClick} >MY PROFILE</button>
                </div>
            )
        }
        return (
            <header>
                <div className="container">
                    <div className="row">
                        <div className="col-6">
                            <h1 onClick={this.onHeaderClick} onMouseOver={(e) => e.preventDefault()}>
                                Welcome to Hotel "Minsk"
                            </h1>
                        </div>
                        <div className="col-1.5">
                            <button type="button" className="btn btn-primary" onClick={this.onSignInClick}>
                                SIGN IN
                            </button>
                        </div>
                        <div className="col-1.5">
                            <button type="button" className="btn btn-success" onClick={this.onSignUpClick}>
                                SIGN UP
                            </button>
                        </div>
                        <div className="col-1.5">
                            <button type="button" className="btn btn-danger" onClick={this.onLogOutClick}>
                                LOG OUT
                            </button>
                        </div>
                        {adminButton}
                        {myProfileButton}
                        {/*{this.props.user && this.props.user.id && <UserInfo user={this.props.user}/>}*/}
                    </div>
                </div>
            </header>
        )
    }
};
