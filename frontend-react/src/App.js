import React, { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import ResultListView from "./components/results-listview";
import AddResult from "./components/add-result";
import Result from "./components/actions-result";
import ResultList from "./components/results-list";
import  cover from "./components/images/cover.png"
import Welcome from "./components/welcome";
class App extends Component {
  render() {
    return (
      <div>
        <img className="imageheader" src = { cover } alt="cover" />
        <nav className="navbar navbar-expand ">
          <Link to={"/allresults"} className="navbar-brand">
            E-Result
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/allresults"} className="nav-link">
                All Results
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add New 
              </Link>
            </li>
            <li className="nav-item">
            <Link
                to={"/results"}
                className="nav-link">
                Edit Results
              </Link>
            </li>
            
          </div>
        </nav>

        <div className="container mt-3">
          <Routes>
            <Route path="/" element={<Welcome/>} />
            <Route path="/allresults" element={<ResultListView/>} />
            <Route path="/results" element={<ResultList/>} />
            <Route path="/add" element={<AddResult/>} />
            <Route path="/results/:id" element={<Result/>} />
          </Routes>
        </div>
      </div>
    );
  }
}

export default App;
