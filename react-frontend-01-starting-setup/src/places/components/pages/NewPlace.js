import React from 'react';

import './NewPlace.css';
import Button from '../../../shared/components/FormElements/Button';
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../../shared/util/validators'; 
import Input from '../../../shared/components/FormElements/Input_temp1';
import { useForm } from '../../../shared/hooks/form-hook';
import './PlaceForm.css';



const NewPlace = () => {
    const [formState, InputHandler] = useForm({
            title:{
                value: '',
                isValid: false
            },
            description:{
                value: '',
                isValid: false
            },
            address:{
                value: '',
                isValid: false
            },
        }, false);


    


    const placeSubmitHandler = event => {
        event.preventDefault();
        console.log(formState.inputs);


    };

    return ( <form className='place-form ' onSubmit={placeSubmitHandler}>
        
        <Input id= "title" element= "textarea" label="Title" validators={[VALIDATOR_REQUIRE()]}
         errorText="Please enter a valid Title."
         onInput = {InputHandler} />

        <Input id="description" element= "textarea" label="Description" validators={[VALIDATOR_MINLENGTH(5)]}
         errorText="Please enter a valid Description (at least 5 characters)."
         onInput = {InputHandler} />

         <Input id="address" element= "input" label="Address" validators={[VALIDATOR_REQUIRE(0)]}
         errorText="Please enter a valid Address."
         onInput = {InputHandler} />
         
        <Button type = "submit" disabled={!formState.isValid}> ADD PLACE</Button>


    </form>
    );
};
export default NewPlace;
