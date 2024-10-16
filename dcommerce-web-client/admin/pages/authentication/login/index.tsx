import Link from "next/link";
import { useState, type ReactElement, useEffect } from "react";
import { Grid, Box, Card, Stack, Typography } from "@mui/material";
import BlankLayout from "../../../src/layouts/blank/BlankLayout";
import { Auth } from "aws-amplify";

// components
import PageContainer from "../../../src/components/container/PageContainer";
import Logo from "../../../src/layouts/full/shared/logo/Logo";
import AuthLogin from "../auth/AuthLogin";
import { CognitoUser } from "@aws-amplify/auth";
import { useRouter } from "next/router";
import { useOwnedUserRole } from "../../../src/hooks/userRoleHooks";

const Login2 = () => {
  const router = useRouter();

  const [email, setEmail] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [cognitoUser, setCognitoUser] = useState<CognitoUser | null>(null);
  const [isStepOne, setIsStepOne] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const { isLoading: userRoleLoading, userRole } = useOwnedUserRole(isLoggedIn);

  /**
   * Navigate to dashboard once the user role is fetched
   */
  useEffect(() => {
    if (userRole) {
      router.replace("/");
    }
  }, [userRole]);

  const handleSubmitEmail = async (emailVal: string) => {
    try {
      setIsLoading(true);
      setError(null);

      const resultUser = await Auth.signIn(
        `${process.env.NEXT_PUBLIC_DOMAIN}${emailVal}`
      );

      setCognitoUser(resultUser);
      setEmail(emailVal);
      setIsStepOne(false);
    } catch (error: any) {
      setError(error.message ?? "Invalid email address");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitOtp = async (otp: string) => {
    try {
      setIsLoading(true);
      setError(null);

      await Auth.sendCustomChallengeAnswer(cognitoUser, `${otp}`);
      await Auth.currentSession();

      setIsLoggedIn(true);
    } catch (error: any) {
      setError(error.message ?? "Invalid OTP");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageContainer title="Login" description="this is Login page">
      <Box
        sx={{
          position: "relative",
          "&:before": {
            content: '""',
            background: "radial-gradient(#d2f1df, #d3d7fa, #bad8f4)",
            backgroundSize: "400% 400%",
            animation: "gradient 15s ease infinite",
            position: "absolute",
            height: "100%",
            width: "100%",
            opacity: "0.3",
          },
        }}
      >
        <Grid
          container
          spacing={0}
          justifyContent="center"
          sx={{ height: "100vh" }}
        >
          <Grid
            item
            xs={12}
            sm={12}
            lg={4}
            xl={3}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Card
              elevation={9}
              sx={{ p: 4, zIndex: 1, width: "100%", maxWidth: "500px" }}
            >
              <Box display="flex" alignItems="center" justifyContent="center">
                <Logo />
              </Box>
              <AuthLogin
                isStepOne={isStepOne}
                isLoading={isLoading || userRoleLoading}
                error={error}
                email={email}
                submitStepOne={handleSubmitEmail}
                submitStepTwo={handleSubmitOtp}
                subtext={
                  <Typography
                    variant="subtitle1"
                    textAlign="center"
                    color="textSecondary"
                    mb={1}
                  >
                    Your Social Campaigns
                  </Typography>
                }
              />
            </Card>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};
export default Login2;

Login2.getLayout = function getLayout(page: ReactElement) {
  return <BlankLayout>{page}</BlankLayout>;
};
