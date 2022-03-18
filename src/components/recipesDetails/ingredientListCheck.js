import React from 'react';
import propTypes from 'prop-types';
import IngredientOrganization from '../../services/ingredientOrganization';

function IngredientListCheck({ recipe }) {
  const arrIngredient = IngredientOrganization(recipe);

  return (
    <section>
      <h4>Ingredientes</h4>
      <ul>
        {arrIngredient.map((item, index) => (
          <li key={ item.ingredient } style={ { listStyleType: 'none' } }>
            <label htmlFor={ index }>
              <input
                type="checkbox"
                id={ index }
                name={ item.ingredient }
                data-testid={ `${index}-ingredient-step` }
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
