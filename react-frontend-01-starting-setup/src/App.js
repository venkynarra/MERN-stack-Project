import React from 'react';
import {BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom';
import Users from './user/pages/Users';
import NewPlace from './places/components/NewPlace';
import UserPlaces from './places/components/pages/UserPlaces';
import UpdatePlace from './places/components/pages/UpdatePlaces';
import MainNavigation from './shared/components/Navigation/MainNavigation';
const App = () => {
  return (
  <Router>
    <MainNavigation />
    <main>
    <Switch>
    <Route path = "/" exact>    {/* the path / this is ypou can keep any thing after that it will return user path, exact = true  */}
    <Users/>
    </Route>
    <Route path="/:userId/places" exact>
    <UserPlaces />
    </Route>
    <Route path = "/places/new" exact>    {/* the path / this is ypou can keep any thing after that it will return user path, exact = true  */}
    <NewPlace/>{/* NewPlace as a self render component*/}
    </Route>
    <Route path = "/places/:placeId"></Route>
    <UpdatePlace />

    <Redirect to = "/"/> {/*  redirect is when you enter after the / you will redirect to the same url */}
    </Switch>
    </main>
  
  
  </Router>
  );
};

export default App;
