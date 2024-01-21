import { Link } from 'react-router-dom';
import ListErrors from './ListErrors';
import React from 'react';
import agent from '../agent';
import { connect, useDispatch, useSelector } from 'react-redux';
// import {
//   UPDATE_FIELD_AUTH,
//   REGISTER,
//   REGISTER_PAGE_UNLOADED
// } from '../constants/actionTypes';
import { register, registerPageUnloaded, updateFieldAuth } from '../reducers/auth';

// const mapStateToProps = state => ({ ...state.auth });

// const mapDispatchToProps = dispatch => ({
//   onChangeEmail: value =>
//     dispatch({ type: UPDATE_FIELD_AUTH, key: 'email', value }),
//   onChangePassword: value =>
//     dispatch({ type: UPDATE_FIELD_AUTH, key: 'password', value }),
//   onChangeUsername: value =>
//     dispatch({ type: UPDATE_FIELD_AUTH, key: 'username', value }),
//   onSubmit: (username, email, password) => {
//     const payload = agent.Auth.register(username, email, password);
//     dispatch({ type: REGISTER, payload })
//   },
//   onUnload: () =>
//     dispatch({ type: REGISTER_PAGE_UNLOADED })
// });

export default function Register(){
  const auth = useSelector((state) => ({ ...state.auth }));
  const dispatch = useDispatch();
  const changeEmail = ev => dispatch(updateFieldAuth(ev.target.value));
  const changePassword = ev => dispatch(updateFieldAuth(ev.target.value));
  const changeUsername = ev => dispatch(updateFieldAuth(ev.target.value));
  const submitForm = (username, email, password) => ev => {
    ev.preventDefault();
    const payload = agent.Auth.register(username, email, password);
    dispatch(register(payload));
  }
  const email = auth.email;
  const password = auth.password;
  const username = auth.username;

  // componentWillUnmount() {
  //   dispatch(registerPageUnloaded());
  // }
  // render() {

    return (
      <div className="auth-page">
        <div className="container page">
          <div className="row">

            <div className="col-md-6 offset-md-3 col-xs-12">
              <h1 className="text-xs-center">Sign Up</h1>
              <p className="text-xs-center">
                <Link to="/login">
                  Have an account?
                </Link>
              </p>

              <ListErrors errors={auth.errors} />

              <form onSubmit={() => submitForm(username, email, password)}>
                <fieldset>

                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="text"
                      placeholder="Username"
                      value={auth.username}
                      onChange={changeUsername} />
                  </fieldset>

                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="email"
                      placeholder="Email"
                      value={auth.email}
                      onChange={changeEmail} />
                  </fieldset>

                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="password"
                      placeholder="Password"
                      value={auth.password}
                      onChange={changePassword} />
                  </fieldset>

                  <button
                    className="btn btn-lg btn-primary pull-xs-right"
                    type="submit"
                    disabled={auth.inProgress}>
                    Sign up
                  </button>

                </fieldset>
              </form>
            </div>

          </div>
        </div>
      </div>
    );
}

// export default connect(mapStateToProps, mapDispatchToProps)(Register);
