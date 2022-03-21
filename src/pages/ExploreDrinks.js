import React from 'react';
import { useHistory } from 'react-router-dom';
import BottomMenu from '../components/BottomMenu';
import Header from '../components/Header';
import { fetchRandonDrink } from '../services/fetchRandomRecipe';

function ExploreDrinks() {
  const history = useHistory();

  const getRecipe = async () => {
    const response = await fetchRandonDrink();
    history.push(`/drinks/${response[0].idDrink}`);
  };

  return (
    <section className="section-explore">
      <Header
        titleName="Explore Drinks"
        searchIconOnScreen={ false }
      />
      <section className="section-btn-explore-drinks">
        <button
          type="button"
          className="btn-explore"
          data-testid="explore-by-ingredient"
          onClick={ () => {
            history.push('/explore/drinks/ingredients');
          } }
        >
          By Ingredient
        </button>
        <button
          type="button"
          className="btn-explore"
          data-testid="explore-surprise"
          onClick={ () => getRecipe() }
        >
          Surprise me!
        </button>
      </section>
      <BottomMenu />
    </section>
  );
}

export default ExploreDrinks;
