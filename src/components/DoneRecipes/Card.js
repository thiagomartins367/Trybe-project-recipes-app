import React from 'react';
import PropTypes from 'prop-types';

function Card({
  index,
  id,
  category,
  name,
  image,
  doneDate,
  tags,
}) {
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
        {`Categoria: ${category}`}
      </p>
      <p data-testid={ `${index}-horizontal-done-date` }>{`Data: ${doneDate}`}</p>
      <span key={ tags } data-testid={ `${index}-${tags[1]}-horizontal-tag` }>
        Tags:
        <span key={ tags } data-testid={ `${index}-${tags[0]}-horizontal-tag` } />
        {` ${tags}`}
      </span>
      <button
        type="button"
        data-testid={ `${index}-horizontal-share-btn` }
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
