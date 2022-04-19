import React from 'react';

import HCartItem from './HCartItem';


const HCartList = (props) => {
    const { checkList } = props;
    return (
        <div className="Header__cart-list">
            {
                checkList.map((product) => (
                    <HCartItem
                        key={product._id}
                        product={product}
                    />
                ))
            }
        </div>
    );
};

export default HCartList;