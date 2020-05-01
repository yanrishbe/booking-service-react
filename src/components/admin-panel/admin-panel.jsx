import React, {Component} from "react";
import './admin-panel.css';

class AdminPanel extends Component {

    state = {
        loading: true,
        users: null,
        roomsList: undefined,
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
                console.log(body)
            }).catch((err) => {
                console.log(err)
            })
        }catch (e) {}
    }




    render() {
        if(this.state.users) {
            const usersModified = this.state.users.map((e) => {
                return (
                    <li className="list-group-item">
                        <ul className="list-group">
                            <li className="list-group-item">accountId: {e.accountId}</li>
                            <li className="list-group-item">name: {e.name} </li>
                            <li className="list-group-item">surname: {e.surname}</li>
                            <li className="list-group-item">patronymic: {e.patronymic}</li>
                            <li className="list-group-item">phone: {e.phone}</li>
                            <li className="list-group-item">email: {e.email}</li>
                        </ul>
                    </li>

                )
            })
            return (
                <ul className="list-group container">
                    {usersModified}
                </ul>
            )
        }
        return null;
    }
}

export default AdminPanel;
