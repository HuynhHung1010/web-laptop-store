import React from 'react';
import CartItem from './CartItem';

const CartList = (props) => {
    const {
        checkList,
        onChangeQuantity,
        onRemoveProduct
    } = props;

    return (
        <div className="cart-items">
            {
                checkList.map((product) => (
                    <CartItem
                        key={product._id}
                        product={product}
                        onQuantityChange={onChangeQuantity}
                        onRemove={onRemoveProduct}
                    />
                ))}
        </div>
    );
};

export default CartList;