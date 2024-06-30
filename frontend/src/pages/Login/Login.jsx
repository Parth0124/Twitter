import { useState } from "react";
import twitterimg from "../../image/twitter.jpeg";
import TwitterIcon from "@mui/icons-material/Twitter";
import GoogleButton from 'react-google-button'
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useSignInWithGoogle } from 'react-firebase-hooks/auth'
import auth from "../../firebase.init"; // Assuming this is the correct path
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const [signInWithEmailAndPassword, user, loading, error] = useSignInWithEmailAndPassword(auth);
  const [signInWithGoogle, googleUser, googleLoading, googleError] = useSignInWithGoogle(auth);

  if(user || googleUser) {
    console.log(user || googleUser);
    navigate('/');
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email, password);
    signInWithEmailAndPassword(email, password).catch((error) => {
      // Handle errors here
      setErrorMessage(error.message);
    });
  };

  const handleGoogleSignIn = () => {
    signInWithGoogle();
  }

  return (
    <div className="login-container">
      <div className="image-container">
        <img src={twitterimg} alt="twitter icon" className="image"/>
      </div>
      <div className="form-container">
        <div className="form-box">
          <TwitterIcon style={{color: 'skyblue'}}/>
          <h2 className="heading">Happening Now</h2>
          <h3 className="heading1">Know what's happening today</h3>
          <form onSubmit={handleSubmit} className="input-form">
            <input
              type="email"
              className="email"
              placeholder="Email Address"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              className="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            {errorMessage && <p className="errorMessage">{errorMessage}</p>}
            <div className="btn-login">
              <button type="submit" className="btn">
                Login
              </button>
            </div>
          </form>
          <hr />
          <div className="google-button">
            <GoogleButton
              className="g-btn"
              type="light"
              onClick={handleGoogleSignIn}
            />
          </div>
          <br />
          <div style={{textAlign: 'center'}}>
               Don't have an account? 
               <Link to='/signup' style={{textDecoration: 'none', color: 'skyblue', fontWeight:'600', marginLeft: '5px'}}>Signup</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
