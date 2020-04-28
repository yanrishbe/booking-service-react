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
                amount: this.props.user.account.amount,
                changeSum:''
            }
        } else {
            this.state = {
                creditCard:true,
                legalEntity: true,
                bank:'',
                amount:'',
                changeSum:''//CreditCard bool, LegalEntity bool, Bank String, Amount String
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
            if(resp.ok){
                const body = await resp.json();
                localStorage.setItem('accountId', body);
                alert('Account successfully created');
                window.location.reload();
            } else {
                throw Error('Sorry try again later');
            }

        } catch (e) {
            alert(e);
        }
    }

    onAmountChangeClick = async (e) => {
        const id = localStorage.getItem('userId');
        const accountId = localStorage.getItem('accountId');
        const token = localStorage.getItem('userToken');
        let amount = +this.state.changeSum;
        if(e.target.name === "minus") {
            amount -= amount*2;
        }
        amount = String(amount);
        const requestBody ={
            creditCard: this.state.creditCard,
            legalEntity: this.state.legalEntity,
            bank: this.state.bank,
            amount
        };
        try {
            const response = await fetch(`http://localhost:9999/users/${id}/accounts/${accountId}`,{
                method:'PUT',
                mode: 'cors',
                headers: {
                    'Authorization' : token,
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify(requestBody)
            })
            if(!response.ok) {
                alert("You wrote a wrong sum");
            }
            window.location.reload();
        } catch (e) {}
    }

    onBooleanValueChangeClick = async (e) => {
        const name = e.target.name;
        this.setState((s) => {
            return {
                [name] : !s[name]
            }
        })
        const id = localStorage.getItem('userId');
        const accountId = localStorage.getItem('accountId');
        const token = localStorage.getItem('userToken');
        const requestBody ={
            creditCard: this.state.creditCard,
            legalEntity: this.state.legalEntity,
            bank: this.state.bank,
            amount: "0",
        };
        requestBody[name] = !requestBody[name];
        try{
            const response = await fetch(`http://localhost:9999/users/${id}/accounts/${accountId}`, {
                method:'PUT',
                mode: 'cors',
                headers: {
                    'Authorization' : token,
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify(requestBody)
            })
            if(!response.ok) {
                alert("Sorry try again later");
            }

        }catch (e) {}
        window.location.reload();
    }

    onBankChangeClick = async () => {
        const id = localStorage.getItem('userId');
        const accountId = localStorage.getItem('accountId');
        const token = localStorage.getItem('userToken');
        const requestBody ={
            creditCard: this.state.creditCard,
            legalEntity: this.state.legalEntity,
            bank: this.state.bank,
            amount: "0",
        };
        try{
            const response = await fetch(`http://localhost:9999/users/${id}/accounts/${accountId}`, {
                method:'PUT',
                mode: 'cors',
                headers: {
                    'Authorization' : token,
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify(requestBody)
            })
            if(!response.ok) {
                alert("Sorry try again later");
            }

        }catch (e) {}
        window.location.reload();
    }

    render() {
        const {account} = this.props.user;
        let changeSum = null;
        if(account){
            changeSum = (
                <>
                    <div className="form-group">
                        <h5>Change money amount</h5>
                        <input
                            type="number"
                            className="form-control"
                            min="0"
                            step="20"
                            onChange={(e)=> {
                                this.setState({
                                    changeSum: e.target.value,
                                })
                            }}
                        />
                    </div>
                    <div className="row">
                        <button
                            name="minus"
                            className="btn btn-primary"
                            onClick={this.onAmountChangeClick}>
                            REMOVE
                        </button>
                        <button
                            name="plus"
                            className="btn btn-primary"
                            onClick={this.onAmountChangeClick}>
                            ADD
                        </button>
                    </div>
                </>
            );
            return (
                <ul className="list-group">
                    <div className="row">
                        <li className="list-group-item">Credit Card: {account.creditCard ? "true" : "false"}</li>
                        <button name="creditCard" onClick={this.onBooleanValueChangeClick} className="btn ptn-danger">CHANGE</button>
                    </div>
                    <div className="row">
                        <li className="list-group-item">Legal Entity: {account.legalEntity ? "true" : "false"}</li>
                        <button name="legalEntity" onClick={this.onBooleanValueChangeClick} className="btn ptn-danger">CHANGE</button>
                    </div>
                    <li className="list-group-item">
                        <div className="row">
                            <label htmlFor="bank-input">Bank:</label>
                            <input id="bank-input" defaultValue={account.bank} onChange={
                                (e) => {
                                    this.setState({
                                        bank:e.target.value
                                    })
                                }
                            }/>
                            <button className="btn btn-primary" onClick={this.onBankChangeClick}>CHANGE BANK</button>
                        </div>

                    </li>
                    <li className="list-group-item">Amount: {account.amount}</li>
                    {changeSum}
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
