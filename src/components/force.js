import React, { Component } from 'react';
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
    const nodes = [];
    const link = [];
    const links = []
    const peeps = this.props.connections.map((connection) => {
      const co = () =>  {if (connection.relationship === "romantic") {
        return "red"
      } else if (connection.relationship === "collaboration") {
        return "5c17e8"
      } if (connection.relationship === "friendship") {
        return "e8a217"
      }}
      nodes.push({id: connection.person_one.name}, {id: connection.person_two.name})
      link.push({source: connection.person_one.name, target: connection.person_two.name, color: co})
      links.push(link)
    } )


        console.log("NODES", nodes)
        console.log("LINK", link)
        console.log("LINKS", links)


    const data = {
        nodes: [{ id: 'Eleanor Roosevelt' }, { id: 'Amelia Earhart' }, { id: 'Susan Sontag' }, { id: 'Annie Leibovitz'}, { id: 'Lorena Hickok'}, { id: 'Nina Simone'}, { id: 'Lorraine Hansberry'}, { id: 'Miriam Makeba'}, { id: 'Gloria Steinem'}, { id: 'Wilma Mankiller'}, { id: 'Martha Graham'}, { id: 'Hellen Keller'}, { id: 'Helen Tamiris'}, { id: 'Dorothy Pitnam Hughes'}, { id: 'Angela Davis'}, { id: 'Doris Humpray'}, { id: 'Katherine Dunham'}, { id: 'Marsha P. Johnson'}, { id: 'Storme DeLarverie'}, { id: 'Maria Skłodowska-Curie'}, { id: 'Kazimiera Bujwidowa'}],
        links: [
          { source: 'Eleanor Roosevelt', target: 'Amelia Earhart', color: "5c17e8"},
          {source: 'Eleanor Roosevelt', target: 'Lorena Hickok'},
          {source: 'Susan Sontag', target: 'Annie Leibovitz' },
          {source: 'Nina Simone', target: 'Lorraine Hansberry', color: "e8a217" },
          {source: 'Nina Simone', target: 'Miriam Makeba' },
          {source: 'Gloria Steinem', target: 'Wilma Mankiller'},
          {source: 'Gloria Steinem', target: 'Angela Davis' },
          {source: 'Gloria Steinem', target: 'Dorothy Pitnam Hughes' },
          {source: 'Martha Graham', target: 'Hellen Keller' },
          {source: 'Martha Graham', target: 'Doris Humpray' },
          {source: 'Martha Graham', target: 'Helen Tamiris' },
          {source: 'Martha Graham', target: 'Katherine Dunham' },
          {source: 'Marsha P. Johnson', target: 'Storme DeLarverie' },
          {source: 'Maria Skłodowska-Curie', target: 'Kazimiera Bujwidowa' },
    ]};

    console.log(data)


      // the graph configuration, you only need to pass down properties
      // that you want to override, otherwise default ones will be used
      const myConfig = {
          nodeHighlightBehavior: true,
          automaticRearrangeAfterDropNode: true,
          width: 1000,
          height: 500,
          maxZoom: 0.2,
          minZoom: 0.1,
          "d3": {
            "manyBody.strength": -30,
            "simulation.alpha": 0.95,
            "simulation.tick": 100,
            "alphaTarget": 0.95,
            "gravity": -150,
            "linkLength": 150,
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
              color: "red",
              fontColor: "black",
              fontSize: 11,
              highlightColor: "red",
              "mouseCursor": "pointer",
              labelProperty: "label",
              renderLabel: true,

          }
      };

      // graph event callbacks
      const onClickGraph = function() {
          window.alert(`Clicked the graph background`);
      };

      const onClickNode = function(nodeId) {
          window.alert(`Clicked node ${nodeId}`);
      };

      // const onDoubleClickNode = function(nodeId) {
      //     window.alert(`Double clicked node ${nodeId}`);
      // };

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

      const onClickLink = function(source, target, label) {
          window.alert(`Clicked link between ${source} and ${target} - their relationship was ${label}`);
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
