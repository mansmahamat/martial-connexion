import axios from 'axios';
import { useMutation, useQuery } from 'react-query';

const postLogin = async (email, password) => {
    const { data } = await axios.post(
      "http://localhost:8081/api/user/login", {
          email, password
      }
    );

    localStorage.setItem("authToken", data.token);
  
    return data;
  };
  
  export function usePostLogin(email, password) {
    return useMutation(() => postLogin(email, password));
  }