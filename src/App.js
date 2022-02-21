import React, { Component } from "react";
import { connect } from "react-redux";
import { Router, Switch, Route, Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import BoardUser from "./components/board-user.component";
import BoardModerator from "./components/board-moderator.component";
import BoardAdmin from "./components/board-admin.component";

import JobSeeker from "./components/JobSeeker"
import JobRecruiter from "./components/JobRecruiter"

import { logout } from "./actions/auth";
import { clearMessage } from "./actions/message";

import { history } from './helpers/history';

// import AuthVerify from "./common/auth-verify";
import EventBus from "./common/EventBus";
import { Redirect } from "react-router-dom";

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showJobSeekerBoard: false,
      showJobRecruiterBoard: false,
      currentUser: undefined,
      isLogOut: false
    };

    history.listen((location) => {
      props.dispatch(clearMessage()); // clear message when changing location
    });
  }

  componentDidMount() {
    const user = this.props.user;
    console.log(user, 'user')

    // if (user) {
    //   this.setState({
    //     currentUser: user,
    //     showJobSeekerBoard: user.roles.includes("ROLE_MODERATOR"),
    //     showJobRecruiterBoard: user.roles.includes("ROLE_ADMIN"),
    //   });
    // }

    EventBus.on("logout", () => {
      this.logOut();
    });
    this.renderUser()
  }

  componentWillUnmount() {
    EventBus.remove("logout");
  }

  logOut() {
    this.props.dispatch(logout());
    this.setState({
      showJobSeekerBoard: false,
      showJobRecruiterBoard: false,
      currentUser: undefined,
    });
  }

  renderUser =()=>{
    const user = JSON.parse(localStorage.getItem("user"));
    if (user){
      if(user.role==='Job Recruiter'){
        this.setState({showJobRecruiterBoard:true})
      }else if(user.role==='Job Seeker'){
        this.setState({showJobSeekerBoard:true}) 
      }
    }
  }
  onLogoutClicked =()=>{
    this.setState({isLogOut:true})
    window.location.reload();
    JSON.parse(localStorage.removeItem("user"));
    
  }

  

  render() {
    const { currentUser, showJobSeekerBoard, showJobRecruiterBoard } = this.state;
    console.log(this.state.isLogOut, 'is')
    
    return (
      <Router history={history}>
        <div>
          <nav className="navbar navbar-expand navbar-dark bg-dark">
            <Link to={"/"} className="navbar-brand">
              MoltoTerfo
            </Link>
            <div className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to={"/home"} className="nav-link">
                  Home
                </Link>
              </li>

              {showJobSeekerBoard && (
                <li className="nav-item">
                  <Link to={"/mod"} className="nav-link">
                    Job Seeker Board
                  </Link>
                </li>
              )}

              {showJobRecruiterBoard && (
                <li className="nav-item">
                  <Link to={"/admin"} className="nav-link">
                    Job Recruiter Board
                  </Link>
                </li>
              )}

              {/* {currentUser && (
                <li className="nav-item">
                  <Link to={"/user"} className="nav-link">
                    User
                  </Link>
                </li>
              )} */}
            </div>

                <div>
                  {showJobRecruiterBoard || showJobSeekerBoard?
                  <div className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <button onClick={this.onLogoutClicked} className="nav-link">
                      Logout
                    </button>
                  </li>
                </div>
                :
                <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/login"} className="nav-link">
                    Login
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to={"/register"} className="nav-link">
                    Sign Up
                  </Link>
                </li>
              </div>
                }
                </div>
            {/* {currentUser ? (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/profile"} className="nav-link">
                    {currentUser.username}
                  </Link>
                </li>
                <li className="nav-item">
                  <a href="/login" className="nav-link" onClick={this.logOut}>
                    LogOut
                  </a>
                </li>
              </div>
            ) : (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/login"} className="nav-link">
                    Login
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to={"/register"} className="nav-link">
                    Sign Up
                  </Link>
                </li>
              </div>
            )} */}
          </nav>

          <div className="container mt-3">
            <Switch>
              <Route exact path={["/", "/home"]} component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/profile">
                <Profile isLogOut={this.state.isLogOut}/>
              </Route>
              {/* <Route path="/seeker" component={B} />
              <Route path="/recruiter" component={BoardUser} /> */}
              {/* <Route path="/user" component={BoardUser} />
              <Route path="/mod" component={BoardModerator} />
              <Route path="/admin" component={BoardAdmin} /> */}
            </Switch>
          </div>

          {/* <AuthVerify logOut={this.logOut}/> */}
        </div>
      </Router>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state.auth;
  return {
    user,
  };
}

export default connect(mapStateToProps)(App);
