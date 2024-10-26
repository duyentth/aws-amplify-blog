"use client";
import React from "react";
import { useState } from "react";
import { Amplify } from "aws-amplify";
import { withAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import config from "@/src/amplifyconfiguration.json";

Amplify.configure(config);

const Profile = ({ signOut, user }) => {
  if (user) {
    console.log("user:", user);
  }
  return (
    <>
      {user && (
        <div>
          <h1> Your Profile: </h1>
          <p>{user.username}</p>
          <p>{user.userId}</p>
          <p>{user.signInDetails.loginId}</p>
        </div>
      )}
    </>
  );
};

export default withAuthenticator(Profile);
