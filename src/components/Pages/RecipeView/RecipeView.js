import React from 'react';
import { Redirect } from 'react-router-dom';

import NavigationBar from '../../Navigation/NavigationBar/NavigationBar';
import Spinner from '../../UI/Spinner/Spinner';

const formatIngredient = (ingredient) => {
    if (['g','kg'].indexOf(ingredient.unit) === -1){
        ingredient.amount += " ";
    }

    if (ingredient.unit) {
        ingredient.unit += " ";
    }

    return ingredient.amount + ingredient.unit + ingredient.name;
}

const recipeView = (props) => {
    let recipe = <Spinner />
    
    if (!props.loading) {
        if(props.recipe) {
            const recipeName = props.recipe.name ? <h2 className="recipe-detail__title">{props.recipe.name}</h2> : '';
            const recipeDescription = props.recipe.description ? <p className="recipe-detail__description">{props.recipe.description}</p> : '';
            const recipeImage = props.recipe.image ? <img className="recipe-detail__image" src={props.recipe.image} alt={props.recipe.name + ' photo'} /> : '';
            
            const recipeIngredients = props.recipe.ingredients ? (
                <div className="recipe-detail__ingredients">
                    <h4 className="recipe-detail__subtitle">Ingredients</h4>
                    <ul>{props.recipe.ingredients.map((ingredient, index) => <li key={index}>{formatIngredient(ingredient)}</li>)}</ul>
                </div>
            ) : '';

            const recipeSeasonings = props.recipe.seasonings ? (
                <div className="recipe-detail__seasonings">
                    <h4 className="recipe-detail__subtitle">Seasonings</h4>
                    <ul>{props.recipe.seasonings.map((seasoning, index) => <li key={index}>{seasoning}</li>)}</ul>
                </div>
            ) : '';

            const recipeSteps = props.recipe.steps ? (
                <div className="recipe-detail__steps">
                    <h4 className="recipe-detail__subtitle">Steps</h4>
                    <ol>
                        {props.recipe.steps.map((step, index) => <li key={index}>{step}</li>)}
                    </ol>
                </div>
            ) : '';

            recipe = (
                <div className="recipe-detail">
                    {recipeName}
                    <div className="recipe-detail__content">
                        {recipeDescription}
                        {recipeImage}
                        {recipeIngredients}
                        {recipeSeasonings}
                        {recipeSteps}
                    </div>
                </div>
            );
        } else {
            recipe = <Redirect to="/" />;
        }
    };
    return (
        <div>
            <NavigationBar toHome addRecipe />
            <div className="main-container">
                {recipe}
            </div>
        </div>
    );
}
 
export default recipeView;