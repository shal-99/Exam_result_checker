import React, { Component } from "react";
import ResultDataService from "../services/result-service";
import "../App.css";
export default class AddResult extends Component {
  constructor(props) {
    super(props);
    
    this.saveResult = this.saveResult.bind(this);
    this.newResult = this.newResult.bind(this);

    this.state = {
      id: null,
      name: "",
      index: "", 
      maths:"",
      science:"",
      english:"",
      it:"",
      nameError:"",
      indexError:"",
      subjectError:"",
      submitted:"",
      finalized: false,
    };
  }

  onInputValueChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });

    
}

validate = () =>{
let nameError =""
let indexError =""
let subjectError=""
if (!this.state.name){
  nameError="Name is required"
  
}

if (!this.state.index){
  indexError="Index is required"
  
  
}

if (!this.state.maths || !this.state.science || !this.state.english || !this.state.it){
  subjectError="Result is required"  
}

if(nameError || indexError || subjectError){
  this.setState({nameError,indexError,subjectError});
  return false;
}
return true;
}

  saveResult(e) {
    e.preventDefault();
    const isValid =this.validate();
    if(isValid){
    var data = {
      name: this.state.name,
      index: this.state.index,
      maths:this.state.maths,
      science:this.state.science,
      english:this.state.english,
      it:this.state.it,
    };
    
    ResultDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          name: response.data.name,
          index: response.data.index,
          maths: response.data.maths,
          science: response.data.science,
          english: response.data.english,
          it: response.data.it,
          finalized: response.data.finalized,

          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });}
  }

  newResult() {
    this.setState({
      id: null,
      name: "",
      index: "", 
      maths:"",
      science:"",
      english:"",
      it:"",
      finalized: false,

      submitted: false
    });

    
  }
  
  render() {
    
    return (
      <div class="container1">
        <div class="line"></div>
      <div className="row g-0">
      <div className="cl">
      <div className="card-body">
                                <h4 className="card-title  mt-3">Add Result</h4>
                                <form >
        {this.state.submitted ? (
          <div>
            <h4 className="heading">Result Added Successfully</h4>
            <button className="btn1" onSubmit={this.saveResult}>
              Add Result
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label className="form-label" htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                required
                value={this.state.name}
                name="name"
                onChange={(e) => this.onInputValueChange(e)}
              />
            </div>
          {this.state.nameError ?(<div className="alert">{this.state.nameError}</div>):null}
            <div className="form-group">
              <label className="form-label" htmlFor="index">Index</label>
              <input
                type="text"
                className="form-control"
                id="index"
                required
                value={this.state.index}
                name="index"
                onChange={(e) => this.onInputValueChange(e)}
              />
            </div>
            {this.state.indexError ?(<div className="alert">{this.state.indexError}</div>):null}
            <div className="form-group">
              <label className="form-label" htmlFor="maths">Grade Obtained For Maths</label>
              <input
                type="text"
                className="form-control"
                id="maths"
                required
                value={this.state.maths}
                name="maths"
                onChange={(e) => this.onInputValueChange(e)}
              />
            </div>
            {this.state.subjectError ?(<div className="alert">{this.state.subjectError}</div>):null}
            <div className="form-group">
              <label className="form-label" htmlFor="science">Grade Obtained For Science</label>
              <input
                type="text"
                className="form-control"
                id="science"
                required
                value={this.state.science}
                name="science"
                onChange={(e) => this.onInputValueChange(e)}
              />
            </div>
            {this.state.subjectError ?(<div className="alert">{this.state.subjectError}</div>):null}
            <div className="form-group">
              <label className="form-label" htmlFor="english">Grade Obtained For English</label>
              <input
                type="text"
                className="form-control"
                id="english"
                required
                value={this.state.english}
                name="english"
                onChange={(e) => this.onInputValueChange(e)}
              />
            </div>
            {this.state.subjectError ?(<div className="alert">{this.state.subjectError}</div>):null}
            <div className="form-group">
              <label className="form-label" htmlFor="it">Grade Obtained For IT</label>
              <input
                type="text"
                className="form-control"
                id="it"
                required
                value={this.state.it}
                name="it"
                onChange={(e) => this.onInputValueChange(e)}
              />
            </div>
            {this.state.subjectError ?(<div className="alert">{this.state.subjectError}</div>):null}

            <button type="submit" onClick={this.saveResult} className="btn1">
              Submit
            </button>
            
          </div>
        )}
      </form>
      </div>
      </div>
      </div>
      <div class="line"></div>
      </div>
    );
  }
}
