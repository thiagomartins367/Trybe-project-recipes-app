import fetchRecipesCategoriesAPI from '../../services/fetchRecipesCategoriesAPI';

// ESSE ARQUIVO NÃO ESTÁ SENDO USADO,
// MAS QUE FOI DEIXADO AQUI PRA USAR FUTURAMENTE SE PRECISAR.

const fetchAllRecipesFromContext = async (typeOfRecipes, categories) => {
  try {
    const filteredRecipes = [];
    let index = 0;
    const testFunction = async () => {
      await fetchRecipesCategoriesAPI(
        `https://www.the${typeOfRecipes}db.com/api/json/v1/1/filter.php?c=${categories[index].strCategory}`,
      ).then((data) => {
        filteredRecipes.push(...data[
          typeOfRecipes === 'meal'
            ? 'meals' : 'drinks'
        ]);
      });
      if (index !== categories.length - 1) {
        index += 1;
        await testFunction();
      }
    };
    await testFunction();

    return filteredRecipes;
  } catch (error) {
    alert('Error getting data from Recipes !');
  }
};

export default fetchAllRecipesFromContext;
