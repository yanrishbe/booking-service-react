import React, {Component} from "react";
import UpdateMyProfileForm from "../update-my-profile-form/update-my-profile-form";
import "./my-profile.css";
import MyAccount from "../my-account/my-account";

class MyProfile extends Component {
    constructor(props) {
        super(props);
        this.afterAccountDelete = props.afterAccountDelete;
        this.state = {
            user: props.user,
            showMyAccount: false
        };
    }

    onDeleteClick = async () => {
        try {
            const id = localStorage.getItem('userId');
            const token = localStorage.getItem('userToken');
            const response = await fetch(`http://localhost:9999/users/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': token,
                    'Content-Type': 'application/json'
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
        const {user} = this.state;
        // кстати если нет букингов у юзера, то я не высылаю (то есть вся инфа по юзеру кроме букинга)
        // с аккаунтом то же самое
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

        const toggleMyAccount = () => {
            this.setState((state) => {
                return {
                    showMyAccount: !state.showMyAccount
                }
            })
        };

        return (
            <div className="card my-profile__card" style={{width: 18 + 'rem'}}>
                <UpdateMyProfileForm user={user}/>
                <button className="btn btn-lg btn-danger" onClick={this.onDeleteClick}>DELETE MY PROFILE</button>
                <button onClick={toggleMyAccount}>MY ACCOUNT</button>
                <div className="card-header">
                    {user.name} {user.surname} {user.patronymic}
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">{user.phone}</li>
                    <li className="list-group-item">{user.email}</li>
                        <MyAccount user={user}/>
                    <li className="list-group-item"><h4>BOOKINGS: </h4></li>
                    <li>
                        <ul>{bookings}</ul>
                    </li>
                </ul>
            </div>
        )
    }

}

export default MyProfile;
