
import React, { Component } from 'react';
import axios from "axios";
import logo from './logo.svg';
import './App.css';
import Form from './components/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import ContentEditable from 'react-contenteditable';
class App extends Component {

  constructor(){
    super();
    // this.contentEditable = React.createRef();
    this.state = {
    API_KEY:"",
    SPREADSHEET_ID:"",
    error: "",
    posts: [],
    };

  }

  handleChange=(event) =>{
    this.setState({ 
       SPREADSHEET_ID: event.target.value
      
    })
    console.log(this.state.SPREADSHEET_ID)

    
  }
  
  validateField = (field, value)=> {
    if(value.length<=0) {
      return <div className="alert alert-danger"><span className="text-capitalize">{field}</span> is required field.</div>;
    } else {
        return ''
      }
    }
  
  handleBlur= (event) => {
    this.setState({ error: this.validateField(event.target.name, event.target.value) });
  }

  handleChange1 = (event) => {
    this.setState({
      API_KEY:event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const spreadsheetId = this.state.SPREADSHEET_ID
    const apiKey = this.state.API_KEY
    // AIzaSyD6uZbF-ZhTM80WerBpyrivbz5NbnVxdL8
    console.log(spreadsheetId)
    const Spreadsheet = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values:batchGet?ranges=Sheet1&majorDimension=ROWS&key=${apiKey}`;
    axios
      .get(Spreadsheet)
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
      <>

        <div className="card box_shw2 border-0 px-3 rounded-2 mb-3 w_500 py-4 mx-auto mt-5">
          <div className="card-header bg-white f_20_22 border-0 text-center"></div>
            <div className="card-body">
                {/* {this.state.error} */}
                {this.state.error ? <div className="alert alert-danger"><span className="text-capitalize">{this.state.error}</span></div>: null}
       
              <form  encType="multipart/form-data" autoComplete="off">
                  <div className="position-relative form-group">
                    <input name="API" type="text" className="text-field form-control mb-3 bg_grey border-0 py-3" placeholder="Enter Your Google API key" value={this.state.name} onChange={this.handleChange1} onBlur={this.handleBlur} 
                    required="required" />
                  </div>
                  <div className="position-relative form-group">
                    <input name="SpreadsheetID" type="text" className="text-field form-control mb-3 bg_grey border-0 py-1" placeholder="Enter your Spreadsheet ID" onBlur={this.handleBlur} onChange={this.handleChange}  />
                  </div>
       
                  <p className="text-center mb-0"><button onClick={this.handleSubmit} className="btn btn-primary px-5 text-uppercase py-3 f_12_14 border-0 d-inline-block" value="Submit Now" >Submit</button></p>
              </form>
      
            </div>
        </div>
    <table >
      <tbody>
        {     
             posts.map((numList,i) =>(
                <tr key={i}>
                 {
                   numList.map((num,j)=>
                      <td key={j}><input type="text" value={num} ref={this.contentEditable} ></input></td>
                   )
                 }
                </tr>
             ))
        }
      </tbody>
    </table>
    </>
    );
  }
}

export default App;
