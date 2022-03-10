import { useEffect, useState } from 'react';
import {
  DRINK_RECIPES_CATEGORIES_URL,
  DRINK_RECIPES_URL,
  MEAL_RECIPES_CATEGORIES_URL,
  MEAL_RECIPES_URL,
} from '../../constants';
import fetchRecipesAPI from '../../services/fetchRecipesAPI';
import fetchRecipesCategoriesAPI from '../../services/fetchRecipesCategoriesAPI';
import fetchRecipesFromContext from './fetchRecipesFromContext';

const ContextRecipesScreen = () => {
  const [stateDrinksRecipes, setDrinksRecipes] = useState([]);
  const [stateDrinkRecipesCategories, setDrinkRecipesCategories] = useState([]);
  const [stateFoodsRecipes, setFoodsRecipes] = useState([]);
  const [stateFoodRecipesCategories, setFoodRecipesCategories] = useState([]);
  const [editableStateRecipes, setEditableStateRecipes] = useState([]);
  const [stateActiveFilter, setActiveFilter] = useState('');
  useEffect(() => {
    fetchRecipesAPI(MEAL_RECIPES_URL).then((data) => setFoodsRecipes(data.meals));
    fetchRecipesAPI(DRINK_RECIPES_URL).then((data) => setDrinksRecipes(data.drinks));
    fetchRecipesCategoriesAPI(MEAL_RECIPES_CATEGORIES_URL)
      .then((data) => setFoodRecipesCategories(data.meals));
    fetchRecipesCategoriesAPI(DRINK_RECIPES_CATEGORIES_URL)
      .then((data) => setDrinkRecipesCategories(data.drinks));
  }, []);

  const filterRecipesByCategory = async ({ target }) => {
    const { name, id = 'default' } = target;
    const category = id.replace('button-filter-category-', '');
    const typeOfRecipes = name.replace('button-filter-type-recipes-', '') === 'Meal'
      ? 'meal' : 'cocktail';
    const buttons = document.querySelectorAll('.button-filter');
    buttons.forEach((htmlElement) => {
      htmlElement.style.backgroundColor = 'rgb(212, 212, 212)';
    });
    if (category !== stateActiveFilter) {
      const filteredRecipes = await fetchRecipesFromContext(typeOfRecipes, category);
      setActiveFilter(category);
      setEditableStateRecipes(filteredRecipes);
      target.style.backgroundColor = 'green';
    } else {
      setActiveFilter('');
    }
  };

  const contextRecipesObj = {
    stateFoodsRecipes,
    stateFoodRecipesCategories,
    stateDrinksRecipes,
    stateDrinkRecipesCategories,
    editableStateRecipes,
    setEditableStateRecipes,
    stateActiveFilter,
    setActiveFilter,
    filterRecipesByCategory,
  };
  return { contextRecipesObj };
};

export default ContextRecipesScreen;
