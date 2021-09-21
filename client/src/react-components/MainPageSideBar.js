import React from "react";
import mainPage_sideBar_profile from "../Images/mainPage_sideBar_profile.svg";
import mainPage_sideBar_setting from "../Images/mainPage_sideBar_setting.svg";
import mainPage_sideBar_message from "../Images/mainPage_sideBar_message.svg";
import mainPage_sideBar_video from "../Images/mainPage_sideBar_video.svg";
import mainPage_sideBar_home from "../Images/mainPage_sideBar_home.svg";
import mainPage_Logo from "../Images/mainPage_Logo.svg";
import mainPage_sideBar_search from "../Images/mainPage_sideBar_Search.svg";
import mainPage_Logout_Icon from "../Images/mainPage_Logout_Icon.svg";
import { NavLink, useHistory } from "react-router-dom";

const MainPageFriend = () => {
  return (
    <>
      <div className="MainPage_SideBar_Friend_Outline">
        <img
          src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGVyc29ufGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80"
          alt=""
          className="MainPage_SideBar_Friend_Image"
        />
        <p className="MainPage_SideBar_Friend_Name">Katherine</p>
        <div className="MainPage_SideBar_Friend_Active_Status">
          <p>Active</p>
        </div>
      </div>
    </>
  );
};

const ShowFriends = () => {
  return (
    <>
      <div className="MainPage_SideBar_Friends_Inner_Container">
        <MainPageFriend />
        <MainPageFriend />
        <MainPageFriend />
        <MainPageFriend />
        <MainPageFriend />
        <MainPageFriend />
        <MainPageFriend />
        <MainPageFriend />
        <MainPageFriend />
      </div>
    </>
  );
};

const MainPageSideBar = () => {
  const history = useHistory();
  const userLogOut = async () => {
    try {
      const res = await fetch("/u/logout", {
        method: "GET",
        header: {
          Accpet: "application/josn",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      history.push("/signin", { replace: true });
      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (err) {}
  };
  return (
    <>
      <div className="MainPage_SideBar_Container">
        <div className="MainPage_SideBar_Logo_Search_Container">
          <img
            className="MainPage_SideBar_Page_Logo"
            src={mainPage_Logo}
            alt="logo"
          />
          <div className="MainPage_SideBar_Search_Outline">
            <img
              className="MainPage_SideBar_Search_Icon"
              src={mainPage_sideBar_search}
              alt="search"
            />
            <input
              className="MainPage_SideBar_Search_Input_Field"
              type="text"
              placeholder="Search"
            />
          </div>
        </div>
        <div className="MainPage_SideBar_Menu_Container">
          <h2 className="MainPage_SideBar_Menu_Title">Menu</h2>
          <div className="MainPage_SideBar_Menu_NavLink_Container">
            <NavLink to="/u" className="MainPage_SideBar_Menu_Home_Container">
              <div className="MainPage_SideBar_Menu_SelectBar_Colored"></div>
              <img
                className="MainPage_SideBar_Menu_Home_Logo"
                src={mainPage_sideBar_home}
                alt="home"
              />
              <h3 className="MainPage_SideBar_Menu_Home_Title">Home</h3>
            </NavLink>
            <NavLink
              to="/u/video"
              className="MainPage_SideBar_Menu_Video_Container"
            >
              <div className="MainPage_SideBar_Menu_SelectBar_Colored"></div>
              <img
                className="MainPage_SideBar_Menu_Video_Logo"
                src={mainPage_sideBar_video}
                alt="video"
              />
              <h3 className="MainPage_SideBar_Menu_Video_Title">Video</h3>
            </NavLink>
            <NavLink
              to="/u/message"
              className="MainPage_SideBar_Menu_Message_Container"
            >
              <div className="MainPage_SideBar_Menu_SelectBar_Colored"></div>
              <img
                className="MainPage_SideBar_Menu_Message_Logo"
                src={mainPage_sideBar_message}
                alt="message"
              />
              <h3 className="MainPage_SideBar_Menu_Message_Title">Message</h3>
            </NavLink>
            <NavLink
              to="/u/setting"
              className="MainPage_SideBar_Menu_Setting_Container"
            >
              <div className="MainPage_SideBar_Menu_SelectBar_Colored"></div>
              <img
                className="MainPage_SideBar_Menu_Setting_Logo"
                src={mainPage_sideBar_setting}
                alt="setting"
              />
              <h3 className="MainPage_SideBar_Menu_Setting_Title">Setting</h3>
            </NavLink>
            <NavLink
              to="/u/profile"
              className="MainPage_SideBar_Menu_Profile_Container"
            >
              <div className="MainPage_SideBar_Menu_SelectBar_Colored"></div>
              <img
                className="MainPage_SideBar_Menu_Profile_Logo"
                src={mainPage_sideBar_profile}
                alt="profile"
              />
              <h3 className="MainPage_SideBar_Menu_Profile_Title">Profile</h3>
            </NavLink>
          </div>
          <hr className="MainPage_SideBar_Horizontal_Line" />
        </div>
        <div className="MainPage_SideBar_Friends_Container">
          <h2 className="MainPage_SideBar_Friends_Title">Friends</h2>
          <ShowFriends />
        </div>
        <hr className="MainPage_SideBar_Horizontal_Line" />
        <div className="MainPage_SideBar_User_Account_LogOut_Container">
          <h2 className="MainPage_SideBar_Account_Title">Account</h2>
          <div className="MainPage_SideBar_User_Account_Logout_Outline">
            <img
              src="https://www.diethelmtravel.com/wp-content/uploads/2016/04/bill-gates-wealthiest-person.jpg"
              className="MainPage_SideBar_User_Account_Img"
              alt="profile"
            />
            <h3 className="MainPage_SideBar_User_Account_Name">Roman</h3>
            <img
              src={mainPage_Logout_Icon}
              className="MainPage_LogOut_Icon"
              alt="logout"
              onClick={userLogOut}
            />
            <button
              className="MainPage_SideBar_User_Logout_Button"
              onClick={userLogOut}
            >
              Log Out
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainPageSideBar;