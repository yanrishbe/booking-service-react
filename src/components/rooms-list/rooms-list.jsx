import './rooms-list.css';
import React from 'react';
import Room from '../room/room';

const RoomsList = (props) => {
  const { roomsList } = props;
  if(props === null) {
    return null;
  }
  const roomsModified = roomsList.map((room) => <li key={room.id}><Room room = {room} onBookClick = {props.onBookClick} /></li>);
  return (
    <ul>
      {roomsModified}
    </ul>
  );
};
export default RoomsList;
