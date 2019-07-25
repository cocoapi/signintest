import React from 'react';
import { Component } from 'react'
import * as fb from 'firebase/app'
import "firebase/auth"

const fb_set = {
  apiKey: "AIzaSyCwFG10JUlIUEgBWheNwaTIL_8R37Fm2UQ",
  authDomain: "rulitest-fd916.firebaseapp.com",
  databaseURL: "https://rulitest-fd916.firebaseio.com",
  projectId: "rulitest-fd916",
  storageBucket: "",
  messagingSenderId: "27064529171",
  appId: "1:27064529171:web:4fb42e7d47e12990"
}

const G_BUTTON = 'google-sign-in-button'

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      gprofile: [],
      fprofile: []
    }
  }
  onSignIn = (googleUser) => {
    console.log(googleUser)
    // Useful data for your client-side scripts:
    var profile = googleUser.getBasicProfile();
    console.log("ID: " + profile.getId()); // Don't send this directly to your server!
    console.log('Full Name: ' + profile.getName());
    console.log('Given Name: ' + profile.getGivenName());
    console.log('Family Name: ' + profile.getFamilyName());
    console.log("Image URL: " + profile.getImageUrl());
    console.log("Email: " + profile.getEmail());
    this.setState({gprofile: profile})
    // The ID token you need to pass to your backend:
    var id_token = googleUser.getAuthResponse().id_token;
    console.log("ID Token: " + id_token);
  }

  onFailure = (e) =>{
    console.log(e)
  }

  componentDidMount(){
   window.gapi.signin2.render(G_BUTTON, {
          'width': 250,
          'height': 50,
          'longtitle': false,
          'theme': 'dark',
          'onsuccess': this.onSignIn,
          'onfailure': this.onFailure
        })
  }
  
  fb_test = () => {
    fb.initializeApp(fb_set)
    var prov = new fb.auth.GoogleAuthProvider()
    prov.addScope("https://www.googleapis.com/auth/contacts.readonly")
    fb.auth().languageCode='ko-kr'
    fb.auth().signInWithPopup(prov).then(res =>{
      console.log(res.credential.accessToken)
      console.log(res.user)
    }).catch(e=> {
      console.log(e)
    })
  }

  render() {
    return (
      <div style={{
        textAlign: "center",
        height: "900px",
        display: "flex",
        flexDirection: "column"
      }}>
        {console.log(this.state)}
        <div style={{
          height: "20%"
        }}>
          test-bench1 - single provider
          <br />
          <div style={{width: "250px", height: "50px"}} id={G_BUTTON}></div>
        </div>
        <div >
          test-bench2 - firebase
          <br/>
          <button onClick={this.fb_test}>fb로그인</button>
        </div>
      </div>
    )
  }
}

export default App;
