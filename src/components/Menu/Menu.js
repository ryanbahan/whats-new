import React from 'react';
import './Menu.css'

class Menu extends React.Component {
  constructor() {
    super()
  }

  getMenuItems(props) {
    return props.map(item => (<li key={item}>{item}</li>))
  }

  render() {
    return <nav>
    <h1>What's New?</h1>
      <ul className="menu-items">
        {this.getMenuItems(this.props.items)}
      </ul>
    </nav>;
  }
}

export default Menu;
