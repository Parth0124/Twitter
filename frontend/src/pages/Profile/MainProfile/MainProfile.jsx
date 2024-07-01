import React, { useState, useEffect } from 'react';
import './mainprofile.css';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CenterFocusWeakIcon from '@mui/icons-material/CenterFocusWeak';
import LockResetIcon from '@mui/icons-material/LockReset';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import AddLinkIcon from '@mui/icons-material/AddLink';
import Post from "./Post/Post"
import { useNavigate } from 'react-router-dom';
import EditProfile from '../EditProfile/EditProfile';
import axios from "axios";
import useLoggedInUser from '../../../hooks/useLoggedInUser';

const MainProfile = ({ user }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [loggedInUser, setLoggedInUser] = useLoggedInUser();
  const username = user?.email?.split('@')[0];
  const [posts, setPosts] = useState([]);
  const [coverImage, setCoverImage] = useState(loggedInUser[0]?.coverImage || 'https://www.proactivechannel.com/Files/BrandImages/Default.jpg');
  const [profileImage, setProfileImage] = useState(loggedInUser[0]?.profileImage || 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png');

  useEffect(() => {
    fetch('http://localhost:4000/post')
      .then(res => res.json())
      .then(data => {
        setPosts(data);
      });
  }, [posts]);

  const handleUploadCoverImage = e => {
    setIsLoading(true);
    const image = e.target.files[0];
    const formData = new FormData();
    formData.set('image', image);

    axios.post("https://api.imgbb.com/1/upload?key=a73ad338f0ad056bc125237265dc1348", formData)
      .then(res => {
        const url = res.data.data.display_url;
        setIsLoading(false);
        setCoverImage(url); // Update state with uploaded cover image URL

        const userCoverImage = {
          email: user?.email,
          coverImage: url,
        };

        if (url) {
          fetch(`http://localhost:4000/userUpdates/${user?.email}`, {
            method: "PATCH",
            headers: {
              'content-type': 'application/json'
            },
            body: JSON.stringify(userCoverImage),
          })
            .then(res => res.json())
            .then(data => {
              console.log('done', data);
            });
        }
      })
      .catch((error) => {
        console.log(error);
        window.alert(error);
        setIsLoading(false);
      });
  };

  const handleUploadProfileImage = e => {
    setIsLoading(true);
    const image = e.target.files[0];
    const formData = new FormData();
    formData.set('image', image);

    axios.post("https://api.imgbb.com/1/upload?key=a73ad338f0ad056bc125237265dc1348", formData)
      .then(res => {
        const url = res.data.data.display_url;
        setIsLoading(false);
        setProfileImage(url); // Update state with uploaded profile image URL

        const userProfileImage = {
          email: user?.email,
          profileImage: url,
        };

        if (url) {
          fetch(`http://localhost:4000/userUpdates/${user?.email}`, {
            method: "PATCH",
            headers: {
              'content-type': 'application/json'
            },
            body: JSON.stringify(userProfileImage),
          })
            .then(res => res.json())
            .then(data => {
              console.log('done', data);
            });
        }
      })
      .catch((error) => {
        console.log(error);
        window.alert(error);
        setIsLoading(false);
      });
  };

  return (
    <div>
      <ArrowBackIcon className='arrow-icon' onClick={() => navigate('/')} />
      <h4 className='heading-4'>{username}</h4>
      <div className='mainprofile'>
        <div className='profile-bio'>
          <div>
            <div className='coverImageContainer'>
              <img src={coverImage} alt="Cover Image" className='coverImage' />
              <div className='hoverCoverImage'>
                <div className="imageIcon_tweetButton">
                  <label htmlFor='image' className="imageIcon">
                    {
                      isLoading ?
                        <LockResetIcon className='photoIcon photoIconDisabled ' />
                        :
                        <CenterFocusWeakIcon className='photoIcon' />
                    }
                  </label>
                  <input
                    type="file"
                    id='image'
                    className="imageInput"
                    onChange={handleUploadCoverImage}
                  />
                </div>
              </div>
            </div>
            <div className='avatar-img'>
              <div className='avatarContainer'>
                <img src={profileImage} className="avatar" alt="Profile Image" />
                <div className='hoverAvatarImage'>
                  <div className="imageIcon_tweetButton">
                    <label htmlFor='profileImage' className="imageIcon">
                      {
                        isLoading ?
                          <LockResetIcon className='photoIcon photoIconDisabled ' />
                          :
                          <CenterFocusWeakIcon className='photoIcon' />
                      }
                    </label>
                    <input
                      type="file"
                      id='profileImage'
                      className="imageInput"
                      onChange={handleUploadProfileImage}
                    />
                  </div>
                </div>
              </div>
              <div className='userInfo'>
                <div>
                  <h3 className='heading-3'>
                    {loggedInUser[0]?.name ? loggedInUser[0]?.name : user && user.displayName}
                  </h3>
                  <p className='usernameSection'>@{loggedInUser[0]?.username}</p>
                </div>
                <EditProfile user={user} loggedInUser={loggedInUser} />
              </div>
              <div className='infoContainer'>
                {loggedInUser[0]?.bio ? <p>{loggedInUser[0].bio}</p> : ''}
                <div className='locationAndLink'>
                  {loggedInUser[0]?.location ? <p className='subInfo'><MyLocationIcon /> {loggedInUser[0].location}</p> : ''}
                  {loggedInUser[0]?.website ? <p className='subInfo link'><AddLinkIcon /> {loggedInUser[0].website}</p> : ''}
                </div>
              </div>
              <h4 className='tweetsText'>Tweets</h4>
              <hr />
            </div>
            {
              posts.map(p => <Post key={p._id} id={p._id} p={p} />)
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainProfile;
