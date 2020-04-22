import React, {Component} from "react";
import {parseBoolean} from "../../utils/parsers";

class UserInfo extends Component {
    constructor() {
        super();
        this.state = {
            isVisible: parseBoolean(localStorage.getItem("isAuthorised"))
        }
    }

    render() {

        if (!this.state.isVisible) {
            return null;
        } else {
            const email = localStorage.getItem("email");
            const currency = localStorage.getItem("currency");
            const amount = localStorage.getItem("amount");
            const name = localStorage.getItem("name");
            const surname = localStorage.getItem("surname");
            return (
                <div className="card" style={{width: 18 + 'rem'}}>
                    <div className="card-header">
                        {name} {surname}
                    </div>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">{currency}</li>
                        <li className="list-group-item">{amount}</li>
                        <li className="list-group-item">{email}</li>
                    </ul>
                </div>
            )
        }
    }
}

export default UserInfo;
