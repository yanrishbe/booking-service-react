import React, {Component} from "react";
import "./my-profile.css";
import MyInfo from "../my-info/my-info";
import MyAccount from "../my-account/my-account";

class MyProfile extends Component {
    state = {
        showMyInfo:false,
        showMyAccount: false,
        showMyBookings: false,
        showChangeBookingDuration : false,
        changeBookingDurationValue: 0
    };
    constructor(props) {
        super(props);
        this.setState({
            user: props.user
        })
        this.afterAccountDelete = props.afterAccountDelete;
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

    onDeleteBookingClick = async (e) => {
        try{
            const userId = localStorage.getItem("userId");
            const token = localStorage.getItem("userToken");
            const bookingId = this.state.user.booking.id;
            console.log(bookingId)
            const response = await fetch (`http://localhost:9999/users/${userId}/bookings/${bookingId}`,{
                method: 'DELETE',
                mode: 'cors',
                headers: {
                    'Content-Type' : 'application/json',
                    'Authorization' : token
                }
            })
            if(response.status === 204) {
                window.location.reload();
            } else {
                const body = await response.json();
                alert(body.message);
            }
        }catch (e) {
            alert(e.message);
        }
    }

    onLessMoreButtonClick = async (e) => {
        const polarity = e.target.name;
        let changeValue = 0;
        if(polarity === "less") {
            changeValue = 0 - this.state.changeBookingDurationValue;
        } else {
            changeValue = this.state.changeBookingDurationValue;
        }
        console.log(changeValue);
        try {
           const userId = localStorage.getItem('userId');
           const bookingId = this.state.user.booking.id;
           const token = localStorage.getItem('userToken');
           const response = await fetch(`http://localhost:9999/users/${userId}/bookings/${bookingId}`, {
               method: 'PUT',
               mode: 'cors' ,
               headers: {
                   'Content-Type' : 'application/json',
                   'Authorization' : token
               },
               body: JSON.stringify({
                   maxDays: changeValue
               })
           });
           if(response.status === 202) {
               alert('successfully changed');
               window.location.reload();
           } else {
               await response.json();
           }
        } catch (e) {alert('Not enought money');}
    }

    changeBookingDuration = null ;

    onChangeBookingDurationClick = () =>{
        this.setState((s) => {
            return {
                showChangeBookingDuration : !s.showChangeBookingDuration
            }
        })
        this.changeBookingDuration = !this.state.showChangeBookingDuration ? (
            <div className="row">
                <button className="btn btn-danger" name="less" onClick={this.onLessMoreButtonClick}>LESS</button>
                <input type="number" min="0" required defaultValue="0" onChange={(e) => {
                    const val = e.target.value;
                    this.setState({
                        changeBookingDurationValue: +val
                    })
                }}/>
                <button className="btn btn-success" name="more" onClick={this.onLessMoreButtonClick}>MORE</button>
            </div>
        ) : null;
    }



    render() {
        const {user} = this.state;
        if(user) {
            let content;
            const {booking} = user;
            const bookingModified = !booking ? null : (
                <li className="list-group-item">
                    <ul className="list-group">
                        <li className="list-group-item">IsVIP: {booking.vip ? "true" : "false"}</li>
                        <li className="list-group-item">Price: {booking.price}</li>
                        <li className="list-group-item">Stars: {booking.stars}</li>
                        <li className="list-group-item">Persons: {booking.persons}</li>
                        <li className="list-group-item">Empty: {booking.empty ? "true" : "false"}</li>
                        <li className="list-group-item">Expiration: {booking.expiration}</li>
                        <li className="list-group-item">
                            MaxDays: {booking.maxDays}
                            <button className="btn btn-primary" onClick={this.onChangeBookingDurationClick}>Change booking duration</button>
                            {this.changeBookingDuration}
                        </li>
                        <li className="list-group-item">
                            <button className="btn btn-danger" onClick={this.onDeleteBookingClick}>
                                DELETE BOOKING
                            </button>
                        </li>
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
        } else {
            return null;
        }

    }

}

export default MyProfile;
