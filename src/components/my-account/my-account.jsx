import React, {Component} from "react";
import "./my-account.css"
import {parseBoolean} from "../../utils/parsers";

class MyAccount extends Component {
    constructor(props) {
        super(props);
        if (this.props.user.account) {
            this.state = {
                creditCard: this.props.user.account.creditCard,
                legalEntity: this.props.user.account.legalEntity,
                bank: this.props.user.account.bank,
                amount: this.props.user.account.amount
            }
        } else {
            this.state = {
                creditCard:true,
                legalEntity: true,
                bank:'',
                amount:'' //CreditCard bool, LegalEntity bool, Bank String, Amount String
            }
        }
    }


    onCreateAccountClick = async () => {
        let {creditCard, legalEntity, bank, amount} = this.state;
        const id = localStorage.getItem('userId');
        const token = localStorage.getItem('userToken');
        creditCard = parseBoolean(creditCard);
        legalEntity = parseBoolean(legalEntity);
        const requestBody ={
            creditCard,
            legalEntity,
            bank,
            amount
        };
        try {
            const resp = await fetch(`http://localhost:9999/users/${id}/accounts`, {
                method: 'POST',
                mode:'cors',
                headers: {
                    'Content-Type' : 'application/json',
                    'Authorization' : token
                },
                body: JSON.stringify(requestBody)
            });
            const body = await  resp.json();
            localStorage.setItem('accountId', body.accountId);
        } catch (e) {
            alert(e);
        }
    }

    render() {
        const {account} = this.props.user;
        if(account){
            return (
                <ul className="list-group">
                    <li className="list-group-item">Credit Card: {account.creditCard ? "true" : "false"}</li>
                    <li className="list-group-item">Legal Entity: {account.legalEntity ? "true" : "false"}</li>
                    <li className="list-group-item">Bank: {account.bank}</li>
                    <li className="list-group-item">Amount: {account.amount}</li>
                </ul>
            )
        } else {
            return (
                <div className="create-account-form">

                    <div className="form-group">
                        <label htmlFor="credit-card-input">Credit Card</label>
                        <select id="credit-card-input" className="form-control" onChange={(e)=>{
                            this.setState({creditCard:e.target.value})
                        }}>
                            <option value={true}>True</option>
                            <option value={false}>False</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="legal-entity-input">Legal Entity</label>
                        <select id="legal-entity-input" className="form-control" onChange={(e)=>{
                            this.setState({legalEntity:e.target.value})
                        }}>
                            <option value={true}>True</option>
                            <option value={false}>False</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="bank-input">Bank</label>
                        <input type="text" className="form-control" id="bank-input" onChange={(e)=> {
                            this.setState({bank:e.target.value})
                        }}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="amount-input">Amount</label>
                        <input
                            type="number"
                            className="form-control"
                            min="0"
                            step="25"
                            id="amount-input"
                            onChange={(e)=> {
                                this.setState({amount:e.target.value})
                        }}/>
                    </div>
                    <button className="btn btn-primary" onClick={this.onCreateAccountClick}>CREATE ACCOUNT</button>
                </div>
            )
        }

    }

}

export default MyAccount;
