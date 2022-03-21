import React from 'react';
import { useHistory } from 'react-router-dom';
import BottomMenu from '../components/BottomMenu';
import Header from '../components/Header';
import { fetchRandonFood } from '../services/fetchRandomRecipe';

function ExploreFoods() {
  const history = useHistory();

  const getRecipe = async () => {
    const response = await fetchRandonFood();
    history.push(`/foods/${response[0].idMeal}`);
  };

  return (
    <section className="section-explore">
      <Header
        titleName="Explore Foods"
        searchIconOnScreen={ false }
      />
      <section className="section-btn-explore-foods">
        <button
          type="button"
          className="btn-explore"
          data-testid="explore-by-ingredient"
          onClick={ () => {
            history.push('/explore/foods/ingredients');
          } }
        >
          By Ingredient

        </button>
        <button
          type="button"
          className="btn-explore"
          data-testid="explore-by-nationality"
          onClick={ () => {
            history.push('/explore/foods/nationalities');
          } }
        >
          By Nationality

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

export default ExploreFoods;
