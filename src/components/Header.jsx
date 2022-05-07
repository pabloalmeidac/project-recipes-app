import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';
import profileIcon from '../images/profileIcon.svg';
import menuIcon from '../images/menu-icon.svg';

import searchIcon from '../images/searchIcon.svg';
import RecipesContext from '../context/RecipesContext';
import './styles/header.css';
// Recebe como props o titulo do header e se deve aparecer o botão de busca
// Deixo como padrão o valor de 'pageTitle' e showSearch caso não passem props
const Header = ({ pageTitle = 'Comidas', showSearch = true }) => {
  const { searchOrHeader, changeSearchOrHeader } = useContext(RecipesContext);
  const history = useHistory();

  const btnSearch = () => (
    <button
      type="button"
      onClick={ () => changeSearchOrHeader(!searchOrHeader) }
    >
      <img src={ searchIcon } alt="icone-busca" data-testid="search-top-btn" className="icon-white"/>
    </button>
  );


  const goProfile = () => {
    history.push('/perfil');
  };

  return (
    <div className="header-container">
      <div className="header-container-items">
        <button
          type="button"
          onClick={ goProfile }
        >
          <img
            src={ profileIcon }
            alt="icone-perfil"
            data-testid="profile-top-btn"
            className="icon-white"
          />
        </button>

        <h2 data-testid="page-title" className="title">
          { pageTitle }
        </h2>

        { showSearch ? btnSearch() : ''}
      </div>
    </div>
  );
};

Header.propTypes = {
  pageTitle: PropTypes.string.isRequired,
  showSearch: PropTypes.bool.isRequired,
};

export default Header;
