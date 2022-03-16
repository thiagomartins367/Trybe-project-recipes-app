import React from 'react';
import PropTypes from 'prop-types';
import icon from '../../images/shareIcon.svg';

function Card({
  index,
  id,
  category,
  name,
  image,
  doneDate,
  tags,
  type,
  nationality,
  alcoholicOrNot,
}) {
  const checkType = type === 'food' ? nationality : alcoholicOrNot;
  return (
    <li key={ id }>
      <img
        data-testid={ `${index}-horizontal-image` }
        src={ image }
        alt={ name }
        width="100px"
        height="100px"
      />
      <p data-testid={ `${index}-horizontal-name` }>{`Nome: ${name}`}</p>
      <p data-testid={ `${index}-horizontal-top-text` }>
        {`Categoria:  ${checkType} - ${category}`}
      </p>
      <p data-testid={ `${index}-horizontal-done-date` }>{`Data: ${doneDate}`}</p>
      <span key={ tags } data-testid={ `${index}-${tags[0]}-horizontal-tag` }>
        Tags:
        <span key={ tags } data-testid={ `${index}-${tags[1]}-horizontal-tag` } />
        {` ${tags}`}
      </span>
      <button
        type="button"
        data-testid={ `${index}-horizontal-share-btn` }
        src={ icon }
      >
        Compartilhar
      </button>
    </li>
  );
}

Card.propTypes = {
  id: PropTypes.number,
  img: PropTypes.string,
  name: PropTypes.string,
  index: PropTypes.number,
}.isRequired;

export default Card;
