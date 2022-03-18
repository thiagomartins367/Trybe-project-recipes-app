import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import RecipeCard from '../components/recipesScreen/RecipeCard';
import { CARDS } from '../constants';
import Context from '../context/Context';
import { fetchIngredientFood } from '../services/fetchIngredients';
import { ingredientSearch } from '../services/fetchSearchFilter';

function FoodsIngredients() {
  const [ingredients, setIngredients] = useState([]);
  const { setEditableStateRecipes, setActiveFilter } = useContext(Context);
  const history = useHistory();

  const getIngredients = async () => {
    const response = await fetchIngredientFood();
    const data = response.slice(0, CARDS);
    setIngredients(data);
  };

  const searchRecipe = async (ingredient) => {
    const getRecipe = await ingredientSearch(ingredient);
    setEditableStateRecipes(getRecipe);
    setActiveFilter('');
    console.log(getRecipe);
    history.push('/foods');
  };

  useEffect(() => {
    getIngredients();
  }, []);

  return (
    <div>
      <h1>Explore Foods Ingredients</h1>
      {ingredients.map((ingredient, index) => (
        <button
          type="button"
          key={ index }
          data-testid={ `${index}-ingredient-card` }
          onClick={ () => { searchRecipe(ingredient.strIngredient); } }
        >
          <RecipeCard
            dataTestIdRecipeCard={ `${index}-recipe-card` }
            dataTestIdRecipeImg={ `${index}-card-img` }
            dataTestIdRecipeName={ `${index}-card-name` }
            recipeImage={ `https://www.themealdb.com/images/ingredients/${ingredient.strIngredient}-Small.png` }
            recipeName={ ingredient.strIngredient }

          />

        </button>
      ))}
    </div>
  );
}

export default FoodsIngredients;
