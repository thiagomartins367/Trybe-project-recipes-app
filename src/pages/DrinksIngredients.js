import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import RecipeCard from '../components/recipesScreen/RecipeCard';
import { FIRST_12_RECIPES } from '../constants';
import Context from '../context/Context';
import { fetchIngredientDrink } from '../services/fetchIngredients';
import { ingredientSearchDrink } from '../services/fetchSearchFilter';

function DrinksIngredients() {
  const [ingredients, setIngredients] = useState([]);
  const { setEditableStateRecipes, setActiveFilter } = useContext(Context);
  const history = useHistory();

  const getIngredients = async () => {
    const response = await fetchIngredientDrink();
    const data = response.slice(0, FIRST_12_RECIPES);
    setIngredients(data);
  };

  const searchRecipe = async (ingredient) => {
    const response = await ingredientSearchDrink(ingredient);
    const getRecipe = response.slice(0, FIRST_12_RECIPES);
    setEditableStateRecipes(getRecipe);
    setActiveFilter('');
    history.push('/drinks');
  };

  useEffect(() => {
    getIngredients();
  }, []);

  return (
    <div>
      <h1>Explore Drinks Ingredients</h1>
      {ingredients.map((ingredient, index) => (
        <div key={ index } data-testid={ `${index}-ingredient-card` }>
          <button
            className="noStyleBtn"
            type="button"
            onClick={ () => { searchRecipe(ingredient.strIngredient1); } }
          >
            <RecipeCard
              dataTestIdRecipeCard={ `${index}-recipe-card` }
              dataTestIdRecipeImg={ `${index}-card-img` }
              dataTestIdRecipeName={ `${index}-card-name` }
              recipeImage={ `https://www.thecocktaildb.com/images/ingredients/${ingredient.strIngredient1}-Small.png` }
              recipeName={ ingredient.strIngredient1 }
            />
          </button>
        </div>
      ))}
    </div>
  );
}

export default DrinksIngredients;
