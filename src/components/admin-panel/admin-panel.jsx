import React, {Component} from "react";
import './admin-panel.css';
import MyAccount from "../my-account/my-account";

class AdminPanel extends Component {

    state = {
        loading: true,
        users: null,
        roomsList: undefined,
        adminAccount: null
    };

    componentDidMount() {
        try {
            const token = localStorage.getItem('userToken');
            fetch('http://localhost:9999/users',{
                headers:{
                    'Authorization' : token,
                    'Content-Type' : 'application/json'
                },
                mode:'cors'
            }).then((resp) => {
                return resp.json();
            }).then((body)=> {
                this.setState({
                    users : body
                })
            }).catch((err) => {
                console.log(err)
            })
            const userId = localStorage.getItem('userId');
            fetch(`http://localhost:9999/users/${userId}`,{
                headers:{
                    'Authorization' : token,
                    'Content-Type' : 'application/json'
                },
                mode:'cors'
            }).then((resp) => {
                return resp.json();
            }).then((body)=> {
                this.setState({
                    adminAccount: body
                })
            }).catch((err) => {
                console.log(err)
            })
        }catch (e) {
            console.log(e)
        }
    }




    render() {
        if(this.state.users) {
            const usersModified = this.state.users.map((e) => {
                let booking = null;
                if(e.booking){
                    booking = (
                        <ul className="list-group">
                            <li className="list-group-item">BOOKING:<h3></h3></li>
                            <li className="list-group-item">VIP: {e.booking.vip ? "true" : "false"}</li>
                            <li className="list-group-item">Price: {e.booking.price}</li>
                            <li className="list-group-item">Stars: {e.booking.stars}</li>
                            <li className="list-group-item">Persons: {e.booking.expiration}</li>
                            <li className="list-group-item">maxDays: {e.booking.maxDays}</li>
                            <li className="list-group-item">Чтобы поменять подписи зайди в apmin panel 44-49 строчки</li>
                        </ul>
                    )
                }
                return (
                    <li className="list-group-item">
                        <ul className="list-group">
                            <li className="list-group-item">accountId: {e.accountId}</li>
                            <li className="list-group-item">name: {e.name} </li>
                            <li className="list-group-item">surname: {e.surname}</li>
                            <li className="list-group-item">patronymic: {e.patronymic}</li>
                            <li className="list-group-item">phone: {e.phone}</li>
                            <li className="list-group-item">email: {e.email}</li>
                            <li className="list-group-item"> чтобы поменять подписи зайди в admin panel 56-61 строчки</li>
                            <li className="list-group-item">{booking}</li>
                        </ul>
                    </li>

                )
            })
            return (
                <>
                    <MyAccount user={this.state.adminAccount }/>
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
