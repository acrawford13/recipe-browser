import React from 'react';
import { Redirect } from 'react-router-dom';

import NavigationBar from '../../Navigation/NavigationBar/NavigationBar';
import Spinner from '../../UI/Spinner/Spinner';

const formatIngredient = (ingredient) => {
    if (['g','kg'].indexOf(ingredient.unit) === -1){
        ingredient.amount += " ";
    }
    return ingredient.amount + ingredient.unit + " " + ingredient.name;
}



const recipeView = (props) => {
    let recipe = <Spinner />
    if (!props.loading) {
        if(props.recipe) {
            const recipeIngredients = (
                <div>
                    <h4 className="recipe-detail__subtitle">Ingredients</h4>
                    <ul>{props.recipe.ingredients.map((ingredient, index) => <li key={index}>{formatIngredient(ingredient)}</li>)}</ul>
                </div>
            )

            const recipeSeasonings = (
                <div>
                    <h4 className="recipe-detail__subtitle">Seasonings</h4>
                    <ul>{props.recipe.seasonings.map((seasoning, index) => <li key={index}>{seasoning}</li>)}</ul>
                </div>
            )

            const recipeSteps = (
                <div>
                        <h4 className="recipe-detail__subtitle">Steps</h4>
                        <ol>
                            {props.recipe.steps.map((step, index) => <li key={index}>{step}</li>)}
                        </ol>
                </div>
            )

            recipe = (
                <div className="recipe-detail">
                    <h2 className="recipe-detail__title">{props.recipe.name}</h2>
                    <div className="recipe-detail__content">
                        <p className="recipe-detail__description">{props.recipe.description}</p>
                        <img className="recipe-detail__image" src={props.recipe.image} alt={props.recipe.name + ' photo'} />
                        {props.recipe.ingredients ? recipeIngredients : ''}
                        {props.recipe.seasonings ? recipeSeasonings : ''}
                        {props.recipe.steps ? recipeSteps : ''}                
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