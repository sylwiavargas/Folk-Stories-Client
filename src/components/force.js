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
      nodes.push({id: connection.person_one.name, n: connection.person_one.id}, {id: connection.person_two.name, n: connection.person_two.id })
      link.push({source: connection.person_one.name, target: connection.person_two.name, color: co})
      links.push(link)
    } )

    // const findPeep = (nodeId) => {
    //   const node = nodes.find((node) => node.id))
    //
    //   return console.log(node)}

    // const findPeep = (nodeId) => {
    //   return this.props.savePerson(this.props.connections.find((connection) => connection.person_one.name === nodeId || connection.person_two.name === nodeId
    // ))}

    // const onClickNode = (nodeId) => {
    //   const node = nodes.find((node) => node.id === nodeId)
    //   return this.props.savePerson(node)
    // };
    //
    // const updateState = function(node){
    //
    // }

        //
        // console.log("NODES", nodes)
        // console.log("LINK", link)
        // console.log("LINKS", links)
        console.log(this.props)


    const data = {
        nodes: [{ id: 'Eleanor Roosevelt', n: 1 }, { id: 'Amelia Earhart' }, { id: 'Susan Sontag' }, { id: 'Annie Leibovitz'}, { id: 'Lorena Hickok'}, { id: 'Nina Simone'}, { id: 'Lorraine Hansberry'}, { id: 'Miriam Makeba'}, { id: 'Gloria Steinem'}, { id: 'Wilma Mankiller'}, { id: 'Martha Graham'}, { id: 'Hellen Keller'}, { id: 'Helen Tamiris'}, { id: 'Dorothy Pitnam Hughes'}, { id: 'Angela Davis'}, { id: 'Doris Humpray'}, { id: 'Katherine Dunham'}, { id: 'Marsha P. Johnson'}, { id: 'Storme DeLarverie'}, { id: 'Maria Skłodowska-Curie'}, { id: 'Kazimiera Bujwidowa'}],
        links: [
          { source: 'Eleanor Roosevelt', target: 'Amelia Earhart', color: "red"},
          {source: 'Eleanor Roosevelt', target: 'Lorena Hickok', color: "red" },
          {source: 'Susan Sontag', target: 'Annie Leibovitz', color: "red" },
          {source: 'Nina Simone', target: 'Lorraine Hansberry', color: "5c17e8" },
          {source: 'Nina Simone', target: 'Miriam Makeba', color: "5c17e8"  },
          {source: 'Gloria Steinem', target: 'Wilma Mankiller', color: "5c17e8" },
          {source: 'Gloria Steinem', target: 'Angela Davis', color: "5c17e8"  },
          {source: 'Gloria Steinem', target: 'Dorothy Pitnam Hughes', color: "e8a217" },
          {source: 'Martha Graham', target: 'Hellen Keller', color: "5c17e8"  },
          {source: 'Martha Graham', target: 'Doris Humpray', color: "5c17e8"  },
          {source: 'Martha Graham', target: 'Helen Tamiris', color: "5c17e8"  },
          {source: 'Martha Graham', target: 'Katherine Dunham', color: "5c17e8"  },
          {source: 'Marsha P. Johnson', target: 'Storme DeLarverie', color: "5c17e8"  },
          {source: 'Maria Skłodowska-Curie', target: 'Kazimiera Bujwidowa', color: "5c17e8"  },
    ]};

    // console.log(data)

      const myConfig = {
          nodeHighlightBehavior: true,
          automaticRearrangeAfterDropNode: true,
          width: 1000,
          height: 450,
          maxZoom: 5,
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
      <Graph
          id="graph-id" // id is mandatory, if no id is defined rd3g will throw an error
          data={data}
          config={myConfig}
          // onClickNode={onClickNode}
          // onRightClickNode={onRightClickNode}
          onClickGraph={onClickGraph}
          // onClickLink={onClickLink}
          // onRightClickLink={onRightClickLink}

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
    },
    savePerson: (person) => {
      dispatch({type: 'SAVE_PERSON', payload: person})
    }
  }
}


export default connect(
  mapStateToProps, mapDispatchToProps)(Force)
