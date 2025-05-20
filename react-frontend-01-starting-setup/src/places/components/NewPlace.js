import React , {useCallback}from 'react';
import './NewPlace.css';
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/util/validators'; 
import Input from '../../shared/components/FormElements/Input_temp1';

const NewPlace = () => {

    const titleInputHandler = useCallback((Id, value, isValid) => {

    }, []);

    const descriptionnputHandler = useCallback((Id, value, isValid) => {

    }, []);

    return ( <form className='place-form'>
        
        <Input id= "title" element= "textarea" label="Title" validators={[VALIDATOR_REQUIRE()]}
         errorText="Please enter a valid Title."
         onInput = {titleInputHandler} />

        <Input id="Description" element= "textarea" label="Description" validators={[VALIDATOR_MINLENGTH(5)]}
         errorText="Please enter a valid Description (at least 5 characters)."
         onInput = {descriptionnputHandler} />

    </form>
    );
};
export default NewPlace;
