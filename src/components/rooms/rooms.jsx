import React, { Component } from 'react';
import './rooms.css';
import RoomsService from '../../services/rooms-service';
import Spinner from '../spinner/spinner';
import RoomsList from "../rooms-list/rooms-list";

export default class Rooms extends Component {
  roomsService = new RoomsService();

  constructor() {
    super();
    this.state = {
      loading: true,
      roomsList: null,
    };
  }

  componentDidMount() {
    this.fetchRooms();
  }

  #onRoomsLoaded = (rooms) => {
    this.setState({
      loading: false,
      roomsList: rooms,
    });
  };

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    const { loading } = this.state;
    if (nextState.loading === loading && loading === false) {
      return false;
    }

    return true;
  }

  fetchRooms = () => {
    this.roomsService.getAllRooms()
      .then((rooms) => {
        this.#onRoomsLoaded(rooms);
      });
  };


  render() {
    const { loading, roomsList } = this.state;
    if (loading) {
      return (
        <Spinner />
      );
    }
    return <RoomsList roomsList= {roomsList} onBookClick = {this.props.onBookClick}/>;
  }
}
