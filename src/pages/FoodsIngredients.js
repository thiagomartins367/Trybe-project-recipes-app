import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import BottomMenu from '../components/BottomMenu';
import Header from '../components/Header';
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
      <Header />
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

        // <div className="recipe-card" key={ index }>
        //   <a href="/foods" data-testid={ `${index}-ingredient-card` }>
        //     <img
        //       data-testid={ `${index}-card-img` }
        //       src={ `https://www.themealdb.com/images/ingredients/${ingredient.strIngredient}-Small.png` }
        //       alt={ ingredient.strIngredient }
        //     />
        //     <p data-testid={ `${index}-card-name` }>{ingredient.strIngredient}</p>
        //   </a>
        // </div>
      ))}
      <BottomMenu />
    </div>
  );
}

export default FoodsIngredients;
