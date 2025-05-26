import React, { useState, useContext } from "react";
import Card from "../../shared/components/UIElements/Card";
import './Auth.css';
import Input from "../../shared/components/FormElements/Input_temp1";
import Button from "../../shared/components/FormElements/Button";
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import { AUthContext } from "../../shared/context/auth-context";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { useHttpClient } from "../../shared/hooks/http-hooks";
import ImageUpload from "../../shared/components/FormElements/ImageUpload";

const Auth = () => {
  const auth = useContext(AUthContext);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [formState, InputHandler, setFormData] = useForm({
    email: { value: '', isValid: false },
    password: { value: '', isValid: false }
  }, false);

  const switchModeHandler = () => {
    if (!isLoginMode) {
      setFormData({
        ...formState.inputs,
        name: undefined
      }, formState.inputs.email.isValid && formState.inputs.password.isValid);
    } else {
      setFormData({
        ...formState.inputs,
        name: { value: '', isValid: false }
      }, false);
    }
    setIsLoginMode(prevMode => !prevMode);
  };

  const authSubmitHandler = async event => {
    event.preventDefault();

    let url;
    let requestBody;

    if (isLoginMode) {
      url = 'http://localhost:5000/api/users/login';
      requestBody = JSON.stringify({
        email: formState.inputs.email.value,
        password: formState.inputs.password.value
      });
    } else {
      url = 'http://localhost:5000/api/users/signup';
      requestBody = JSON.stringify({
        name: formState.inputs.name.value,
        email: formState.inputs.email.value,
        password: formState.inputs.password.value
      });
    }

    try {
      const responseData = await sendRequest(
        url,
        'POST',
        requestBody,
        { 'Content-Type': 'application/json' }
      );
      auth.login(responseData.user.id, responseData.user.email); // optionally: auth.login(responseData.userId, responseData.token);
    } catch (err) {
      // Error is handled in custom hook
    }
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <Card className="authentication">
        {isLoading && <LoadingSpinner asOverlay />}
        <h2>Login Required</h2>
        <hr />
        <form onSubmit={authSubmitHandler}>
          {!isLoginMode && (
            <Input
              element="input"
              id="name"
              type="text"
              label="Your Name"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please Enter a Name"
              onInput={InputHandler}
            />
          )}
          {!isLoginMode && <ImageUpload  center id = "image"/>}
          <Input
            element="input"
            id="email"
            type="email"
            label="E-Mail"
            validators={[VALIDATOR_EMAIL()]}
            errorText="Please enter a valid email"
            onInput={InputHandler}
          />
          <Input
            element="input"
            id="password"
            type="password"
            label="Password"
            validators={[VALIDATOR_MINLENGTH(6)]}
            errorText="Please enter a valid password (at least 6 characters)."
            onInput={InputHandler}
          />
          <Button type="submit" disabled={!formState.isValid}>
            {isLoginMode ? 'LOGIN' : 'SIGNUP'}
          </Button>
        </form>
        <Button inverse onClick={switchModeHandler}>
          SWITCH TO {isLoginMode ? 'SIGNUP' : 'LOGIN'}
        </Button>
      </Card>
    </React.Fragment>
  );
};

export default Auth;
