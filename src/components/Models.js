import React, { Component } from 'react';
import { Graph } from 'react-d3-graph';
import { connect} from 'react-redux';

class Models extends Component {


// rgba(255, 255, 255, 0.33) - non-join,
// #d9c60f - main,
// red - joint

  render() {
    const nodes = [
      {id: "years", color: "rgba(255, 255, 255, 0.33)"},
      {id: "year_eras", color: "#d9c60f", size: 250},
      {id: "eras", color: "rgba(255, 255, 255, 0.33)"},
      {id: "events", color: "#d9c60f", gravity: -250, size: 250},
      {id: "event_places", color: "rgba(255, 255, 255, 0.33)"},
      {id: "places", color: "rgba(255, 255, 255, 0.33)"},
      {id: "places_people", color: "#d9c60f", size: 250},
      {id: "event_people", color: "#d9c60f"},
      {id: "countries_people", color: "rgba(255, 255, 255, 0.33)"},
      {id: "countries", color: "rgba(255, 255, 255, 0.33)"},
      {id: "continents", color: "rgba(255, 255, 255, 0.33)"},
      {id: "days", color: "rgba(255, 255, 255, 0.33)"},
      {id: "month_days", color: "#d9c60f", size: 250},
      {id: "months", color: "#d9c60f"},
      {id: "event_types", color: "#d9c60f"},
      {id: "people", color: "#d9c60f", size: 250},
      {id: "countries", color: "rgba(255, 255, 255, 0.33)"},
      {id: "connections", color: "#d9c60f", size: 250},
      {id: "types", color: "rgba(255, 255, 255, 0.33)"},
      {id: "types_subscriptions", color: "#d9c60f"},
      {id: "subscriptions", color: "rgba(255, 255, 255, 0.33)"},
      {id: "users", color: "#d9c60f", size: 250},
  ];
    const links = [
      {target: "countries", source: "continents"},
      {target: "countries", source: "places"},
      {target: "event_places", source: "events"},
      {target: "event_places", source: "places"},
      {target: "year_eras", source: "events"},
      {target: "year_eras", source: "years"},
      {target: "year_eras", source: "eras"},
      {target: "year_eras", source: "events"},
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
      {target: "connections", source: "people"},
      {target: "places_people", source: "people"},
      {target: "countries_people", source: "people"},
      {target: "countries_people", source: "countries"},
    ];

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
              highlightStrokeColor: "rgba(255, 255, 255, 0.33)",
              highlightColor: "SAME"
          }
      };

    return (
      <div>
      { data && data.nodes && data.nodes.length > 0 ?
        <>
        <div className="legend-models">
        <h2> Legend: </h2><br/><br/>
        <p style={{"color": "#d9c60f"}} className="inline"><strong> ----- </strong></p> Data in use <br/>
        <p style={{"color": "rgba(255, 255, 255, 0.33)"}} className="inline"><strong> ----- </strong></p> Data to be used<br/>
        </div>
      <Graph
          id="graph-id"
          data={data}
          config={myConfig}
      />
      </>
      : null}
      </div>
    )
  }


}

export default (Models)
