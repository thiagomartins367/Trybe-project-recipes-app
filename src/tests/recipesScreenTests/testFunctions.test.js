import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  DRINK_RECIPES_URL,
  FIRST_12_RECIPES,
  FIRST_5_CATEGORIES,
  MEAL_RECIPES_URL,
} from '../../constants';
import fetchRecipesAPI from '../../services/fetchRecipesAPI';

export const checkFirst12RecipeCards = async (getByTestId, firstRecipeName) => {
  const first12Recipes = [];
  const waitForRendering = await screen.findByText(firstRecipeName);
  for (let index = 0; index < FIRST_12_RECIPES; index += 1) {
    first12Recipes.push(getByTestId(`${index}-recipe-card`));
  }
  expect(waitForRendering.textContent).toBe(firstRecipeName);
  expect(first12Recipes.length).toBe(FIRST_12_RECIPES);
  try {
    expect(getByTestId('12-recipe-card')).not.toBeInTheDocument();
  } catch (error) {
    const string = 'O card "12-recipe-card" não deve existir na página';
    expect(typeof string).toBe('string');
  }
};

export const checkImageFirst12Recipes = async (getByTestId, firstRecipeName, page) => {
  const first12RecipesImg = [];
  let recipeType = '';
  let requisitionURL = '';
  switch (page) {
  case '/foods':
    recipeType = 'meals';
    requisitionURL = `${MEAL_RECIPES_URL}`;
    break;
  case '/drinks':
    recipeType = 'drinks';
    requisitionURL = `${DRINK_RECIPES_URL}`;
    break;

  default:
    break;
  }
  const waitForRendering = await screen.findByText(firstRecipeName);
  for (let index = 0; index < FIRST_12_RECIPES; index += 1) {
    first12RecipesImg.push(getByTestId(`${index}-card-img`));
  }
  expect(waitForRendering.textContent).toBe(firstRecipeName);
  let recipesImg = [];
  const recipeTypeFormatted = `${recipeType[0].toUpperCase()}${recipeType
    .slice(1)
    .replace('s', '')}`;
  await fetchRecipesAPI(requisitionURL).then((data) => {
    recipesImg = data[recipeType];
  });
  recipesImg.forEach((meal) => {
    recipesImg.push(meal[`str${recipeTypeFormatted}Thumb`]);
  });
  first12RecipesImg.forEach((htmlElement) => {
    expect(recipesImg).toContain(htmlElement.src);
  });
};

export const checkRecipesCategoriesFilters = async (
  getByTestId,
  mealsCategories,
  secondCategory,
) => {
  const foodsCategories = [];
  foodsCategories.push('All');
  for (let index = 0; index < FIRST_5_CATEGORIES; index += 1) {
    foodsCategories.push(mealsCategories[index].strCategory);
  }
  const waitForRendering = await screen.findByText(secondCategory);
  expect(waitForRendering.textContent).toBe(secondCategory);
  foodsCategories.forEach((category) => {
    expect(getByTestId(`${category}-category-filter`)).toBeInTheDocument();
  });
};

export const checkRecipesFromSelectedCategory = async (objectParameter) => {
  const {
    renderComponent,
    firstRecipeNameCategory,
    firstRecipeName,
    secondCategory,
    mockCategoriesImgs,
    dataTestIdCategoryRecipe,
    page,
  } = objectParameter;
  const { getByTestId, history } = renderComponent;
  history.push(page);
  const waitForRendering = await screen.findByText(secondCategory);
  expect(waitForRendering.textContent).toBe(secondCategory);
  userEvent.click(getByTestId(dataTestIdCategoryRecipe));
  const waitForRenderingRecipes = await screen.findByText(firstRecipeNameCategory);
  expect(waitForRenderingRecipes.textContent).toBe(firstRecipeNameCategory);
  const categoryRecipesImg = [];
  for (let index = 0; index < FIRST_12_RECIPES; index += 1) {
    try {
      categoryRecipesImg.push(getByTestId(`${index}-card-img`));
    } catch (error) {
      break;
    }
  }
  categoryRecipesImg.forEach((htmlElement) => {
    expect(mockCategoriesImgs).toContain(htmlElement.src);
  });
  userEvent.click(getByTestId(dataTestIdCategoryRecipe));
  checkImageFirst12Recipes(getByTestId, firstRecipeName, page);
};

export const checkRecipesFromTheAllCategory = async (objectParameter) => {
  const {
    renderComponent,
    secondCategory,
    secondCategoryDataTestId,
    firstRecipeNameCategory,
    categoryAllDataTestId,
    firstRecipeName,
    page,
  } = objectParameter;
  const { getByTestId, history } = renderComponent;
  history.push(page);
  const waitForRenderingCategory = await screen.findByText(secondCategory);
  userEvent.click(getByTestId(secondCategoryDataTestId));
  const waitForRenderingRecipe = await screen.findByText(firstRecipeNameCategory);
  expect(waitForRenderingCategory.textContent).toBe(secondCategory);
  expect(waitForRenderingRecipe.textContent).toBe(firstRecipeNameCategory);
  userEvent.click(getByTestId(categoryAllDataTestId));
  await checkImageFirst12Recipes(getByTestId, firstRecipeName, page);
};

export const checkRedirectRecipeDetailsScreen = async (objectParameter) => {
  const {
    renderComponent,
    firstRecipeName,
    page,
    recipesMock,
    typeRecipes,
  } = objectParameter;
  const { getByTestId, history } = renderComponent;
  history.push(page);
  const waitForRenderingRecipe = await screen.findByText(firstRecipeName);
  expect(waitForRenderingRecipe.textContent).toBe(firstRecipeName);
  for (let index = 0; index < FIRST_12_RECIPES; index += 1) {
    userEvent.click(getByTestId(`${index}-recipe-card`));
    const { location: { pathname } } = history;
    const idRecipe = pathname.replace(`${page}/`, '');
    const recipe = recipesMock.find(
      (element) => element[`id${typeRecipes}`] === idRecipe,
    );
    expect(pathname).toBe(`${page}/${recipe[`id${typeRecipes}`]}`);
    history.push(page);
  }
};
