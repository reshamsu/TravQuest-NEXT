"use client";

import { GoogleOAuthProvider } from "@react-oauth/google";

export default function GoogleProvider({ children }) {
  return (
    <GoogleOAuthProvider
      clientId={
        "454373247918-uk8j5em60iu73367qho1vdfpaddma36c.apps.googleusercontent.com"
      }
    >
      {children}
    </GoogleOAuthProvider>
  );
}
