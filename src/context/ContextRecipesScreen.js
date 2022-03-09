import { useEffect, useState } from 'react';
import fetchRecipesAPI from '../services/fetchRecipesAPI';
import fetchRecipesCategoriesAPI from '../services/fetchRecipesCategoriesAPI';

const ContextRecipesScreen = () => {
  const [stateDrinksRecipes, setDrinksRecipes] = useState([]);
  const [stateDrinkRecipesCategories, setDrinkRecipesCategories] = useState([]);
  const [stateFoodsRecipes, setFoodsRecipes] = useState([]);
  const [stateFoodRecipesCategories, setFoodRecipesCategories] = useState([]);

  useEffect(() => {
    fetchRecipesAPI('https://www.themealdb.com/api/json/v1/1/search.php?s=')
      .then((data) => setFoodsRecipes(data.meals));
    fetchRecipesAPI('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')
      .then((data) => setDrinksRecipes(data.drinks));
    fetchRecipesCategoriesAPI('https://www.themealdb.com/api/json/v1/1/list.php?c=list')
      .then((data) => setFoodRecipesCategories(data.meals));
    fetchRecipesCategoriesAPI('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list')
      .then((data) => setDrinkRecipesCategories(data.drinks));
  }, []);

  const contextRecipesObj = {
    stateFoodsRecipes,
    setFoodsRecipes,
    stateFoodRecipesCategories,
    setFoodRecipesCategories,
    stateDrinksRecipes,
    setDrinksRecipes,
    stateDrinkRecipesCategories,
    setDrinkRecipesCategories,
  };

  return contextRecipesObj;
};

export default ContextRecipesScreen;
