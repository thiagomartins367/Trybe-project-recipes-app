const fetchRecipesCategoriesAPI = async (urlRecipesCategories) => {
  try {
    const response = await fetch(urlRecipesCategories);
    const recipesCategories = await response.json();
    return recipesCategories;
  } catch (error) {
    console.error('REQUEST ERROR "fetchRecipesCategoriesAPI": ', error);
  }
};

export default fetchRecipesCategoriesAPI;
