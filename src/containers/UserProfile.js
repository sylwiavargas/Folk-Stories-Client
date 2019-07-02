import React, { Component } from 'react';
import { connect} from 'react-redux';
import NavBarContainer from './NavBarContainer';
import Footer from '../components/Footer'

class UserProfile extends Component {

  state={
    name: this.props.user.name,
    email: this.props.user.email,
    zip: this.props.user.zip,
  }

  formInput = (event) => {
    this.setState({
      [event.target.name]:event.target.value
    })
  }

  submitEvent = event => {
    event.preventDefault()
    this.setState({
      name: "",
      email: "",
      zip: ""})
    this.updateProfile(this.state)
  }

  updateProfile = (userInfo) =>{
    const id = this.props.user.id
    fetch(`http://localhost:3000/api/v1/users/${id}` , {
        method: 'PATCH',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({user:{userInfo}})
      })
    .then(res => res.json())
    .then(user => console.log(user))
  }

  render() {
    console.log(this.props.user, "STATE", this.state)
    return (
      <div className="main">
      <h1> This is you: </h1>
      <form onSubmit={(e) => this.submitEvent(e)}>
        <input onChange={(e) => this.formInput(e)} type="text" name="name" value={this.props.user.name} />
        <input onChange={(e) => this.formInput(e)} type="text" name="email" value={this.props.user.email} />
        <input onChange={(e) => this.formInput(e)} type="text" name="zip" value={this.props.user.zip} />
        <button>Submit</button>
      </form>
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
    savePeople: (people) => {
      dispatch({type: 'SAVE_PEOPLE', payload: people})
    },
    savePerson: (person) => {
      dispatch({type: 'SAVE_PERSON', payload: person})
    }
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
