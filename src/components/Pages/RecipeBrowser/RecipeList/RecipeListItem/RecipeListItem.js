import React from 'react';
import { Link } from 'react-router-dom';

const recipeListItem = (props) => {
    return (
        <Link className="recipe-list-item" to={'/recipes/' + props.id}>
            <div className="recipe-list-item__text">
                <h2 className="recipe-list-item__title">{props.name}</h2>
            </div>
            <div className="recipe-list-item__image" style={{backgroundImage: "url('" + props.image + "')"}}></div>
        </Link>
    );
}
 
export default recipeListItem;