import React,{Component} from "react";

class MyAccount extends Component {

    constructor(props) {
        super(props);
        if(props.user.account){
            this.state = {
                showChangeAccountInfo: false,
                form:{
                    cardCredit: props.user.account.cardCredit,
                    legalEntity: props.user.account.legalEntity,
                    bank: props.user.account.bank,
                    amount: props.user.account.amount
                }
            }
        }

    }

    changeHandler = (e) => {
        this.setState({ form: {
            [e.target.name] : [e.target.value]
        }})
    }
    onChangeClick = async (e) => {
        try{
            const id = localStorage.getItem('userId');
            const token = localStorage.getItem('token');
            await fetch(`localhost:9999/users/${id}/accounts`,{
                method: 'POST',
                headers:{
                    'Content-Type' : 'application/json',
                    'Authorisation' : token
                },
                mode: 'no-cors',
                body: this.state.form
            });
        } catch (e) {
            alert('sorry');
        }
    }

    changeAccountForm = () => {
        return (
            <div>
                <input type="text" name="card-credit" value={this.state.form.cardCredit} onChange={this.changeHandler}/>
                <input type="text" name="legal-entity" value={this.state.form.legalEntity} onChange={this.changeHandler}/>
                <input type="text" name="bank" value={this.state.form.bank} onChange={this.changeHandler}/>
                <input type="text" name="amount" value={this.state.form.amount} onChange={this.changeHandler}/>
                <button className="btn" onClick={this.onChangeClick}> CHANGE</button>
            </div>
        )
    }



    render() {
        const account = this.props.user.account;
        if(!account.id) {
            return null;
        }
        let changeAccountInfo = null;
        if( !this.state.user.account){
            return null;
        }
        if(this.state.showChangeAccountInfo ){
            changeAccountInfo = this.changeAccountForm(this.state.form)
        }

        return (
            <div className="my-account">
                <ul>
                    <li className="list-group-item">Card Credit: {account.cardCredit}</li>
                    <li className="list-group-item">Legal Entity: {account.legalEntity}</li>
                    <li className="list-group-item">Bank: {account.bank}</li>
                    <li className="list-group-item">Amount: {account.amount}</li>
                </ul>
                <button className="btn btn-primary" onClick= { () =>{
                    this.setState((s)=> {
                        return {
                            showChangeAccountInfo: !s.showChangeAccountInfo
                        }
                    })
                }}>
                    CHANGE ACCOUNT INFO
                </button>
                {changeAccountInfo}
            </div>

        )
    }
}
export default MyAccount;
