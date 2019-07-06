import React, { Component } from 'react';
import * as d3 from "d3";
import { Graph } from 'react-d3-graph';
import { connect} from 'react-redux';



class Force extends Component {

  // state = {
  //   nodes: [],
  //   links: []
  // }

  getConnections = () => {
    fetch(`http://localhost:3000/api/v1/connections`)
      .then(res => res.json())
      .then(connections => this.props.saveConnections(connections))
    }

    componentDidMount(){
      this.getConnections()
    }


    // console.log(this.state)
    // // let data;
    // let first_folks;
    // let second_folks;
    //   if (this.props.connections && this.props.connections.length > 0) {
    //     this.props.connections.map((connection) => {this.setState( prevState => ({
    //           nodes:[...prevState.nodes, connection.first_person]
    //       }))
    //   })
    // } else {
    //   return null
    // }

  render() {
      const data = {
          nodes: [{ id: 'Eleanor' }, { id: 'Amelia' }, { id: 'Nina' }, { id: 'Lora2'}, { id: 'Lora3'}, { id: 'Lora5'}, { id: 'Lora6'},],
          links: [{ source: 'Eleanor', target: 'Amelia' }, { source: 'Eleanor', target: 'Nina' }, { source: 'Amelia', target: 'Nina' }, { source: 'Lora2', target: 'Lora3' }, { source: 'Lora5', target: 'Lora6' }],
      };


      // the graph configuration, you only need to pass down properties
      // that you want to override, otherwise default ones will be used
      const myConfig = {
          nodeHighlightBehavior: true,
          automaticRearrangeAfterDropNode: false,
          width: 1000,
          height: 500,
          maxZoom: 1,
          minZoom: 0.1,
          "d3": {
            'viewBox':'-0 -5 10 10',
            'refX':34,
            'refY':0,
            'orient':'auto',
            'markerWidth':8,
            'markerHeight':8,
            'xoverflow':'visible'
          },
          node: {
              color: 'lightgreen',
              size: 50,
              fontSize: 15,
              highlightStrokeColor: 'black'
          },
          link: {
              color: 'red',
              highlightColor: 'violet'
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
    person: state.people.person,
    connections: state.people.connections
  }
}

const mapDispatchToProps = dispatch => {
  return {
    saveConnections: (connections) => {
      dispatch({type: 'SAVE_CONNECTIONS', payload: connections})
    }
  }
}


export default connect(
  mapStateToProps, mapDispatchToProps)(Force)
