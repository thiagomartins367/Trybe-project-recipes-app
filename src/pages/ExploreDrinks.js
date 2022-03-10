import React from 'react';
import { useHistory } from 'react-router-dom';

function ExploreDrinks() {
  const history = useHistory();
  return (
    <div>
      <h1>Explore Drinks</h1>
      <button
        type="button"
        data-testid="explore-by-ingredient"
        onClick={ () => {
          history.push('/explore/drinks/ingredients');
        } }
      >
        By Ingredient

      </button>
      <button type="button" data-testid="explore-surprise">Surprise me!</button>
    </div>
  );
}

export default ExploreDrinks;
