import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../firebase.init";

const useLoggedInUser = () => {
  const [user] = useAuthState(auth);
  const email = user?.email;
  const [loggedInUser, setLoggedInUser] = useState({}); // Ensure initial state matches your expected structure

  useEffect(() => {
    if (email) {
      fetch(`http://localhost:4000/loggedInUser?email=${email}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error('Failed to fetch user data');
          }
          return res.json();
        })
        .then((data) => {
          setLoggedInUser(data);
        })
        .catch(error => {
          console.error('Error fetching user data:', error);
          // Handle error or set appropriate default state
        });
    }
  }, [email]);

  return [loggedInUser, setLoggedInUser];
};

export default useLoggedInUser;
