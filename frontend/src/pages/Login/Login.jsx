import { useState } from "react";
import twitterimg from "../../image/twitter.jpeg";
import TwitterIcon from "@mui/icons-material/Twitter";
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init'; // Assuming this is the correct path
import './Login.css';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);

    console.log(user);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email, password);
        signInWithEmailAndPassword(email, password)
            .catch((error) => {
                // Handle errors here
                setErrorMessage(error.message);
            });
    };

    return (
        <div className="login-container">
            <div className="image-container">
                <img src={twitterimg} alt="twitter icon" />
            </div>
            <div className="form-container">
                <TwitterIcon />
                <h2>Happening Now</h2>
                <form onSubmit={handleSubmit}>
                    <input type="email" className="email" placeholder="Email Address" onChange={(e) => setEmail(e.target.value)}/>
                    <input type="password" className="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                    <div className="btn-login">
                        <button type="submit" className="btn">
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
