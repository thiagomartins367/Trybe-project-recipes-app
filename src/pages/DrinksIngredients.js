import React, { useEffect, useState } from 'react';
import BottomMenu from '../components/BottomMenu';
import Header from '../components/Header';
import RecipeCard from '../components/recipesScreen/RecipeCard';
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
        <div key={ index } data-testid={ `${index}-ingredient-card` }>
          <a href="/drinks" data-testid={ `${index}-ingredient-card` }>
            <RecipeCard
              dataTestIdRecipeCard={ `${index}-recipe-card` }
              dataTestIdRecipeImg={ `${index}-card-img` }
              dataTestIdRecipeName={ `${index}-card-name` }
              recipeImage={ `https://www.thecocktaildb.com/images/ingredients/${ingredient.strIngredient1}-Small.png` }
              recipeName={ ingredient.strIngredient1 }
            />
          </a>
        </div>

        // <div className="recipe-card" key={ index }>
        //   <a href="/drinks" data-testid={ `${index}-ingredient-card` }>
        //     <img
        //       data-testid={ `${index}-card-img` }
        //       src={ `https://www.thecocktaildb.com/images/ingredients/${ingredient.strIngredient1}-Small.png` }
        //       alt={ ingredient.strIngredient1 }
        //     />
        //     <p data-testid={ `${index}-card-name` }>{ingredient.strIngredient1}</p>
        //   </a>
        // </div>
      ))}
      <BottomMenu />
    </div>
  );
}

export default DrinksIngredients;
