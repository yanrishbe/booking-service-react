import React, { Component } from 'react';
import './room.css';
import DEFAULT_IMAGE from './noimage.jpeg';
import STAR from './star.png';

export default class Room extends Component {
  constructor(props) {
    super(props);
    const {
      url, isVip, isFree, stars, cost, persons,
    } = this.props;
    this.state = {
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
        <img src={STAR} alt="star" className="star" />,
      );
    }
    return starsList;
  };

  render() {
    const {
      url, isVip, isFree, stars, cost, persons,
    } = this.state;
    const starsList = this.createStarsList(stars);

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
      </div>
    );
  }
}
