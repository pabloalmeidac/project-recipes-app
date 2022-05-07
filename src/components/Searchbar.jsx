import { useHistory } from 'react-router-dom';
import React, { useContext, useState } from 'react';
import RecipesContext from '../context/RecipesContext';
import './styles/SearchBar.css';

function SearchBar() {
  const history = useHistory();
  const [inputValue, setInputValue] = useState('');
  const [searchOption, setOption] = useState('');
  const { recipeAPI,
    mealOrDrink,
    searchOrHeader,
    changeSearchOrHeader,
    setRecipes } = useContext(RecipesContext);

  const alertWindow = (msg) => alert(msg);

  const checkTypeOfRecipe = (actualType) => {
    if (actualType === 'meal') {
      return 'meals';
    }
    if (actualType === 'drink') {
      return 'drinks';
    }
  };
  // função para renderizar os cards

  async function onClickButton() {
    // chamada a função acima e guardado resultado na variavel que será utilizada para verificar as condições de redirecionamento
    const typeOfRecipe = checkTypeOfRecipe(mealOrDrink);
    console.log(mealOrDrink);
    console.log(typeOfRecipe);


    changeSearchOrHeader(!searchOrHeader);
    if (searchOption === 'first-letter' && inputValue.length > 1) {
      alertWindow('Sua busca deve conter somente 1 (um) caracter');
    }

    const apiResponse = await recipeAPI(searchOption, inputValue, mealOrDrink);
    // verifica se nao encontrou nenhum resultado para mandar alert na cara do usuário || o else if verifica se tem apenas 1 resultado para redirecionar
    if (apiResponse[typeOfRecipe] === null) {
      alertWindow('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    } else if (apiResponse[typeOfRecipe].length === 1) {
      if (mealOrDrink === 'drink') {
        history.push(`/bebidas/${apiResponse[typeOfRecipe][0].idDrink}`);
      } else {
        history.push(`/comidas/${apiResponse[typeOfRecipe][0].idMeal}`);
      }
      // abaixo se tem mais de 1 receita vai renderizar os cards
    } else if (apiResponse[typeOfRecipe].length > 1) {
      // utiliza função setRecipes para renderizar os cards
      setRecipes(apiResponse[typeOfRecipe]);
    }
  }

  return (
    <div className="search-container">
      <div className="search-container-searchbar">
        <input
          type="text"
          data-testid="search-input"
          value={ inputValue }
          onChange={ (e) => setInputValue(e.target.value) }
        />
      </div>
      <div className='search-container-labels'>
        <label htmlFor="ingredients-search">
          <input
            data-testid="ingredient-search-radio"
            name="option-radio"
            id="ingredients-search"
            type="radio"
            value="ingredients"
            onClick={ (e) => setOption(e.target.value) }
            // onChange={ checkIfFirstLetter }
          />
          Ingredientes
        </label>

        <label htmlFor="name-search">
          <input
            data-testid="name-search-radio"
            name="option-radio"
            id="name-search"
            type="radio"
            value="name"
            onClick={ (e) => setOption(e.target.value) }
            // onChange={ checkIfFirstLetter }
          />
          Nome
        </label>

        <label htmlFor="first-letter-search">
          <input
            data-testid="first-letter-search-radio"
            name="option-radio"
            id="first-letter-search"
            type="radio"
            value="first-letter"
            onClick={ (e) => setOption(e.target.value) }
            // onChange={ checkIfFirstLetter }
          />
          Primeira Letra
        </label>
      </div>
      <div className="search-container-button">
        <button
          type="button"
          data-testid="exec-search-btn"
          onClick={ onClickButton }
        >
          Buscar
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
