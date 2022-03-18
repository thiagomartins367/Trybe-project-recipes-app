import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Context from '../../context/Context';
import shareIcon from '../../images/shareIcon.svg';

const PATH_HOME = 'http://localhost:3000';
const clipboardCopy = require('clipboard-copy');

const ONE_SECOND = 1000;
// const number = 12;

function ShareButton() {
  const history = useHistory();
  const { location: { pathname } } = history;
  const {
    linkCopied,
    setLinkCopied,
  } = useContext(Context);
  const shareRecipe = () => {
    if (pathname.match(/in-progress/)) {
      const newPathName = pathname.replace('/in-progress', '');
      const newLinkRecipe = PATH_HOME + newPathName;
      clipboardCopy(newLinkRecipe);
      setTimeout(() => setLinkCopied(false), ONE_SECOND);
      setLinkCopied(true);
    }
    const linkRecipe = PATH_HOME + pathname;
    clipboardCopy(linkRecipe);
    setTimeout(() => setLinkCopied(false), ONE_SECOND);
    setLinkCopied(true);
  };

  return (
    <div>
      {linkCopied && <span>Link copied!</span>}
      <button
        type="button"
        data-testid="share-btn"
        onClick={ () => shareRecipe() }
      >
        <img src={ shareIcon } alt="Botão de Compartilhar" />
      </button>
    </div>
  );
}

export default ShareButton;
