import React from 'react';

function ContinueRecipeButton() {
  return (
    <button
      type="button"
      data-testid="continue-recipe-btn"
      style={ { position: 'fixed', bottom: 0 } }
      onClick={ () => redirectRecipeProgress() }
    >
      Continuar Receita
    </button>
  );
}

export default ContinueRecipeButton;
