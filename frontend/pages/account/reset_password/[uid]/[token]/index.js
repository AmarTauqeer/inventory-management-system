import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import { MdLockOutline } from "react-icons/md";

const Index = () => {
  const router = useRouter();
  const { uid, token } = router.query;
  console.log(uid + "" + token);
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [reNewPassword, setReNewPassword] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();

    if (uid!==undefined && token!==undefined) {
      const res = await fetch(`http://127.0.0.1:8000/account/reset_password_confirm`, {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        credentials:'include',
        body: JSON.stringify({
          uid,
          token,
          new_password:password,
        }),
      });

      const response= await res.json()
      console.log(response)
      setMessage(`Password reset successful.`);
    }

    // // verify token
    // const res = await fetch(`http://127.0.0.1:8000/token/`);
    // const result = await res.json();
    // console.log(result);
    // console.log(token);
    // if (token !== undefined) {
    //   const filterToken = await result.filter((r) => r.token === token);

    //   // console.log(filterToken[0].user);
    //   const id=filterToken[0].user
      
    //   const userData = async (id) => {
    //     const udata = await fetch(`http://127.0.0.1:8000/users/`);
    //     const res = await udata.json();
    //     const filterUsers = res.filter((r) => r.id === id);
    //     return filterUsers;
    //   };
      
    //   const users= await userData(id)
      
    //   if (filterToken.length === 1) {
    //     await fetch(`http://127.0.0.1:8000/update/${id}`, {
    //       method: "PATCH",
    //       headers: {
    //         "Content-type": "application/json; charset=UTF-8",
    //         // Authorization: `Bearer ${token}`,
    //       },
    //       body: JSON.stringify({
    //         id,
    //         name:users[0].name,
    //         email:users[0].email,
    //         password,
    //         is_active: users[0].is_active,
    //       }),
    //     });

    //     setMessage(`Password reset successfull.`);
    //   }
    // }
  };
  return (
    <div>
      <div className="w-full items-center justify-center mb-5 text-center">
        <h2 className="text-3xl font-bold mt-5 mb-5">Reset Password</h2>
        <div className="flex items-center justify-center mb-3">
          <input
            type="password"
            className="p-2 block w-[30%] h-[40px] rounded-md border-0"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="enter new password"
          />
        </div>
        <div className="flex items-center justify-center mb-3">
          <input
            type="password"
            className="p-2 block w-[30%] h-[40px] rounded-md border-0"
            value={reNewPassword}
            onChange={(e) => setReNewPassword(e.target.value)}
            placeholder="re enter new password"
          />
        </div>
        <div className="flex items-center justify-center">
          <a
            onClick={handleReset}
            href="#"
            className="w-[30%] ml-3 border-2 border-green-500 rounded-full px-12 py-2 inline-block font-semibold hover:bg-green-500 hover:text-white"
          >
            Rest Password
          </a>
        </div>
        <div className="w-[90%] flex items-center justify-center mt-3">
          <p className="bg-green-500 text-lg text-white text-center">
            {message}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
