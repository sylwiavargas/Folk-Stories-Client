import React, { Component } from 'react';
import { Graph } from 'react-d3-graph';
import { connect} from 'react-redux';
import Legend from './Legend'


class Force extends Component {

  getConnections = () => {
    fetch(`http://localhost:3000/api/v1/connections`)
      .then(res => res.json())
      .then(connections => this.props.saveConnections(connections))
    }



  componentDidMount(){
      this.getConnections()
    }

  render() {
    const nodes = [];
    const links = [];
    const peeps = this.props.connections.map((connection) => {
      const co = () =>  {if (connection.relationship === "romantic") {
        return "red"
      } else if (connection.relationship === "collaboration") {
        return "5c17e8"
      } if (connection.relationship === "friendship") {
        return "e8a217"
      }}
      nodes.push({id: connection.person_one.name, n: connection.person_one.id}, {id: connection.person_two.name, n: connection.person_two.id })
      links.push({source: connection.person_one.name, target: connection.person_two.name, color: co()})
    })
        //
        // console.log("NODES", nodes)
        // console.log("LINKS", links)
        // console.log(this.props)


    const onClickNode = (nodeId) => {
      const person = this.props.people.find((person) => person.name === nodeId )
      return this.props.savePerson(person)
    };

    const data = {
        nodes: nodes,
        links: links};

    // console.log("DATA", data)

      const myConfig = {
          nodeHighlightBehavior: true,
          automaticRearrangeAfterDropNode: true,
          width: 1000,
          height: 450,
          maxZoom: 5,
          minZoom: 0.1,
          "d3": {
            "manyBody.strength": -50,
            "simulation.alpha": 0.95,
            "simulation.tick": 100,
            "alphaTarget": 0.99,
            "gravity": -80,
            "linkLength": 90,
            "linkStrength": 1,
            "viewBox": "-0 -5 10 10",
            "refX": 34,
            "refY": 0,
            "orient":"auto",
            "markerWidth":8,
            "markerHeight":8,
            "xoverflow":"visible"
          },
          node: {
            label:'label text',
              color: "#17e89f",
              size: 80,
              fontSize: 15,
              fontColor: "rgba(255, 255, 255, .5)",
              highlightStrokeColor: "#2376ae",
              "mouseCursor": "pointer",
              "highlightFontSize": 18,
              "highlightFontWeight": "bold",
              "highlightStrokeWidth": 1.5,
              "svg": "",
              labelProperty: "label",
              renderLabel: true,
          },
          link: {
              fontColor: "black",
              fontSize: 11,
              "mouseCursor": "pointer",
              labelProperty: "label",
              renderLabel: true,
              highlightStrokeColor: "#2376ae",
              highlightColor: "SAME"
          }
      };

      // graph event callbacks
      const onClickGraph = function() {
          window.alert(`Legend:
            red: romantic relationships
            purple: friendhips
            yellow: collaborations `);
      };

      // const onDoubleClickNode = function(nodeId) {
      //     window.alert(`Double clicked node ${nodeId}`);
      // };
      //
      // const onRightClickNode = function(event, nodeId) {
      //     window.alert(`Right clicked node ${nodeId}`);
      // };
      //
      // const onMouseOverNode = function(nodeId) {
      //     window.alert(`Mouse over node ${nodeId}`);
      // };
      //
      // const onMouseOutNode = function(nodeId) {
      //     window.alert(`Mouse out node ${nodeId}`);
      // };
      //
      // const onClickLink = function(source, target, label) {
      //     window.alert(`Clicked link between ${source} and ${target} - their relationship was ${label}`);
      // };
      //
      // const onRightClickLink = function(event, source, target) {
      //     window.alert(`Right clicked link between ${source} and ${target}`);
      // };
      //
      // const onMouseOverLink = function(source, target) {
      //     window.alert(`Mouse over in link between ${source} and ${target}`);
      // };
      //
      // const onMouseOutLink = function(source, target) {
      //     window.alert(`Mouse out link between ${source} and ${target}`);
      // };
    return (
      <div>
      { data && data.nodes && data.nodes.length > 0 ?
        <>
      <Legend />
      <Graph
          id="graph-id" // id is mandatory, if no id is defined rd3g will throw an error
          data={data}
          config={myConfig}
          onClickNode={onClickNode}
          // onRightClickNode={onRightClickNode}
          onClickGraph={onClickGraph}
          // onClickLink={onClickLink}
          // onRightClickLink={onRightClickLink}

      />
      </>
      : null}
      </div>
    )
  }


}



const mapStateToProps = state => {
  return {
    people: state.people.people,
    person: state.people.person,
    connections: state.people.connections
  }
}

const mapDispatchToProps = dispatch => {
  return {
    saveConnections: (connections) => {
      dispatch({type: 'SAVE_CONNECTIONS', payload: connections})
    },
    savePerson: (person) => {
      dispatch({type: 'SAVE_PERSON', payload: person})
    }
  }
}


export default connect(
  mapStateToProps, mapDispatchToProps)(Force)
