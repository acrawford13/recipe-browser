import React from 'react';
import { Link } from 'react-router-dom';

const searchBar = (props) => (
    <div className="search-container__wrapper">
        <div className="search-container">
            <input
                onChange={props.changed} 
                value={props.searchTerm}
                className="search-container__input"
                type="text"
                placeholder="Search for an ingredient" />
            <Link to="/recipes/add" className="button button--addRecipe">Add recipe</Link>
        </div>
    </div>
);
 
export default searchBar;