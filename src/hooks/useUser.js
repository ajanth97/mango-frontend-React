import useSWR from "swr";
import axios from "axios";

const fetchWithToken = async (url, token) => {
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });

  if (!response.ok) {
    const error = new Error(
      "An error occurred while fetching user account data"
    );
    error.info = await response.json();
    error.status = response.status;
    throw error;
  }
  return response.json();
};

/*
const fetchWithToken = (url, token) => (
    axios.get(url, {
        headers: {'Content-Type': 'application/json', 'Authorization' : 'Bearer ' + token}
    }).then(response => response.json())
      .catch(error => {
        console.log(error)  
        return Error(error)
      })
)
*/

export function useUser() {
  const localStorageToken = localStorage.getItem("token");
  const { data, error } = useSWR(
    [
      "https://mango-backend.herokuapp.com/api/protected/myaccount",
      localStorageToken,
    ],
    fetchWithToken
  );
  return {
    user: data,
    isLoading: !data && !error,
    isError: error,
  };
}
