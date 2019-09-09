import React from 'react';
const axios = require('axios');


export class Navbar extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      loggedIn: false,
      token: "",
      showLoginForm: false,
      showRegisterForm: false,
      email: "",
      password: ""
    }

    this.toggleLoginForm = this.toggleLoginForm.bind(this);
    this.toggleRegisterForm = this.toggleRegisterForm.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.login = this.login.bind(this);
  }

  componentDidMount() {
    // this.formatPrice();
  }

  login() {
    //Post login route
    var email = this.state.email;
    var password = this.state.password;
    var login = axios.post('api/users/login', {
      user: {
        email: email,
        password: password,
      }
    })
    .then((response) => {
      console.log(response.data)
    })
    .catch(function (error) {
      // handle error
    });
  }
  register() {
    //Post register route
    var register = axios.post('api/users/register', { 
      
    })
    .then((response) => {

    })
    .catch(function (error) {
      // handle error
    });
  }
  toggleLoginForm() {
    this.setState(state => ({
      showLoginForm: !state.showLoginForm
    }));
  }
  toggleRegisterForm() {
    this.setState(state => ({
      showRegisterForm: !state.showRegisterForm
    }));
  }
  handleEmailChange(event) {
    this.setState({email: event.target.value});
  }
  handlePasswordChange(event) {
    this.setState({password: event.target.value});
  }


  render() {
    return (
      <div className="navbar">
        <div className="left">
          MAVIS
        </div>
        <div className="right">
          <button className="nav-button" onClick={this.toggleLoginForm}>Login</button>
          <button className="nav-button">Sign Up</button>
        </div>
        <div className={this.state.showLoginForm ? '' : 'hidden'}>
          Email: <input type="email" value={this.state.email} onChange={this.handleEmailChange}/>
          Password: <input type="password" value={this.state.password} onChange={this.handlePasswordChange}/>
          <button onClick={this.login}>Log In</button>
        </div>
      </div>
    );
  }
  
}

export default Navbar;