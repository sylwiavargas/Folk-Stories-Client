import React, { Component } from 'react';
import { connect} from 'react-redux';


class Quote extends Component {

  // componentDidMount() {
  //   this.getPeep()
  // }

  render() {

    return(
      <div className="quote-page">
        <div>
          <h2 className="row-one-hund" style={{"textAlign": "justify"}}> "Activist work allows you to give back and to consider yourself not as a single individual who may have achieved whatever but to be a part of an ongoing historical movement." </h2>
          <h2 style={{"textAlign": "right"}}> - Angela Davis </h2>
          <h2 className="row-one-hund"> "Imagine we are linked not ranked." </h2>
          <h2 style={{"textAlign": "right"}}> - Gloria Steinem </h2><br/>
        </div>
        <div className="row">
          <p className="block" style={{"textAlign": "justify", "lineHeight": "125%"}}> This project looks at those histories that don't make it to the national history school books. Moreover, it rejects the idea of a singular genius. There is nothing like "singular genius" - world's greatest achievements come from efforts of whole networks of friends, family members and even strangers who support "geniuses". And anyway, how much further we would get if we collaborated more often? Exploring this project, try to cherish not only the amazing folks but also their friendships, relationships and collaborations. Think about your circle. We are all connected. We all can make a difference. </p>
        </div>
      </div>
    )}
}


const mapStateToProps = state => {
  return {
    person: state.people
  }
}

const mapDispatchToProps = dispatch => {
  return {
    saveQuote: (person) => {
      dispatch({type: 'SAVE_PERSON', payload: person})
    }
  }
}

export default connect(
  mapStateToProps, mapDispatchToProps)(Quote);
//
// nested routing: https://codeburst.io/getting-started-with-react-router-5c978f70df91
//
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

// const Quote = ({ match }) => <p>{match.params.id}</p>
