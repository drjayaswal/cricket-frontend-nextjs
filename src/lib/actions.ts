import "dotenv/config";
import { toast } from "sonner"

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

export { login }; 
