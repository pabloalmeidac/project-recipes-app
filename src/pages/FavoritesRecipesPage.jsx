import React, { useContext, useState } from 'react';
import Header from '../components/Header';
import FavoriteCard from '../components/FavoriteCard';
import SearchBar from '../components/Searchbar';
import RecipesContext from '../context/RecipesContext';

const START_FAVORITES = JSON.parse(localStorage.getItem('favoriteRecipes'));
const styles = { 
  padding: '10px', 
  borderRadius: '10px', 
  background: '#f0371d', 
  border: '#f0371d', 
  margin: '10px',
  color: 'white' 
};
const FavoriteRecipesPage = () => {
  const { searchOrHeader } = useContext(RecipesContext);
  const [favoriteRecipes, setFavoriteRecipes] = useState(START_FAVORITES);
  const [filter, setFilter] = useState('');
  const handleClickFilter = (filterValue) => {
    setFilter(filterValue);
  };

  return (
    <div>
      <Header pageTitle="Receitas Favoritas" showSearch={ false } />
      {searchOrHeader ? <SearchBar /> : '' }
      <hr />
      <div style={ { textAlign: 'center' } }>
        <button
          data-testid="filter-by-all-btn"
          type="button"
          onClick={ () => handleClickFilter('') }
          style={ styles }
        >
          All
        </button>
        <button
          data-testid="filter-by-food-btn"
          type="button"
          onClick={ () => handleClickFilter('comida') }
          style={ styles }
        >
          Food
        </button>
        <button
          data-testid="filter-by-drink-btn"
          type="button"
          onClick={ () => handleClickFilter('bebida') }
          style={ styles }
        >
          Drinks
        </button>
      </div>
      {favoriteRecipes !== null ? favoriteRecipes
        .filter((favoriteRecipe) => favoriteRecipe.type.includes(filter))
        .map((favoriteRecipe, index) => (
          <FavoriteCard
            key={ index }
            idValue={ favoriteRecipe.id }
            typeValue={ favoriteRecipe.type }
            areaValue={ favoriteRecipe.area }
            categoryValue={ favoriteRecipe.category }
            alcoholicOrNotValue={ favoriteRecipe.alcoholicOrNot }
            nameValue={ favoriteRecipe.name }
            imgValue={ favoriteRecipe.image }
            indexValue={ index }
            setFavoriteRecipes={ setFavoriteRecipes }
          />
        )) : <h1>Nenhum receita favorita encontrada</h1>}
    </div>
  );
};
export default FavoriteRecipesPage;
