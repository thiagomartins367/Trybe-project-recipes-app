import React, { useContext, useEffect, useState } from 'react';
import propTypes from 'prop-types';
import IngredientOrganization from '../../services/ingredientOrganization';
import Context from '../../context/Context';

const addFirstStorage = (recipe, ingredient, recipeType) => {
  if (recipeType === 'food') {
    const foodStorage = { meals: { [recipe.idMeal]: [ingredient] } };
    localStorage.setItem('inProgressRecipes', JSON.stringify(foodStorage));
  } else {
    const drinkStorage = { cocktails: { [recipe.idDrink]: [ingredient] } };
    localStorage.setItem('inProgressRecipes', JSON.stringify(drinkStorage));
  }
};

const addIngredientStorage = (recipe, ingredient, recipeType, returnStorage) => {
  if (recipeType === 'food') {
    const { meals } = returnStorage;
    const foodStorage = { ...returnStorage,
      meals: { [recipe.idMeal]: [...meals[recipe.idMeal], ingredient] },
    };
    localStorage.setItem('inProgressRecipes', JSON.stringify(foodStorage));
  } else {
    const { cocktails } = returnStorage;
    const drinkStorage = { ...returnStorage,
      cocktails: { [recipe.idDrink]: [...cocktails[recipe.idDrink], ingredient] },
    };
    localStorage.setItem('inProgressRecipes', JSON.stringify(drinkStorage));
  }
};

const verifyCheckedItem = (ingredient, ingredients, setIngredients, setFinishRecipe) => {
  const verifyChecked = ingredients.map((item) => {
    if (item.ingredient === ingredient) {
      item.checked = !item.checked;
    }
    return item;
  });
  const verifyFinish = ingredients.some((item) => item.checked !== true);
  if (!verifyFinish) {
    setFinishRecipe(false);
  }
  setIngredients(verifyChecked);
  localStorage.setItem('ingredients', JSON.stringify(verifyChecked));
};

function IngredientListCheck({ recipe, recipeType }) {
  const [ingredients, setIngredients] = useState();
  const { setFinishRecipe } = useContext(Context);
  const arrIngredient = IngredientOrganization(recipe);
  useEffect(() => {
    const returnIngredients = JSON.parse(localStorage.getItem('ingredients'));
    if (returnIngredients) {
      setIngredients(returnIngredients);
    } else {
      setIngredients(arrIngredient);
      localStorage.setItem('ingredients', JSON.stringify(arrIngredient));
    }
  }, []);

  const checkIngredient = (ingredient) => {
    const returnStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (returnStorage) {
      addIngredientStorage(recipe, ingredient, recipeType, returnStorage);
      verifyCheckedItem(ingredient, ingredients, setIngredients, setFinishRecipe);
    } else {
      addFirstStorage(recipe, ingredient, recipeType);
      verifyCheckedItem(ingredient, ingredients, setIngredients, setFinishRecipe);
    }
  };

  return (
    <section className="section-ingredients">
      <h4>Ingredientes</h4>
      <ul>
        {ingredients && ingredients.map((item, index) => (
          <li
            key={ item.ingredient }
            style={ { listStyleType: 'none' } }
            data-testid={ `${index}-ingredient-step` }
          >
            <label
              htmlFor={ index }
              className={ item.checked ? 'checkedBox' : 'empty-checkbox' }
            >
              <input
                type="checkbox"
                id={ index }
                name={ item.ingredient }
                onChange={ () => checkIngredient(item.ingredient) }
                checked={ item.checked }
              />
              { `${item.ingredient} - ${item.measure}` }
            </label>
          </li>
        ))}
      </ul>
    </section>
  );
}

IngredientListCheck.propTypes = {
  recipe: propTypes.objectOf(propTypes.string),
}.isRequired;

export default IngredientListCheck;
