import { URL_DRINK_INGREDIENTS, URL_FOOD_INGREDIENTS } from '../constants';

export const fetchIngredientFood = async () => {
  try {
    const response = await fetch(URL_FOOD_INGREDIENTS);
    const data = await response.json();
    return data.meals;
  } catch (error) {
    console.error(error.message);
  }
};

export const fetchIngredientDrink = async () => {
  try {
    const response = await fetch(URL_DRINK_INGREDIENTS);
    const data = await response.json();
    return data.drinks;
  } catch (error) {
    console.error(error.message);
  }
};
