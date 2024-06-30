import { useState } from "react";
import twitterimg from "../../image/twitter.jpeg";
import TwitterIcon from "@mui/icons-material/Twitter";
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth'

function Signup() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')
    const [name, setName] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
      ] = useCreateUserWithEmailAndPassword();
    
    console.log(user)
    
      const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username, name, email, password);
      createUserWithEmailAndPassword(username, name,  email, password)
      };

  return (
    <div className="signup-container">
      <div className="image-container">
        <img src={twitterimg} alt="twitter icon" />
      </div>
      <div className="form-container">
        <TwitterIcon />
        <h2>Happening Now</h2>
        <form onSubmit={handleSubmit}>
        <input type="text" placeholder="@username" onChange={(e) => setUsername(e.target.value)} className="display-name"/>
        <input type="text" placeholder="Enter full name" onChange={(e) => setName(e.target.value)} className="display-name"/>
          <input type="email" className="email" placeholder="Email Address" onChange={(e) => setEmail(e.target.value)}/>
          <input type="password" className="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
          <div className="btn-login">
            <button type="submit" className="btn">
              Sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Signup
