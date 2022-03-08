import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import RecipeCard from '../components/recipesScreen/RecipeCard';
import Context from '../context/Context';

const RecipesScreen = ({ match: { path } }) => {
  const {
    stateFoodsRecipes: { meals },
    stateDrinksRecipes: { drinks },
  } = useContext(Context);
  // console.log('meals: ', meals);
  const FIRST_12_RECIPES = 12;
  let recipesData = [];
  const editableRecipeData = [];
  let typeOfRecipe = '';
  switch (path) {
  case '/foods':
    if (meals !== undefined) {
      recipesData = JSON.parse(JSON.stringify(meals));
      typeOfRecipe = 'Meal';
    }
    break;
  case '/drinks':
    if (drinks !== undefined) {
      recipesData = JSON.parse(JSON.stringify(drinks));
      typeOfRecipe = 'Drink';
    }
    break;

  default:
    break;
  }
  if (recipesData.length >= FIRST_12_RECIPES) {
    for (let index = 0; index < FIRST_12_RECIPES; index += 1) {
      editableRecipeData.push(recipesData[index]);
    }
  }
  // console.log('stateDrinkRecipes: ', stateDrinksRecipes);
  console.log('recipesData: ', recipesData);
  console.log('path - RecipesScreen: ', path);
  return (
    <section className="meals">
      {
        editableRecipeData.map((element, index) => (
          <RecipeCard
            key={ `${index}-${element[`str${typeOfRecipe}`]}` }
            dataTestIdRecipeCard={ `${index}-recipe-card` }
            dataTestIdRecipeImg={ `${index}-card-img` }
            dataTestIdRecipeName={ `${index}-card-name` }
            recipeImage={ element[`str${typeOfRecipe}Thumb`] }
            recipeName={ element[`str${typeOfRecipe}`] }
          />
        ))
      }
    </section>
  );
};

RecipesScreen.propTypes = {
  match: PropTypes.shape({
    isExact: PropTypes.bool,
    params: PropTypes.objectOf(PropTypes.string),
    path: PropTypes.string,
  }),
};

RecipesScreen.defaultProps = {
  match: {},
};

export default RecipesScreen;
