import React from "react";
import Card from "../../shared/components/UIElements/Card";
import './Auth.css';
import Input from "../../shared/components/FormElements/Input_temp1";
import Button from "../../shared/components/FormElements/Button";
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE} from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import { AUthContext } from "../../shared/context/auth-context";
import { useState, useContext } from "react";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
const Auth = () => {
    const auth = useContext(AUthContext);
    const [isLoginMode, setIsLoginMode] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
 const [formState, InputHandler, setFormData] = useForm({
    email:{
        value: '',
        isValid: false
    },
    password: {
       value: '',
       isValid: false 
    }

}, false);

const switchModeHandler = () => {
    if (!isLoginMode){
        setFormData({
            ...formState.inputs,
           name: undefined 
        }, formState.inputs.email.isValid && formState.inputs.password.isValid);


    }
    else{
        setFormData({
            ...formState.inputs,
            name: {
                value: '',
                isValid: false
            }
        }, false);
    }
    setIsLoginMode(prevMode => !prevMode);

};



    const authSubmitHandler = async event => {
  event.preventDefault();
  setIsLoading(true);
  setError(null); // clear any previous error

  try {
    const response = await fetch('http://localhost:5000/api/users/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: formState.inputs.name.value,
        email: formState.inputs.email.value,
        password: formState.inputs.password.value
      })
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.message || 'Signup failed!');
    }

    console.log('Signup successful:', responseData);
    setIsLoading(false);
    auth.login();
  } catch (err) {
    setIsLoading(false);
    setError(err.message || 'Something went wrong!');
  } 
};

const errorHandler = () => {
    setError(null);
};

    return (
      <React.Fragment>
        <ErrorModal error = {error} onClear = {errorHandler}/>

        <Card className="authentication">
            {isLoading && <LoadingSpinner asOverlay/>}
 
    <h2>Login Required</h2>
    <hr />

    <form onSubmit={authSubmitHandler}>
        {!isLoginMode && <Input element="input" id="name" type="text" label=" Your Name" validators ={[VALIDATOR_REQUIRE()]}
        errorText = "Please Enter a Name" onInput = {InputHandler}/> }


        <Input element="input" id="email" type="email" label="E-Mail" validators = {[VALIDATOR_EMAIL()]}
        errorText="please enter a valid email" onInput={InputHandler} />

         <Input element="input" id="password" type="password" label="PASSWORD" validators = {[VALIDATOR_MINLENGTH(5)]}
        errorText="please enter a valid password atleast 5 characters." onInput={InputHandler} />

        <Button type = "submit" disabled={!formState.isValid}>{isLoginMode ? 'LOGIN' : 'SIGNUP'}</Button>
    

    </form>
    <Button inverse onClick={switchModeHandler}>SWITCH TO {isLoginMode ? 'SIGNUP' : 'LOGIN'}</Button>
  
  </Card>
  </React.Fragment>
  
);
};
export default Auth;