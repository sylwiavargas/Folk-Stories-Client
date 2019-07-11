import React, { Component } from 'react';
import { Graph } from 'react-d3-graph';
import { connect} from 'react-redux';

class Force extends Component {

  componentDidMount(){
      this.getConnections()
    }

// blue - non-join,
// yellow - main,
// red - joint

  render() {
    const nodes = [
      {id: "years", color: "blue"},
      {id: "year_eras", color: "yellow"},
      {id: "eras", color: "blue"},
      {id: "events", color: "yellow"},
      {id: "event_places", color: "blue"},
      {id: "places", color: "blue"},
      {id: "places_people", color: "yellow"},
      {id: "event_people", color: "blue"},
      {id: "countries_people", color: "blue"},
      {id: "countries", color: "blue"},
      {id: "continents", color: "blue"},
      {id: "days", color: "blue"},
      {id: "month_days", color: "yellow"},
      {id: "months", color: "yellow"},
      {id: "event_types", color: "yellow"},
      {id: "people", color: "yellow"},
      {id: "countries", color: "blue"},
      {id: "connections", color: "yellow"},
      {id: "types", color: "blue"},
      {id: "types_subscriptions", color: "yellow"},
      {id: "subscriptions", color: "blue"},
      {id: "users", color: "yellow"},
  ];
    const links = [
      {target: "countries", source: "continents"},
      {target: "countries", source: "places"},
      {target: "event_places", source: "events"},
      {target: "year_eras", source: "events"},
      {target: "year_eras", source: "years"},
      {target: "year_eras", source: "eras"},
      {target: "year_eras", source: "events"},
      {target: "days", source: "events"},
      {target: "month_days", source: "events"},
      {target: "months", source: "events"},
      {target: "month_days", source: "days"},
      {target: "month_days", source: "months"},
      {target: "event_types", source: "events"},
      {target: "event_types", source: "types"},
      {target: "types_subscriptions", source: "types"},
      {target: "types_subscriptions", source: "subscriptions"},
      {target: "users", source: "subscriptions"},
      {target: "event_people", source: "events"},
      {target: "event_people", source: "people"},
      {target: "countries", source: "people"},
      {target: "connections", source: "people"},
      {target: "people_places", source: "people"},
    ];

        //
        // console.log("NODES", nodes)
        // console.log("LINKS", links)
        // console.log(this.props)
    //
    // const onClickNode = (nodeId) => {
    //   const person = this.props.people.find((person) => person.name === nodeId )
    //   return this.props.savePerson(person)
    // };

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
