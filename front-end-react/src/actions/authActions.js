import { Auth } from 'aws-amplify';
import { GET_ERRORS, SET_CURRENT_USER } from './types';

// Register
export const registerUser = userData => dispatch => {
  Auth.signUp(userData)
    .then(() => {
      console.log('Successfully signed up');
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err
      });
      console.log(err);
    });
};

// Confirm register
export const confirmRegister = (userData, history) => dispatch => {
  Auth.confirmSignUp(userData.username, userData.code)
    .then(() => {
      console.log('Successfully confirmed signed up');
      history.push('/login');
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err
      });
      console.log(err);
    });
};

// Log in
export const loginUser = userData => dispatch => {
  Auth.signIn(userData)
    .then(res => {
      // Save to store
      const username = res.username;
      localStorage.setItem('currentUserName', username);

      // Set current user
      dispatch(setCurrentUser(res));
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err
      });
      console.log(err);
    });
};

// Set logged in user
export const setCurrentUser = userData => {
  return {
    type: SET_CURRENT_USER,
    payload: userData
  };
};

// Log out
export const logoutUser = () => dispatch => {
  localStorage.removeItem('currentUserName');
  Auth.signOut()
    .then()
    .catch(err => console.log(err));
  dispatch(setCurrentUser({}));
};
