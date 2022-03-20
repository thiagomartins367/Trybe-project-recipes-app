import { URL_FOOD_NATIONALITIES, URL_NATIONALITIES } from '../constants';

export const searchNationalities = async () => {
  try {
    const response = await fetch(URL_NATIONALITIES);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error.message);
  }
};

export const searchFoodNationalities = async (areas) => {
  try {
    const response = await fetch(`${URL_FOOD_NATIONALITIES}${areas}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error.message);
  }
};
