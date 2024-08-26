import { useEffect } from "react";
import userRequest from "../../hooks/user-request";
import  Router from "next/router";

export default () => {
  const { doRequest, errors } = userRequest({
    url: "http://192.168.49.2:30030/api/users/signout",
    method: "post",
    body: {},
    onSuccess: () => Router.push("/"),
  });
  useEffect(()=> {
    doRequest();
  },[]);
  return <div>Signin you out</div>;
};
