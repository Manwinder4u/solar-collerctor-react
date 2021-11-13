import React, { Component } from 'react'

export default class Dashboard extends Component {

  constructor(props) {
    super(props);

    //this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this)
  }

  render() {
    return (
      <div>
        <h1>status:{this.props.isLoggedIn}</h1>
        Dashboard
      </div>
    )
  }
}
