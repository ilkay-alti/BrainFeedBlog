import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Comment = () => {
  const [text, setText] = React.useState("");
  const [url, setUrl] = React.useState("");
  const { user, logout, getAccessTokenSilently } = useAuth0();

  React.useEffect(() => {
    setUrl(window.location.origin + window.location.pathname);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = await getAccessTokenSilently();

    const response = await fetch("/api/commentApi", {
      method: "POST",
      body: JSON.stringify({
        text,
        url,
        token,
      }),
    });

    // const response = await fetch("/api/commentApi", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({
    //     text,
    //     url,
    //     name: user.name,
    //     picture: user.picture,
    //   }),
    // });
    // const data = await response.json();
  };

  return (
    <div className="mb-16">
      <h2 className="text-xl text-primary-grey mb-12">Add a Comment</h2>
      <div>
        <h4 className="text-base text-primary-grey">Message</h4>
        <textarea
          onChange={(e) => setText(e.target.value)}
          className="rounded-sm row-span-2 backdrop-brightness-50 w-full min-h-24 outline-none bg-neutral-lightGrey p-3 "
          placeholder="Hi there"
        />
        <div className="flex justify-between">
          <button
            onClick={handleSubmit}
            className="w-20 h-11 bg-primary-grey text-neutral-white text-base mt-6"
          >
            Post
          </button>

          <button
            onClick={() => {
              logout();
              {
                returnTo: process.env.NEXT_PUBLIC_URL + "/blog";
              }
            }}
            className="w-20 h-11 bg-semantic-errorState text-neutral-white text-base mt-6"
          >
            LogOut
          </button>
        </div>
      </div>
    </div>
  );
};

export default Comment;
