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
  const[userId, setUserId] = useState(null);

  const login = useCallback((uId) => {
    setIsLoggedIn(true);
    setUserId(uId)
;  }, []);


const logout= useCallback(() => {
    setIsLoggedIn(false);
    setUserId(null);
  }, []);

  let routes;

if (isLoggedIn) {
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
    <AUthContext.Provider value={{isLoggedIn: isLoggedIn, userId: userId, login: login, logout: logout}}>
  <Router>
  <MainNavigation />
  <main>
    
      {routes}
    
  </main>
</Router>
</AUthContext.Provider>

  );
  
};

export default App;
