import React, { useState } from "react";
import Router from "next/router";
import userRequest from "../../hooks/user-request";
export default () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { doRequest, errors } = userRequest({
    url: "http://192.168.49.2:30030/api/users/signin",
    method: "post",
    body: {
      email,
      password,
    },
    onSuccess: () => Router.push("/"),
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    await doRequest();
  };

  return (
    <div>
        
      <form onSubmit={handleSubmit}>
        <h2>SignIn</h2>
        <div>
          <label className="mb-1 font-normal text-xs tracking-widest">
            Email
          </label>
          <input
            value={email}
            className="border w-[250px] outline-none text-xs rounded-sm px-2 min-h-7 max-h-7 border-black"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label className="mb-1 font-normal text-xs tracking-widest">
            Password
          </label>
          <input
            type="password"
            value={password}
            className="border w-[250px] outline-none text-xs rounded-sm px-2 min-h-7 max-h-7 border-black"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {errors}
        <button
          type="submit"
          className="px-3 text-nowrap font-semibold text-white rounded-md py-1 border black bg-black"
        >
          Login
        </button>
      </form>
    </div>
  );
};
