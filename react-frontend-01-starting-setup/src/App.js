import React from 'react';
import {BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom';
 import Users from './user/pages/Users';
import NewPlace from './places/components/pages/NewPlace';
import UserPlaces from './places/components/pages/UserPlaces';
import UpdatePlace from './places/components/pages/UpdatePlaces';
import Auth from './user/pages/Auth';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import { AuthContext } from './shared/context/auth-context';
import { useAuth } from './shared/hooks/auth-hook';




const App = () => {
  const {token,login, logout, userId } = useAuth();


  let routes;

if (token) {
  routes = (
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
      
      <Redirect to="/" />
      </Switch>
  );

}else {
  routes = (
    <Switch>
    <Route path="/" exact>
        <Users />
      </Route>

      <Route path="/:userId/places" exact>
        <UserPlaces />
      </Route>
      <Route path="/auth" exact>
        <Auth />
      </Route>
      <Redirect to="/auth" />
      </Switch>
  );
}


  return (
    <AuthContext.Provider value={{isLoggedIn: !!token, token: token, userId: userId, login: login, logout: logout}}>
  <Router>
  <MainNavigation />
  <main>
    
      {routes}
    
  </main>
</Router>
</AuthContext.Provider>

  );
  
};

export default App;
