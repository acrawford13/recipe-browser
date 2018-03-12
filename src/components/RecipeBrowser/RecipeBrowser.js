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

    return (
        <div>
            <SearchBar changed={props.onSearchTermUpdated} searchTerm={props.searchTerm} />
            <div className="main-container">
                <RecipeList recipes={filteredRecipes} />
            </div>
        </div>
    )
}
 
export default recipeBrowser;