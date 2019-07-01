import React, { Component } from 'react';
import { connect} from 'react-redux';
import MainContainer from './MainContainer'
import NavBarContainer from './NavBarContainer'
import Loading from '../components/Loading'
import Footer from '../components/Footer'

import '../App.css'


const API = "http://localhost:3000/api/v1"

class App extends Component {

    goBack = () => {
      this.props.history.push('/')
    }

    formInput = (userInput) => {
      let path;
      userInput.user ? path = '/users' : path = "/login";

      fetch(API + `${path}`, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userInput)
        })
      .then(res => res.json())
      .then(response => {
        if (response.errors){
          const errors = response.errors.split ('')
          alert(errors)
        } else {
          localStorage.setItem("token", response.jwt)
          this.props.login(response.user)
          this.goBack()
        }
      })
    }

  componentDidMount(){
    const token = localStorage.getItem('token')

    if (token !== null) {
      fetch(API + '/reauth', {
        headers: {
          'Authorization': token
        }
      })
      .then(res => res.json())
      .then(response => {
        if (response.errors){
          localStorage.removeItem('token')
          alert(response.errors)
        } else {
          console.log(response)
          this.props.autoLogin(response)
          this.props.loading()
        }
      })
    } else {
      this.props.loading()
    }
  }


  render() {
        console.log(this.props)
    return (
      <div className="App">
      <NavBarContainer formInput={this.formInput}/>
      {this.props.loadState.loading === true ?
      <Loading />
      :
      <MainContainer />
      }
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
