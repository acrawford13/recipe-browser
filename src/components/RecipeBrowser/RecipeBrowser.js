import React from 'react';

import RecipeList from './RecipeList/RecipeList';
import SearchBar from '../Navigation/SearchBar/SearchBar';

const recipeBrowser = (props) => {
    const filteredRecipes = props.recipes
        .filter(recipe => {
            return recipe.ingredients
                .filter(ingredient => {
                    return ingredient.name.match(new RegExp(props.searchTerm, 'i'))
                }).length > 0
            });

    let searchMessage = '';

    if (props.searchTerm) {
        if (filteredRecipes.length > 0) {
            searchMessage = <p>Recipes with ingredients containing <strong>'{props.searchTerm}'</strong></p>;
        } else {
            searchMessage = <p>No results found</p>;            
        }
    }

    return (
        <div>
            <SearchBar changed={props.onSearchTermUpdated} searchTerm={props.searchTerm} />
            <div className="main-container">
                {searchMessage}
                <RecipeList recipes={filteredRecipes} />
            </div>
        </div>
    )
}
 
export default recipeBrowser;