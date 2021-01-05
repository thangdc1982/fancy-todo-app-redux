import React, {useEffect} from 'react';
import './App.css';
import Login from './components/Login';
import Main from './components/Main';
import { signIn, signOut } from './actions/UserActions';
import { useDispatch } from 'react-redux';
// Redux
import { useSelector } from 'react-redux';
// Router
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
// firebase
import { auth } from './firebase';

function App() {
  const user = useSelector(state => {    
    return state.user.user;
  });  

  const dispatch = useDispatch();

  useEffect(() => {
    // checking for the user login event change
    auth.onAuthStateChanged(authUser => {
      if (authUser) {
        dispatch(signIn({
          uid: authUser.uid,
          photo: authUser.photoURL,
          email: authUser.email,
          displayName: authUser.displayName
        }));
      } else {
        // logged out
        dispatch(signOut());
      }
    })
  }, [dispatch]);

  return (
    <Router>
      <Switch>
        <Route path="/todos">
           { !user ? <Redirect to="/" /> : <Main /> }
        </Route>
        <Route path="/login">
          { user ? <Redirect to="/todos" /> : <Login /> }
        </Route>        
        <Route exact path="/">
          { user ? <Redirect to="/todos" /> : <Login /> }
        </Route>        
      </Switch>
    </Router>    
  );
}

export default App;
