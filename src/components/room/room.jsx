import React, { Component } from 'react';
import './room.css';
import DEFAULT_IMAGE from './noimage.jpeg';
import STAR from './star.png';
import {parseBoolean} from "../../utils/parsers";

export default class Room extends Component {
  constructor(props) {
    super(props);
    const {
      id, url, isVip, isFree, stars, cost, persons,
    } = this.props.room;
    this.state = {
      id,
      url,
      isVip,
      isFree,
      stars,
      cost,
      persons,
    };
  }


  componentDidMount() {
    const { stars } = this.state;
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
        <img src={STAR} alt="star" key={i} className="star" />,
      );
    }
    return starsList;
  };

  render() {
    const {
      id, url, isVip, isFree, stars, cost, persons,
    } = this.state;
    const starsList = this.createStarsList(stars);
    let bookBtn = null;
    const role = localStorage.getItem('role');
    const isAuthorized = parseBoolean( localStorage.getItem('isAuthorised'));
    if(isFree && role==='user' && isAuthorized){

      bookBtn = (
          <button className="btn btn-lg btn-primary" onClick={() => this.props.onBookClick(id)}>
            BOOK
          </button>
      );
    }

    return (
      <div className="room">
        <div className="main-photo">
          <img src={url || DEFAULT_IMAGE} alt="room" />
        </div>
        <div className="description">
          {starsList}
          <br />
          persons:
          {' '}
          {persons}
          <br />
          {isVip ? <span className="vip">VIP</span> : null}
          <br />
          {isFree ? <span className="free">FREE</span> : null}
          <br />
          {cost}
          $/day
        </div>
        <div className="bookBtn">
          {bookBtn}
        </div>
      </div>
    );
  }
}
