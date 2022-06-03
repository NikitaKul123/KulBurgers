import Carousel from 'react-bootstrap/Carousel'
import React, { Component } from 'react'
import featured3 from '../Images/featured3.jpg'
import product4 from '../Images/product4.jpg'




export default class CarouselBox extends Component {
    

    render() {
        
        return (
            
            <Carousel>
            <Carousel.Item interval={5000}>
              <img
                className="slider"
                src={featured3}
                alt="First slide"
              />
              <Carousel.Caption>
              
              <div className='menu-carousel'>
                <h2>Еще больше Говядины</h2>
                <p>Попробуйте новинку сезона</p>
                </div>
                <a className='settings-button' href="#mainmenu">Меню</a>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item interval={5000}>
              <img
                className="slider"
                src={product4}
                alt="Second slide"
              />
              <Carousel.Caption>
                  
                  <div className='menu-carousel'>
                <h2>Новинка</h2>
                <p>Наша новинка - Завернутый бургер. Стало еще вкуснее!</p>
                </div>
                <a  className='settings-button' href='#mainmenu'>Меню</a>
              </Carousel.Caption>
            </Carousel.Item>
           
          </Carousel>
          
        )
    }
}

