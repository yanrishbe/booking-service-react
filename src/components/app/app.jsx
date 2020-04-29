import React, {Component} from 'react';

import './app.css';
import Rooms from '../rooms/rooms';
import Header from '../header/header';
import RegistrationForm from '../registration-form/registration-form';
import SignInForm from '../sign-in-form/sign-in-form';
import AdminPanel from "../admin-panel/admin-panel";
import MyProfile from "../my-profile/my-profile";
import {parseBoolean} from "../../utils/parsers";

const BOOK_ROOM_URL = 'BOOK_ROOM_URL';

export default class App extends Component {
    state = {
        showRegistration: false,
        showLogIn: false,
        showRooms: true,
        showAdminPanel: false,
        showMyProfile: false,
        user: null,
    };

    setStateToDefault = () =>{
        this.setState({
            showRegistration: false,
            showLogIn: false,
            showRooms: true,
            showAdminPanel: false,
            showMyProfile: false,
        });
    }

    async fetchUser({id, token}) {
        if (!id || !token) {
            return;
        }

        try {
            const resp = await fetch(`http://localhost:9999/users/${id}`, {
                method: 'GET',
                headers: {
                    'Authorization': token,
                    'Content-Type': 'application/json'
                },
                mode: 'cors'
            });

            const body = await resp.json();


            this.setState((state) => {
                return {
                    showRegistration: false,
                    showLogIn: false,
                    showRooms: true,
                    showMyProfile: false,
                    user: body
                }
            });
        } catch (e) {
            alert('Could not fetch user data ' + e);
        }
    }

    onLogOutClick = () => {
        localStorage.clear();
        this.setState({
            showRegistration: false,
            showLogIn: false,
            showRooms: true,
            showAdminPanel: false,
            showMyProfile: false,
            user: null,
        })
    }

    onMyProfileClick = async (e) => {
        const id = localStorage.getItem('userId');
        const token = localStorage.getItem('userToken');
        try {
            const resp = await fetch(`http://localhost:9999/users/${id}`, {
                method: 'GET',
                headers: {
                    'Authorization': token,
                    'Content-Type': 'application/json'
                },
                mode: 'cors'
            })
            const body = await resp.json();
            this.setState({
                showRegistration: false,
                showLogIn: false,
                showRooms: false,
                showAdminPanel: false,
                showMyProfile: true,
                user: body,
            });
        } catch (e) {
            alert('Sorry something wrong: ' + e);
        }
    }

    onSignInClick = async (id, token) => {
        await this.fetchUser({id, token});
    };

    onSignUpClick = () => {
        this.setState((state) => {
            return {
                showRegistration: !state.showRegistration,
                showLogIn: false,
                showRooms: false,
                showAdminPanel: false,
                showMyProfile: false,
            }
        });
    };

    onLoginClick = () => {
        this.setState((state) => {
            return {
                showLogIn: !state.showLogIn,
                showRegistration: false,
                showRooms: false,
                showAdminPanel: false,
                showMyProfile: false,
            }
        });
    };

    onAdminPanelClick = (event) => {
        this.setState((state) => {
            return {
                showLogIn: false,
                showRegistration: false,
                showRooms: !state.showRooms,
                showAdminPanel: !state.showAdminPanel,
                showMyProfile: false,
            }
        })
    };

    afterRegistrationAction = () => {
        this.setState({
            showLogIn: true,
            showRegistration: false,
            showRooms: true,
            showAdminPanel: false,
            showMyProfile: false,
        })
    };

    render() {
        const rooms = this.state.showRooms && parseBoolean(localStorage.getItem("isAuthorised")) ? <Rooms/> : null;
        const adminPanel = this.state.showAdminPanel ? <AdminPanel/> : null;
        const myProfile = this.state.showMyProfile ? <MyProfile
            user={this.state.user}
            afterAccountDelete={this.onLogOutClick}/> : null;
        return (
            <React.Fragment>
                <Header
                    onSignUpClick={this.onSignUpClick}
                    onSignInClick={this.onLoginClick}
                    onAdminPanelClick={this.onAdminPanelClick}
                    onMyProfileClick={this.onMyProfileClick}
                    onLogOutClick={this.onLogOutClick}
                    onHeaderClick = {this.setStateToDefault}
                    user={this.state.user}
                />
                {myProfile}
                <RegistrationForm
                    isVisible={this.state.showRegistration}
                    afterRegistrationAction={this.afterRegistrationAction}
                />
                <SignInForm
                    onSignInClick={this.onSignInClick}
                    isVisible={this.state.showLogIn}
                />
                {adminPanel}
                {rooms}
            </React.Fragment>
        );
    }
}
