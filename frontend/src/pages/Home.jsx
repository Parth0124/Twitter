import { useAuthState } from "react-firebase-hooks/auth"
import auth from "../firebase.init"
import { signOut } from "firebase/auth"
import { Outlet } from 'react-router-dom'
import Sidebar from "./Sidebar/Sidebar"
import Widgets from "./Widgets/Widgets"


function Home() {

  const user = useAuthState(auth);

  const handleLogout = () =>{
    signOut(auth)
  }

  return (
    <div className="app">
      <Sidebar handleLogout={handleLogout} user={user}/>
      <Outlet />
      <Widgets />
    </div>
  )
}

export default Home
