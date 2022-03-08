import React from 'react';
import { Link } from 'react-router-dom';

const BottomMenu = () => {
  return (
    <footer data-testid="footer">
      <Link to="">
        <img src="" alt="Drinks" data-testid="drinks-bottom-btn" />
      </Link>
      <Link to="">
        <img src="" alt="Explorar" data-testid="explore-bottom-btn" />
      </Link>
      <Link to="">
        <img src="" alt="Food" data-testid="food-bottom-btn" />
      </Link>
    </footer>
  );
};

export default BottomMenu;
