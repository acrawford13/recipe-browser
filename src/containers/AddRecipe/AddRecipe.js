import React from 'react';
import RecipeForm from '../RecipeForm/RecipeForm';
import NavigationBar from '../../components/Navigation/NavigationBar/NavigationBar';

const addRecipe = (props) => {
    return (
        <div>
        <NavigationBar toHome />
        <div className="main-container">
            <RecipeForm />
        </div>
        </div>
    )
}
 
export default addRecipe;