import React from 'react';
import { Link } from 'react-router-dom';

import RecipeList from './RecipeList/RecipeList';
import SearchBar from '../../Navigation/SearchBar/SearchBar';
import Spinner from '../../UI/Spinner/Spinner';

const recipeBrowser = (props) => {
    const filteredRecipes = props.recipes
        .filter(recipe => {
            return recipe.ingredients
                .filter(ingredient => {
                    return ingredient.name.toLowerCase().indexOf(props.searchTerm.toLowerCase()) !== -1;
                }).length > 0
            });

    let searchMessage = '';

    if (props.searchTerm) {
        if (filteredRecipes.length > 0) {
            searchMessage = <p className="search-message">Recipes with ingredients containing <strong>'{props.searchTerm}'</strong></p>;
        } else {
            searchMessage = <p className="search-message search-message--no-results">No results found</p>;            
        }
    }

    let recipeBrowser = <Spinner />;

    if(!props.loading) {
        recipeBrowser = (
            <div>
                <SearchBar changed={props.onSearchTermUpdated} searchTerm={props.searchTerm} />
                <div className="main-container">
                    {searchMessage}
                    <RecipeList recipes={filteredRecipes} />
                </div>
            </div>);
    }

    return recipeBrowser;
}
 
export default recipeBrowser;