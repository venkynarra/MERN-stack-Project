import React from "react";
import Card from "../../shared/components/UIElements/Card";
import './Auth.css';
import Input from "../../shared/components/FormElements/Input_temp1";
import Button from "../../shared/components/FormElements/Button";
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH} from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";

const Auth = () => {
 const [formState, InputHandler] = useForm({
    email:{
        value: '',
        isVlaid: false
    },
    password: {
       value: '',
       isValid: false 
    }

}, false)

    const authSubmitHandler = event => {
        event.preventDefault();
        console.log(formState.inputs);

    };
    return (
        <Card className="authentication">
 
    <h2>Login Required</h2>
    <hr />

    <form onSubmit={authSubmitHandler}>
        <Input element="input" id="email" type="email" label="E-Mail" validators = {[VALIDATOR_EMAIL()]}
        errorText="please enter a valid email" onInput={InputHandler} />

         <Input element="input" id="password" type="password" label="PASSWORD" validators = {[VALIDATOR_MINLENGTH(5)]}
        errorText="please enter a valid password atleast 5 characters." onInput={InputHandler} />

        <Button type = "submit" disabled={!formState.isValid}>LOGIN</Button>
    

    </form>
  
  </Card>
);
};
export default Auth;