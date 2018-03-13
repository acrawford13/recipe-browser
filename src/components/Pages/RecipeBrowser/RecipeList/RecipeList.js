import React from 'react';
import RecipeListItem from './RecipeListItem/RecipeListItem';

const recipeList = (props) => {
    return (
        <div>
            <div className="recipe-list">
                {props.recipes.map(item => <RecipeListItem ingredients={item.ingredients} key={item.id} id={item.id} name={item.name} image={item.image}/>)}
            </div>
        </div>
    );
}
 
export default recipeList;