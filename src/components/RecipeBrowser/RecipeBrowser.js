import React from 'react';

import RecipeList from './RecipeList/RecipeList';

const recipeBrowser = (props) => {
    return (
        <div className="main-container">
            <RecipeList recipes={props.recipes} />
        </div>
    )
}
 
export default recipeBrowser;