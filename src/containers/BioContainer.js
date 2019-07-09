import React, { Component } from 'react';
import { connect} from 'react-redux';
import { Link, Switch, Route } from 'react-router-dom'
import Person from '../components/Person';
import Quote from '../components/Quote';
import Force from '../components/Force';

class BioContainer extends Component {

  state ={
    show: false,
    showBio: false,
    loading: true
  }

  getPeeps = () => {
    fetch(`http://localhost:3000/api/v1/bios`)
      .then(res => res.json())
      .then(people => this.props.savePeople(people))
      .then(this.setState({
        show: true,
        loading: false
      }))
    }

  featurePeep = () => {
      let id = this.props.person.id
      this.props.history.push(`/bios/${id}`)
  }

  componentDidMount(){
    this.getPeeps();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.person !== this.props.person) {
      this.featurePeep()
    }
  }

  render() {
    const path = this.props.match.path

    return(
      <div className="App">
        {
          this.state.show === false
          ?
            <>
            <Link onClick={() => {this.getPeeps()}} className="notbutton dramatic"> Show the Folks </Link>
            </>
          :
          <>
          <div className="wrapper-bio">
            <div className="footer-bio force">
              <Force/>
            </div>
          <div className="content-bio">
            <Switch>
              <Route exact path="/bios" component={Quote} />
              <Route exact path="/bios/:id" component={Person} />
              <Route component={Quote} />
            </Switch>
          </div>
            <div className="sidebar-bio">
            <h2> Choose a folk: </h2>
                {this.props.people.length > 0
                  ? this.props.people.map((person, index) => {
                    return <li key={index}> <Link to={`/bios/${person.id}`}>{person.name}</Link></li>
                  })
                  : <p> loading </p>
                }<br/>
            </div>
            <div className="header-second-bio">

             </div>
            </div>
          </>
        }
    </div>
)}
}

const mapStateToProps = state => {
  return {
    people: state.people.people,
    person: state.people.person
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
  mapStateToProps, mapDispatchToProps)(BioContainer);

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

// const Person = ({ match }) => <p>{match.params.id}</p>
