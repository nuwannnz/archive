// eslint-disable-next-line import/no-extraneous-dependencies
import { CognitoUser } from "amazon-cognito-identity-js";
import { Auth } from "aws-amplify";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchOwnedUserRoleAsync } from "../../actions/user-role.actions";
import { AppDispatch } from "../../store";
import util from "../../util";
import SignupStepOne from "./SignupStepOne";
import SignupStepTwo from "./SignupStepTwo";
import { ROUTES } from "../../constants/common";

function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [cognitoUser, setCognitoUser] = useState<CognitoUser | null>(null);

  const handleSubmitStepOne = async (emailValue: string, nameValue: string) => {
    // signup user in cognito
    const params = {
      username: process.env.REACT_APP_DOMAIN + emailValue,
      password: util.getRandomString(30),
      attributes: {
        "custom:userDomain": process.env.REACT_APP_DOMAIN,
        "custom:userEmail": emailValue,
      },
    };
    await Auth.signUp(params);

    // sign in
    const resultUser = await Auth.signIn(
      process.env.REACT_APP_DOMAIN + emailValue
    );
    setCognitoUser(resultUser);

    setEmail(emailValue);
    setName(nameValue);
    setStep(2);
  };

  const handleSubmitStepTwo = async (otp: string) => {
    // validate OTP
    try {
      await Auth.sendCustomChallengeAnswer(cognitoUser, otp);
      await Auth.currentSession();
      dispatch(fetchOwnedUserRoleAsync());
      navigate(ROUTES.DASHBOARD);
    } catch (e) {
      // eslint-disable-next-line no-alert
      alert(`error :  ${e}`);
    }
  };

  const handleGoBack = () => {
    setStep(1);
  };

  return step === 1 ? (
    <SignupStepOne email={email} name={name} onSubmit={handleSubmitStepOne} />
  ) : (
    <SignupStepTwo onSubmit={handleSubmitStepTwo} onGoBack={handleGoBack} />
  );
}

export default Signup;
