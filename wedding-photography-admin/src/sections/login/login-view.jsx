import { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import LoadingButton from "@mui/lab/LoadingButton";
import { alpha, useTheme } from "@mui/material/styles";
import InputAdornment from "@mui/material/InputAdornment";

import { useRouter } from "src/routes/hooks";

import { bgGradient } from "src/theme/css";

import Logo from "src/components/logo";
import Iconify from "src/components/iconify";
import { signIn, getCurrentUser, confirmSignIn } from "aws-amplify/auth";
import { Alert } from "@mui/material";

// ----------------------------------------------------------------------

export default function LoginView() {
  const theme = useTheme();

  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [showNewPasswordForm, setShowNewPasswordForm] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    const validateAuthState = async () => {
      try {
        await getCurrentUser();
        // already logged in
        router.replace("/booking");
      } catch (error) {
        // ignore
      }
    };
    validateAuthState();
  }, []);

  const handleLoginClick = async () => {
    try {
      setError("");
      setIsLoading(true);

      if (!email || !password) {
        setError("Missing required fields!");
        return;
      }

      const { isSignedIn, nextStep } = await signIn({
        username: email,
        password,
      });

      console.log({ isSignedIn, nextStep });

      if (
        nextStep.signInStep === "CONFIRM_SIGN_IN_WITH_NEW_PASSWORD_REQUIRED"
      ) {
        setShowNewPasswordForm(true);
      } else if (isSignedIn) {
        // logged in
        router.push("/booking");
      } else {
        setError("Invalid email or password!");
      }
    } catch (error) {
      setError("Invalid email or password");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSavePasswordClick = async () => {
    try {
      setError("");
      setIsLoading(true);

      if (password !== confirmPassword) {
        setError("Confirm password must match with the new password.");
        return;
      }
      const { isSignedIn } = await confirmSignIn({
        challengeResponse: password,
      });
      if (isSignedIn) {
        router.push("/booking");
      } else {
        setError("Failed to update new password. Please contact support.");
      }
    } catch (error) {
      setError(
        error.message ??
          "Failed to update new password. Please contact support."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const errorAlert = error && (
    <Box mb={2}>
      <Alert severity="error">{error}</Alert>
    </Box>
  );

  const renderLoginForm = (
    <>
      <Stack spacing={3} mt={3} mb={3}>
        <TextField
          name="email"
          label="Email address"
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          name="password"
          label="Password"
          type={showPassword ? "text" : "password"}
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  <Iconify
                    icon={showPassword ? "eva:eye-fill" : "eva:eye-off-fill"}
                  />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      {/* TODO */}
      {/* <Stack
        direction="row"
        alignItems="center"
        justifyContent="flex-end"
        sx={{ my: 3 }}
      >
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack> */}

      {errorAlert}

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        color="inherit"
        onClick={handleLoginClick}
        loading={isLoading}
      >
        Login
      </LoadingButton>
    </>
  );

  const renderNewPasswordForm = (
    <>
      <Stack spacing={3} mt={3} mb={3}>
        <TextField
          name="password"
          label="New Password"
          type={showPassword ? "text" : "password"}
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  <Iconify
                    icon={showPassword ? "eva:eye-fill" : "eva:eye-off-fill"}
                  />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <TextField
          name="confirmPassword"
          label="Confirm New Password"
          type={showPassword ? "text" : "password"}
          onChange={(e) => setConfirmPassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  edge="end"
                >
                  <Iconify
                    icon={showPassword ? "eva:eye-fill" : "eva:eye-off-fill"}
                  />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      {errorAlert}

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        color="inherit"
        onClick={handleSavePasswordClick}
        loading={isLoading}
      >
        Reset password
      </LoadingButton>
    </>
  );

  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0.9),
          imgUrl: "/assets/background/overlay_4.jpg",
        }),
        height: 1,
      }}
    >
      <Logo
        sx={{
          position: "fixed",
          top: { xs: 16, md: 24 },
          left: { xs: 16, md: 24 },
        }}
      />

      <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
        <Card
          sx={{
            p: 5,
            width: 1,
            maxWidth: 420,
          }}
        >
          <img
            src="/assets/logo.png"
            style={{
              maxWidth: "74%",
              cursor: "pointer",
              marginLeft: 29,
              marginTop: 18,
            }}
          />
          <Typography variant="h4" align="center" mt={4}>
            {showNewPasswordForm ? "Update your password" : `Sign in`}
          </Typography>

          {showNewPasswordForm ? renderNewPasswordForm : renderLoginForm}
        </Card>
      </Stack>
    </Box>
  );
}
