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
    componentDidMount() {
        this.fetchUser();
    }

    fetchUser = async () =>{
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
                user: body,
            });
            console.log(body);
        } catch (e) {
            alert('Sorry something wrong: ' + e);
        }
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
        const {booking} = user;
        console.log(booking);
        const bookingModified = !booking ? null : (
            <li className="list-group-item">
                <ul className="list-group">
                    <li className="list-group-item">IsVIP: {booking.vip ? "true" : "false"}</li>
                    <li className="list-group-item">Price: {booking.price}</li>
                    <li className="list-group-item">Stars: {booking.stars}</li>
                    <li className="list-group-item">Persons: {booking.persons}</li>
                    <li className="list-group-item">Empty: {booking.empty ? "true" : "false"}</li>
                    <li className="list-group-item">Expiration: {booking.expiration}</li>
                    <li className="list-group-item">MaxDays: {booking.maxDays}</li>

                </ul>
            </li>
            );

        if(this.state.showMyInfo) {
            content = <MyInfo user={user}/>
        } else if(this.state.showMyAccount) {
            content = <MyAccount user = {user} />
        } else if  (this.state.showMyBookings) {
            content = bookingModified;
        }


        return (
            <div className="container">
                <div className="row">
                    <div className="col-2"></div>
                    <div className="col-6">
                        <button className="btn btn-lg" onClick={this.onMyInfoClick}>MY INFO</button>
                        <button className="btn btn-lg" onClick={this.onMyAccountClick}>MY ACCOUNT</button>
                        <button className="btn btn-lg" onClick={this.onMyBookingsClick}>My BOOKING</button>
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
