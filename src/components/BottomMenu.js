import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';

const BottomMenu = () => {
  return (
    <footer data-testid="footer">
      <Link to="">
        <img src={ drinkIcon } alt="Drinks" data-testid="drinks-bottom-btn" />
      </Link>
      <Link to="">
        <img src={ exploreIcon } alt="Explorar" data-testid="explore-bottom-btn" />
      </Link>
      <Link to="">
        <img src={ mealIcon } alt="Food" data-testid="food-bottom-btn" />
      </Link>
    </footer>
  );
};

export default BottomMenu;
