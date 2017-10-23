import React from 'react';
import '../styles/index.css';

import Item from './item'

class ItemList extends React.Component {

  renderItems() {
  // console.log( 'THIS IS THE PROPS.ITEMS:', this.props.items);
    return this.props.items.map((item, index) => {
     return <Item key={item._id} item={item} />
    })
  }

  render() {
    return (
      <div className="item-list">
        {this.renderItems()}
      </div>
    )
  }
}

export default ItemList;
