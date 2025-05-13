"use client"

import { ChangeEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import "dotenv/config";
import { formatPhoneNumber, validatePassword, validatePhone } from "@/lib/helper";
import { login } from "@/lib/actions";
import { toast } from "sonner";
import { LoaderCircle, Eye, EyeOff } from "lucide-react"

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
const CLIENT_ID = process.env.NEXT_PUBLIC_BACKEND_URL;

type Mode = "login" | "signup" | "forgot";
type Step = "form" | "otp";

interface FormState {
  name: string;
  phone: string;
  password: string;
  new_password?: string;
}

export default function Login() {

  const [mode, setMode] = useState<Mode>("login");
  const [step, setStep] = useState<Step>("form");
  const [form, setForm] = useState<FormState>({
    name: "",
    phone: "",
    password: "",
    new_password: "",
  });
  const [otp, setOtp] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [info, setInfo] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      router.push("/");
    }
  }, [router]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setError("");
    setInfo("");
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const phoneError = validatePhone(form.phone);
    if (phoneError) return setError(phoneError);

    if (!form.password) return setError("Password is required");

    setLoading(true);
    try {
      const formattedPhone = formatPhoneNumber(form.phone);
      const res = await login(formattedPhone, form.password); // assuming login() is already typed

      if (res.success) {
        setInfo("Login successful!");
        router.push("/");
      } else {
        setError(res.message || "Login failed. Please check your credentials.");
      }
    } catch {
      setError("Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();

    const phoneError = validatePhone(form.phone);
    if (phoneError) return setError(phoneError);

    const passwordError = validatePassword(form.password);
    if (passwordError) return setError(passwordError);

    setLoading(true);
    try {
      const formattedPhone = formatPhoneNumber(form.phone);
      const res = await fetch(`${BACKEND_URL}/auth/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobile: formattedPhone }),
      });

      const data = await res.json();

      if (res.ok) {
        setStep("otp");
        setInfo(data.message);
      } else if (res.status === 409 && data.message === "User already exists") {
        toast.success("User already exists. Please login with your registered phone number.");
        setMode("login");
        setStep("form");
        setForm({ ...form, phone: form.phone });
      } else {
        setError(data.message);
      }
    } catch (err) {
      console.error("Signup error:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formattedPhone = formatPhoneNumber(form.phone);
      const res = await fetch(`${BACKEND_URL}/auth/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          mobile: formattedPhone,
          password: form.password,
          otp,
        }),
      });

      if (res.status === 201) {
        setInfo("Signup successful! Please login.");
        setMode("login");
        setStep("form");
        setForm({ name: "", phone: form.phone, password: "", new_password: "" });
        setOtp("");
      } else if (res.status === 400) {
        setError("Invalid OTP. Please try again.");
      } else {
        const data = await res.json();
        setError(data.message || "Something went wrong. Please try again.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    const phoneError = validatePhone(form.phone);
    if (phoneError) return setError(phoneError);

    setLoading(true);
    try {
      const formattedPhone = formatPhoneNumber(form.phone);
      const res = await fetch(`${BACKEND_URL}/auth/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mobile: formattedPhone,
          resetPassword: true,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setStep("otp");
        setInfo(data.message);
      } else {
        setError(data.message);
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formattedPhone = formatPhoneNumber(form.phone);
      const res = await fetch(`${BACKEND_URL}/auth/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mobile: formattedPhone,
          new_password: form.new_password,
          otp,
        }),
      });

      if (res.status === 201) {
        setInfo("Password Reset successful! Please login.");
        setMode("login");
        setStep("form");
        setForm({ name: "", phone: form.phone, password: "" });
        setOtp("");
      } else if (res.status === 400) {
        setError("Invalid OTP. Please try again.");
      } else {
        const data = await res.json();
        setError(data.message || "Something went wrong. Please try again.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Password toggle handlers
  const togglePassword = () => setShowPassword(prev => !prev);
  const toggleNewPassword = () => setShowNewPassword(prev => !prev);

  return (
    <div className="h-screen max-w-[40rem] mx-auto py-20 flex flex-col gap-10 items-center justify-between bg-secondary px-4 sm:px-6 lg:px-8">

      <div className="space-y-4 w-full">
        <p className="text-center  tracking-wider text-2xl font-bold text-blue-400">
          Galaxy
        </p>
        <h1 className="text-center text-4xl font-bold text-white  tracking-wider">
          Welcome back
        </h1>
      </div>

      <div className="flex flex-col w-full gap-8">
        <div className=" w-full px-10 rounded-xl animate-fade-out">
          {/* <div className="text-center"> */}
          {/*   <h2 className="mt-6 text-3xl font-extrabold text-gray-900"> */}
          {/*     {mode === "login" ? "Admin Login" : "Admin Signup"} */}
          {/*   </h2> */}
          {/* </div> */}

          {error && (
            <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4 animate-slide-right">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          )}

          {info && (
            <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-4 animate-slide-right">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-green-700">{info}</p>
                </div>
              </div>
            </div>
          )}

          {mode === "login" && (
            <form onSubmit={handleLogin} className="mt-8 space-y-6 animate-slide-right">
              <div className="rounded-md space-y-4">
                <div>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={form.phone}
                    onChange={handleChange}
                    required
                    className="border-gray-700 p-4 rounded-lg text-white outline-2 outline-gray-500 w-full"
                  />
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                    required
                    className="border-gray-700 p-4 rounded-lg text-white outline-2 outline-gray-500 w-full pr-12"
                  />
                  <button
                    type="button"
                    onClick={togglePassword}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                <div className="text-right">
                  <button
                    type="button"
                    onClick={() => { setMode("forgot"); setStep("form"); setError(""); setInfo(""); }}
                    className="text-sm text-blue-400 hover:underline cursor-pointer"
                  >
                    Forgot Password?
                  </button>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="group w-full flex justify-center items-center bg-[#1B8DFF]  tracking-wider py-3 text-2xl cursor-pointer rounded-lg text-white font-bold hover:bg-blue-600"
                >
                  {
                    loading
                      ? <LoaderCircle className="animate-spin" />
                      : <span>Login</span>
                  }
                </button>
              </div>

              <div className="text-center">
                <p className="text-center text-sm text-gray-400">
                  Don't have an account?{" "}
                  <button
                    type="button"
                    onClick={() => { setMode("signup"); setStep("form"); setError(""); setInfo(""); }}
                    className="text-blue-400 hover:underline cursor-pointer"
                  >
                    Signup
                  </button>
                </p>
              </div>
            </form>
          )}

          {mode === "signup" && step === "form" && (
            <form onSubmit={handleSendOTP} className="mt-8 space-y-6 animate-slide-right">
              <div className="rounded-md space-y-4">
                <div>
                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="border-gray-700  p-4 rounded-lg text-white outline-2 outline-gray-500 w-full"
                  />
                </div>
                <div>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={form.phone}
                    onChange={handleChange}
                    required
                    className="border-gray-700  p-4 rounded-lg text-white outline-2 outline-gray-500 w-full"
                  />
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                    required
                    className="border-gray-700 p-4 rounded-lg text-white outline-2 outline-gray-500 w-full pr-12"
                  />
                  <button
                    type="button"
                    onClick={togglePassword}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="group w-full flex justify-center items-center bg-[#1B8DFF]  tracking-wider py-3 text-2xl cursor-pointer rounded-lg text-white font-bold hover:bg-blue-600"
                >
                  {
                    loading
                      ? <LoaderCircle className="animate-spin" />
                      : <span> Send OTP </span>
                  }
                </button>
              </div>

              <div className="text-center">
                <p className="text-center text-sm text-gray-400">
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => { setMode("login"); setStep("form"); setError(""); setInfo(""); }}
                    className="text-blue-400 hover:underline cursor-pointer"
                  >
                    Login
                  </button>
                </p>
              </div>
            </form>
          )}

          {mode === "signup" && step === "otp" && (
            <form onSubmit={handleVerifyOtp} className="mt-8 space-y-6 animate-slide-right">
              <div className="rounded-md">
                <div>
                  <input
                    type="text"
                    name="otp"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => { setOtp(e.target.value); setError(""); setInfo(""); }}
                    required
                    className="border-gray-700  p-4 rounded-lg text-white outline-2 outline-gray-500 w-full"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="group w-full flex justify-center items-center bg-[#1B8DFF]  tracking-wider py-3 text-2xl cursor-pointer rounded-lg text-white font-bold hover:bg-blue-600"
                >
                  {
                    loading
                      ? <LoaderCircle className="animate-spin" />
                      : <span> Verify OTP & Signup </span>
                  }
                </button>
              </div>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => { setStep("form"); setOtp(""); setError(""); setInfo(""); }}
                  className="font-medium text-blue-400 hover:text-blue-500 focus:outline-none focus:underline transition duration-150 ease-in-out cursor-pointer"
                >
                  Back
                </button>
              </div>
            </form>
          )}

          {mode === "forgot" && step === "form" && (
            <form onSubmit={handleForgotPassword} className="mt-8 space-y-6 animate-slide-right">
              <div className="rounded-md space-y-4">
                <div>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={form.phone}
                    onChange={handleChange}
                    required
                    className="border-gray-700  p-4 rounded-lg text-white outline-2 outline-gray-500 w-full"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="group w-full flex justify-center items-center bg-[#1B8DFF]  tracking-wider py-3 text-2xl cursor-pointer rounded-lg text-white font-bold hover:bg-blue-600"
                >
                  {loading ? (
                    <LoaderCircle className="animate-spin" />
                  ) : (
                    <span>Send OTP</span>
                  )}
                </button>
              </div>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => { setMode("login"); setStep("form"); setError(""); setInfo(""); }}
                  className="text-sm text-blue-400 hover:underline cursor-pointer"
                >
                  Back to Login
                </button>
              </div>
            </form>
          )}

          {mode === "forgot" && step === "otp" && (
            <form onSubmit={handleResetPassVerifyOtp} className="mt-8 space-y-6 animate-slide-right">
              <div className="rounded-md space-y-4">
                <div>
                  <input
                    type="text"
                    name="otp"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => { setOtp(e.target.value); setError(""); setInfo(""); }}
                    required
                    className="border-gray-700  p-4 rounded-lg text-white outline-2 outline-gray-500 w-full"
                  />
                </div>
                <div className="relative">
                  <input
                    type={showNewPassword ? "text" : "password"}
                    name="new_password"
                    placeholder="Create New Password"
                    value={form.new_password}
                    onChange={handleChange}
                    required
                    className="border-gray-700 p-4 rounded-lg text-white outline-2 outline-gray-500 w-full pr-12"
                  />
                  <button
                    type="button"
                    onClick={toggleNewPassword}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                  >
                    {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="group w-full flex justify-center items-center bg-[#1B8DFF]  tracking-wider py-3 text-2xl cursor-pointer rounded-lg text-white font-bold hover:bg-blue-600"
                >
                  {loading ? (
                    <LoaderCircle className="animate-spin" />
                  ) : (
                    <span>Verify OTP & Reset Password</span>
                  )}
                </button>
              </div>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => { setMode("login"); setStep("form"); setError(""); setInfo(""); }}
                  className="text-sm text-blue-400 hover:underline cursor-pointer"
                >
                  Back to Login
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4 px-10">
          <hr className=" w-[45%]  text-gray-400" />
          <span className=" text-gray-400">OR</span>
          <hr className=" w-[45%]  text-gray-400" />
        </div>

        {/* Alternative login methods */}
        <div className="space-y-6 w-fit self-center">
          {/* <button className="w-full flex justify-start cursor-pointer border-gray-700 p-2 rounded-lg text-xl items-center outline-2 outline-gray-500 text-gray-400">
              <GoogleIcon className="mr-2 h-5 w-5" />
              <span>Continue with Google</span>
            </button> */}
          {/* <GoogleOAuthProvider clientId={CLIENT_ID}> */}
          {/*   <button className="w-full flex justify-start cursor-pointer border-gray-700 p-2 rounded-lg text-xl items-center outline-2 outline-gray-500 text-gray-400"> */}
          {/*     <GoogleLogin */}
          {/*       onSuccess={handleGoogleSuccess} */}
          {/*       onError={() => toast.error("Google Login Failed")} */}
          {/*     /> */}
          {/*   </button> */}
          {/* </GoogleOAuthProvider> */}
        </div>
      </div>

      {/* Footer */}
      <div className="text-center text-sm text-gray-300">
        <a href="#" className="hover:text-gray-400">
          Terms of Use
        </a>{" "}
        |{" "}
        <a href="#" className="hover:text-gray-400">
          Privacy Policy
        </a>
      </div>
    </div>
  )
}
