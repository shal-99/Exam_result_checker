import React, { Component } from "react";
import ResultDataService from "../services/result-service";
import "../App.css";
export default class ResultListView extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchName = this.onChangeSearchName.bind(this);
    this.retrieveResults = this.retrieveResults.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveResult = this.setActiveResult.bind(this);
    //this.removeAllResults = this.removeAllResults.bind(this);
    this.searchName = this.searchName.bind(this);

    this.state = {
      results: [],
      currentResult: null,
      currentIndex: -1,
      searchName: ""
    };
  }

  componentDidMount() {
    this.retrieveResults();
  }

  onChangeSearchName(e) {
    const searchName = e.target.value;

    this.setState({
      searchName: searchName
    });
  }

  retrieveResults() {
    ResultDataService.getAll()
      .then(response => {
        this.setState({
          results: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveResults();
    this.setState({
      currentResult: null,
      currentIndex: -1
    });
  }

  setActiveResult(result, index) {
    this.setState({
      currentResult: result,
      currentIndex: index
    });
  }

  

  searchName() {
    this.setState({
      currentResult: null,
      currentIndex: -1
    });

    ResultDataService.findByName(this.state.searchName)
      .then(response => {
        this.setState({
          results: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { searchName, results, currentResult, currentIndex } = this.state;

    return (
      <div className="container-view">
        <div class="line-view"></div>
      <div className="row">
        <div className="searcharea">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by name.."
              value={searchName}
              onChange={this.onChangeSearchName}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-dark"
                type="button"
                onClick={this.searchName}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="list row"></div>
        <div className="col-md-6">
          <h4 className="list-result">Results List</h4>

          <ul className="list-group">
            {results &&
              results.map((result, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveResult(result, index)}
                  key={index}
                >
                  {result.name}
                </li>
              ))}
          </ul>

          
        </div>
        <div className="col-md-6">
          {currentResult ? (
            <div className="container2">
              <h4 className="heading">Result</h4>
              <div>
                <label>
                  <strong>Name:</strong>
                </label>{" "}
                {currentResult.name}
              </div>
              <div>
                <label>
                  <strong>Index:</strong>
                </label>{" "}
                {currentResult.index}
              </div>
              <div>
                <label>
                  <strong>Grade Obtained For Maths:</strong>
                </label>{" "}
                {currentResult.maths}
              </div>
              <div>
                <label>
                  <strong>Grade Obtained For Science:</strong>
                </label>{" "}
                {currentResult.science}
              </div>
              <div>
                <label>
                  <strong>Grade Obtained For English:</strong>
                </label>{" "}
                {currentResult.english}
              </div>
              <div>
                <label>
                  <strong>Grade Obtained For IT:</strong>
                </label>{" "}
                {currentResult.it}
              </div>
              <div>
                <label>
                  <strong>Status:</strong>
                </label>{" "}
                {currentResult.published ? "Published" : "Pending"}
              </div>
              </div>
          ) : (
            <div>
              <br />
              <p>  Please click on a name to view result</p>
            </div>
          )}
        </div>
      </div>
      <div class="line-view"></div>
    </div>
    
    );
  }
}
