import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import RecipeCard from '../components/recipesScreen/RecipeCard';
import { CARDS } from '../constants';
import { fetchIngredientFood } from '../services/fetchIngredients';

function FoodsIngredients() {
  const [ingredients, setIngredients] = useState([]);

  const getIngredients = async () => {
    const response = await fetchIngredientFood();
    const data = response.slice(0, CARDS);
    setIngredients(data);
  };

  useEffect(() => {
    getIngredients();
  }, []);

  return (
    <div>
      <h1>Explore Foods Ingredients</h1>
      {ingredients.map((ingredient, index) => (
        <div key={ index } data-testid={ `${index}-ingredient-card` }>
          <Link to="/foods">
            <RecipeCard
              dataTestIdRecipeCard={ `${index}-recipe-card` }
              dataTestIdRecipeImg={ `${index}-card-img` }
              dataTestIdRecipeName={ `${index}-card-name` }
              recipeImage={ `https://www.themealdb.com/images/ingredients/${ingredient.strIngredient}-Small.png` }
              recipeName={ ingredient.strIngredient }
            />
          </Link>

        </div>
      ))}
    </div>
  );
}

export default FoodsIngredients;
