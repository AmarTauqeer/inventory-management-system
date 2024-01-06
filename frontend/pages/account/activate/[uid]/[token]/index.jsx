"use client";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const Index = () => {
  const router = useRouter();
  const { uid, token } = router.query;
  const [message, setMessage] = useState("initial message");


  const activateConfirm = async (uid, token) => {
    const udata = await fetch(`http://127.0.0.1:8000/account/activate/confirm`, {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        // "X-CSRFToken": {csrf},
        // Authorization: `Bearer ${token}`,
      },
      credentials:'include',
      body: JSON.stringify({
        uid: uid,
        token: token,
      }),
    });

    const res = await udata.json();
    console.log(res)
    if (res) {
      setMessage(res.detail);
    }
  };

  if (uid!==undefined && token!==undefined) {
    // console.log(uid);
    // console.log(token);
    activateConfirm(uid, token);
  }

  return (
    <div>
      <div className="w-full items-center justify-center mb-5 text-center">
        <h2 className="text-3xl font-bold mt-5 mb-5">{message && message}</h2>
      </div>
    </div>
  );
};

export default Index;
