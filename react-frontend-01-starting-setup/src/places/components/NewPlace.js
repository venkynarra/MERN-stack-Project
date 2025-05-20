import React , {useCallback}from 'react';
import './NewPlace.css';
import { VALIDATOR_REQUIRE } from '../../shared/util/validators'; 
import Input from '../../shared/components/FormElements/Input_temp1';

const NewPlace = () => {

    const titleInputHandler = useCallback((Id, value, isValid) => {

    }, []);
    return ( <form className='place-form'>
        
        <Input element= "input" type="text" label="Title" validators={[VALIDATOR_REQUIRE()]}
         errorText="Please enter a valid Title."
         onInput = {titleInputHandler} />

    </form>
    );
};
export default NewPlace;
