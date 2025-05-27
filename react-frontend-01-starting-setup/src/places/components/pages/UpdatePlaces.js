import React, {useEffect, useState, useContext} from "react";

import { useParams, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Input from "../../../shared/components/FormElements/Input_temp1";
import Button from "../../../shared/components/FormElements/Button";
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from "../../../shared/util/validators";
import { useForm } from "../../../shared/hooks/form-hook";
import { useHttpClient } from "../../../shared/hooks/http-hooks";
import LoadingSpinner from "../../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../../shared/components/UIElements/ErrorModal";
import { AuthContext } from "../../../shared/context/auth-context";
import './PlaceForm.css'




const UpdatePlace = () => {
  const auth = useContext(AuthContext);
  const {isLoading, error, sendRequest, clearError} = useHttpClient();
  const[loadedplaces , setLoadedPlaces] = useState();
  
    const placeId = useParams().placeId;
    const history = useHistory();

    

    
    
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
   

   useEffect(() => {
  const fetchPlaces = async () => {
    try {
      const responseData = await sendRequest(`http://localhost:5000/api/places/${placeId}`);
      setLoadedPlaces(responseData.place);
      setFormData({
        title: {
          value: responseData.place.title,
          isValid: true
        },
        description: {
          value: responseData.place.description,
          isValid: true
        }
      }, true);
    } catch(err) {
      // handle error
    }
  };

  fetchPlaces(); // 
}, [sendRequest, placeId, setFormData]);



    


    
    const placeUpdateSubmitHandler = async event => {
        event.preventDefault();
        try{
          await sendRequest(`http://localhost:5000/api/places/${placeId}`, 'PATCH', JSON.stringify({
          title: formState.inputs.title.value,
          description: formState.inputs.description.value
        }), {
          'Content-Type': 'application/json'
        });
        history.push('/'+ auth.userId + '/places');
        }catch (err){

        }
        
        

    };


     if (isLoading) {
  return (
    <div className="center">
      <LoadingSpinner/>
      <h2>Loading...</h2>

    </div>
  );
}

if (!loadedplaces && !error) {
  return (
    <div className="center">
      <h2>Could not find the place!</h2>
    </div>
  );
}
    return ( <React.Fragment>
      <ErrorModal error = {error} onClear = {clearError} />
        
  <div className="center">
    {!isLoading && loadedplaces && (<form className="place-form" onSubmit = {placeUpdateSubmitHandler}>
      {/* Title */}
      <Input
        id="title"
        element="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid title."
        onInput={InputHandler}
        initialValue={loadedplaces.title}
        initialValid={true}
      />

      {/* Description */}
      <Input
        id="description"
        element="textarea"
        label="Description"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a valid description (min 5 characters)."
        onInput={InputHandler}
        initialValue={loadedplaces.description}
        initialValid={true}
      />

      {/* Submit */}
      <Button type="submit" disabled={!formState.isValid}>
        UPDATE PLACE
      </Button>
    </form>)};
  </div>
  </React.Fragment>
);


};
export default UpdatePlace;