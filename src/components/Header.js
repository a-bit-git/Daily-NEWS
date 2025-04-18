import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <div className="header">
      <div className="logo">
        <img className="image" alt=""
          src="https://i2.wp.com/grin2b.com/wp-content/uploads/2017/01/Grin2B_icon_NEWS.png?fit=675%2C675"/>
      </div>

      <div className="tag-line"><h1>You need to KNOW...</h1></div>

      <div className="series icon">
      <nav>
        <div className="home"><Link to="/">Home</Link></div>
        <div className="about"><Link to="/about">About</Link></div>
        <div className="help"><Link to="/help">Help</Link></div>
      </nav>
      </div>

    </div>
  );
}

export default Header;
