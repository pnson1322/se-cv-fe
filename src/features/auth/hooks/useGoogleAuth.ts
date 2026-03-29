"use client";

import { getGoogleAuthUrl } from "../api/auth.api";

export function useGoogleAuth() {
  const loginWithGoogle = () => {
    const url = getGoogleAuthUrl();
    window.location.href = url;
  };

  return {
    loginWithGoogle,
  };
}
