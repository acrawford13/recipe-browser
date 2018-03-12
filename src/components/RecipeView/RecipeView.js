import React from 'react';

import NavigationBar from '../Navigation/NavigationBar/NavigationBar';

const formatIngredient = (ingredient) => {
    if (['g','kg'].indexOf(ingredient.unit) === -1){
        ingredient.amount += " ";
    }
    return ingredient.amount + ingredient.unit + " " + ingredient.name;
}

const recipeView = (props) => {
    return (
        <div>
            <NavigationBar />
            <div className="main-container">
                <div className="recipe-detail">
                    <h2 className="recipe-detail__title">{props.recipe.name}</h2>
                    <div className="recipe-detail__content">
                        <p className="recipe-detail__description">{props.recipe.description}</p>
                        <img className="recipe-detail__image" src={props.recipe.image} alt={props.recipe.name + ' photo'} />
                        <div className="recipe-detail__ingredients">
                            <h4 className="recipe-detail__subtitle">Ingredients</h4>
                            <ul>
                                {props.recipe.ingredients.map((ingredient, index) => <li key={index}>{formatIngredient(ingredient)}</li>)}
                            </ul>
                            <h4 className="recipe-detail__subtitle">Seasonings</h4>
                            <ul>
                                {props.recipe.seasonings.map((seasoning, index) => <li key={index}>{seasoning}</li>)}
                            </ul>
                        </div>
                        <div className="recipe-detail__method">
                            <h4 className="recipe-detail__subtitle">Steps</h4>
                            <ol>
                                {props.recipe.steps.map((step, index) => <li key={index}>{step}</li>)}
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default recipeView;