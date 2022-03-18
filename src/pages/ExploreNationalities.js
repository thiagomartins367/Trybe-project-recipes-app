import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import {
  searchNationalities,
  searchFoodNationalities } from '../services/fetchNationalities';
import { CARDS } from '../constants';
import Context from '../context/Context';

function ExploreNationalities() {
  const [nationality, setNationality] = useState([]);
  const { setEditableStateRecipes, setActiveFilter } = useContext(Context);
  const history = useHistory();

  const getNationality = async () => {
    const data = await searchNationalities();
    setNationality(data);
  };

  const searchRecipe = async (area) => {
    const response = await searchFoodNationalities(area);
    const getRecipe = response.slice(0, CARDS);
    setEditableStateRecipes(getRecipe);
    setActiveFilter('');
    history.push('/foods');
  };

  useEffect(() => {
    getNationality();
  }, []);

  return (
    <div>
      <Header />
      <select
        data-testid="explore-by-nationality-dropdown"
        onChange={ (e) => searchRecipe((e.target.value)) }
      >
        <option value="all">All</option>
        {nationality.map((nat, key) => (
          <option
            value={ nat.strArea }
            key={ key }
            data-testid={ `${nat.strArea}-option` }
          >
            {nat.strArea}
          </option>
        ))}
      </select>
    </div>
  );
}

export default ExploreNationalities;
