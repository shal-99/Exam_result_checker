import React, { Component } from "react";
import ResultDataService from "../services/result-service";
import { withRouter } from '../common/with-router';
import "../App.css";

class Result extends Component {
  constructor(props) {
    super(props);
    this.onChangename = this.onChangename.bind(this);
    this.onChangeindex = this.onChangeindex.bind(this);
    this.onChangemaths = this.onChangemaths.bind(this);
    this.onChangescience = this.onChangescience.bind(this);
    this.onChangeenglish = this.onChangeenglish.bind(this);
    this.onChangeit = this.onChangeit.bind(this);
    this.getResult = this.getResult.bind(this);
    this.updateFinalized = this.updateFinalized.bind(this);
    this.updateResult = this.updateResult.bind(this);
    this.deleteResult = this.deleteResult.bind(this);

    this.state = {
      currentResult: {
        id: null,
        name: "",
      index: "", 
      maths:"",
      science:"",
      english:"",
      it:"",
        finalized: false
      },
      message: ""
    };
  }
  
  componentDidMount() {
    this.getResult(this.props.router.params.id);
  }

  onChangename(e) {
    const name = e.target.value;

    this.setState(function(prevState) {
      return {
        currentResult: {
          ...prevState.currentResult,
          name: name
        }
      };
    });
  }

  onChangeindex(e) {
    const index = e.target.value;

    this.setState(function(prevState) {
      return {
        currentResult: {
          ...prevState.currentResult,
          index: index
        }
      };
    });
  }
  onChangemaths(e) {
    const maths = e.target.value;

    this.setState(function(prevState) {
      return {
        currentResult: {
          ...prevState.currentResult,
          maths: maths
        }
      };
    });
  }
  onChangescience(e) {
    const science = e.target.value;

    this.setState(function(prevState) {
      return {
        currentResult: {
          ...prevState.currentResult,
          science: science
        }
      };
    });
  }
  onChangeenglish(e) {
    const english = e.target.value;

    this.setState(function(prevState) {
      return {
        currentResult: {
          ...prevState.currentResult,
          english: english
        }
      };
    });
  }
  onChangeit(e) {
    const it = e.target.value;

    this.setState(function(prevState) {
      return {
        currentResult: {
          ...prevState.currentResult,
          it: it
        }
      };
    });
  }
  getResult(id) {
    ResultDataService.get(id)
      .then(response => {
        this.setState({
          currentResult: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateFinalized(status) {
    var data = {
      id: this.state.currentResult.id,
      name: this.state.currentResult.name,
      index: this.state.currentResult.index,
      maths:this.state.currentResult.maths,
      science:this.state.currentResult.science,
      english:this.state.currentResult.english,
      it:this.state.currentResult.it,
      finalized: status
    };

    ResultDataService.update(this.state.currentResult.id, data)
      .then(response => {
        this.setState(prevState => ({
          currentResult: {
            ...prevState.currentResult,
            finalized: status
          }
        }));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateResult() {
    ResultDataService.update(
      this.state.currentResult.id,
      this.state.currentResult
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The Result was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteResult() {    
    ResultDataService.delete(this.state.currentResult.id)
      .then(response => {
        console.log(response.data);
        this.props.router.navigate('/results');
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentResult } = this.state;

    return (
      <div class="container1">
        <div class="line"></div>
      <div className="row g-0">
      <div className="cl">
      <div className="card-body">
      <h4 className="card-title  mt-3">Edit Result</h4>
        {currentResult ? (
          <div className="edit-form">
            <form>
              <div className="form-group">
                <label className="form-label" htmlFor="name">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  value={currentResult.name}
                  onChange={this.onChangename}
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="index">Index</label>
                <input
                  type="text"
                  className="form-control"
                  id="index"
                  value={currentResult.index}
                  onChange={this.onChangeindex}
                />
              </div>
              <div className="form-group">
              <label className="form-label" htmlFor="maths">Grade Obtained For Maths</label>
              <input
                type="text"
                className="form-control"
                id="maths"
                required
                value={currentResult.maths}
                onChange={this.onChangemaths}
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="science">Grade Obtained For Science</label>
              <input
                type="text"
                className="form-control"
                id="science"
                required
                value={currentResult.science}
                onChange={this.onChangescience}
              />
            </div>

            <div className="form-group">
              <label  className="form-label" htmlFor="english">Grade Obtained For English</label>
              <input
                type="text"
                className="form-control"
                id="english"
                required
                value={currentResult.english}
                onChange={this.onChangeenglish}
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="it">Grade Obtained For IT</label>
              <input
                type="text"
                className="form-control"
                id="it"
                required
                value={currentResult.it}
                onChange={this.onChangeit}
              />
            </div>


              <div className="row1">
                <label>
                  <h5>Status:</h5>
                </label>
                {currentResult.finalized ? "finalized" : "Pending"}
              </div>
            </form>
      <div className="row1">
            {currentResult.finalized ? (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updateFinalized(false)}
              >
                UnFinalized
              </button>
            ) : (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updateFinalized(true)}
              >
                Finalized
              </button>
            )}
     
            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteResult}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success mr-2"
              onClick={this.updateResult}
            >
              Update
            </button></div>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a name to view result</p>
          </div>
        )}
      </div>
      </div>
      </div>
      <div class="line"></div>
      </div>
    );
  }
}

export default withRouter(Result);