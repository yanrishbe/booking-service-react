import React,{Component} from "react";
import "./my-info.css"
import UpdateMyProfileForm from "../update-my-profile-form/update-my-profile-form";

class MyInfo extends Component{
    constructor(props) {
        super(props);
        this.state = {
            user: this.props.user,
        }
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
        }
    }

    render() {
        return (
            <div className="card my-profile__card" >
                <UpdateMyProfileForm user={this.state.user}/>
                <button className="btn btn-lg btn-danger" onClick={this.onDeleteClick}>DELETE MY PROFILE</button>
            </div>
        )
    }
}

export default MyInfo;
