import React, {Component} from 'react';

class SignInForm extends Component {

    constructor(props) {
        super(props);
    }

    onSignInFormSubmit = async (event) => {
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;
        const data = JSON.stringify({email, password});
        try {
            const response = await fetch('http://localhost:9999/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                mode: 'cors',
                body: data
            });
            const body = await response.json();

            localStorage.clear();
            localStorage.setItem("userToken", body.token);
            localStorage.setItem("role", body.role);
            localStorage.setItem("isAuthorised", "true");
            localStorage.setItem("userId", body.userId);

            console.log(localStorage.getItem('role'))
            console.log(localStorage.getItem('isAuthorised'))
        } catch (e) {
            alert('Sorry something wrong');
        }

    }


    render() {
        const {isVisible} = this.props;

        if (isVisible) {
            return (
                <div className="container">
                    <div className="col-6"></div>
                    <div className="col-6">
                        <form onSubmit={this.onSignInFormSubmit}>
                            <div className="form-group">
                                <label htmlFor="signInEmail">Email address</label>
                                <input type="email" name="email" className="form-control" id="signInEmail"
                                       aria-describedby="emailHelp" placeholder="Enter email"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="sigInPassword">Password</label>
                                <input type="password" name="password" className="form-control" id="sigInPassword"
                                       placeholder="Password"/>
                            </div>
                            <button type="submit" className="btn btn-primary">SIGN IN</button>
                        </form>
                    </div>
                </div>
            )
        }
        return null;
    }
}

export default SignInForm;
