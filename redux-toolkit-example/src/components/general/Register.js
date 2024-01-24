import { Link } from 'react-router-dom';
import ListErrors from './ListErrors';
import React, { useEffect } from 'react';
import agent from '../../agent';
import { updateFieldAuth, register, registerPageUnloaded } from '../../redux-toolkit/reducers/auth';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

function Register () {
    const auth = useSelector(state => ({...state.auth}));
    const dispatch = useDispatch();
    const changeEmail = ev => dispatch(updateFieldAuth(ev.target.value));
    const changePassword = ev => dispatch(updateFieldAuth(ev.target.value));
    const changeUsername = ev => dispatch(updateFieldAuth(ev.target.value));
    const submitForm = (username, email, password) => ev => {
      ev.preventDefault();
      const payload = agent.Auth.register(username, email, password);
      dispatch(register(payload));
    }

    useEffect(() => {
        return () => dispatch(registerPageUnloaded());
    }, [])

    const email = auth.email;
    const password = auth.password;
    const username = auth.username;

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

export default Register;