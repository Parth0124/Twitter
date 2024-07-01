import "./Sidebar.css";
import TwitterIcon from "@mui/icons-material/Twitter";
import SidebarOptions from "./SidebarOptions";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import ListAltIcon from "@mui/icons-material/ListAlt";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import DoneIcon from "@mui/icons-material/Done";
import Divider from "@mui/material/Divider";
import { Avatar, Button, IconButton, Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import CustomeLink from "./CustomeLink";
import useLoggedInUser from "../../hooks/useLoggedInUser";

function Sidebar({ handleLogout, user }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [loggedInUser] = useLoggedInUser();

  const openMenu = Boolean(anchorEl);

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const userProfilePic = loggedInUser[0]?.profileImage
    ? loggedInUser[0]?.profileImage
    : "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png";
  const result = user?.email?.split("@")[0];

  return (
    <div className="sidebar">
      <TwitterIcon className="sidebar__twitterIcon" />
      <CustomeLink to="/home/feed">
        <SidebarOptions active Icon={HomeIcon} text="Home" />
      </CustomeLink>
      <CustomeLink to="/home/explore">
        <SidebarOptions Icon={SearchIcon} text="Explore" />
      </CustomeLink>
      <CustomeLink to="/home/notifications">
        <SidebarOptions Icon={NotificationsIcon} text="Notifications" />
      </CustomeLink>
      <CustomeLink to="/home/messages">
        <SidebarOptions Icon={MailOutlineIcon} text="Messages" />
      </CustomeLink>
      <CustomeLink to="/home/bookmarks">
        <SidebarOptions Icon={BookmarkBorderIcon} text="Bookmarks" />
      </CustomeLink>
      <CustomeLink to="/home/lists">
        <SidebarOptions Icon={ListAltIcon} text="Lists" />
      </CustomeLink>
      <CustomeLink to="/home/profile">
        <SidebarOptions Icon={PermIdentityIcon} text="Profile" />
      </CustomeLink>
      <CustomeLink to="/home/more">
        <SidebarOptions Icon={MoreHorizIcon} text="More" />
      </CustomeLink>
      <Button variant="outlined" className="sidebar__tweet">
        Tweet
      </Button>

      <div className="Profile__info" onClick={handleClick}>
        <Avatar src={userProfilePic} />
        <div className="user__info">
          <h4>
            {loggedInUser[0]?.name
              ? loggedInUser[0]?.name
              : user && user?.displayName}
          </h4>
          <h5>@{result}</h5>
        </div>
        <IconButton
          size="small"
          aria-controls={openMenu ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={openMenu ? "true" : undefined}
        >
          <MoreHorizIcon />
        </IconButton>
      </div>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleClose}
      >
        <MenuItem className="Profile_info1">
          <Avatar src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png" />
          <div className="user__info subUser__info">
            <div>
              <h4>
                {loggedInUser[0]?.name
                  ? loggedInUser[0]?.name
                  : user && user?.displayName}
              </h4>
              <h5>@{result}</h5>
            </div>
            <DoneIcon className="done_icon" />
          </div>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>Add an existing account</MenuItem>
        <MenuItem onClick={handleLogout}>Log out @{result}</MenuItem>
      </Menu>
    </div>
  );
}

export default Sidebar;
