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

  fetchRooms = async () => {
    try {
      const userId = localStorage.getItem('userId');
      const token = localStorage.getItem('userToken');
      const resp = await fetch(`http://localhost:9999/users/${userId}/bookings`,{
        method:'GET',
        mode:'cors',
        headers: {
          'Content-Type' : 'application/json',
          'Authorization' : token
        }
      });
      const body = await resp.json();
      console.log(body);
      this.setState({
        loading: false,
        roomsList: body,
      });
    }catch (e) {
      console.log('er');
      console.log(e)
    }
    // this.roomsService.getAllRooms()
    //   .then((rooms) => {
    //     this.#onRoomsLoaded(rooms);
    //   });
  };


  render() {
    const { loading, roomsList } = this.state;
    if (loading) {
      return (
        <Spinner />
      );
    }
    return <RoomsList roomsList= {roomsList}/>;
  }
}
