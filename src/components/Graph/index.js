import React, { Component } from 'react';
import graphData from './assets/graph-data.json';
import blankImage from './assets/blank.png';
import './assets/flags.min.css';
import './Graph.css';

// Define d3 from window object since it's being pulled in from a CDN
// Check ./public/index.html
const d3 = window.d3;

// TODO: Clean up code, rename variables and css classes, setup json request

class Graph extends Component {
  constructor (props) {
    super(props);
    // Init state
    this.state = {};
    // Bind class methods to correct 'this'
    this.setupSVG = this.setupSVG.bind(this);
    this.setupGraph = this.setupGraph.bind(this);
    this.drawGraph = this.drawGraph.bind(this);
    this.updateGraph = this.updateGraph.bind(this);
    this.getData = this.getData.bind(this);
  }
  componentDidMount () {
    // this.getData('https://raw.githubusercontent.com/DealPete/forceDirected/master/countries.json', (data) => {
    //   // Add to localStorage
    //   // Init graph
    // });
    this.setupSVG();
    this.setupGraph();
    this.drawGraph();
    this.updateGraph();
  }
  setupSVG () {
    this.svg = {};
    this.svg.el = document.querySelector('.force-graph');
    this.svg.height = 500;
    this.svg.width = this.svg.el.parentElement.offsetWidth;
    // Center x & y points
    this.svg.cy = this.svg.height / 2;
    this.svg.cx = this.svg.width / 2;
  }
  setupGraph () {
    this.simulation = d3.forceSimulation(graphData.nodes)
      .force("charge", d3.forceManyBody().strength(-400).distanceMax(50).distanceMin(20))
      .force("link", d3.forceLink(graphData.links).distance(20).strength(.6))
      .force("center", d3.forceCenter(this.svg.cx, this.svg.cy))
      // .force("x", d3.forceX().x(this.svg.width).strength(.01))
      // .force("y", d3.forceY().y(this.svg.height).strength(.01));
    this.simulation.alphaDecay(0.05);
  }
  drawGraph () {
    this.chartSVG = d3.select('.force-graph');
    this.links = this.chartSVG.selectAll('line')
      .data(graphData.links)
      .enter().append('line')
        .attr('stroke', '#777777')
    this.chart = d3.select('.flags');
    this.nodes = this.chart.selectAll('img')
      .data(this.simulation.nodes())
      .enter().append('img')
        .attr('width', 1)
        .attr('height', 1)
        .attr('src', blankImage)
        .attr('class', (d) => 'flag flag-' + d.code)
        .attr('data-toggle', 'tooltip')
        .attr('data-placement', 'left')
        .attr('title', (d) => d.country)
        .call(d3.drag().on('start', () => {
          // this.simulation.stop();
        }).on("drag", (d) => {
          let e = d3.event
          // console.log(e, d);
          d.fx = e.x;
          d.fy = e.y;
          // this.simulation.tick();
          this.simulation.alpha(1);
          this.simulation.restart();
        })
        .on('end', (d) => {
          d.fx = null;
          d.fy = null;
          // this.simulation.tick();
          this.simulation.alpha(1);
          this.simulation.restart();
        }))
  }
  updateGraph () {
    this.simulation.on('tick', () => {
      this.nodes.attr('style', (d) => {
        // Create boundaires for graph nodes
        d.x = Math.max(0, Math.min(this.svg.width - 16, d.x))
        d.y = Math.max(0, Math.min(this.svg.height - 12, d.y))
        return 'position: absolute; top: ' + d.y + 'px; left: ' + d.x + 'px;'
      });
      this.links.attr('x1', (d) => d.source.x + 8)
        .attr('y1', (d) => d.source.y + 6)
        .attr('x2', (d) => d.target.x + 8)
        .attr('y2', (d) => d.target.y + 6)
    });
  }
  getData (url, callback) {
    d3.json(url, callback);
  }
  render () {
    return (
      <div className='graph-container' style={{position: 'relative', overflow: 'hidden'}}>
        <div
          className='flags'
          style={{
            height: '500px',
            width: 'auto'
          }}
        />
        <svg className='force-graph' />
      </div>
    )
  }
}

export default Graph;
