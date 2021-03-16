import {select} from 'd3-selection';
import penguins from '../node_modules/vega-datasets/data/penguins.json';
import {json} from 'd3-fetch';
import {scaleLinear, scaleBand, scaleOrdinal} from 'd3-scale';
import {extent} from 'd3-array';
import {axisBottom, axisLeft, axisTop, axisRight} from 'd3-axis';

fetch("./node_modules/vega-datasets/data/penguins.json").then(x => x.json()).then(myVis);

const xDim = 'Flipper Length (mm)';
const yDim = 'Body Mass (g)';
const height = 600;
const width = 600;
const margin = {top: 100, bottom: 100, right: 100, left: 100};
const plotWidth = width - margin.left - margin.right;
const plotHeight = height - margin.top - margin.bottom;

function myVis(data) {

    const xDomain = extent(data, d=>d[xDim]);
    const yDomain = extent(data, d => Math.log(d[yDim]));
    
    //shifting y domain to 1 
    yDomain[0] = 1;
    
    console.log(xDomain, yDomain);

    const svg = select('#app')
      .append('svg')
      .attr('height', `${height}px`)
      .attr('width', `${width}px`)
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

     // Add X axis
    var x = scaleLinear().domain(xDomain).range([plotWidth,1]);
    svg.append("g")
      .attr("transform", "translate(0,0)")
      .call(axisTop(x));

    // Add Y axis
    var y = scaleLinear()
      .domain(yDomain)
      .range([ 1, plotHeight]);

    svg.append("g")
    .attr("transform", "translate(" + plotWidth + ")")
    .call(axisRight(y));

    var color = scaleOrdinal().domain(["Adelie", "Chinstrap", "Gentoo" ])
    .range([ "#440154ff", "#21908dff", "#fde725ff"])

    const data1 = data.filter(function (a) { return a.Species === 'Adelie'; });
    const data2 = data.filter(function (a) { return a.Species === 'Chinstrap'; });
    const data3 = data.filter(function (a) { return a.Species === 'Gentoo'; });

    // adelie
    svg.append('g').attr("class", "adelie")
      .selectAll("dot")
      .data(data1)
      .enter()
      .append("circle")
        .attr("cx", function (d) { return x(d[xDim]);})
        .attr("cy", function (d) { return y(Math.log(d[yDim])); } )
        .attr("r", 3.5)

    // chinstrap
    svg.append('g').attr("class", "chinstrap")
      .selectAll("dot")
      .data(data2)
      .enter()
      .append("circle")
        .attr("cx", function (d) { return x(d[xDim]);})
        .attr("cy", function (d) { return y(Math.log(d[yDim])); } )
        .attr("r", 3.5)

    // gentoo
    svg.append('g').attr("class", "gentoo")
      .selectAll("dot")
      .data(data3)
      .enter()
      .append("circle")
        .attr("cx", function (d) { return x(d[xDim]);})
        .attr("cy", function (d) { return y(Math.log(d[yDim])); } )
        .attr("r", 3.5)

    //LEGEND
    svg.append("circle").attr("cx",440).attr("cy",200).attr("r", 6).style("fill", "blue")
    svg.append("circle").attr("cx",440).attr("cy",220).attr("r", 6).style("fill", "red")
    svg.append("circle").attr("cx",440).attr("cy",240).attr("r", 6).style("fill", "green")
    svg.append("text").attr("x",450).attr("y", 200).text("Adelie").style("font-size", "15px").attr("alignment-baseline","middle")
    svg.append("text").attr("x",450).attr("y", 220).text("Chinstrap").style("font-size", "15px").attr("alignment-baseline","middle")
    svg.append("text").attr("x",450).attr("y", 240).text("Gentoo").style("font-size", "15px").attr("alignment-baseline","middle")

    // GRAPH TITLE
    svg.append("text").attr("x",50).attr("y", -50).text("Relationship between Flipper Length and Body Mass").style("font-size", "15px").attr("alignment-baseline","middle")
    // X AXIS SUBTITLE
    svg.append("text").attr("x",160).attr("y", -30).text("Flipper Length (in mm)").style("font-size", "10px").attr("alignment-baseline","middle")
    // Y AXIS SUBTITLE
    svg.append("text").attr("x",410).attr("y", 125).text("log(Body Mass in gm)").style("font-size", "10px").attr("alignment-baseline","middle")
    
  };