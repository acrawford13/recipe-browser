import React from 'react';

import RecipeList from './RecipeList/RecipeList';
import SearchBar from '../Navigation/SearchBar/SearchBar';

const recipeBrowser = (props) => {
    return (
        <div>
            <SearchBar changed={props.onSearchTermUpdated} searchTerm={props.searchTerm} />
            <div className="main-container">
                <RecipeList recipes={props.recipes} />
            </div>
        </div>
    )
}
 
export default recipeBrowser;