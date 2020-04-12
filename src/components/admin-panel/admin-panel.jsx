import React, {Component} from "react";
import './admin-panel.css';
import RoomsService from "../../services/rooms-service";
import Spinner from "../spinner/spinner";
import AdminRoom from "../admin-room/admin-room";

class AdminPanel extends Component {
    roomsService = new RoomsService();

    state = {
        loading: true,
        roomsList: undefined,
    };

    componentDidMount() {
        this.fetchAdminRooms();
    }

    #onAdminRoomsLoaded = (rooms) => {
        this.setState({
            loading: false,
            roomsList: rooms,
        });
    };

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        const { loading } = this.state;
        return !(nextState.loading === loading && loading === false);
    }

    fetchAdminRooms = () => {
        this.roomsService.getAllRooms()
            .then((rooms) => {
                this.#onAdminRoomsLoaded(rooms);
            });
    };


    render() {
        const { loading, roomsList } = this.state;

        if (loading) {
            return (
                <Spinner />
            );
        } else {
            const roomsModified = roomsList.map((room) => {
                return <li>
                    <AdminRoom
                        room = {room}
                        accessToken = {localStorage.getItem('access_token')}
                    />
                </li>
            });
            return <ul>
                {roomsModified}
            </ul>;
        }

    }
}

export default AdminPanel;
