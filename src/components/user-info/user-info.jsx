import React, {Component} from "react";
import {parseBoolean} from "../../utils/parsers";

class UserInfo extends Component {
    constructor() {
        super();
        this.state = {
            isVisible: parseBoolean(localStorage.getItem("isAuthorised")),
        }
    }

    render() {

        if (!this.state.isVisible) {
            return null;
        } else {
            const { email, currency, amount, name, surname } = this.props.user;

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