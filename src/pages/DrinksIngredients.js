import React, { useEffect, useState } from 'react';
import BottomMenu from '../components/BottomMenu';
import Header from '../components/Header';
import { CARDS } from '../constants';
import { fetchIngredientDrink } from '../services/fetchIngredients';

function DrinksIngredients() {
  const [ingredients, setIngredients] = useState([]);

  const getIngredients = async () => {
    const response = await fetchIngredientDrink();
    const data = response.slice(0, CARDS);
    setIngredients(data);
  };

  useEffect(() => {
    getIngredients();
  }, []);

  return (
    <div>
      <Header />
      {ingredients.map((ingredient, index) => (
        <div className="recipe-card" key={ index }>
          <a href="/drinks" data-testid={ `${index}-ingredient-card` }>
            <img
              data-testid={ `${index}-card-img` }
              src={ `https://www.thecocktaildb.com/images/ingredients/${ingredient.strIngredient1}-Small.png` }
              alt={ ingredient.strIngredient1 }
            />
            <p data-testid={ `${index}-card-name` }>{ingredient.strIngredient1}</p>
          </a>
        </div>
      ))}
      <BottomMenu />
    </div>
  );
}

export default DrinksIngredients;
