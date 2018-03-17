import React, { Component } from 'react';

import RecipeList from './RecipeList/RecipeList';
import SearchBar from '../../Navigation/SearchBar/SearchBar';
import Spinner from '../../UI/Spinner/Spinner';

class recipeBrowser extends Component {
    state = {
        searchTerm: '',
    }

    onSearchTermUpdated = (e) => {
        this.setState({searchTerm: e.target.value});
    }

    render () {   
        const filteredRecipes = this.props.recipes
            .filter(recipe => {
                return recipe.ingredients
                    .filter(ingredient => {
                        return ingredient.name.toLowerCase().indexOf(this.state.searchTerm.toLowerCase()) !== -1;
                    }).length > 0
                });

        let searchMessage = '';
        
        if (this.state.searchTerm && filteredRecipes.length > 0) {
            searchMessage = <p className="search-message">Recipes with ingredients containing <strong>'{this.state.searchTerm}'</strong></p>;
        } else if (filteredRecipes.length === 0) {
            searchMessage = <p className="search-message search-message--no-results">No recipes found</p>;            
        }
        
        let recipeBrowser = <Spinner />;

        if(!this.props.loading) {
            recipeBrowser = (
                <div>
                    <SearchBar changed={this.onSearchTermUpdated} searchTerm={this.state.searchTerm} />
                    <div className="main-container">
                        {searchMessage}
                        {filteredRecipes ? <RecipeList recipes={filteredRecipes} /> : ''}
                    </div>
                </div>
            );
        }

        return recipeBrowser;
    }
}
 
export default recipeBrowser;