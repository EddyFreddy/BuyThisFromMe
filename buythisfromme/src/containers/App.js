import React, { Component } from 'react';
import '../styles/App.css';
import Dashboard from './dashboard';
import Navbar from './navbar';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Geo from './geolocate';
import Gmap from './gmap';


class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />

        <div className="Map">
          
          <Geo />

        </div>
        <div className="dashboard">
          <Dashboard />
        </div>

      </div>
    );
  }
}

export default App;
