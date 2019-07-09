import React, { Component } from 'react';
import { connect} from 'react-redux';
import Loading from './Loading';
import { Link } from 'react-router-dom';
import facebook from '../img/facebook.png';
import twitter from '../img/twitter.svg';

class Quote extends Component {

  // componentDidMount() {
  //   this.getPeep()
  // }

  render() {

    return(
      <div>
        <div className="bio-fake">
        <div className="column">
          <h1> Nina Simone </h1>
          <h2> I know I’m different, but I don’t think about it. </h2>
          <p> Nina Simone (1933-2003) was an American singer, pianist, songwriter. Her early aspirations would be to become a concert pianist, which would lead her to audition at Curtis Institiute of Music in Philadelphia, but was sadly rejected; a decision she felt was based on her race. Later on, she was involved in Civil Rights Movement and performed and spoke at many civil rights meetings, such as at the Selma to Montgomery marches. Simone had always included songs in her repertoire that drew upon her African-American origins. On her debut album, Simone for the first time openly addressed the racial inequality that was prevalent in the United States with the song “Mississippi Goddam”, her response to the murder of Medgar Evers and the Birmingham Church Bombing. The song was released as a single, and it was boycotted in certain southern states. Simone’s legacy was on the airways, in the background telling everyone of the struggles every African-American endured, even if they did not want to learn. </p>
          <p> Read more about </p>
          <h2> Visit 's places: </h2>
          <h2> See s events: </h2>
        </div>
          <div className="column">

          </div>
          <div className="column">
            <div className="image-cropper">
              <img src = "https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Nina_Simone_%281965%29.jpg/180px-Nina_Simone_%281965%29.jpg" alt="{person.name}"/>
            </div>
          </div>
          <div className="column">
          <br/>
          <h2> Tell your friends about: </h2>
          <a href="https://www.facebook.com/sharer/sharer.php?u=gentrification-map.firebaseapp.com/" target="_blank" rel="noopener noreferrer"> <img src={facebook} className="sharing" alt="Share on Facebook"/></a>
           <a href="https://twitter.com/intent/tweet?url=http%3A%2F%2Fgentrification-map.firebaseapp.com%2F&text=HappenedToday&hashtags=history,social" target="_blank" rel="noopener noreferrer"> <img src={twitter} className="sharing" alt="Share on Twitter"/></a>
          </div>
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
