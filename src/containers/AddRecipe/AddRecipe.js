import React from 'react';
import RecipeForm from '../RecipeForm/RecipeForm';
import NavigationBar from '../../components/Navigation/NavigationBar/NavigationBar';

const addRecipe = (props) => {
    return (
        <div>
        <NavigationBar toHome />
        <div className="main-container">
            <h3>Add a new recipe</h3>
            <RecipeForm />
        </div>
        </div>
    )
}
 
export default addRecipe;