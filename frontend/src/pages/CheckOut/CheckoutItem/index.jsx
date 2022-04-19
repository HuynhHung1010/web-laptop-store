import { TOAST_OPTIONS } from 'constants/productConstants';
import React from 'react';
import { toast } from 'react-toastify';

CheckoutItem.propTypes = {};

function CheckoutItem(props) {
    const {
        product,
        onQuantityChange,
        onProductRemove,
    } = props;

    const handleQuantityChange = (id, quantity) => {
        if (quantity === 0) return;
        if (!onQuantityChange) return;
        onQuantityChange(id, quantity);
    }

    const handleRemoveProduct = (id) => {
        if (!onProductRemove) return;
        onProductRemove(id);
        toast.warn('Remove product from cart', {
            ...TOAST_OPTIONS,
        })
    }
    const numberFormat = (number) => {
        const numberFormat = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format(number);
        return numberFormat;
    }

    return (
        <div className="product-card">
            <div className="product-card-info">
                <div className="product-img">
                    <img src={product.image} alt="" />
                </div>
                <div className="product-card-info-title">
                    <p>{product.name}</p>
                </div>
                <div className="product-card-listuudai">
                    <ul>
                        <li>- Giảm đến 300.000đ khi mua bảo hành (rơi vỡ + vào nước) kèm máy</li>
                        <li>- Tặng PMH 200.000đ mua máy in Brother</li>
                        <li>- Tặng PMH 100.000đ mua Microsoft 365 Personal/Family/Home &amp; Student khi mua Online đến 31/10</li>
                        <li>- Tặng thêm 1 năm bảo hành chính hãng Acer</li>
                    </ul>
                </div>
            </div>
            <div className="product-card-quality">
                <div className="product-card-quality-wrap">
                    <i
                        className={product.quantity === 1 ? "btn-minus-active" : "btn btn-minus"}
                        onClick={() =>
                            handleQuantityChange(product._id, product.quantity - 1)
                        }>

                        -
                    </i>

                    <div className="cs-input-cart" >{product.quantity}</div>
                    <i
                        className="btn btn-plus"
                        onClick={() =>
                            handleQuantityChange(product._id, product.quantity + 1)
                        }>
                        +
                    </i>
                </div>
                <div className="btn btn-remove" onClick={() => handleRemoveProduct(product._id)}>xóa</div>
            </div>
            <div className="product-card-price">{`${(
                numberFormat(product.quantity * product.price)
            )}`}</div>
        </div>
    );
}

export default CheckoutItem;