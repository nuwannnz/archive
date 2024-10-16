// eslint-disable-next-line import/no-extraneous-dependencies
import { CognitoUser } from "amazon-cognito-identity-js";
import React, { useState } from "react";
import { Typography } from "@material-ui/core";
import { Auth } from "aws-amplify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import LoginStepTwo from "./LoginStepTwo";
import LoginStepOne from "./LoginStepOne";
import { setNotification } from "../../store/notification.slice";
import { AppDispatch } from "../../store";
import { fetchOwnedUserRoleAsync } from "../../actions/user-role.actions";
import { ROUTES } from "../../constants/common";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [isStepOne, setIsStepOne] = useState<boolean>(true);
  const [email, setEmail] = useState<string>("");
  const [cognitoUser, setCognitoUser] = useState<CognitoUser | null>(null);

  /**
   * Login step one submit handler
   * @param emailValue
   */
  const handleSubmitStepOne = async (emailValue: string) => {
    // sign in
    try {
      const resultUser = await Auth.signIn(
        process.env.REACT_APP_DOMAIN + emailValue
      );
      setCognitoUser(resultUser);
      setEmail(emailValue);
      setIsStepOne(false);
    } catch (error: any) {
      dispatch(
        setNotification({
          type: "error",
          message: error.message || "",
        })
      );
    }
  };

  /**
   * Login step two submit handler
   * @param otp
   */
  const handleSubmitStepTwo = async (otp: string) => {
    // validate OTP
    try {
      await Auth.sendCustomChallengeAnswer(cognitoUser, otp);
      await Auth.currentSession();
      dispatch(fetchOwnedUserRoleAsync());
      navigate(ROUTES.DASHBOARD);
      dispatch(
        setNotification({
          type: "success",
          message: "Login Successful",
        })
      );
    } catch (error: any) {
      dispatch(
        setNotification({
          type: "error",
          message: error.message || error || "",
        })
      );
    }
  };

  return (
    <div style={{ marginTop: "5rem" }} className="center">
      <Typography gutterBottom variant="h3" align="center">
        Login
      </Typography>
      {isStepOne ? (
        <LoginStepOne onSubmit={handleSubmitStepOne} />
      ) : (
        <LoginStepTwo email={email} onSubmit={handleSubmitStepTwo} />
      )}
    </div>
  );
}

export default Login;
