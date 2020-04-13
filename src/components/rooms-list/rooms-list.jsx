import './rooms-list.css';
import React from 'react';
import Room from '../room/room';

const RoomsList = (props) => {
  const { roomsList } = props;
  const roomsModified = roomsList.map((room) => <li><Room room = {room} onBookClick = {props.onBookClick} /></li>);
  return (
    <ul>
      {roomsModified}
    </ul>
  );
};
export default RoomsList;
