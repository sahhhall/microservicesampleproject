import React, { useState } from "react";
import axios from "axios";

export default ({ url, method, body, onSuccess }) => {
  const [errors, setErrors] = useState(null);

  const doRequest = async (props = {}) => {
    try {
      console.log("props",props)
      setErrors(null);
      const response = await axios({
        url,
        method,
        data: { ...body, ...props },
        withCredentials: true,
      });
      if (onSuccess) {
        onSuccess(response.data);
      }
      return response.data;
    } catch (err) {
      setErrors(
        <div className="mb-4 p-3  border bg-red-900 border-red-300 rounded-md">
          <h4 className="font-semibold">Oops...</h4>
          <ul className="">
            {err.response?.data?.errors?.map((error) => (
              <li className=" text-xs " key={error.message}>
                {error.message}
              </li>
            ))}
          </ul>
        </div>
      );
    }
  };

  return { doRequest, errors };
};
