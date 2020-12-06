import React, {Component} from "react";
import './admin-panel.css';
import MyAccount from "../my-account/my-account";

class AdminPanel extends Component {

    state = {
        loading: true,
        users: null,
        roomsList: undefined,
        adminAccount: null,
        user: this.props.user,
        showChangeBookingDuration: false,
        changeBookingDurationValue: 0
    };

    constructor(props) {
        super(props);
        this.setState((s) => {
            return {
                user: props.user
            }
        });
        localStorage.setItem('accountId', this.props.user.account.id);
    }

    componentDidMount() {
        try {
            const token = localStorage.getItem('userToken');
            fetch('http://localhost:9999/users', {
                headers: {
                    'Authorization': token,
                    'Content-Type': 'application/json'
                },
                mode: 'cors'
            }).then((resp) => {
                return resp.json();
            }).then((body) => {
                this.setState({
                    users: body
                })
            }).catch((err) => {
                console.log(err)
            })
            const userId = localStorage.getItem('userId');
            fetch(`http://localhost:9999/users/${userId}`, {
                headers: {
                    'Authorization': token,
                    'Content-Type': 'application/json'
                },
                mode: 'cors'
            }).then((resp) => {
                return resp.json();
            }).then((body) => {
                this.setState({
                    adminAccount: body,
                    user: body
                })
            }).catch((err) => {
                console.log(err)
            })
        } catch (e) {
            console.log(e)
        }
    }

    onDeleteClick = async (id) => {
        try {
            const token = localStorage.getItem('userToken');
            const response = await fetch(`http://localhost:9999/users/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': token,
                    'Content-Type': 'application/json'
                },
            });
            if (response.ok) {
                alert('You deleted the account');
            } else {
                throw Error();
            }
        } catch (e) {
            alert('Sorry something is wrong. For your safety, log in again');
            localStorage.clear();
        }
    }

    onDeleteBookingClick = async (id, bookingId) => {
        try {
            const token = localStorage.getItem("userToken");
            const response = await fetch(`http://localhost:9999/users/${id}/bookings/${bookingId}`, {
                method: 'DELETE',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                }
            })
            if (response.status === 204) {
                window.location.reload();
            } else {
                const body = await response.json();
                alert(body.message);
            }
        } catch (e) {
            alert(e.message);
        }
    }

    onLessMoreButtonClick = async (polarity, id, bookingId) => {
        let changeValue = 0;

        if (polarity === "less") {
            changeValue = 0 - this.state.changeBookingDurationValue;
        } else {
            changeValue = this.state.changeBookingDurationValue;
        }

        try {
            console.log("change value")
            console.log(changeValue)
            const token = localStorage.getItem('userToken');
            const response = await fetch(`http://localhost:9999/users/${id}/bookings/${bookingId}`, {
                method: 'PUT',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
                body: JSON.stringify({
                    maxDays: changeValue
                })
            });
            if (response.status === 202) {
                alert('successfully changed');
                window.location.reload();
            } else {
                const resp = await response.json();
                if (response.status / 200 !== 1) {
                    throw new Error(resp.error);
                }
            }
        } catch (e) {
            alert(e.message);
        }
    }

    changeBookingDuration = null;

    onChangeBookingDurationClick = (id, bookingId) => {
        this.setState((s) => {
            return {
                showChangeBookingDuration: !s.showChangeBookingDuration
            }
        })
        this.changeBookingDuration = !this.state.showChangeBookingDuration ? (
            <div className="row">
                <button className="btn btn-danger" name="less"
                        onClick={() => this.onLessMoreButtonClick('less', id, bookingId)}>LESS
                </button>
                <input type="number" min="0" required defaultValue="0" onChange={(e) => {
                    const val = e.target.value;
                    this.setState({
                        changeBookingDurationValue: +val
                    })
                }}/>
                <button className="btn btn-success" name="more"
                        onClick={() => this.onLessMoreButtonClick('more', id, bookingId)}>MORE
                </button>
            </div>
        ) : null;
    }


    render() {
        if (this.state.users) {
            const adminId = localStorage.getItem("userId");
            const usersModified = this.state.users.map((e) => {
                let booking = null;
                if (e.booking) {
                    booking = (
                        <ul className="list-group">
                            <li className="list-group-item">BOOKING:<h3></h3></li>
                            <li className="list-group-item">VIP class: {e.booking.vip ? "yes" : "no"}</li>
                            <li className="list-group-item">Price: {e.booking.price}</li>
                            <li className="list-group-item">Stars: {e.booking.stars}</li>
                            <li className="list-group-item">Persons: {e.booking.persons}</li>
                            <li className="list-group-item">Days: {e.booking.maxDays}
                                <button className="btn btn-primary"
                                        onClick={() => {
                                            this.onChangeBookingDurationClick(e.id, e.booking.id)
                                        }}>Change booking duration
                                </button>
                                {this.changeBookingDuration}
                            </li>
                            <li className="list-group-item">
                                <button className="btn btn-danger" onClick={async () => {
                                    await this.onDeleteBookingClick(e.id, e.booking.id)
                                }}>
                                    DELETE BOOKING
                                </button>
                            </li>
                        </ul>
                    )
                }
                return (
                    <li className="list-group-item">
                        <ul className="list-group">
                            <li className="list-group-item">Account identificator: {e.accountId}</li>
                            <li className="list-group-item">Name: {e.name} </li>
                            <li className="list-group-item">Surname: {e.surname}</li>
                            <li className="list-group-item">Patronymic: {e.patronymic}</li>
                            <li className="list-group-item">Phone: {e.phone}</li>
                            <li className="list-group-item">Email: {e.email}</li>
                            {adminId !== e.id && <button className="btn btn-lg btn-danger" onClick={async () => {
                                await this.onDeleteClick(e.id)
                            }}>DELETE PROFILE
                            </button>
                            }
                            <li className="list-group-item">{booking}</li>
                        </ul>
                    </li>

                )
            })
            return (
                <>
                    <MyAccount user={this.state.user}/>
                    <ul className="list-group container">
                        {usersModified}
                    </ul>
                </>
            )
        }
        return null;
    }
}

export default AdminPanel;
