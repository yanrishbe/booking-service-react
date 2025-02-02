import React, {Component} from "react";
import UpdateMyProfileForm from "../update-my-profile-form/update-my-profile-form";

class MyProfile extends Component{
    constructor(props) {
        super(props);
        this.afterAccountDelete = props.afterAccountDelete;
        this.state = {
            user: props.user
        };
    }

    onDeleteClick = async () => {
        try{
            const id = localStorage.getItem('userId');
            const token = localStorage.getItem('userToken');
            const response = await fetch(`localhost:9999/users/${id}`,{
                method: 'DELETE',
                headers:{
                    'Authorisation': token,
                    'Content-Type' : 'application/json'
                },
            });
            if (response.ok) {
                alert('You deleted your account');
            } else {
                throw Error();
            }
        } catch (e) {
            alert('Sorry something wrong.For your safety, log in again');
            localStorage.clear();
        } finally {
            this.afterAccountDelete();
        }

        this.afterAccountDelete();
    }

    render() {
        const {user}= this.state;
        const bookings = user.bookings.map((e) => {
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
            <div className="card" style="width: 18rem;">
                <UpdateMyProfileForm user = {user}/>
                <button className="btn btn-lg btn-danger" onClick={this.onDeleteClick}>DELETE MY ACCOUNT</button>
                <div className="card-header">
                    {user.name} {user.surname} {user.patronymic}
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">{user.phone}</li>
                    <li className="list-group-item">{user.email}</li>
                    <li className="list-group-item">Card Credit: {user.account.cardCredit}</li>
                    <li className="list-group-item">Legal Entity: {user.account.legalEntity}</li>
                    <li className="list-group-item">Bank: {user.account.bank}</li>
                    <li className="list-group-item">Amount: {user.account.amount}</li>
                    <li className="list-group-item"><h4>BOOKINGS:   </h4></li>
                    <li>
                        <ul>{bookings}</ul>
                    </li>
                </ul>
            </div>
        )
    }

}

export default MyProfile;
