import React, {Component} from 'react';
import './room.css';
import DEFAULT_IMAGE from './noimage.jpeg';
import STAR from './star.png';
import {parseBoolean} from "../../utils/parsers";

export default class Room extends Component {
    constructor(props) {
        super(props);
        const {
            id, url, isVip, stars, price, persons, empty
        } = this.props.room;
        this.state = {
            id,
            url,
            isVip,
            stars,
            price,
            persons,
            empty,
            maxDays: '1'
        };
    }


    componentDidMount() {
        const {stars} = this.state;
        if (stars < 5) {
            this.setState({
                isVip: false,
            });
        }
    }

    createStarsList = (stars) => {
        const starsList = [];
        for (let i = 0; i < stars; i += 1) {
            starsList.push(
                <img src={STAR} alt="star" key={i} className="star"/>,
            );
        }
        return starsList;
    };

    onBookCLick = async () => {
        try {
            const token = localStorage.getItem('userToken');
            const userId = localStorage.getItem('userId');
            const id = this.state.id;
            const requestBody = {
                id: String(id),
                maxDays: +this.state.maxDays,
            }

            const response = await fetch(`http://localhost:9999/users/${userId}/bookings`, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token,
                },
                body: JSON.stringify(requestBody),
            })
            if (!response.ok) {
                const body = await response.json();
                alert(body.error);
            } else {
                alert('Successful booking');
            }
        } catch (e) {
        }
    }

    render() {
        const {
            url, isVip, stars, price, persons, empty
        } = this.state;
        const starsList = this.createStarsList(stars);
        let bookBtn = null;
        const role = localStorage.getItem('role');
        const isAuthorized = parseBoolean(localStorage.getItem('isAuthorised'));
        if ((empty === undefined || empty && role === 'user') && isAuthorized && localStorage.getItem("accountId")) {

            bookBtn = (
                <>
                    <input type="number" max="100" min="1" defaultValue="1" required className="form-group"
                           onChange={(e) => {
                               const val = e.target.value;
                               this.setState({
                                   maxDays: val
                               })
                           }}/>
                    <button className="btn btn-lg btn-primary" onClick={this.onBookCLick}>
                        BOOK
                    </button>
                </>
            );
        }


        return (
            <div className="room">
                <div className="main-photo">
                    <img src={url || DEFAULT_IMAGE} alt="room"/>
                </div>
                <div className="description">
                    {starsList}
                    <br/>
                    persons:
                    {' '}
                    {persons}
                    <br/>
                    {isVip ? <span className="vip">VIP</span> : <span className="vip">Regular</span>}
                    <br/>
                    {price}
                    {' '}
                    BYN/day
                    <br/>
                    {empty ? <span className="empty">Available</span> : <span className="empty">Busy</span>}
                    <br/>
                </div>
                <div className="bookBtn">
                    {bookBtn}
                </div>
            </div>
        );
    }
}
