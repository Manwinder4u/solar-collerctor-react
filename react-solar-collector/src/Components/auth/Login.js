import React, { Fragment } from 'react'
import axios from 'axios'
import {Redirect} from 'react-router-dom'

export default class Login extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      loginErrors: "",
      isSignedUp: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    const { email, password } = this.state;

    axios.post("http://localhost:3001/v1/sessions", {
      user: {
        email: email,
        password: password
      }}, 
      { WithCredentials: true }
    ).then(response => {
        console.log("login error", response);
        if (response.data.status === 'created'){
          //this.setState({ isSignedUp: true });
          this.props.handlelogin(response.data);
        }
      }
    ).catch(error => { console.log("login Errors", error) } 
    )

    this.setState({ 
      email: '',
      password: ""
    });
  }

  render() {
    if (this.props.isLoggedIn === "LOGGED_IN") {
      return <Redirect to = {{ pathname: "/dashboard" }} />;
    }
    return (
      <Fragment>
        <h1>Status: {this.props.isLoggedIn}</h1>
        <form onSubmit={this.handleSubmit}>
          <input 
            type="text" 
            name="email"
            value={this.state.email} 
            placeholder = "Email"
            onChange={this.handleChange} 
          />
          <input 
            type="text" 
            name="password"
            value={this.state.password} 
            placeholder = "Password"
            onChange={this.handleChange} 
          />                                    
          <input type="submit" value="Submit" value="Login"/>
        </form>
      </Fragment>
    );
  }
}
