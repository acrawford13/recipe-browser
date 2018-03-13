import React from 'react';

import Input from '../Input';

const ingredientInput = (props) => {
    return (
        <div>
            <Input type="text" placeholder="Ingredient name" />
            <Input type="text" placeholder="Amount" />
            <Input type="text" placeholder="Measurement" />
        </div>
    );
}
 
export default ingredientInput;