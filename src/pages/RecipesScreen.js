import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import RecipeCard from '../components/recipesScreen/RecipeCard';
import Context from '../context/Context';
import { FIRST_12_RECIPES } from '../constants';

const RecipesScreen = ({ match: { path } }) => {
  const {
    stateFoodsRecipes,
    stateFoodRecipesCategories,
    stateDrinksRecipes,
    stateDrinkRecipesCategories,
    editableStateRecipes,
    setEditableStateRecipes,
    stateActiveFilter,
    filterRecipesByCategory,
  } = useContext(Context);
  const FIRST_5_CATEGORIES_RECIPES = 5;
  let recipesData = [];
  let typeOfRecipes = '';
  let recipesCategories = [];
  switch (path) {
  case '/foods':
    recipesData = [...stateFoodsRecipes];
    typeOfRecipes = 'Meal';
    recipesCategories = [...stateFoodRecipesCategories];
    break;

  case '/drinks':
    recipesData = [...stateDrinksRecipes];
    typeOfRecipes = 'Drink';
    recipesCategories = [...stateDrinkRecipesCategories];
    break;

  default:
    break;
  }
  console.log('stateActiveFilter: ', stateActiveFilter);
  if (recipesData.length >= FIRST_12_RECIPES && stateActiveFilter === '') {
    const editableRecipeData = [];
    for (let index = 0; index < FIRST_12_RECIPES; index += 1) {
      editableRecipeData.push(recipesData[index]);
    }
    // console.log('editableRecipeData: ', editableRecipeData);
    // console.log('editableStateRecipes: ', editableStateRecipes);
    if (
      editableStateRecipes[editableStateRecipes.length - 1]
      !== editableRecipeData[editableRecipeData.length - 1]
    ) {
      setEditableStateRecipes(editableRecipeData);
      console.log('EXECUTOU setEditableStateRecipes');
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
  // console.log('recipesData: ', recipesData);
  // console.log('stateFoodsRecipes: ', stateFoodsRecipes);
  // console.log('stateDrinksRecipes: ', stateDrinksRecipes);
  // console.log('path - RecipesScreen: ', path);
  // console.log('recipesCategories: ', recipesCategories);

  return (
    <section>
      <section className="section-filters-recipes">
        {recipesCategories.map((category) => (
          <button
            key={ category }
            type="button"
            name={ `button-filter-type-recipes-${typeOfRecipes}` }
            id={ `button-filter-category-${category}` }
            className="button-filter"
            onClick={ filterRecipesByCategory }
            data-testid={ `${category}-category-filter` }
          >
            { category }
          </button>
        ))}
      </section>
      <section className="meals">
        {editableStateRecipes.map((element, index) => (
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
