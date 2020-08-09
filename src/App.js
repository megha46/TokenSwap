import React, { Component } from 'react';
import './App.css';
import RegisterPage from './components/RegisterPage';
import LoginPage from './components/LoginPage';
import Dashboard from './components/Dashboard';
import {  BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Auth from './components/Auth';


class App extends Component {
  constructor(){
    super();
  }
 
  render() {
   
  return (
    <Router>
    
    <div>
      <Switch>
      <Route exact path={"/"} render = {props => 
        (<RegisterPage {...props}/>
      )}/>
      <Route exact path={"/LoginPage"} render = {props => 
        (<LoginPage {...props} />
      )}/>
       
        <PrivateRoute path={"/Dashboard"} component={Dashboard} />
        
      </Switch>
    </div>
    </ Router>
  );
  }
}
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
  {...rest}
  render={props =>
  Auth.getAuth() ? (
  <Component {...props} />
  ) : (
  <Redirect
  to={{
  pathname: "/LoginPage"
  }}
  />
  )
  }
  />
  );

export default App;
