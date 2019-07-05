import React, { Component } from 'react';
import * as d3 from "d3";
import { Graph } from 'react-d3-graph';
import { connect} from 'react-redux';



class Force extends Component {

  getPeeps = () => {
    fetch(`http://localhost:3000/api/v1/bios`)
      .then(res => res.json())
      .then(people => this.props.savePeople(people))
    }

  componentDidMount(){
    this.getPeeps()
  }

  render() {
      console.log(this.props.people[0])
      const data = {
          nodes: [{ id: 'Eleanor' }, { id: 'Amelia' }, { id: 'Nina' }],
          links: [{ source: 'Eleanor', target: 'Amelia' }, { source: 'Eleanor', target: 'Nina' }]
      };


      // the graph configuration, you only need to pass down properties
      // that you want to override, otherwise default ones will be used
      const myConfig = {

        "automaticRearrangeAfterDropNode": true,
        "collapsible": true,
        "directed": true,
        "focusAnimationDuration": 0.75,
        "focusZoom": 1,
        "height": 400,
        "highlightDegree": 2,
        "highlightOpacity": 0.2,
        "linkHighlightBehavior": true,
        "maxZoom": 12,
        "minZoom": 0.05,
        "nodeHighlightBehavior": true,
        "panAndZoom": false,
        "staticGraph": false,
        "width": 800,
        "d3": {
          "alphaTarget": 0.05,
          "gravity": -250,
          "linkLength": 120,
          "linkStrength": 2
        },
        "node": {
          "color": "#d3d3d3",
          "fontColor": "black",
          "fontSize": 10,
          "fontWeight": "normal",
          "highlightColor": "red",
          "highlightFontSize": 14,
          "highlightFontWeight": "bold",
          "highlightStrokeColor": "red",
          "highlightStrokeWidth": 1.5,
          "mouseCursor": "crosshair",
          "opacity": 0.9,
          "renderLabel": true,
          "size": 200,
          "strokeColor": "none",
          "strokeWidth": 1.5,
          "svg": "",
          "symbolType": "circle"
        },
        "link": {
          "color": "lightgray",
          "fontColor": "black",
          "fontSize": 8,
          "fontWeight": "normal",
          "highlightColor": "red",
          "highlightFontSize": 8,
          "highlightFontWeight": "normal",
          "labelProperty": "label",
          "mouseCursor": "pointer",
          "opacity": 1,
          "renderLabel": false,
          "semanticStrokeWidth": true,
          "strokeWidth": 3
        }
      };

      // graph event callbacks
      const onClickGraph = function() {
          window.alert(`Clicked the graph background`);
      };

      const onClickNode = function(nodeId) {
          window.alert(`Clicked node ${nodeId}`);
      };

      const onDoubleClickNode = function(nodeId) {
          window.alert(`Double clicked node ${nodeId}`);
      };

      const onRightClickNode = function(event, nodeId) {
          window.alert(`Right clicked node ${nodeId}`);
      };
      //
      // const onMouseOverNode = function(nodeId) {
      //     window.alert(`Mouse over node ${nodeId}`);
      // };
      //
      // const onMouseOutNode = function(nodeId) {
      //     window.alert(`Mouse out node ${nodeId}`);
      // };

      const onClickLink = function(source, target) {
          window.alert(`Clicked link between ${source} and ${target}`);
      };

      const onRightClickLink = function(event, source, target) {
          window.alert(`Right clicked link between ${source} and ${target}`);
      };
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
      <Graph
          id="graph-id" // id is mandatory, if no id is defined rd3g will throw an error
          data={data}
          config={myConfig}
          onClickNode={onClickNode}
          onRightClickNode={onRightClickNode}
          onClickGraph={onClickGraph}
          onClickLink={onClickLink}
          onRightClickLink={onRightClickLink}

      />
      </div>
    )
  }


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
  mapStateToProps, mapDispatchToProps)(Force)
