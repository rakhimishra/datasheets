
import React, { Component } from 'react';
import axios from "axios";
import logo from './logo.svg';
import './App.css';

const API = 'https://sheets.googleapis.com/v4/spreadsheets/1nyZwkL2ml1cLAW6S1dYYQGA5vv0wS6MP2BxZy5TSk4c/values:batchGet?ranges=Sheet1&majorDimension=ROWS&key=AIzaSyD6uZbF-ZhTM80WerBpyrivbz5NbnVxdL8';

class App extends Component {

  constructor(){
    super();

    this.state = {
      error: "",
     
      posts: []
    };

  }

  componentDidMount() {
    axios
      .get(" https://sheets.googleapis.com/v4/spreadsheets/1nyZwkL2ml1cLAW6S1dYYQGA5vv0wS6MP2BxZy5TSk4c/values:batchGet?ranges=Sheet1&majorDimension=ROWS&key=AIzaSyD6uZbF-ZhTM80WerBpyrivbz5NbnVxdL8")
      .then((response) => {
        console.log(response.data.valueRanges[0].values );
        this.setState({ posts: response.data.valueRanges[0].values });
      })
      .catch((error) => {
        console.log(error);
        this.setState({ error: "Rendering error retrieving data" });
      });
  }
 


  render() {
    const { posts, error } = this.state;
    return (
      <table >
      <tbody>
        {     
             posts.map((numList,i) =>(
                <tr key={i}>
                 {
                   numList.map((num,j)=>
                      <td key={j}>{num}</td>
                   )
                 }
                </tr>
             ))
        }
      </tbody>
    </table>
    );
  }
}

export default App;
