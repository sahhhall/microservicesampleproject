import React, { useState } from "react";
import Router from "next/router";
import userRequest from "../../hooks/user-request";

const NewTicket = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");

  const { doRequest, errors } = userRequest({
    url: "http://192.168.49.2:30033/api/tickets",
    method: "post",
    body: {
      title,
      price,
    },
    onSuccess: () => Router.push('/'),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    doRequest();
  };

  return (
    <div className="flex justify-center items-center ">
      <div className="w-full max-w-md p-4">
        <form onSubmit={handleSubmit}>
          <h2 className="mb-4 text-lg font-semibold">Create a Ticket</h2>
          <div className="mb-4">
            <label className="mb-1 font-normal text-xs tracking-widest">
              Title
            </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border w-full outline-none text-xs rounded-sm px-2 min-h-7 max-h-7 border-black"
            />
          </div>
          <div className="mb-4">
            <label className="mb-1 font-normal text-xs tracking-widest">
              Price
            </label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="border w-full outline-none text-xs rounded-sm px-2 min-h-7 max-h-7 border-black"
            />
          </div>
          {errors}
          <button
            type="submit"
            className="px-3 text-nowrap font-semibold text-white rounded-md py-1 border black bg-black"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewTicket;
