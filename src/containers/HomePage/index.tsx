import React from 'react';
import BestSeller from '../../components/BestSeller';
import Partners from '../../components/Partners';
import ShopQuality from '../../components/ShopQuality';
import './style.css';

class HomePage extends React.Component {
  render() {
    return (
      <div className="homepage-container">
        <div className="cover-image" />
        <ShopQuality />
        <BestSeller />
        <Partners />
      </div>
    )
  }
}

export default HomePage;