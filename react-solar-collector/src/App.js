import './App.css';
import Home from '../src/Components/Home'
import Dashboard from '../src/Components/Dashboard'
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom'
import Registration from './Components/auth/Registration';
import Login from './Components/auth/Login';
import { Component } from 'react';


export default class App extends Component {

  constructor() {
    super();

    this.state = {
      loggedInStatus: "NOT_LOGGED_IN",
      user: {}
    }

    this.handlelogin = this.handlelogin.bind(this);
  }

  handlelogin(data) {
    this.setState({
      loggedInStatus: "LOGGED_IN",
      user: data.user
    })
  }

  render(){
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route exact path={"/"}>
              <Home/>
            </Route>
            <Route exact path={"/register"}>
              <Registration {...this.props} handlelogin={this.handlelogin} isLoggedIn={this.state.loggedInStatus}/>
            </Route>
            <Route exact path={"/dashboard"}>
              <Dashboard {...this.props} handlelogin={this.handlelogin} user={this.state.user} isLoggedIn={this.state.loggedInStatus}/>
            </Route>
            <Route exact path={"/login"}>
              <Login {...this.props} handlelogin={this.handlelogin} isLoggedIn={this.state.loggedInStatus}/>
            </Route>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}
