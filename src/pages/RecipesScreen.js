import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import RecipeCard from '../components/recipesScreen/RecipeCard';
import Context from '../context/Context';

const RecipesScreen = ({ match: { path } }) => {
  const {
    stateFoodsRecipes,
    stateFoodRecipesCategories,
    stateDrinksRecipes,
    stateDrinkRecipesCategories,
  } = useContext(Context);
  const FIRST_12_RECIPES = 12;
  const FIRST_5_CATEGORIES_RECIPES = 5;
  let recipesData = [];
  const editableRecipeData = [];
  let typeOfRecipes = '';
  let recipesCategories = [];
  switch (path) {
  case '/foods':
    if (stateFoodsRecipes.length > 0) {
      recipesData = [...stateFoodsRecipes];
      typeOfRecipes = 'Meal';
      recipesCategories = [...stateFoodRecipesCategories];
    }
    break;

  case '/drinks':
    if (stateDrinksRecipes.length > 0) {
      recipesData = [...stateDrinksRecipes];
      typeOfRecipes = 'Drink';
      recipesCategories = [...stateDrinkRecipesCategories];
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
  if (recipesCategories.length >= FIRST_5_CATEGORIES_RECIPES) {
    const arrayCategories = [];
    for (let index = 0; index < FIRST_5_CATEGORIES_RECIPES; index += 1) {
      arrayCategories.push(recipesCategories[index].strCategory);
    }
    recipesCategories = [...arrayCategories];
  }
  // console.log('stateDrinkRecipes: ', stateDrinksRecipes);
  console.log('recipesData: ', recipesData);
  console.log('path - RecipesScreen: ', path);
  console.log('recipesCategories: ', recipesCategories);
  return (
    <section>
      <section className="section-filters-recipes">
        {recipesCategories.map((category) => (
          <button
            key={ category }
            type="button"
            data-testid={ `${category}-category-filter` }
          >
            { category }
          </button>
        ))}
      </section>
      <section className="meals">
        {editableRecipeData.map((element, index) => (
          <RecipeCard
            key={ `${index}-${element[`str${typeOfRecipes}`]}` }
            dataTestIdRecipeCard={ `${index}-recipe-card` }
            dataTestIdRecipeImg={ `${index}-card-img` }
            dataTestIdRecipeName={ `${index}-card-name` }
            recipeImage={ element[`str${typeOfRecipes}Thumb`] }
            recipeName={ element[`str${typeOfRecipes}`] }
          />
        ))}
      </section>
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
