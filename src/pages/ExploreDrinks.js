import React from 'react';
import { useHistory } from 'react-router-dom';
import { fetchRandonDrink } from '../services/fecthAPI';

function ExploreDrinks() {
  const history = useHistory();

  const getRecipe = async () => {
    const response = await fetchRandonDrink();
    history.push(`/drinks/${response[0].idDrink}`);
  };

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
      <button
        type="button"
        data-testid="explore-surprise"
        onClick={ () => getRecipe() }
      >
        Surprise me!
      </button>
    </div>
  );
}

export default ExploreDrinks;
