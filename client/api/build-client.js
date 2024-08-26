import axios from "axios";

const buildClient = ({req}) => {
  if (typeof window === 'undefined') {
    // Server-side
    return axios.create({
      baseURL: 'http://auth-srv/',
      headers:  req.headers 
    })
  } else {
    return axios.create({
      baseURL: 'http://192.168.49.2:30030/',
      withCredentials: true, 
    });
  }
};

export default buildClient;
