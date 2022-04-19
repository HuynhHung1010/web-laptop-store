import React from 'react';
import CheckoutItem from '../CheckoutItem';

CheckoutList.propTypes = {};

function CheckoutList(props) {
    const {
        checkList,
        onQuantityChange,
        onProductRemove,
    } = props;

    return (
        <div>
            {
                checkList.map((product) => (
                    <CheckoutItem
                        key={product._id}
                        product={product}
                        onQuantityChange={onQuantityChange}
                        onProductRemove={onProductRemove}
                    />
                ))
            }
        </div>
    );
}

export default CheckoutList;