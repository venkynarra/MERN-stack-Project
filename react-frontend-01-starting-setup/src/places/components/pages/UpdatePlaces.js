import React, {useEffect, useState} from "react";

import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import Input from "../../../shared/components/FormElements/Input_temp1";
import Button from "../../../shared/components/FormElements/Button";
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from "../../../shared/util/validators";
import { useForm } from "../../../shared/hooks/form-hook";
import './PlaceForm.css'
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
    const [isLoading, setIsLoading] = useState(true);
    const placeId = useParams().placeId;

    

    
    
     const [formState, InputHandler, setFormData] = useForm({
        title:{
            value: '',
            isValid: false
        },
        description:{
            value: '' ,
            isValid: false
        }
    }, false);
    const identifiedplace = DUMMY_PLACES.find(p =>p.id === placeId);
useEffect(() => {
    setFormData({
        title:{
            value: identifiedplace.title,
            isValid: true
        },
        description:{
            value: identifiedplace.description ,
            isValid: true
        }
    }, true);

setIsLoading(false);
}, [setFormData, identifiedplace]);
    
    const placeUpdateSubmitHandler = event => {
        event.preventDefault();
        console.log(formState.inputs)

    };


     if (!identifiedplace) {
    return (
      <div className="center">
        <h2>Could not find the place!</h2>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="center">
        <h2>Loading...</h2>
      </div>
    );
  }
    return (
        
  <div className="center">
    <form className="place-form" onSubmit = {placeUpdateSubmitHandler}>
      {/* Title */}
      <Input
        id="title"
        element="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid title."
        onInput={InputHandler}
        initialValue={formState.inputs.title.value}
        initialValid={formState.inputs.title.isValid}
      />

      {/* Description */}
      <Input
        id="description"
        element="textarea"
        label="Description"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a valid description (min 5 characters)."
        onInput={InputHandler}
        initialValue={formState.inputs.description.value}
        initialValid={formState.inputs.description.isValid}
      />

      {/* Submit */}
      <Button type="submit" disabled={!formState.isValid}>
        UPDATE PLACE
      </Button>
    </form>
  </div>
);


};
export default UpdatePlace;