import { Profile, mapStateToProps } from './Profile';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import agent from '../../redux-toolkit-example/agent';
import { connect, useDispatch, useSelector } from 'react-redux';
// import {
//   PROFILE_PAGE_LOADED,
//   PROFILE_PAGE_UNLOADED
// } from '../constants/actionTypes';
import { profilePageLoaded, profilePageUnloaded } from '../reducers/profile';

// const mapDispatchToProps = dispatch => ({
//   onLoad: (pager, payload) =>
//     dispatch({ type: PROFILE_PAGE_LOADED, pager, payload }),
//   onUnload: () =>
//     dispatch({ type: PROFILE_PAGE_UNLOADED })
// });

export default function ProfileFavorites(props) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(profilePageLoaded(page => agent.Articles.favoritedBy(props.match.params.username, page)), Promise.all([
      agent.Profile.get(props.match.params.username),
      agent.Articles.favoritedBy(props.match.params.username)
    ]));
  }, [])

  // componentWillUnmount() {
  //   dispatch(profilePageUnloaded());
  // }
    return (
      <ul className="nav nav-pills outline-active">
        <li className="nav-item">
          <Link
            className="nav-link"
            to={`/@${props.profile.username}`}>
            My Articles
          </Link>
        </li>

        <li className="nav-item">
          <Link
            className="nav-link active"
            to={`/@${props.profile.username}/favorites`}>
            Favorited Articles
          </Link>
        </li>
      </ul>
    );
}

// export default connect(mapStateToProps, mapDispatchToProps)(ProfileFavorites);
