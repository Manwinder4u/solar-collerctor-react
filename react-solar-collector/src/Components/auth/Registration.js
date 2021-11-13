import React from 'react'
import axios from 'axios'
import {Redirect} from 'react-router-dom'
import { styled } from '@mui/material/styles';
import {Grid, Card, FormControl, TextField} from '@mui/material'

export default class Registration extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      password_confirmation: "",
      address: "",
      phone_number: "",
      registrationErrors: "",
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
    const {
      first_name, last_name, email, password, password_confirmation, address, phone_number
    } = this.state;

    axios.post("http://localhost:3001/v1/registrations", {
      user: {
        first_name: first_name,
        last_name: last_name,
        email: email,
        password: password,
        password_confirmation: password_confirmation,
        address: address,
        phone_number: phone_number
      }}, 
      { WithCredentials: true }
    ).then(response => {
        if (response.data.status === 'created'){
          //this.setState({ isSignedUp: true });
          this.props.handlelogin(response.data);
        }
      }
    ).catch(error => { console.log("Registration Errors", error) } 
    )

    this.setState({ 
      first_name: '',
      last_name: '',
      email: '',
      password: "",
      password_confirmation: "",
      address: "",
      phone_number: ""
    });
  }

  render() {
    if (this.props.isLoggedIn === "LOGGED_IN") {
      return <Redirect to = {{ pathname: "/dashboard" }} />;
    }
    return (
      <Grid>
        <Card>
          <FormControl sx={{ m: 5, width: '75ch' }} variant="outlined" onSubmit={this.handleSubmit}>
            {/* <input 
              type="text" 
              name="first_name"
              value={this.state.first_name} 
              placeholder = "First name"
              onChange={this.handleChange} 
            /> */}
            <TextField
              id="outlined-first-name"
              label="First name"
              value={this.state.first_name}
              onChange={this.handleChange} 
              variant="outlined"
              required
              sx={{ m: 1 }}
              color="secondary"
            />
            <TextField
              id="outlined-last-name"
              label="Last name"
              value={this.state.last_name}
              onChange={this.handleChange} 
              variant="outlined"
              required
              sx={{ m: 1 }}
              color="secondary"
            />
            <TextField
              id="outlined-email"
              label="email"
              value={this.state.email}
              onChange={this.handleChange} 
              variant="outlined"
              required
              sx={{ m: 1 }}
              color="secondary"
            />
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
            <input 
              type="text" 
              name="password_confirmation"
              value={this.state.password_confirmation} 
              placeholder = "Password confirmation"
              onChange={this.handleChange} 
            />
            <input 
              type="text" 
              name="address"
              placeholder = "Address"
              value={this.state.address} 
              onChange={this.handleChange} 
            />
            <input 
              type="text" 
              name="phone_number"
              value={this.state.phone_number}
              placeholder = "Phone number"
              onChange={this.handleChange} 
            />                                        
            <input type="submit" value="Submit" />
          </FormControl>
        </Card>
      </Grid>
    );
  }
}
