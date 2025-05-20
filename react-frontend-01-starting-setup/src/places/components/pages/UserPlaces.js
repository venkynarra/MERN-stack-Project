import React from "react";
import {useParams} from 'react-router-dom';
import PlaceList from "../PlaceList";

const DUMMY_PLACES = [
    {
        id: 'p1',
        title: 'Empire State Building',
        description: 'best sky scrapers',
        imageUrl: '/images/venky.png',
        address: '20 W 34th St, New York, NY 10001',
        location :{
            lat: 40.748440,
            lng: -73.9882393,
        },
        creator: 'u1'
    },
    {
        id: 'p2',
        title: 'Emp. State Building',
        description: 'sky scrapers in New York!',
        imageUrl: '/images/venky.png',
        address: '20 W 34th St, New York, NY 10001',
        location :{
            lat: 40.748440,
            lng: -73.9882393,
        },
        creator: 'u2'
    },

];

const UserPlaces = () => {
    const userId =useParams().userId;
    const loadedplaces = DUMMY_PLACES.filter(place => place.creator === userId);
    return <PlaceList items={loadedplaces}/>
  
};
export default UserPlaces;