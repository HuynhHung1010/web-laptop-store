import React from 'react';
import { Link } from 'react-router-dom';
import numberWithCommas from 'utils/numberWithCommas';

const HCartItem = (props) => {
    const { product } = props;

    return (
        <Link to={`/product/${product._id}`}>
            <div className="header__cart-item">
                <div className="cart-item-img">
                    <img src={product.image} alt={product.name} />
                </div>
                <div className="cart-info">
                    <p>{product.name}</p>
                    <div className="cart-product-price">
                        <p>{numberWithCommas(product.price)} ₫ <span>x {product.quantity}</span></p>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default HCartItem;