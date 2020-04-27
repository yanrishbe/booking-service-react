import React, {Component} from "react";
import "./my-account.css"
import {parseBoolean} from "../../utils/parsers";

class MyAccount extends Component {
    constructor(props) {
        super(props);

    }
    state = {
        form: {
            creditCard:true,
            legalEntity: true,
            bank:'',
            amount:''
        },
        account: this.props.user.account //CreditCard bool, LegalEntity bool, Bank String, Amount String
    }

    onCreateAccountClick = async () => {
        const form = this.state;
        form.creditCard = parseBoolean(form.creditCard);
        form.legalEntity = parseBoolean(form.legalEntity);
        form.amount = +form.amount;
        const id = localStorage.getItem('userId');
        const token = localStorage.getItem('userToken');
        const requestBody ={
            creditCard: form.creditCard,
            legalEntity: form.legalEntity,
            bank: form.bank,
            amount: form.amount
        };
        try {
            const resp = await fetch(`http://localhost:9999/users/${id}/accounts`, {
                method: 'POST',
                mode:'no-cors',
                headers: {
                    'Content-Type' : 'application/json',
                    'Authorization' : token
                },
                body: JSON.stringify(requestBody)
            });
            const body = await  resp.json();
            localStorage.setItem('accountId', body.accountId);
        } catch (e) {
            alert('error');
        }
    }

    render() {
        const {account} = this.state;
        if(account){
            return (
                <ul className="list-group">
                    <li className="list-group-item">Credit Card: {account.creditCard}</li>
                    <li className="list-group-item">Legal Entity: {account.legalEntity}</li>
                    <li className="list-group-item">Bank: {account.bank}</li>
                    <li className="list-group-item">Amount: {account.amount}</li>
                </ul>
            )
        } else {
            return (
                <div className="create-account-form">
                    <div className="form-group">
                        <label htmlFor="credit-card">Credit Card</label>
                        <select id="inputState" className="form-control" onChange={(e) => this.setState({
                            form: {
                                creditCard: e.target.value,
                                legalEntity: this.state.form.legalEntity,
                                bank: this.state.form.bank,
                                amount: this.state.form.amount
                            }
                        })}>
                            <option value={true}>True</option>
                            <option value={false}>False</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="legal-entity">Legal Entity</label>
                        <select id="inputState" className="form-control" onChange={(e) => this.setState({
                            form: {
                                creditCard: this.state.form.creditCard,
                                legalEntity: e.target.value,
                                bank: this.state.form.bank,
                                amount: this.state.form.amount
                            }
                        })}>
                            <option value={true}>True</option>
                            <option value={false}>False</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="bank-name">Bank:</label>
                        <input
                            className="form-control"
                            type="text"
                            id="bank-name"
                            placeholder="enter your bank name"
                            onChange={(e) => {
                                this.setState({
                                    form:{
                                        creditCard: this.state.form.creditCard,
                                        legalEntity: this.state.form.legalEntity,
                                        bank:e.target.value,
                                        amount: this.state.form.amount
                                    }
                                })
                            }}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="amount">Amount:</label>
                        <input
                            className="form-control"
                            type="number"
                            id="amount"
                            step="25"
                            placeholder="enter amount"
                            onChange={(e) => {
                                this.setState({
                                    form:{
                                        creditCard: this.state.form.creditCard,
                                        legalEntity: this.state.form.legalEntity,
                                        bank:this.state.form.bank,
                                        amount: e.target.value
                                    }
                                })
                            }}
                        />
                    </div>

                    <button className="btn btn-primary" onClick={this.onCreateAccountClick}>CREATE ACCOUNT</button>
                </div>
            )
        }

    }

}

export default MyAccount;
