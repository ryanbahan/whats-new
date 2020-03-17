import React from 'react';
import './Menu.css'

class Menu extends React.Component {

  getMenuItems(props) {
    return props.map(item => (<li key={item}>{item}</li>))
  }

  render() {
    return <nav>
    <div class="title-container">
      <h1>What's New?</h1>
    </div>
      <ul className="menu-items">
        {this.getMenuItems(this.props.items)}
      </ul>
    </nav>;
  }
}

export default Menu;
