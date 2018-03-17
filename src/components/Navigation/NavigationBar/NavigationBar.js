import React from 'react';
import { Link } from 'react-router-dom';

const addRecipe = <Link to="/recipes/add" className="button button--addRecipe">Add recipe</Link>;
const toHome = <Link to="/" className="button button--toHome">❮ Back to recipe browser</Link>;

const navigationBar = (props) => (
    <div className='page-nav-bar__wrapper'>
        <div className='page-nav-bar'>
            {props.toHome ? toHome : ''}
            {props.addRecipe ? addRecipe : ''}
        </div>
    </div>
);
 
export default navigationBar;