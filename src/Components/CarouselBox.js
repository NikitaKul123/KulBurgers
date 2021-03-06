import Carousel from 'react-bootstrap/Carousel';
import React, { Component } from 'react';
import featured3 from '../Images/featured3.jpg';
import product4 from '../Images/product4.jpg';

export default class CarouselBox extends Component {
  render() {
    return (
      <Carousel>
        <Carousel.Item interval={5000}>
          <img className="slider" src={featured3} alt="First slide" />
          <Carousel.Caption>
            <div className="menu-carousel">
              <a className="settings-button" href="#mainmenu">
                Меню
              </a>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={5000}>
          <img className="slider" src={product4} alt="Second slide" />
          <Carousel.Caption>
            <div className="menu-carousel">
              <a className="settings-button" href="#mainmenu">
                Меню
              </a>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    );
  }
}
