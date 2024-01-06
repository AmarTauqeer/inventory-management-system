import { UserContext } from "@/components/UserContext";
import React, { useContext } from "react";

const Home = () => {
    const userInfo = useContext(UserContext);
    // console.log(userInfo)
 
  return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h3 className="text-center text-semibold text-2xl">
          Welcome To Inventory System Management
        </h3>
        <h3 className="uppercase mt-10 p-2 text-center">
          {userInfo && userInfo!==undefined ? <div>Welcome back {userInfo.username}</div> : <div>Unauthenticated</div>}
        </h3>
      </div>
  );
};

export default Home;
