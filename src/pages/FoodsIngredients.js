import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import RecipeCard from '../components/recipesScreen/RecipeCard';
import { FIRST_12_RECIPES } from '../constants';
import Context from '../context/Context';
import { fetchIngredientFood } from '../services/fetchIngredients';
import { ingredientSearch } from '../services/fetchSearchFilter';

function FoodsIngredients() {
  const [ingredients, setIngredients] = useState([]);
  const { setEditableStateRecipes, setActiveFilter } = useContext(Context);
  const history = useHistory();

  const getIngredients = async () => {
    const response = await fetchIngredientFood();
    const data = response.slice(0, FIRST_12_RECIPES);
    setIngredients(data);
  };

  const searchRecipe = async (ingredient) => {
    const response = await ingredientSearch(ingredient);
    const getRecipe = response.slice(0, FIRST_12_RECIPES);
    setEditableStateRecipes(getRecipe);
    setActiveFilter('');
    history.push('/foods');
  };

  useEffect(() => {
    getIngredients();
  }, []);

  return (
    <div>
      <h1>Explore Foods Ingredients</h1>
      {ingredients.map((ingredient, index) => (
        <div key={ index } data-testid={ `${index}-ingredient-card` }>
          <button
            className="noStyleBtn"
            type="button"
            onClick={ () => {
              searchRecipe(ingredient.strIngredient);
            } }

          >
            <RecipeCard
              dataTestIdRecipeCard={ `${index}-recipe-card` }
              dataTestIdRecipeImg={ `${index}-card-img` }
              dataTestIdRecipeName={ `${index}-card-name` }
              recipeImage={ `https://www.themealdb.com/images/ingredients/${ingredient.strIngredient}-Small.png` }
              recipeName={ ingredient.strIngredient }

            />

          </button>
        </div>
      ))}
    </div>
  );
}

export default FoodsIngredients;
