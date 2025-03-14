  import React from "react";
  import { Authenticator } from "@aws-amplify/ui-react";
  import { Amplify } from "aws-amplify";
  import "@aws-amplify/ui-react/styles.css";
import { Box } from "@mui/material";

  Amplify.configure({
    Auth: {
      Cognito: {
        userPoolId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID || "",
        userPoolClientId:
          process.env.NEXT_PUBLIC_COGNITO_USER_POOL_CLIENT_ID || "",
      },
    },
  });

  const formFields = {
    signUp: {
      username: {
        order: 1,
        placeholder: "Choose a username",
        label: "Username",
        inputProps: { required: true },
      },
      email: {
        order: 1,
        placeholder: "Enter your email address",
        label: "Email",
        inputProps: { type: "email", required: true },
      },
      password: {
        order: 3,
        placeholder: "Enter your password",
        label: "Password",
        inputProps: { type: "password", required: true },
      },
      confirm_password: {
        order: 4,
        placeholder: "Confirm your password",
        label: "Confirm Password",
        inputProps: { type: "password", required: true },
      },
    },
  };

  const AuthProvider = ({ children }: {children : React.ReactNode}) => {
    return (
        <Authenticator formFields={formFields}>
       {({ user }) =>
        user ? (
          <>{children}</> 
        ) : (
          <Box className="auth-background">
            <h1>Please sign in below:</h1>
          </Box>
        )
      }
        </Authenticator>
    );
  };

  export default AuthProvider;
