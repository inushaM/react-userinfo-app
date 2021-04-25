import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loginActions } from '../actions/loginAction'

class Login extends Component {

  constructor(props) {
    super(props)

    this.state = {
      username: '',
      password: ''
    };

    this.changeHandler = this.changeHandler.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit(e) {
    e.preventDefault();
    // this.setState({ submitted: true });
    const { username, password } = this.state;
    if (username && password) {
      this.props.fetchToken(username, password);
    }
  }

  render() {
    const { loginInfo } = this.props;
    const { username, password } = this.state;
    return (
      <div>
        <nav className="navbar navbar-light navBar" >
          <h4 className="navBarTitle">User details view application</h4>
        </nav>
        <div className="container">
          <div className="row">
            <div className="col-md-2"></div>
            <div className="col-md-8">
              <div className="card border-primary mb-3 login_card" >
                <div className="card-header"><h4>User Login</h4></div>
                <div className="card-body text-primary">
                  <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                      <label>User Name:</label>
                      <input type="text" className="form-control" name="username" value={username} onChange={this.changeHandler} placeholder="Enter Username" required />
                    </div>
                    <div className="form-group">
                      <label>Password:</label>
                      <input type="password" className="form-control" name="password" value={password} onChange={this.changeHandler} placeholder="Enter Password" required />
                    </div>
                    <button type="submit" className="btn btn-outline-primary loginBtn">Login</button>
                  </form>
                </div>
              </div>
            </div>
            <div className="col-md-2"></div>
          </div>
          <div className="row">
            <div className="col-md-2"><p>{loginInfo}</p></div>
          </div>
        </div>
      </div>
    )
  }
}

//get data from store(Receive redux state)
const mapStateToProps = state => {
  return {
    loginInfo: state.info.token
  }
}

//send data to the Action
const mapDispatchToProps = {
  fetchToken: loginActions.fetchToken
};

export default connect(mapStateToProps, mapDispatchToProps)(Login)
