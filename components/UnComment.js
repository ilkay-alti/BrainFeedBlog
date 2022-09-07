import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const UnComment = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <div className="w-full h-[239px]">
      <button
        onClick={() => {
          loginWithRedirect({
            returnTo: process.env.NEXT_PUBLIC_URL + "/long-expected-party",
          });
          // {
          //   returnTo: process.env.NEXT_PUBLIC_URL + callbackurl,
          // }
        }}
      >
        Login
      </button>
    </div>
  );
};

export default UnComment;
