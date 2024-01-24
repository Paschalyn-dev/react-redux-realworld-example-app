import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import agent from '../../agent';
import { profilePageLoaded, profilePageUnloaded } from '../../redux-toolkit/reducers/articleList';
import { useDispatch } from 'react-redux';

function ProfileFavorites (props) {
    const dispatch = useDispatch();
  useEffect(() => {
    dispatch(profilePageLoaded(page => agent.Articles.favoritedBy(props.match.params.username, page), Promise.all([
      agent.Profile.get(props.match.params.username),
      agent.Articles.favoritedBy(props.match.params.username)
    ])));
  }, [])

  useEffect(() => {
    return () => dispatch(profilePageUnloaded());
  }, [])

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

export default ProfileFavorites;