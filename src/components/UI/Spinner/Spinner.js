import React from 'react';

import spinnerImg from '../../../assets/spinner.gif';

const spinner = () => {
    return <div className="spinner"><img height="100" src={spinnerImg} alt="Loading..." /></div>
}
 
export default spinner;