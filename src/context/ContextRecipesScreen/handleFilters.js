const handleFilters = (
  target,
  stateFoodRecipesCategories,
  stateDrinkRecipesCategories,
) => {
  const { name, id = 'default' } = target;
  const category = id.replace('button-filter-category-', '');
  const typeOfRecipes = name.replace('button-filter-type-recipes-', '') === 'Meal'
    ? 'meal'
    : 'cocktail';
  const categories = typeOfRecipes === 'meal'
    ? [...stateFoodRecipesCategories]
    : [...stateDrinkRecipesCategories];
  const buttons = document.querySelectorAll('.button-filter');
  buttons.forEach((htmlElement) => {
    htmlElement.style.backgroundColor = 'rgb(255, 84, 0)';
  });
  return { category, typeOfRecipes, categories };
};

export default handleFilters;
