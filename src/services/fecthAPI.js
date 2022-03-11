const URL_FOOD = 'https://www.themealdb.com/api/json/v1/1/random.php';

const URL_DRINK = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';

export const fetchRandonFood = async () => {
  try {
    const response = await fetch(URL_FOOD);
    const data = await response.json();
    return data.meals;
  } catch (error) {
    console.error(error.message);
  }
};

export const fetchRandonDrink = async () => {
  try {
    const response = await fetch(URL_DRINK);
    const data = await response.json();
    return data.drinks;
  } catch (error) {
    console.error(error.message);
  }
};
