import { useContext, useEffect, useState } from "react";
import Navbar from "./navbar";
import { useRouter } from "next/router";
import { UserContext } from "./UserContext";


export default function RootLayout(props) {
  const router = useRouter();

  useEffect(() => {
    // fetchData();
  }, [props.children]);
  return (
    <UserContext.Provider value={props.auth}>
      {router.pathname !== "/login" && router.pathname !== "/signup" ? (
        <>
          <Navbar />
          <main>{props.children}</main>
        </>
      ) : (
        <>{props.children}</>
      )}
    </UserContext.Provider>
  );
}
