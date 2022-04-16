import React from 'react';
import { useHistory } from 'react-router-dom';
import BottomMenu from '../components/BottomMenu';
import Header from '../components/Header';

function Explore() {
  const history = useHistory();
  return (
    <section className="section-explore">
      <Header
        titleName="Explore"
        searchIconOnScreen={ false }
      />
      <section className="section-btn-explore -foods">
        <button
          type="button"
          className="btn-explore"
          data-testid="explore-foods"
          onClick={ () => {
            history.push('/explore/foods');
          } }
        >
          Explore Foods
        </button>
        <button
          type="button"
          className="btn-explore"
          data-testid="explore-drinks"
          onClick={ () => {
            history.push('/explore/drinks');
          } }
        >
          Explore Drinks
        </button>
      </section>
      <BottomMenu />
    </section>
  );
}

export default Explore;
