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
import handleFilters from './handleFilters';

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
    const {
      category,
      typeOfRecipes,
    } = handleFilters(target, stateFoodRecipesCategories, stateDrinkRecipesCategories);
    if (category !== stateActiveFilter && category !== 'All') {
      target.style.backgroundColor = 'rgb(0, 180, 216)';
      const filteredRecipes = await fetchRecipesFromContext(typeOfRecipes, category);
      setActiveFilter(category);
      setEditableStateRecipes(filteredRecipes);
    } else {
      target.style.backgroundColor = 'rgb(0, 180, 216)';
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
