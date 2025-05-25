import React, {useContext} from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

import './NewPlace.css';
import Button from '../../../shared/components/FormElements/Button';
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../../shared/util/validators'; 
import Input from '../../../shared/components/FormElements/Input_temp1';
import { useForm } from '../../../shared/hooks/form-hook';
import { useHttpClient } from '../../../shared/hooks/http-hooks';
import { AUthContext } from '../../../shared/context/auth-context';
import ErrorModal from '../../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../../shared/components/UIElements/LoadingSpinner';
import './PlaceForm.css';




const NewPlace = () => {
    const auth = useContext(AUthContext);
    const {isLoading, error, sendRequest, clearError} = useHttpClient();
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


    const history = useHistory();


    const placeSubmitHandler =async  event => {
        event.preventDefault();
        console.log('Submitting place for user ID:', auth.userId);

        try{
            await sendRequest('http://localhost:5000/api/places', 'POST', JSON.stringify({
            title: formState.inputs.title.value,
            description: formState.inputs.description.value,
            address: formState.inputs.address.value,
            creator: auth.userId
           
        }),
        {'content-type' : 'application/json'}
         
    );

    history.push('/');
        }catch (err){

        }
        
        

    };

    return (
        <React.Fragment> 
            <ErrorModal error ={error} onClear = {clearError} /><form className='place-form ' onSubmit={placeSubmitHandler}>
                {isLoading && <LoadingSpinner asOverlay/>}
        
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
    </React.Fragment>
   
    );
};
export default NewPlace;
