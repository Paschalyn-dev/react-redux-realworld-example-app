import { Link } from 'react-router-dom';
import ListErrors from './ListErrors';
import React, { useEffect } from 'react';
import agent from '../../agent';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { login, loginPageUnloaded, updateFieldAuth } from '../../redux-toolkit/reducers/auth';

function Login() {
    const auth = useSelector((state) => ({...state.auth}));
    const dispatch = useDispatch();
    const changeEmail = ev => dispatch(updateFieldAuth(ev.target.value));
    const changePassword = ev => dispatch(updateFieldAuth(ev.target.value));
    const submitForm = (email, password) => ev => {
        ev.preventDefault();
        dispatch(login(email, password));
    };

    useEffect(() => {
        return () => dispatch(loginPageUnloaded())
    },[])

    const email = auth.props.email;
    const password = auth.props.password;
    return (
      <div className="auth-page">
        <div className="container page">
          <div className="row">

            <div className="col-md-6 offset-md-3 col-xs-12">
              <h1 className="text-xs-center">Sign In</h1>
              <p className="text-xs-center">
                <Link to="/register">
                  Need an account?
                </Link>
              </p>

              <ListErrors errors={auth.errors} />

              <form onSubmit={() => submitForm(email, password)}>
                <fieldset>

                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={changeEmail} />
                  </fieldset>

                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={changePassword} />
                  </fieldset>

                  <button
                    className="btn btn-lg btn-primary pull-xs-right"
                    type="submit"
                    disabled={auth.inProgress}>
                    Sign in
                  </button>

                </fieldset>
              </form>
            </div>

          </div>
        </div>
      </div>
    );
}

export default Login;