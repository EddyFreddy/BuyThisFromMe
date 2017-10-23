import React from 'react';
import '../styles/index.css';
import Tweet from 'react-tweet'

class Item extends React.Component {
  render () {
    return (
      <div className="item">

        <div id="listing">
          <div id="post">
            <Tweet data={this.props.item.status} />
          </div>
          <div id="location">

          </div>
        </div>
      </div>
    )
  }
}

export default Item;
