import React from 'react';
import { Button } from 'react-bootstrap';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import './styles/footer.css';

const Footer = () => (
  <div className="footer-container" data-testid="footer">
    <Button
      href="/bebidas"
      type="button"
      className="teste"
    >
      <img src={ drinkIcon } alt="bebidas" data-testid="drinks-bottom-btn" className="icon-white-footer"/>
    </Button>
    <Button
      href="/explorar"
      type="button"
    >
      <img src={ exploreIcon } alt="explorar" data-testid="explore-bottom-btn" className="icon-white-footer"/>
    </Button>
    <Button
      href="/comidas"
      type="button"
    >
      <img src={ mealIcon } alt="comidas" data-testid="food-bottom-btn" className="icon-white-footer"/>
    </Button>
  </div>
);

export default Footer;
