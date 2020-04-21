import React, {Component} from "react";

class UpdateMyProfileForm extends Component{
    constructor(props) {
        super(props);
        const {name, surname, patronymic, phone, email} = this.props.user;
        this.setState({
            form: {
                name, surname, patronymic, phone, email
            },
        });
    }

    onChangeHandler= (e) => {
        const targetElement = e.target.name;
        const targetValue = e.target.value;

        this.setState({
            ...this.state.form,
            [targetElement]: targetValue
        })
    }

    onUpdateClick = async (e) => {
        try{
            const id = localStorage.getItem('userId');
            const token = localStorage.getItem('userToken');
            const response = await fetch(`localhost:9999/users/${id}`, {
                method: 'PUT',
                headers: {
                    'Authorization' : token,
                    'Content-Type' : 'application/json'
                },
                mode: 'no-cors'
            });
            if(response.ok) {
                alert('Updated Successfully');
            }

        } catch (e) {

        }
    }

    render() {
        return(
            <div>
                <label
                    className="input-group-text"
                    htmlFor="name">
                    Name:
                </label>
                <input
                    className="form-control"
                    type="text" name="name"
                    id="name"
                    value={this.state.name}
                    onChange={this.onChangeHandler}/>

                <label
                    className="input-group-text"
                    htmlFor="surname">
                    Surname:
                </label>
                <input
                    className="form-control"
                    type="text"
                    name="surname"
                    id="surname"
                    value={this.state.surname}
                    onChange={this.onChangeHandler}/>

                <label
                    className="input-group-text"
                    htmlFor="patronymic">
                    Patronymic:
                </label>
                <input
                    className="form-control"
                    type="text"
                    name="patronymic"
                    id="patronymic"
                    value={this.state.patronymic}
                    onChange={this.onChangeHandler}/>

                <label
                    className="input-group-text"
                    htmlFor="phone">
                    Phone:
                </label>
                <input
                    className="form-control"
                    type="text"
                    name="phone"
                    id="phone"
                    value={this.state.phone}
                    onChange={this.onChangeHandler}/>

                <label
                    className="input-group-text"
                    htmlFor="email">
                    Email:
                </label>
                <input
                    className="form-control"
                    type="email"
                    name="email"
                    id="email"
                    value={this.state.email}
                    onChange={this.onChangeHandler}/>

                <button className="btn btn-secondary" onClick={this.onUpdateClick}>Update</button>
            </div>
        )
    }
}

export default UpdateMyProfileForm;
