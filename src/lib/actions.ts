import "dotenv/config";
import { toast } from "sonner"
import { CredentialResponse } from "@react-oauth/google";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

interface LoginResponse {
  success: boolean;
  message?: string;
}

const login = async (mobile: string, password: string): Promise<LoginResponse> => {
  try {
    const res = await fetch(`${BACKEND_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ mobile, password }),
    });

    const data = await res.json();

    if (res.ok && data.token) {
      localStorage.setItem("token", data.token);
      toast.success("Login successful! Welcome to Dashboard.");
      return { success: true, message: data.message };
    }

    return {
      success: false,
      message: data.message || "Login failed",
    };
  } catch (error) {
    return {
      success: false,
      message: "Login failed",
    };
  }
};

type GoogleLoginResponse = {
  token: string;
  message: string;
};

const handleGoogleSuccess = async (
  credentialResponse: CredentialResponse
): Promise<{ success: boolean; message: string }> => {
  const tokenId = credentialResponse.credential;

  if (!tokenId) {
    toast.error("Google authentication failed!");
    return { success: false, message: "Missing credential token." };
  }

  try {
    const res = await fetch(`${BACKEND_URL}/auth/google-login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ tokenId }),
    });

    if (!res.ok) {
      throw new Error("Failed to login");
    }

    const data: GoogleLoginResponse = await res.json();

    if (data.token) {
      localStorage.setItem("token", data.token);
      toast.success("Login successful! Welcome to Dashboard.");
      window.location.href = "/";
      return { success: true, message: data.message };
    }

    return { success: false, message: "No token returned from server." };
  } catch (error) {
    toast.error("Login failed. Please try again.");
    return { success: false, message: "Login request failed." };
  }
};

export { login, handleGoogleSuccess }; 
