import React from 'react';
import '../styles/App.css';
import logo from '../images/buythisfrommelogo.png';
import { connect } from 'react-redux';
import { search, query, clearSearch } from '../actions/actions.js';
import { browserHistory } from 'react-router';

import Search from '../components/search';

const _ = require('underscore');

class Navbar extends React.Component {

  constructor(props) {
    super(props)
    // this.search();
  }

  // searchBox = () => {
  //   let item = this.props.query(document.getElementById('search-bar').value)
  //   console.log(item);
  //   if (item.queries.length  > 2){
  //     this.search(item.queries);
  //
  //   }
  //
  // }

 searchBox = query => this.bounce(query);
 //
 bounce = _.debounce((query) => {
    if (query.length > 2) this.search(query);
    else this.props.clear();
  }, 500);

  search (item) {
    fetch(`http://localhost:4000/items/${item}`)
    .then(response => response.json())
    .then(result => {
      this.props.search(result)
    })
  }

  query (item) {
    return item;
  }

  componentDidMount() {
    {this.search()}
    {this.query()}
    {this.loadURL()}
  }

  loadURL() {
    console.log(window.location.pathname);
    let item = this.props.query(window.location.pathname.split('/')[2])
    if (item.queries) {
      if (item.queries.length > 2) {
        this.search(item.queries);
      }

    }

  }

  render () {
    return (
      <div>
      <head>
        <link rel="shortcut icon" type="image/x-icon"  src={logo}/>
      </head>
      <div className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <h2>#BUYTHISFROMME</h2>
        {/* <input id="search-bar" type='text' onKeyUp={this.searchBox} /> */}
        <Search id="search-bar" passQuery={this.searchBox}/>
      </div>
      {/* {console.log('THIS IS THE PROPS.SEARCHITEMS:', this.props.searchItems)} */}
      {/* {this.loadURL()} */}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  searchItems: state.searchItems,
  queries: state.queries
});

const mapDispatchToProps = (dispatch) => ({
  search: (searchItems) => dispatch(search(searchItems)),
  query: (queries) => dispatch(query(queries)),
  clear: () => dispatch(clearSearch())
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
