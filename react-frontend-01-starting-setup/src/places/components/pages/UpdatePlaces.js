import React from "react";

import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import Input from "../../../shared/components/FormElements/Input_temp1";
import Button from "../../../shared/components/FormElements/Button";
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from "../../../shared/util/validators";
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
        title: 'Empire State Building',
        description: 'best sky scrapers',
        imageUrl: '/images/venky.png',
        address: '20 W 34th St, New York, NY 10001',
        location :{
            lat: 40.748440,
            lng: -73.9882393,
        },
        creator: 'u2'
    },

];


const UpdatePlace = () => {
    const placeId = useParams().placeId;
    const identifiedplace = DUMMY_PLACES.find(p =>p.id === placeId)
    if(!identifiedplace) {
        return(
            <div className="center">
                <h2> Could not fin the place!</h2>

            </div>
        );
    }
    
    return <form>
        <Input id="title" element = "input" type = "text" label= "Title" validators = {[VALIDATOR_REQUIRE()]}
        errortext="Please enter a valid title." onInput={()=> {}} value ={identifiedplace.title} valid={true}/>


        <Input id="description" element = "textarea"  label= "Description" validators = {[VALIDATOR_MINLENGTH(5)]}
        errortext="Please enter a valid description of (min 5 charecters)." onInput={()=> {}} value ={identifiedplace.description} valid={true}/>

        <Button type="submit" disabled={true}>UPDATE PLACE</Button>


    </form>;

};
export default UpdatePlace;