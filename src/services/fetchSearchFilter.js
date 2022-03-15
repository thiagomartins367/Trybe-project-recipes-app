import {
  INGREDIENT_SEARCH_FILTER,
  NAME_SEARCH_FILTER,
  SEARCH_LATTER_SEARCH_FILTER,
} from '../constants';

export const ingredientSearch = async (ingredient) => {
  try {
    const response = await fetch(`${INGREDIENT_SEARCH_FILTER}${ingredient}`);
    const data = await response.json();
    return data.meals;
  } catch (error) {
    console.error(error.message);
  }
};

export const nameLatterSearch = async (name) => {
  try {
    const response = await fetch(`${NAME_SEARCH_FILTER}${name}`);
    const data = await response.json();
    return data.meals;
  } catch (error) {
    console.error(error.message);
  }
};

export const searchLatterSearch = async (latter) => {
  try {
    const response = await fetch(`${SEARCH_LATTER_SEARCH_FILTER}${latter}`);
    const data = await response.json();
    return data.meals;
  } catch (error) {
    console.error(error.message);
  }
};
