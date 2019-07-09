import React, { Component } from 'react';
import { connect} from 'react-redux';

class UserProfile extends Component {

  state={
    id: this.props.id,
    username: this.props.username,
    name: this.props.user.name,
    email: this.props.user.email,
    zip: this.props.user.zip,
    change: false,
  }

  formInput = (event) => {
    this.setState({
      [event.target.name]:event.target.value
    })
  }

  submitEvent = event => {
    event.preventDefault()
    this.updateProfile({
        username: this.state.username,
        name: this.state.name,
        email: this.state.email,
        zip: this.state.zip
    })
    // this is where you do a dispatch to redux
    this.setState({
      change: true})
  }

  updateProfile = (user) =>{
    console.log("in updateProfile", this.props)
    const token = localStorage.getItem("token")
    const id = this.props.user.id
    fetch(`http://localhost:3000/api/v1/users/${id}` , {
        method: 'PATCH',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token,
        },
        body: JSON.stringify({user})
      })
    .then(res => res.json())
    .then(user => console.log(user))
  }

  deleteProfile = () =>{
    // console.log(this.state.id)
    const id = this.props.user.id
    fetch(`http://localhost:3000/api/v1/users/${id}` , {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({id: id})
      })
      .then(res => res.text())
    }

  render() {
    // console.log(this.props.user, "STATE", this.state)
    return (
      <div className="main">
        <div>
          {this.state.change === true ?
            <div> <h1> Thank you! Our admins will add yoursuggestion! </h1> </div>
          :
           null
          }
        </div>
        <div className="formtable ">
          <div class="column teal ">
            <h1> Wanna edit your profile? </h1>
            <form onSubmit={(e) => this.submitEvent(e)}>
              <input onChange={this.formInput} type="text" name="name" value={this.state.name} />
              <input onChange={this.formInput} type="text" name="email" value={this.state.email} />
              <input onChange={this.formInput} type="text" name="zip" value={this.state.zip} /><br/><br/>
              <button className="notbutton center">Submit</button>
            </form>
          </div>
          <div className="column yellow middle">
            <h1> Fed up with us already? </h1>
            <button className="notbutton center delete" onClick={() => this.deleteProfile()}> DELETE YOUR PROFILE</button>
          </div>
        </div>
      </div>
  )}

}

const mapStateToProps = state => {
  return {
    user: state.user.currentUser
  }
}

const mapDispatchToProps = dispatch => {
  return {
  }
}


export default connect(
  mapStateToProps, mapDispatchToProps)(UserProfile);

// import 'antd/dist/antd.css'
// import '../App.css'
// import React, { Fragment } from 'react'
// import { Keyframes, animated } from 'react-spring/renderprops'
// import { Avatar, Form, Icon, Input, Button, Checkbox } from 'antd'
// import delay from 'delay'
//
// // Creates a spring with predefined animation slots
// const Sidebar = Keyframes.Spring({
//   // Slots can take arrays/chains,
//   peek: [{ x: 0, from: { x: -100 }, delay: 500 }, { x: -100, delay: 800 }],
//   // single items,
//   open: { delay: 0, x: 0 },
//   // or async functions with side-effects
//   close: async call => {
//     await delay(400)
//     await call({ delay: 0, x: -100 })
//   },
// })
//
// // Creates a keyframed trail
// const Content = Keyframes.Trail({
//   peek: [
//     { x: 0, opacity: 1, from: { x: -100, opacity: 0 }, delay: 600 },
//     { x: -100, opacity: 0, delay: 0 },
//   ],
//   open: { x: 0, opacity: 1, delay: 100 },
//   close: { x: -100, opacity: 0, delay: 0 },
// })
//
// const items = [
//   <Avatar src="https://semantic-ui.com/images/avatar2/large/elyse.png" />,
//   <Input
//     size="small"
//     prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
//     placeholder="Username"
//   />,
//   <Input
//     size="small"
//     prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
//     type="password"
//     placeholder="Password"
//   />,
//   <Fragment>
//     <Checkbox size="small">Remember me</Checkbox>
//     <a className="login-form-forgot" href="#" children="Forgot password" />
//     <Button
//       size="small"
//       type="primary"
//       htmlType="submit"
//       className="login-form-button"
//       children="Log in"
//     />
//   </Fragment>,
// ]
//
// export default class App extends React.Component {
//   state = { open: undefined }
//   toggle = () => this.setState(state => ({ open: !state.open }))
//   render() {
//     const state =
//       this.state.open === undefined
//         ? 'peek'
//         : this.state.open
//         ? 'open'
//         : 'close'
//     const icon = this.state.open ? 'fold' : 'unfold'
//     return (
//       <div style={{ background: 'lightblue', width: '100%', height: '100%' }}>
//         <Icon
//           type={`menu-${icon}`}
//           className="sidebar-toggle"
//           onClick={this.toggle}
//         />
//         <Sidebar native state={state}>
//           {({ x }) => (
//             <animated.div
//               className="sidebar"
//               style={{
//                 transform: x.interpolate(x => `translate3d(${x}%,0,0)`),
//               }}>
//               <Content
//                 native
//                 items={items}
//                 keys={items.map((_, i) => i)}
//                 reverse={!this.state.open}
//                 state={state}>
//                 {(item, i) => ({ x, ...props }) => (
//                   <animated.div
//                     style={{
//                       transform: x.interpolate(x => `translate3d(${x}%,0,0)`),
//                       ...props,
//                     }}>
//                     <Form.Item className={i === 0 ? 'middle' : ''}>
//                       {item}
//                     </Form.Item>
//                   </animated.div>
//                 )}
//               </Content>
//             </animated.div>
//           )}
//         </Sidebar>
//       </div>
//     )
//   }
// }



//////////////////////////
// nested routing: https://codeburst.io/getting-started-with-react-router-5c978f70df91

// <div>
//   <h1>Users</h1>
//   <strong>select a person</strong>
//   <ul>
//     <li>
//       <Link to="/users/1">User 1 </Link>
//     </li>
//     <li>
//       <Link to="/users/2">User 2 </Link>
//     </li>
//     <li>
//       <Link to="/users/3">User 3 </Link>
//     </li>
//   </ul>
//   <Route path="/users/:id" component={User} />
// </div>
//
// const Person = ({ match }) => <p>{match.params.id}</p>
