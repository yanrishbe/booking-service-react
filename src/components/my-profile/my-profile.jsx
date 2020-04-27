import React, {Component} from "react";
import "./my-profile.css";
import MyInfo from "../my-info/my-info";
import MyAccount from "../my-account/my-account";

class MyProfile extends Component {
    constructor(props) {
        super(props);
        this.afterAccountDelete = props.afterAccountDelete;
        this.state = {
            user: props.user,
            showMyInfo:false,
            showMyAccount: false,
            showMyBookings: false
        };
    }

    onMyInfoClick = () => {
        this.setState((s) => {
            return {
            showMyInfo: !s.showMyInfo,
            showMyAccount: false,
            showMyBookings: false
        }});
    }

    onMyAccountClick = () => {
        this.setState((s) => {
            return {
            showMyInfo: false,
            showMyAccount: !s.showMyAccount,
            showMyBookings: false
        }});
    }

    onMyBookingsClick = () => {
        this.setState((s) => {
            return {
            showMyInfo: false,
            showMyAccount: false,
            showMyBookings: !s.showMyBookings
        }});
    }

    render() {
        const {user} = this.state;
        // кстати если нет букингов у юзера, то я не высылаю (то есть вся инфа по юзеру кроме букинга)
        // с аккаунтом то же самое
        let content;

        if(this.state.showMyInfo) {
            content = <MyInfo user={user}/>
        } else if(this.state.showMyAccount) {
            content = <MyAccount user = {user}/>
        }
        const bookings = !user.bookings ? [] : user.bookings.map((e) => {
            return (
                <li className="list-group-item">
                    <ul className="list-group">
                        <li className="list-group-item">IsVIP: {e.vip}</li>
                        <li className="list-group-item">Price: {e.price}</li>
                        <li className="list-group-item">Stars: {e.stars}</li>
                        <li className="list-group-item">Persons: {e.persons}</li>
                        <li className="list-group-item">Empty: {e.empty}</li>
                        <li className="list-group-item">Expiration: {e.expiration}</li>
                        <li className="list-group-item">MaxDays: {e.maxDays}</li>

                    </ul>
                </li>
            )
        });

        return (
            <div className="container">
                <div className="row">
                    <div className="col-2"></div>
                    <div className="col-6">
                        <button className="btn btn-lg" onClick={this.onMyInfoClick}>MY INFO</button>
                        <button className="btn btn-lg" onClick={this.onMyAccountClick}>MY ACCOUNT</button>
                        <button className="btn btn-lg" onClick={this.onMyBookingsClick}>My BOOKINGS</button>
                    </div>
                    <div className="col-2"></div>
                </div>
                <div className="row">
                    {content}
                </div>
            </div>

        )
    }

}

export default MyProfile;
