import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../firebase.init";
import { signOut } from "firebase/auth";
import { Outlet } from 'react-router-dom';
import Sidebar from "./Sidebar/Sidebar";
import Widgets from "./Widgets/Widgets";
import useLoggedInUser from "../hooks/useLoggedInUser";

function Home() {
  const [user, loading, error] = useAuthState(auth);
  const [loggedInUser] = useLoggedInUser();
  console.log(loggedInUser)

  const handleLogout = () => {
    signOut(auth);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="app">
      <Sidebar handleLogout={handleLogout} user={user} />
      <Outlet />
      <Widgets />
    </div>
  );
}

export default Home;
