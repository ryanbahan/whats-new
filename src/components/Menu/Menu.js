import React from 'react';
import './Menu.css'

class Menu extends React.Component {

  getMenuItems(props) {
    return props.map(item => (
      <li key={item}
        className={item}
        onClick={this.props.clickHandler}>{item}
      </li>))
  }

  render() {
    return <nav>
        <h1 onClick={this.props.resetPage}>What's New&nbsp;<span className="title-lower">in {this.props.location}?</span></h1>
        <ul className="menu-items">
          {this.getMenuItems(this.props.items)}
        </ul>
    </nav>;
  }
}

export default Menu;
