import React, {Component} from 'react';

class SignInForm extends Component {
    onSignInFormSubmit = async (event) => {
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;
        const data = JSON.stringify({email, password});

        let body = {};
        try {
            const response = await fetch('http://localhost:9999/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                mode: 'cors',
                body: data
            });

            body = await response.json();
            if (response.status === 401) {
                throw new Error('Email and password mismatch');
            } else if (response.status !== 200) {
                throw new Error('Sorry something is wrong');
            }
        } catch (e) {
            alert(e.message);
            return;
        }

        localStorage.clear();
        localStorage.setItem("userToken", body.token);
        localStorage.setItem("role", body.role);
        localStorage.setItem("isAuthorised", "true");
        localStorage.setItem("userId", body.userId);
        this.props.onSignInClick(body.userId, body.token, body.role);
    };


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
