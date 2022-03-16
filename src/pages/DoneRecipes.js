import React from 'react';
import Card from '../components/DoneRecipes/Card';

const recipes = [
  {
    id: '52771',
    type: 'food',
    nationality: 'Italian',
    category: 'Vegetarian',
    alcoholicOrNot: '',
    name: 'Spicy Arrabiata Penne',
    image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
    doneDate: '23/06/2020',
    tags: ['Pasta', 'Curry'],
  },
  {
    id: '178319',
    type: 'drink',
    nationality: '',
    category: 'Cocktail',
    alcoholicOrNot: 'Alcoholic',
    name: 'Aquamarine',
    image:
      'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
    doneDate: '23/06/2020',
    tags: [],
  },
];

function DoneRecipes() {
  return (
    <div>
      <header>Receitas feitas</header>
      <button
        data-testid="filter-by-all-btn"
        type="button"
      >
        All
      </button>
      <button
        data-testid="filter-by-food-btn"
        type="button"
      >
        Food
      </button>
      <button
        data-testid="filter-by-drink-btn"
        type="button"
      >
        Drinks
      </button>
      <ul>
        {recipes.map((recipe, index) => (
          <Card
            id={ recipe.id }
            category={ recipe.category }
            name={ recipe.name }
            image={ recipe.image }
            doneDate={ recipe.doneDate }
            tags={ recipe.tags }
            key={ recipe.id }
            index={ index }
          />
        ))}
      </ul>
    </div>
  );
}

export default DoneRecipes;
