import React from 'react';
import RecipeForm from '../RecipeForm/RecipeForm';

const addRecipe = (props) => {
    return (
        <div className="main-container">
            <h3>Add a new recipe</h3>
            <RecipeForm />
        </div>
    )
}
 
export default addRecipe;