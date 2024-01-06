"use client";
import React, { useState } from "react";

const ResetPassword = () => {
  const [email, setEmail] = useState("amar.tauqeer@gmail.com");
  const [message, setMessage] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();
    await fetch(`http://127.0.0.1:8000/account/reset_password`, {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({
        email,
      }),
    });
    setMessage(`An email is sent to ${email} for reset password`);
  };
  return (
    <div className="w-full flex-col items-center justify-center mb-5 text-center">
      <h2 className="text-3xl font-bold mt-5 mb-5">Request Reset Password</h2>
      <div className="flex items-center justify-center">
        <input
          type="email"
          className="p-2 block w-[30%] h-[40px] rounded-md border-0"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="enter email address"
        />
        <a
          onClick={handleReset}
          href="#"
          className="ml-3 border-2 border-green-500 rounded-full px-12 py-2 inline-block font-semibold hover:bg-green-500 hover:text-white"
        >
          Rest Password
        </a>
      </div>
      <div className="w-[90%] flex items-center justify-center mt-3">
        <p className="bg-green-500 text-lg text-white text-center">{message}</p>
      </div>
    </div>
  );
};

export default ResetPassword;
