"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const EmployerLoginPage = () => {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2>(1);

  // Step 1: Email + Password
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Step 2: OTP
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
  const inputRefs = useRef<HTMLInputElement[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);

  // Timer for OTP step (in seconds)
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes
  const [canResend, setCanResend] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);

  // Start countdown timer when step 2 is active
  useEffect(() => {
    if (step !== 2) return;

    if (timeLeft <= 0) return; // Stop if time ended

    const timerId = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [step, timeLeft]);

  // Resend cooldown timer
  useEffect(() => {
    if (resendCooldown <= 0) {
      setCanResend(true);
      return;
    }

    const timerId = setInterval(() => {
      setResendCooldown((prev) => {
        if (prev <= 1) {
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerId);
  }, [resendCooldown]);

  // Format seconds to MM:SS

  const validateEmail = (value: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(value);
  };

  // API Base
  const LOGIN_ENDPOINT = process.env.NEXT_PUBLIC_LOGIN_ENDPOINT || "";

  // Handle OTP Input
  const handleOtpChange = (
    target: EventTarget & HTMLInputElement,
    index: number
  ) => {
    const val = target.value;
    if (/^[0-9]?$/.test(val)) {
      const newOtp = [...otp];
      newOtp[index] = val;
      setOtp(newOtp);
      if (val && index < otp.length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleOtpKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // Function to send OTP (used for both initial send and resend)
  const sendOtp = async (authToken: string, userEmail: string) => {
    const otpRes = await fetch(
      "https://x8ki-letl-twmt.n7.xano.io/api:0zPratjM/email_otp",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({ email: userEmail }),
      }
    );

    if (!otpRes.ok) {
      throw new Error("Failed to send OTP email");
    }

    return otpRes;
  };

  // Step 1: Login with email & password (and request OTP)
  const handleLogin = async () => {
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address");
      return;
    }
    if (!password) {
      alert("Please enter your password");
      return;
    }

    const userEmail = email.trim().toLowerCase();

    try {
      setIsLoading(true);

      // Step 1: Call login API
      const loginRes = await fetch(LOGIN_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: userEmail,
          password,
          role: "Employer",
        }),
      });
      

      if (!loginRes.ok) {
        alert("Invalid Credentials");
        setIsLoading(false);
        return;
      }

      const loginData = await loginRes.json();
      
console.log(loginData)


      const authToken = loginData.authToken;
      console.log(authToken)

      if (!authToken) {
        alert("Login failed: no auth token returned");
        setIsLoading(false);
        return;
      }

      // Store the token
      localStorage.setItem("authToken", authToken);



      // Step 2: Send OTP
      await sendOtp(authToken, userEmail);

      // Move to step 2: show OTP input UI and reset timer
      setStep(2);
      setTimeLeft(600);
      setCanResend(false);
      setResendCooldown(60); // 60 seconds cooldown before allowing resend
    } catch (error) {
      console.error(error);
      alert("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  // Resend OTP function
  const handleResendOtp = async () => {
    const authToken = localStorage.getItem("authToken");
    const userEmail = email.trim().toLowerCase();

    if (!authToken) {
      alert("Authentication token missing. Please login again.");
      return;
    }

    try {
      setIsResending(true);

      await sendOtp(authToken, userEmail);

      // Reset OTP input
      setOtp(new Array(6).fill(""));
      
      // Reset timers
      setTimeLeft(600);
      setCanResend(false);
      setResendCooldown(60); // 60 seconds cooldown

      alert("OTP has been resent to your email!");
    } catch (error) {
      console.error("Resend OTP error:", error);
      alert("Failed to resend OTP. Please try again.");
    } finally {
      setIsResending(false);
    }
  };

  const handleVerifyOtp = async () => {
    const enteredOtp = otp.join("").trim();

    if (enteredOtp.length !== 6 || !/^\d{6}$/.test(enteredOtp)) {
      alert("Please enter a valid 6-digit OTP");
      return;
    }

    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      alert("Authentication token missing. Please login again.");
      return;
    }

    try {
      setIsLoading(true);

      const response = await fetch(
        "https://x8ki-letl-twmt.n7.xano.io/api:0zPratjM/verify_otp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`, 
          },
          body: JSON.stringify({
            otp_code: enteredOtp, 
          }),
        }
      );

      const result = await response.json();

      if (response.ok) {
        // OTP verified successfully
        router.push("/EmployerDashboard");
      } else {
        alert(result.message || "Invalid or expired OTP. Please try again.");
      }
    } catch (error) {
      console.error("OTP verification error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-blue-50 px-6">
      <div className="flex flex-col lg:flex-row gap-8 max-w-6xl w-full">
        {/* Left section */}
        <div
          style={{
            background:
              "linear-gradient(160deg, rgba(255, 255, 255, 0.22) 0%, rgba(238, 174, 202, 0.14) 72%, rgba(39, 93, 245, 0.11) 100%)",
          }}
          className="hidden md:flex flex-col justify-center w-full lg:w-[699px] h-auto md:h-[400px] lg:h-[481px] rounded-2xl shadow p-6 md:p-8 lg:p-10"
        >
          <h1 className="text-[48px] font-bold text-[#121224] leading-tight">
            Find & hire the right <br /> talent with us
          </h1>
          <div className="mt-4 flex items-center gap-2 text-sm text-[#474D6A]">
            <div className="flex items-center gap-2">
              <Image
                src="/icons/check.png"
                alt="Check Icon"
                width={14}
                height={14}
                className="text-white"
              />
              Trusted by 10 Cr+ candidates | 4 Lakh+ employers
            </div>
          </div>
          <div className="mt-4 flex -space-x-2">
            {[...Array(5)].map((_, i) => (
              <Image
                key={i}
                width={32}
                height={32}
                src="/assets/profile.png"
                className="w-8 h-8 rounded-full border-2 border-white"
                alt="Employer Avatar"
              />
            ))}
          </div>
          <div className="mt-auto flex justify-end">
            <div className="w-35 mb-2 h-35 rounded-full overflow-hidden">
              <Image
                src="/assets/profile.png"
                alt="Login Illustration"
                width={194}
                height={194}
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Right section */}
        <div className="bg-white rounded-2xl shadow p-8 w-full max-w-md h-fit">
          {step === 1 && (
            <>
              <h2 className="text-[22px] font-medium text-[#121224] mt-2">
                Login with Email
              </h2>
              <div className="mt-5">
                <label className="block text-sm text-[#091E42] mb-1">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    const value = e.target.value;
                    setEmail(value);
                    setEmailError(
                      validateEmail(value)
                        ? ""
                        : "Please enter a valid email address"
                    );
                  }}
                  placeholder="Enter your email"
                  className="w-full border rounded-md px-3 py-2 outline-none"
                />
                {emailError && (
                  <p className="text-red-500 text-xs mt-1">{emailError}</p>
                )}
              </div>
              <div className="mt-5">
                <label className="block text-sm text-[#091E42] mb-1">
                  Password
                </label>
                <div className="flex items-center border rounded-md px-3">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full py-2 outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-blue-500 text-sm whitespace-nowrap pl-3"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
                <div className="text-right mt-2">
                  <a
                    href="/forgot-password"
                    className="text-sm text-blue-600 hover:underline"
                  >
                    Forgot Password?
                  </a>
                </div>
              </div>
              <button
                onClick={handleLogin}
                disabled={isLoading || !!emailError || !email || !password}
                className={`mt-6 w-full py-2 rounded-lg font-medium transition-colors ${
                  !emailError && email && password
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-gray-200 text-gray-500 cursor-not-allowed"
                }`}
              >
                {isLoading ? "Processing..." : "Continue"}
              </button>
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-600">
                  Did not have an account?{" "}
                  <a
                    href="/foremployer"
                    className="text-blue-600 font-medium hover:underline"
                  >
                    Sign up
                  </a>
                </p>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <h2 className="text-[22px] font-medium text-[#121224] mt-2">
                Enter the OTP sent to your email
              </h2>
              <p className="text-sm text-gray-500 mt-2">
                <strong>{email}</strong>
              </p>
              <div className="mt-5">
                <label className="block text-sm text-[#091E42] mb-1">OTP</label>
                <div className="flex gap-2 justify-between max-w-xs">
                  {otp.map((data, index) => (
                    <input
                      key={index}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      className="w-12 h-12 text-center border rounded-md text-xl outline-none"
                      value={data}
                      onChange={(e) => handleOtpChange(e.target, index)}
                      onKeyDown={(e) => handleOtpKeyDown(e, index)}
                      ref={(el) => {
                        if (el) inputRefs.current[index] = el;
                      }}
                    />
                  ))}
                </div>
               
              </div>

              {/* Resend OTP Section */}
              <div className="mt-4 text-end">
                {canResend ? (
                  <button
                    onClick={handleResendOtp}
                    disabled={isResending}
                    className="text-blue-600 text-sm hover:underline disabled:opacity-50"
                  >
                    {isResending ? "Resending..." : "Resend OTP"}
                  </button>
                ) : (
                  <p className="text-sm text-gray-500">
                    Resend OTP in {resendCooldown}s
                  </p>
                )}
              </div>

              <button
                onClick={handleVerifyOtp}
                disabled={isLoading || timeLeft === 0}
                className={`mt-6 w-full py-2 rounded-lg font-medium transition-colors ${
                  !isLoading && timeLeft > 0
                    ? "bg-green-600 text-white hover:bg-green-700"
                    : "bg-gray-300 text-gray-600 cursor-not-allowed"
                }`}
              >
                {isLoading ? "Verifying..." : "Verify OTP"}
              </button>
              {timeLeft === 0 && (
                <p className="mt-2 text-center text-red-600 text-sm">
                  OTP expired. Please login again to request a new OTP.
                </p>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployerLoginPage;