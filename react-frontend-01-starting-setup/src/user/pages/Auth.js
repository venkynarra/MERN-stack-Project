import React, { useState, useContext } from "react";
import Card from "../../shared/components/UIElements/Card";
import './Auth.css';
import Input from "../../shared/components/FormElements/Input_temp1";
import Button from "../../shared/components/FormElements/Button";
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import { AuthContext } from "../../shared/context/auth-context";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { useHttpClient } from "../../shared/hooks/http-hooks";
import ImageUpload from "../../shared/components/FormElements/ImageUpload";

const Auth = () => {
  const auth = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  // Initialize only email and password for login mode
  const [formState, InputHandler, setFormData] = useForm({
    email: { value: '', isValid: false },
    password: { value: '', isValid: false }
  }, false);

  const switchModeHandler = () => {
    if (!isLoginMode) {
      // Switching to login: remove name and image
      setFormData(
        {
          email: formState.inputs.email,
          password: formState.inputs.password
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      // Switching to signup: add name and image
      setFormData(
        {
          ...formState.inputs,
          name: { value: '', isValid: false },
          image: { value: null, isValid: false }
        },
        false
      );
    }
    setIsLoginMode(prevMode => !prevMode);
  };

  const authSubmitHandler = async event => {
    event.preventDefault();

    let url;
    if (isLoginMode) {
      url = 'http://localhost:5000/api/users/login';
    } else {
      url = 'http://localhost:5000/api/users/signup';
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('email', formState.inputs.email.value);
      formDataToSend.append('password', formState.inputs.password.value);

      if (!isLoginMode) {
        formDataToSend.append('name', formState.inputs.name.value);
        formDataToSend.append('image', formState.inputs.image.value);
      }

      const responseData = await sendRequest(
        url,
        'POST',
        formDataToSend
      );

      auth.login(responseData.user.id, responseData.user.email);
    } catch (err) {
      // handled by custom hook
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
              errorText="Please enter a name."
              onInput={InputHandler}
            />
          )}
          {!isLoginMode && (
            <ImageUpload
              center
              id="image"
              onInput={InputHandler}
              errorText="Please provide an image."
            />
          )}
          <Input
            element="input"
            id="email"
            type="email"
            label="E-Mail"
            validators={[VALIDATOR_EMAIL()]}
            errorText="Please enter a valid email."
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
