import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
import { connect } from "react-redux";
import JobRecruiter from './JobRecruiter'
import JobSeeker from "./JobSeeker";
class Profile extends Component {

  renderUser =()=>{
    const user = JSON.parse(localStorage.getItem("user"));
    if (user){
      if(user.role==='Job Recruiter'){
        return <JobRecruiter/>
      }else if(user.role==='Job Seeker'){
        return <JobSeeker/> 
      }
    }
  }
  


  render() {
    // const { user: currentUser } = this.props;
    // console.log(this.props, 'props'),

    // if (!currentUser) {
    //   return <Redirect to="/login" />;
    // }
    if(this.props.isLogOut){
      return <Redirect to={'/login'}/>
    }

    return (
      <div className="container">

        {this.renderUser()}
        {/* <header className="jumbotron">
          <h3>
            <strong>{currentUser.name}</strong> Profile
          </h3>
        </header> */}
        {/* <p>
          {console.log(currentUser, 'cur')}
          <strong>Token:</strong> {currentUser.token.substring(0, 20)} ...{" "}
          {currentUser.accessToken.substr(currentUser.token.length - 20)}
        </p> */}
        {/* <p>
          <strong>Id:</strong> {currentUser.id}
        </p>
        <p>
          <strong>Email:</strong> {currentUser.email}
        </p>
        <p>
          <strong>Phone No</strong> {currentUser.phone_no}
        </p>
        <p>
          <strong>Address:</strong> {currentUser.address}
        </p>
        <p>
          <strong>Role:</strong> {currentUser.role}
        </p>

        <strong>Authorities:</strong> */}
        {/* <ul>
          {currentUser.roles &&
            currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
        </ul> */}
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state.auth;
  return {
    user,
  };
}

export default connect(mapStateToProps)(Profile);


