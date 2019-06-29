// here will be login / logout

import React, { Component } from 'react';
import { connect } from 'react-redux';
// import LoginForm from '../compontents/loginForm'

class LoginContainer extends Component {

  // capitalaizeName = () => {
  //   let name = this.props.userName
  //   return name.charAt(0).toUpperCase() + name.slice(1)
  // }

  render() {
    // const {logged, changeLogin, saveData} = this.props
    // console.log(logged, changeLogin)

    return (
      <div className="login">
            if not logged in, here's gonna be a login form and sign-up button
            if logged, here's gonna be logout button
            </div>

    )
  }

}

const mapStateToProps = state => {
  return {
  }
}

const mapDispatchToProps = dispatch => {
  return {
    saveData: (event) => {
      dispatch({type: 'UPDATE_FORM'})
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginContainer);

// !logged ?
//       <div className="login">
//         <form className="login-form">
//           <input
//           placeholder="Enter your username"
//           name="userName"
//           onChange={(event) => saveData(event)}/>
//           <input
//             name="password"
//             type="password"
//             placeholder="Enter your password"
//           />
//           <input
//           type="submit"
//           value="Log In"
//           onClick={() => changeLogin()}
//           />
//         </form>
//       </div>
// : <div className="loginname"> Hey, {this.capitalaizeName()}!
//     <button className="logoutbutton"
//     onClick={()=>changeLogin()}>
//     Log out!
//     </button>
//   </div>
