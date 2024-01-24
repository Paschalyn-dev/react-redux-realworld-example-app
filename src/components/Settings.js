import ListErrors from './ListErrors';
import React, { useEffect, useState } from 'react';
import agent from '../../redux-toolkit-example/agent';
import { connect, useDispatch, useSelector } from 'react-redux';
// import {
//   SETTINGS_SAVED,
//   SETTINGS_PAGE_UNLOADED,
//   LOGOUT
// } from '../constants/actionTypes';
import { logout, settingsSaved } from '../reducers/common';

function SettingsForm(props) {
    const [myState, setState] = useState({
      image: '',
      username: '',
      bio: '',
      email: '',
      password: '',
      inProgress: '', //I added this one here myself
    });

    const updateState = field => ev => {
      const state = myState;
      const newState = Object.assign({}, state, { [field]: ev.target.value });
      setState(newState);
    };

    const submitForm = ev => {
      ev.preventDefault();

      const user = Object.assign({}, this.state);
      if (!user.password) {
        delete user.password;
      }
      this.props.onSubmitForm(user);
    };

  useEffect(() => {
    if (props.currentUser) {
      Object.assign(myState, {
        image: props.currentUser.image || '',
        username: props.currentUser.username,
        bio: props.currentUser.bio,
        email: props.currentUser.email
      });
    }
  }, []) 

  useEffect(() => {
    if (props.currentUser) {
        setState(Object.assign({}, myState, {
        image: props.currentUser.image || '',
        username: props.currentUser.username,
        bio: props.currentUser.bio,
        email: props.currentUser.email
      }));
    }
  }, [props])

    return (
      <form onSubmit={submitForm}>
        <fieldset>

          <fieldset className="form-group">
            <input
              className="form-control"
              type="text"
              placeholder="URL of profile picture"
              value={myState.image}
              onChange={() => updateState('image')} />
          </fieldset>

          <fieldset className="form-group">
            <input
              className="form-control form-control-lg"
              type="text"
              placeholder="Username"
              value={myState.username}
              onChange={() => updateState('username')} />
          </fieldset>

          <fieldset className="form-group">
            <textarea
              className="form-control form-control-lg"
              rows="8"
              placeholder="Short bio about you"
              value={myState.bio}
              onChange={() => updateState('bio')}>
            </textarea>
          </fieldset>

          <fieldset className="form-group">
            <input
              className="form-control form-control-lg"
              type="email"
              placeholder="Email"
              value={myState.email}
              onChange={() => updateState('email')} />
          </fieldset>

          <fieldset className="form-group">
            <input
              className="form-control form-control-lg"
              type="password"
              placeholder="New Password"
              value={myState.password}
              onChange={() => updateState('password')} />
          </fieldset>

          <button
            className="btn btn-lg btn-primary pull-xs-right"
            type="submit"
            disabled={myState.inProgress}>
            Update Settings
          </button>

        </fieldset>
      </form>
    );
}

// const mapStateToProps = state => ({
//   ...state.settings,
//   currentUser: state.common.currentUser
// });

// const mapDispatchToProps = dispatch => ({
//   onClickLogout: () => dispatch({ type: LOGOUT }),
//   onSubmitForm: user =>
//     dispatch({ type: SETTINGS_SAVED, payload: agent.Auth.save(user) }),
//   onUnload: () => dispatch({ type: SETTINGS_PAGE_UNLOADED })
// });


export default function Settings(){
  const settings = useSelector((state) => ({
    ...state.settings, 
    currentUser: state.common.currentUser
  }));
  
  const dispatch = useDispatch();
    return (
      <div className="settings-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-6 offset-md-3 col-xs-12">
              <h1 className="text-xs-center">Your Settings</h1>

              <ListErrors errors={settings.errors}></ListErrors>

              <SettingsForm
                currentUser={settings.currentUser}
                onSubmitForm={dispatch(settingsSaved())} />

              <hr />

              <button
                className="btn btn-outline-danger"
                onClick={dispatch(logout())}>
                Or click here to logout.
              </button>

            </div>
          </div>
        </div>
      </div>
    );
}

// export default connect(mapStateToProps, mapDispatchToProps)(Settings);
