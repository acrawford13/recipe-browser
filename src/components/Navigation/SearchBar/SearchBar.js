import React from 'react';

const searchBar = (props) => (
    <div className="search-container">
        <input
            onChange={props.changed} 
            value={props.searchTerm}
            className="search-container__input"
            type="text"
            placeholder="Search for an ingredient" />
    </div>
);
 
export default searchBar;