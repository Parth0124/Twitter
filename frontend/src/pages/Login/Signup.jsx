import { useState, useEffect } from "react";
import twitterimg from "../../image/twitter.jpeg";
import TwitterIcon from "@mui/icons-material/Twitter";
import GoogleButton from 'react-google-button';
import { useCreateUserWithEmailAndPassword, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { getAuth } from "firebase/auth";
import './Login.css';
import { Link, useNavigate } from "react-router-dom";

const auth = getAuth();

function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [name, setName] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth);

    const [signInWithGoogle, googleUser, googleLoading, googleError] = useSignInWithGoogle(auth);

    useEffect(() => {
        if (user || googleUser) {
            console.log(user || googleUser);
            navigate('/');
        }
    }, [user, googleUser, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');

        try {
            await createUserWithEmailAndPassword(email, password);
            // Optionally, update user profile with username and name here
        } catch (error) {
            setErrorMessage(error.message);
        }
    };

    const handleGoogleSignIn = async () => {
        setErrorMessage('');
        try {
            await signInWithGoogle();
        } catch (error) {
            setErrorMessage(error.message);
        }
    };

    return (
        <div className="login-container">
            <div className="image-container">
                <img src={twitterimg} alt="twitter icon" className="image"/>
            </div>
            <div className="form-container">
                <div className="form-box">
                    <TwitterIcon className="Twitteicon" style={{color: 'skyblue'}}/>
                    <h2 className="heading">Happening Now</h2>
                    <h3 className="heading1">Join Twitter today!</h3>
                    <form onSubmit={handleSubmit} className="input-form">
                        <input type="text" placeholder="@username" onChange={(e) => setUsername(e.target.value)} className="display-name"/>
                        <input type="text" placeholder="Enter full name" onChange={(e) => setName(e.target.value)} className="display-name"/>
                        <input type="email" className="email" placeholder="Email Address" onChange={(e) => setEmail(e.target.value)}/>
                        <input type="password" className="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
                        {errorMessage && <p className="errorMessage">{errorMessage}</p>}
                        <div className="btn-login">
                            <button type="submit" className="btn">
                                Sign up
                            </button>
                        </div>
                    </form>
                    <hr />
                    <div className="google-button">
                        <GoogleButton className="g-btn" type="light" onClick={handleGoogleSignIn}/>
                    </div>
                    <br />
                    <div style={{textAlign: 'center'}}>
                        Already have an account?
                        <Link to='/login' style={{textDecoration: 'none', color: 'skyblue', fontWeight:'600', marginLeft: '5px'}}>Login</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Signup;
