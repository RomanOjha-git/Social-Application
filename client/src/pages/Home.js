import React from "react";
import "emoji-mart/css/emoji-mart.css";
import LoadingSpinner from "../components/LoadingSpinner";
import { useSelector } from "react-redux";
import UserPostFeed from "../components/UserPostFeed";
import "../styles/pages/homePage.css";
import "../styles/others/emojiMarPacakge.css";
import OpenSideBarDrawerButton from "../components/OpenSideBarDrawerButton";
import OpenRightPartDrawerButton from "../components/OpenRightPartDrawerButton";
import DefaultSocialPost from "../components/DefaultSocialPost";
import UserPostFieldView from "../components/HomePage/UserPostFieldView";
import DisplayFollowedUserPost from "../components/HomePage/DisplayFollowedUserPost";

const Home = () => {
  const userProfileDetailStore = useSelector(
    (state) => state.setUserProfileDetailReducer
  );
  const userPostResponseDataState = useSelector(
    (state) => state.setUserPostResponseData
  );
  const followedUserPostDataStore = useSelector(
    (state) => state.setFollowedUserPostDataReducer
  );
  const userProfilePostStore = useSelector(
    (state) => state.setUserProfilePostReducer
  );
  return (
    <>
      <LoadingSpinner />
      <div className="HomePage_Container">
        <OpenSideBarDrawerButton />
        <OpenRightPartDrawerButton />
        <div className="HomePage_User_Post_Field_Container">
          <UserPostFieldView />
        </div>
        <div className="HomePage_Feed_Main_Container">
          {followedUserPostDataStore.length == 0 ? (
            <DefaultSocialPost />
          ) : (
            <></>
          )}
          {/* Displaying current userPost filed */}
          {userPostResponseDataState.map((value) => {
            return (
              <UserPostFeed
                key={value.id}
                // sending user main information
                userMainInformation={userProfileDetailStore}
                // sending user feed information information
                userFeedData={value}
              />
            );
          })}
          {/* Display only those user profile post which are post 5 min ago */}
          {userProfilePostStore.map((post) => {
            // if(post)
            let currentDate = new Date();
            let date5MinutesAgo = new Date(currentDate);
            date5MinutesAgo.setMinutes(date5MinutesAgo.getMinutes() - 5);
            if (date5MinutesAgo.getTime() < new Date(post.date).getTime()) {
              return (
                <UserPostFeed
                  key={post._id}
                  userMainInformation={userProfileDetailStore}
                  userFeedData={post}
                />
              );
            } else {
              return <div key={post._id}></div>;
            }
          })}
          {/* Displaying current user Followed User post field filed */}
          <DisplayFollowedUserPost />
        </div>
      </div>
    </>
  );
};

export default Home;