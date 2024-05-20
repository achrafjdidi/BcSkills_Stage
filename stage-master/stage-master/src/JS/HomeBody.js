import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';

import axios from 'axios';
import SignInModal from './SignInModal';
import bg from '../pictures/bgf.png'
import Im3 from '../pictures/Im3.png'
import Im1 from '../pictures/Im1.png'
import Im2 from '../pictures/Im2.png'



function HomeBody() {
  return (
    <div className="container-fluid" style={{ backgroundImage: `url(${bg})` }}>
       <style>
        {`
          .carousel-item {
            height: 400px; /* Adjust the height as needed */
          }
        `}
      </style>
      <Carousel interval={2000} pause={false} >
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={Im1}
            alt="First slide"
            
          />
          <Carousel.Caption>
            <h3>Car Care</h3>
            <p>Find Your Parking</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={Im2}
            alt="Second slide"
          />

          <Carousel.Caption>
          <h3>Car Care</h3>
            <p>Find Your Parking</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={Im3}
            alt="Third slide"
          />

          <Carousel.Caption>
            <h3>Car Care</h3>
            <p>Find Your Parking</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default HomeBody;
