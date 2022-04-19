import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';

/** Recebe Valores via Props de Bebidas e Comidas */
const RecipesCards = ({ nameValue, indexValue, thumbValue }) => (
  <Card
    data-testid={ `${indexValue}-recipe-card` }
    style={ { width: '18rem', margin: '0.5rem' } }
  >
    <Card.Body>
      <Card.Img
        data-testid={ `${indexValue}-card-img` }
        variant="top"
        src={ thumbValue }
      />
      <h5
        className="card-title"
        data-testid={ `${indexValue}-card-name` }
        style={ { marginTop: '10px' } }
      >
        { nameValue }
      </h5>
      {/* <Card.Title
        data-testid={ `${indexValue}-card-name` }
        style={ { marginTop: '10px' } }
      >
        { nameValue }
      </Card.Title> */}
    </Card.Body>
  </Card>
);

RecipesCards.propTypes = {
  nameValue: PropTypes.string.isRequired,
  indexValue: PropTypes.number.isRequired,
  thumbValue: PropTypes.string.isRequired,
};

export default RecipesCards;
