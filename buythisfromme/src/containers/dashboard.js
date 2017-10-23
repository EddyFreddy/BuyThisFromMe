import React from 'react';
import '../styles/App.css';
import { connect } from 'react-redux';
import { addRecentItems } from '../actions/actions';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from 'react-router-dom'

import  ItemList from '../components/item-list.js';

class Dashboard extends React.Component {


  constructor(props) {
    super(props)
    this.addRecentItems();
    this.renderItems();
  }

  addRecentItems () {
    fetch(`http://localhost:4000/recent`)
    .then(response => response.json())
    .then(result => result.sort((a,b) => {
      if (a.created_at > b.created_at) return -1;
      if (a.created_at < b.created_at) return 1;
    }))
    .then(result => {
      this.props.addRecentItems(result)
    })
  }
  renderItems () {
      //  if (this.props.queries && !this.props.searchItems) {
      //    console.log('1');
      //    console.log(this.props.queries);
      //    return (
      //      <div>
       //
      //        <div id="recent">
      //          Sorry, there is nothing available for {this.props.queries}
      //        </div>
      //        {/* <ItemList items={this.props.items} /> */}
      //    </div>
      //    )
      //  } else
        if (!this.props.searchItems || this.props.searchItems.length === 0 ) {
          return (
            <div>
              <div id="recent">
                Recent
              </div>
              <ItemList items={this.props.items} />
          </div>
          )
        }
      else {
        console.log('IN THE SEARCH');
        console.log('THESE ARE THE SEARCHED ITEMS:', this.props.searchItems);
        return (
          <div>
            {this.redirect()}

            <div id="recent">
              Searched
            </div>
            <ItemList items={this.props.searchItems} />
            {/* {console.log('this is the queries:', this.props.queries)} */}
            {/* {console.log('this is the pathname:', window.location.pathname)} */}
          </div>
        )
      }

  }

  redirect () {
      return (
        <Router>
          <Redirect to={`/search/${this.props.queries}`}/>
        </Router>
      )
  }

  componentDidMount() {
    {this.addRecentItems()}
  }

  render () {
    return (
      <div className = "Dashboard">
      {this.renderItems()}
      {/* {'THIS IS THE PROPS.ITEMS:', console.log(this.props.items)} */}
      {/* {console.log('this is the search items', this.props.searchItems)} */}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  items: state.items,
  searchItems: state.searchItems,
  queries: state.queries
});

const mapDispatchToProps = (dispatch) => ({
  addRecentItems: (items) => dispatch(addRecentItems(items))
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
