import React,{useState, useCallback}from 'react';
import {BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom';
import Users from './user/pages/Users';
import NewPlace from './places/components/pages/NewPlace';
import UserPlaces from './places/components/pages/UserPlaces';
import UpdatePlace from './places/components/pages/UpdatePlaces';
import Auth from './user/pages/Auth';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import { AUthContext } from './shared/context/auth-context';
const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  const login = useCallback(() => {
    setIsLoggedIn(true);
  }, []);


const logout= useCallback(() => {
    setIsLoggedIn(false);
  }, []);

  return (
    <AUthContext.Provider value={{isLoggedIn: isLoggedIn, login: login, logout: logout}}>
  <Router>
  <MainNavigation />
  <main>
    <Switch>
      <Route path="/" exact>
        <Users />
      </Route>
      <Route path="/:userId/places" exact>
        <UserPlaces />
      </Route>
      <Route path="/places/new" exact>
        <NewPlace />
      </Route>
      <Route path="/places/:placeId" exact>
        <UpdatePlace />
      </Route>
      <Route path="/auth" exact>
        <Auth />
      </Route>
      <Redirect to="/" />
    </Switch>
  </main>
</Router>
</AUthContext.Provider>

  );
  
};

export default App;
