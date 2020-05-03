import React, {Component} from "react";
import './admin-panel.css';
import MyAccount from "../my-account/my-account";

class AdminPanel extends Component {

    state = {
        loading: true,
        users: null,
        roomsList: undefined,
        adminAccount: null,
        user: this.props.user
    };

    constructor(props) {
        super(props);
        this.setState((s) => {
            return {
                user: props.user
            }
        });
        localStorage.setItem('accountId', this.props.user.account.id);
    }

    componentDidMount() {
        try {
            const token = localStorage.getItem('userToken');
            fetch('http://localhost:9999/users', {
                headers: {
                    'Authorization': token,
                    'Content-Type': 'application/json'
                },
                mode: 'cors'
            }).then((resp) => {
                return resp.json();
            }).then((body) => {
                this.setState({
                    users: body
                })
            }).catch((err) => {
                console.log(err)
            })
            const userId = localStorage.getItem('userId');
            fetch(`http://localhost:9999/users/${userId}`, {
                headers: {
                    'Authorization': token,
                    'Content-Type': 'application/json'
                },
                mode: 'cors'
            }).then((resp) => {
                return resp.json();
            }).then((body) => {
                this.setState({
                    adminAccount: body,
                    user: body
                })
            }).catch((err) => {
                console.log(err)
            })
        } catch (e) {
            console.log(e)
        }
    }

    render() {
        if (this.state.users) {
            const usersModified = this.state.users.map((e) => {
                let booking = null;
                if (e.booking) {
                    booking = (
                        <ul className="list-group">
                            <li className="list-group-item">BOOKING:<h3></h3></li>
                            <li className="list-group-item">VIP class: {e.booking.vip ? "yes" : "no"}</li>
                            <li className="list-group-item">Price: {e.booking.price}</li>
                            <li className="list-group-item">Stars: {e.booking.stars}</li>
                            <li className="list-group-item">Persons: {e.booking.persons}</li>
                            <li className="list-group-item">Days: {e.booking.maxDays}</li>
                        </ul>
                    )
                }
                return (
                    <li className="list-group-item">
                        <ul className="list-group">
                            <li className="list-group-item">Account identificator: {e.accountId}</li>
                            <li className="list-group-item">Name: {e.name} </li>
                            <li className="list-group-item">Surname: {e.surname}</li>
                            <li className="list-group-item">Patronymic: {e.patronymic}</li>
                            <li className="list-group-item">Phone: {e.phone}</li>
                            <li className="list-group-item">Email: {e.email}</li>
                            <li className="list-group-item">{booking}</li>
                        </ul>
                    </li>

                )
            })
            return (
                <>
                    <MyAccount user={this.state.user}/>
                    <ul className="list-group container">
                        {usersModified}
                    </ul>
                </>
            )
        }
        return null;
    }
}

export default AdminPanel;
