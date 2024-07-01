import React, { useState } from "react";
import "./TweetBox.css";
import { Avatar, Button } from "@mui/material";
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import axios from "axios";
import { useUserAuth } from "../../../context/UserAuthContext";
import useLoggedInUser from "../../../hooks/useLoggedInUser";

function TweetBox() {
    const [post, setPost] = useState('');
    const [imageURL, setImageURL] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [loggedInUser] = useLoggedInUser();
    const { user } = useUserAuth();
    const email = user?.email;

    const userProfilePic = loggedInUser[0]?.profileImage ? loggedInUser[0]?.profileImage : "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png";

    const handleUploadImage = (e) => {
        setIsLoading(true);
        const image = e.target.files[0];

        const formData = new FormData();
        formData.append('image', image);

        axios.post("https://api.imgbb.com/1/upload?key=bce9c8c6c5f7293cbf18b19abd22bdf5", formData)
            .then(res => {
                setImageURL(res.data.data.display_url);
                setIsLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setIsLoading(false);
            });
    };

    const handleTweet = (e) => {
        e.preventDefault();

        if (user?.providerData[0]?.providerId === 'password') {
            fetch(`https://twitter-el5n.onrender.com/loggedInUser?email=${email}`)
                .then(res => res.json())
                .then(data => {
                    setName(data[0]?.name);
                    setUsername(data[0]?.username);
                    postTweet();
                })
                .catch(error => {
                    console.error('Error fetching user data:', error);
                });
        } else {
            setName(user?.displayName);
            setUsername(email?.split('@')[0]);
            postTweet();
        }
    };

    const postTweet = () => {
        const userPost = {
            profilePhoto: userProfilePic,
            post: post,
            photo: imageURL,
            username: username,
            name: name,
            email: email,
        };

        console.log('Sending userPost:', userPost);

        fetch('https://twitter-el5n.onrender.com/post', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userPost),
        })
        .then(res => res.json())
        .then(data => {
            console.log('Post response:', data);
            setPost('');
            setImageURL('');
        })
        .catch(error => {
            console.error('Error posting tweet:', error);
        });
    };

    return (
        <div className="tweetBox">
            <form onSubmit={handleTweet}>
                <div className="tweetBox__input">
                    <Avatar src={userProfilePic} />
                    <input
                        type="text"
                        placeholder="What's happening?"
                        onChange={(e) => setPost(e.target.value)}
                        value={post}
                        required
                    />
                </div>
                <div className="imageIcon_tweetButton">
                    <label htmlFor='image' className="imageIcon">
                        {isLoading ? <p>Uploading Image</p> : <p>{imageURL ? 'Image Uploaded' : <AddPhotoAlternateOutlinedIcon />}</p>}
                    </label>
                    <input
                        type="file"
                        id='image'
                        className="imageInput"
                        onChange={handleUploadImage}
                    />
                    <Button className="tweetBox__tweetButton" type="submit">Tweet</Button>
                </div>
            </form>
        </div>
    );
}

export default TweetBox;
