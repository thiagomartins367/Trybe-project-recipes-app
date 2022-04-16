import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
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
  const [copy, setCopy] = useState(false);
  return (
    <li key={ id } className="card-li-done-recipes">
      <div className="li-div-done-recipes">
        <Link key={ id } to={ `/${type}s/${id}` }>
          <img
            data-testid={ `${index}-horizontal-image` }
            src={ image }
            alt={ name }
            width="100px"
            height="100px"
          />
          <div className="div-name-category-done-recipes">
            <p
              className="category-recipe-done-recipes"
              data-testid={ `${index}-horizontal-top-text` }
            >
              {`${checkType} - ${category}`}
            </p>
            <br />
            <p
              className="name-recipe-done-recipes"
              data-testid={ `${index}-horizontal-name` }
            >
              { name }
            </p>
            <br />
            <p
              className="recipe-done-in-done-recipes"
              data-testid={ `${index}-horizontal-done-date` }
            >
              {`Done in: ${doneDate}`}
            </p>
            <br />
            <span className="tags-done-recipes">
              {tags.map((tag) => (
                <span key={ tag } data-testid={ `${index}-${tag}-horizontal-tag` }>
                  {` ${tag}`}
                </span>
              ))}
            </span>
          </div>
        </Link>
        <div className="div-buttons-share-done-recipes">
          <button
            type="button"
            className="bnt-share-done-recipes"
            data-testid={ `${index}-horizontal-share-btn` }
            src={ icon }
            onClick={ () => {
              navigator.clipboard.writeText(`${window.location.origin}/${type}s/${id}`);
              // https://developer.mozilla.org/en-US/docs/Web/API/Location/origin
              // https://developer.mozilla.org/en-US/docs/Web/API/Clipboard/writeText
              setCopy(true);
            } }
          >
            Compartilhar
          </button>
          { copy && <p data-testid="URL-copiada">Link copied!</p>}
        </div>
      </div>
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
