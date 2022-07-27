import React from 'react';
import propTypes from 'prop-types';
import { Card } from 'react-bootstrap';

function RecipeCard({ title, image, category, testid, classCards }) {
  return (
    <Card border="dark" data-testid={ testid } className={ `recipe-cards ${classCards}` }>
      <Card.Img
        variant="top"
        src={ image }
        alt={ title }
        data-testid="recipe-photo"
      />
      <Card.Body>
        <Card.Title data-testid="recipe-title">{ title }</Card.Title>
        <Card.Subtitle data-testid="recipe-category">{ category }</Card.Subtitle>
      </Card.Body>
    </Card>
  );
}

RecipeCard.propTypes = {
  title: propTypes.string,
  image: propTypes.string,
  category: propTypes.string,
}.isRequired;

export default RecipeCard;
