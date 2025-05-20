import React , {useCallback, useReducer}from 'react';
import './NewPlace.css';
import Button from '../../shared/components/FormElements/Button';
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/util/validators'; 
import Input from '../../shared/components/FormElements/Input_temp1';

const formReducer = (state, action) => {
    switch(action.type){
        case 'INPUT_CHANGE':
            let formIsValid = true;
            for(const inputId in state.inputs){
                if (inputId === action.inputId){
                    formIsValid = formIsValid && action.isValid;
                }else {
                    formIsValid = formIsValid&& state.inputs[inputId].isValid;
                }

            }
         return {
            ...state,
            inputs:{
                ...state.inputs,
                [action.inputId]: {value: action.value, isValid: action.isValid}

            },
            isValid: formIsValid
         };
        default:
            return state;
    }
};

const NewPlace = () => {

    const [formState, dispatch]= useReducer(formReducer, {
        inputs: {
            title:{
                value: '',
                isValid: false
            },
            description:{
                value: '',
                isValid: false
            },
        },
        isValid: false

    });

    const InputHandler = useCallback((Id, value, isValid) => {
        dispatch({type: 'INPUT_CHANGE', value:value, isValid: isValid, inputId: Id});

    }, []);



    return ( <form className='place-form'>
        
        <Input id= "title" element= "textarea" label="Title" validators={[VALIDATOR_REQUIRE()]}
         errorText="Please enter a valid Title."
         onInput = {InputHandler} />

        <Input id="description" element= "textarea" label="Description" validators={[VALIDATOR_MINLENGTH(5)]}
         errorText="Please enter a valid Description (at least 5 characters)."
         onInput = {InputHandler} />
         
        <Button type = "submit" disabled={!formState.isValid}> ADD PLACE</Button>


    </form>
    );
};
export default NewPlace;
