import React, { useState, useEffect } from "react";
import OtpInput from "react-otp-input";

const EmailVerify = () => {
  const [otp, setOtp] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (timer > 0) {
      const countdown = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(countdown);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  const handleVerifyOTP = () => {
    if (otp === "123456") {
      setIsAuthenticated(true);
      alert("OTP Verified Successfully!");
    } else {
      alert("Invalid OTP! Please try again.");
    }
  };

  const handleResendOTP = () => {
    setTimer(30);
    setCanResend(false);
    setOtp(""); 
    alert("New OTP sent to your email!");
  };

  return isAuthenticated ? (
    <div className="flex justify-center items-center h-screen bg-gray-900 text-white text-2xl">
      ✅ Email Verified Successfully!
    </div>
  ) : (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 p-4">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-white w-full max-w-md">
        <h2 className="text-center text-2xl font-semibold mb-4">
          Verify Your Email
        </h2>
        <p className="text-center text-gray-400 mb-6">
          Enter the 6-digit OTP sent to your email
        </p>

        {/* ✅ OTP Input with Responsive Design */}
        <div className="flex justify-center">
          <OtpInput
            value={otp}
            onChange={setOtp}
            numInputs={6}
            renderSeparator={<span className="w-2"></span>}
            renderInput={(props) => (
              <input
                {...props}
                className="w-16 h-12 text-xl text-center border border-gray-500 bg-gray-700 text-white rounded-md outline-none focus:ring-2 ring-blue-400 transition"
              />
            )}
          />
        </div>

        <button
          onClick={handleVerifyOTP}
          className="mt-6 bg-blue-500 text-white px-4 py-2 rounded-md w-full hover:bg-blue-600 transition"
        >
          Verify OTP
        </button>

        <div className="mt-4 text-center">
          {canResend ? (
            <button
              onClick={handleResendOTP}
              className="text-blue-400 hover:text-blue-500 transition"
            >
              Resend OTP
            </button>
          ) : (
            <p className="text-gray-400">Resend OTP in {timer} sec</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmailVerify;
