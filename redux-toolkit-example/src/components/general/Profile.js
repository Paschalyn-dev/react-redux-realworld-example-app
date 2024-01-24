import ArticleList from './ArticleList';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import agent from '../../agent';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { profilePageLoaded, profilePageUnloaded } from '../../redux-toolkit/reducers/articleList';
import {followUser, unfollowUser} from "../../redux-toolkit/reducers/profile"

const EditProfileSettings = props => {
  if (props.isUser) {
    return (
      <Link
        to="/settings"
        className="btn btn-sm btn-outline-secondary action-btn">
        <i className="ion-gear-a"></i> Edit Profile Settings
      </Link>
    );
  }
  return null;
};

const FollowUserButton = props => {
  if (props.isUser) {
    return null;
  }

  let classes = 'btn btn-sm action-btn';
  if (props.user.following) {
    classes += ' btn-secondary';
  } else {
    classes += ' btn-outline-secondary';
  }

  const handleClick = ev => {
    ev.preventDefault();
    if (props.user.following) {
      props.unfollow(props.user.username)
    } else {
      props.follow(props.user.username)
    }
  };

  return (
    <button
      className={classes}
      onClick={handleClick}>
      <i className="ion-plus-round"></i>
      &nbsp;
      {props.user.following ? 'Unfollow' : 'Follow'} {props.user.username}
    </button>
  );
};

function Profile() {
  const profile = useSelector(state => ({
    ...state.articleList,
    currentUser: state.common.currentUser,
    profile: state.profile
  }));
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(profilePageLoaded(Promise.all([
      agent.Profile.get(profile.match.params.username),
      agent.Articles.byAuthor(profile.match.params.username)
    ])));
  },[])

  useEffect(() => {
    return () => dispatch(profilePageUnloaded());
  },[])

  const newProfile = profile.profile;
  if (!profile) {
    return null;
  }

  const isUser = profile.currentUser &&
    profile.profile.username === profile.currentUser.username;
    
    const renderTabs = () =>  {
    return (
      <ul className="nav nav-pills outline-active">
        <li className="nav-item">
          <Link
            className="nav-link active"
            to={`/@${profile.profile.username}`}>
            My Articles
          </Link>
        </li>

        <li className="nav-item">
          <Link
            className="nav-link"
            to={`/@${profile.profile.username}/favorites`}>
            Favorited Articles
          </Link>
        </li>
      </ul>
    );
  }

    return (
      <div className="profile-page">

        <div className="user-info">
          <div className="container">
            <div className="row">
              <div className="col-xs-12 col-md-10 offset-md-1">

                <img src={profile.image} className="user-img" alt={profile.username} />
                <h4>{profile.username}</h4>
                <p>{profile.bio}</p>

                <EditProfileSettings isUser={isUser} />
                <FollowUserButton
                  isUser={isUser}
                  user={profile}
                  follow={dispatch(followUser())}  
                  unfollow={dispatch(unfollowUser())}
                  />

              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row">

            <div className="col-xs-12 col-md-10 offset-md-1">

              <div className="articles-toggle">
                {() => renderTabs()}
              </div>

              <ArticleList
                pager={profile.pager}
                articles={profile.articles}
                articlesCount={profile.articlesCount}
                state={profile.currentPage} />
            </div>

          </div>
        </div>

      </div>
    );
}

export default Profile;
export { Profile };