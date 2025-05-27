import React, {useContext} from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

import './NewPlace.css';
import Button from '../../../shared/components/FormElements/Button';
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../../shared/util/validators'; 
import Input from '../../../shared/components/FormElements/Input_temp1';
import { useForm } from '../../../shared/hooks/form-hook';
import { useHttpClient } from '../../../shared/hooks/http-hooks';
import { AuthContext } from '../../../shared/context/auth-context';
import ErrorModal from '../../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../../shared/components/UIElements/LoadingSpinner';
import ImageUpload from '../../../shared/components/FormElements/ImageUpload';
import './PlaceForm.css';




const NewPlace = () => {
    const auth = useContext(AuthContext);
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
            image: {
                value: null,
                isValid: false
            }
        }, false);


    const history = useHistory();


    const placeSubmitHandler =async  event => {
        event.preventDefault();
        console.log('Submitting place for user ID:', auth.userId);

        try{
            const formData = new FormData();
            formData.append('title',  formState.inputs.title.value);
            formData.append('description',  formState.inputs.description.value);
            formData.append('address',  formState.inputs.address.value);
            formData.append('creator',  auth.userId);
            formData.append('image',  formState.inputs.image.value);
            
            
            
            await sendRequest(
  'http://localhost:5000/api/places',
  'POST',                 // ✅ HTTP method
  formData , {
    Authorization: 'Bearer ' + auth.token
  }              // ✅ Request body (FormData)
  // no headers needed for FormData
);
    history.push('/');
        }catch (err){

        }
        
        

    };

    return (
        <React.Fragment> 
  <ErrorModal error={error} onClear={clearError} />
  <form className='place-form' onSubmit={placeSubmitHandler}>
    {isLoading && <LoadingSpinner asOverlay />}

    <Input
      id="title"
      element="textarea"
      label="Title"
      validators={[VALIDATOR_REQUIRE()]}
      errorText="Please enter a valid Title."
      onInput={InputHandler}
    />

    <Input
      id="description"
      element="textarea"
      label="Description"
      validators={[VALIDATOR_MINLENGTH(5)]}
      errorText="Please enter a valid Description (at least 5 characters)."
      onInput={InputHandler}
    />

    <Input
      id="address"
      element="input"
      label="Address"
      validators={[VALIDATOR_REQUIRE()]}
      errorText="Please enter a valid Address."
      onInput={InputHandler}
    />

    <ImageUpload
      id="image"
      onInput={InputHandler}
      errorText="Please provide an image"
    />

    <Button type="submit" disabled={!formState.isValid}>
      ADD PLACE
    </Button>
  </form>
</React.Fragment>

   
    );
};
export default NewPlace;
