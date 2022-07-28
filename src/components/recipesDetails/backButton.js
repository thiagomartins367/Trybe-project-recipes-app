import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import returnArrow from '../../images/returnArrow.png';

function BackButton({ destinationRoute }) {
  return (
    <div className="div-img-return-arrow">
      <Link to={ destinationRoute }>
        <img
          alt="return"
          src={ returnArrow }
          style={ { position: 'fixed', bottom: 0 } }
        />
      </Link>
    </div>
  );
}

BackButton.propTypes = {
  destinationRoute: PropTypes.string.isRequired,
};

export default BackButton;
