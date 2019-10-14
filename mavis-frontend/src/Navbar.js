import React from 'react';
const axios = require('axios');
const store = require('store');


export class Navbar extends React.Component {
  constructor(props){
    super(props)
    
    //Check to see if logged in
    // var user = store.get('user');
    var token = "Token " + store.get('token');
    if(token) {
      var currentUser = this.current(token);
      var loggedIn = true;
    } else {
      var loggedIn = false;
    }

    this.state = {
      loggedIn: loggedIn,
      user: "",
      showLoginForm: false,
      showRegisterForm: false,
      email: "",
      password: "",
      buyingPower: 0
    }



    this.toggleLoginForm = this.toggleLoginForm.bind(this);
    this.toggleRegisterForm = this.toggleRegisterForm.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.login = this.login.bind(this);
    this.register = this.register.bind(this);
    this.current = this.current.bind(this);
    this.logout = this.logout.bind(this);
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
      // alert(response.data.user.email)
      store.set('token', response.data.user.token)
      console.log(response.data)
      this.setState({
        user: response.data.user,
        token: response.data.user.token,
        buyingPower: response.data.buyingPower,
        loggedIn: true,
        showLoginForm: false
      })
    })
    .catch(function (error) {
      // handle error
      console.log("error")
      console.log(error)
    });
  }
  register() {
    //Post register route
    var email = this.state.email;
    var password = this.state.password;
    var register = axios.post('api/users/register', { 
      user: {
        email: email,
        password: password,
      }
    })
    .then((response) => {
      console.log(response.data);
      this.setState(state => ({
        showRegisterForm: false
      }));
    })
    .catch(function (error) {
      // handle error
    });
  }

  current(token) {
    var login = axios.get('api/users/current', {
      headers: {Authorization: token}
    })
    .then((response) => {
      // alert(response.data.user.email)
      store.set('user', response.data.user)
      this.setState({
        user: response.data.user,
        // token: response.data.user.token,
        buyingPower: response.data.buyingPower,
        loggedIn: true,
        showLoginForm: false
      })
    })
    .catch(function (error) {
      // handle error
      console.log("error")
      console.log(error)
    });
  }

  logout() {
    store.remove('token');
    this.setState({
      loggedIn: false
    });
  }
  toggleLoginForm() {
    this.setState(state => ({
      showLoginForm: !state.showLoginForm,
      showRegisterForm: false
    }));
  }
  toggleRegisterForm() {
    this.setState(state => ({
      showRegisterForm: !state.showRegisterForm,
      showLoginForm: false
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
          <div className={this.state.loggedIn ? 'hidden' : ''}>
            <button className="nav-button" onClick={this.toggleLoginForm}>Login</button>
            <button className="nav-button" onClick={this.toggleRegisterForm}>Sign Up</button>
          </div>
          <div className={this.state.loggedIn ? '' : 'hidden'}>
            ${this.state.buyingPower}
            <button className="nav-button" onClick={this.logout}>Logout</button>
          </div>
        </div>
        <div className={this.state.showLoginForm ? '' : 'hidden'}>
          Email: <input type="email" value={this.state.email} onChange={this.handleEmailChange}/>
          Password: <input type="password" value={this.state.password} onChange={this.handlePasswordChange}/>
          <button onClick={this.login}>Log In</button>
        </div>
        <div className={this.state.showRegisterForm ? '' : 'hidden'}>
          Email: <input type="email" value={this.state.email} onChange={this.handleEmailChange}/>
          Password: <input type="password" value={this.state.password} onChange={this.handlePasswordChange}/>
          <button onClick={this.register}>Sign Up</button>
        </div>
      </div>
    );
  }
  
}

export default Navbar;