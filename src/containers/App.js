import React, { Component } from 'react';
import { connect} from 'react-redux';

import MainContainer from './MainContainer'
import NavBarContainer from './NavBarContainer'
import Footer from '../components/Footer'

import '../App.css'

const API = "http://localhost:3000/api/v1"

class App extends Component {

  componentDidMount(){
    const token = localStorage.getItem('token')

    if (token !== null) {
      fetch(API + '/reauth', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(res => res.json())
      .then(response => {
        if (response.errors){
          localStorage.removeItem('token')
          alert(response.errors)
        } else {
          this.props.autoLogin(response)
          this.props.loading()
        }
      })
    } else {
      this.props.loading()
    }
  }

  render() {

    return (
      <div className="App">
      <NavBarContainer/>
      <MainContainer/>
      <br/>
      <br/>
      <Footer />
    </div>
    );
  }

}

const mapStateToProps = state => {
  return {
    loadState: state.loading,
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loading: () => {
      dispatch({type: 'LOADING'})
    },
    login: (user) => {
      dispatch({type: "LOGIN", payload: user})
    },
    autoLogin: (user) => {
      dispatch({type: 'LOGIN', payload: user})
    }
  }
}


export default connect(
  mapStateToProps, mapDispatchToProps)(App);
