import React from 'react';
import { Link } from 'react-router-dom';

import Button from '../../UI/Button/Button';

const navigationBar = (props) => (
    <div className='page-nav-bar__wrapper'>
        <div className='page-nav-bar'>
            <Link to="/" className="button">❮ Back to recipe browser</Link>
            <Link to="/recipes/add" className="button alert">Add recipe</Link>
        </div>
    </div>
);
 
export default navigationBar;