import React, {Component} from "react";
import './admin-room.css'

const UPDATE_ROOM_INFO_URL='lol';

export default class AdminRoom extends Component {
    constructor(props) {
        super(props);
        const {
            url, isVip, isFree, stars, cost, persons,
        } = this.props.room;
        let accessToken = this.props.accessToken||'dsfvinjemvijenfvoekdnmvokenfbvjo';
        this.state = {
            url,
            isVip,
            isFree,
            stars,
            cost,
            persons,
            accessToken
        };
    }

    onFormSubmit =  (event) => {
        event.preventDefault();
        const url = event.target.url.value;
        const isVip = event.target.isVip.value;
        const isFree = event.target.isFree.value;
        const stars = event.target.stars.value;
        const cost = event.target.cost.value;
        const persons = event.target.persons.value;
        console.log({url,isVip,isFree, stars, cost, persons});
        fetch(UPDATE_ROOM_INFO_URL, {
           method: "POST",
           headers: {
               'Content-Type': 'application/json;charset=utf-8',
               'access_token': this.state.accessToken,
           },
           mode: "no-cors",
           body: JSON.stringify({url,isVip,isFree, stars, cost, persons}),
        })
        .then((resp) => {
            if(!resp.ok){
                alert('Sorry something wrong');
            } else {
                alert('Thank you!');
            }
        });
    };

    render() {
        const {
            url,  stars, cost, persons,
        } = this.state;

        return (
            <div className="room">
                <form onSubmit={this.onFormSubmit}>
                    <label htmlFor="room-image-url">Room Image URL: </label>
                    <input type="text" defaultValue={url} id="room-image-url" name="url"/>
                    <img src={url} alt=""/>
                    <br/>
                    <label htmlFor="is-vip-radio-buttons">IS VIP</label>
                    <div id="is-vip-radio-buttons">
                        True<input type="radio" name="isVip" value="true" defaultChecked={true}/>
                        False<input type="radio" name="isVip" value="false"/>
                    </div>
                    <br/>

                    <label htmlFor="is-free-radio-buttons">IS FREE</label>
                    <div id="is-free-radio-buttons">
                        True<input type="radio" name="isFree" value="true" defaultChecked={true}/>
                        False<input type="radio" name="isFree" value="false"/>
                    </div>
                    <br/>
                    <label htmlFor="rooms-stars">Stars: </label>
                    <input id="rooms-stars" type="number" name="stars" defaultValue={stars} max="5" min="1"/>

                    <label htmlFor="rooms-cost">Cost:</label>
                    <input id="rooms-cost" type="number" name="cost" defaultValue={cost} min="0"/>

                    <label htmlFor="rooms-persons">Persons:</label>
                    <input id="rooms-persons" type="number" name="persons" defaultValue={persons} min="1"/>

                    <button type="submit">Confirm Changes</button>
                </form>
            </div>
        );
    }
}
