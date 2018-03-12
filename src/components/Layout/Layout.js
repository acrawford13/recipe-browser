import React from 'react';

const layout = (props) => (
    <div>
        <header className='top-bar'>
            <span className='top-bar__title'>Recipe Browser</span>
        </header>
        <main>
            {props.children}
        </main>
    </div>
);
 
export default layout;