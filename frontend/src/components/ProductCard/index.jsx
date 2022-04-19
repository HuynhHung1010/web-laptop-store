import 'boxicons'
import Grid from 'components/Grid'
import PropTypes from 'prop-types'
import React from 'react'
import { Link } from 'react-router-dom'
import numberWithCommas from 'utils/numberWithCommas'


const ProductCard = props => {
    const products = props.products;
    const col = props.col;
    const currentPage = props.currentPage;
    const postsPerPage = props.postsPerPage;

    // get current post
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = products.slice(indexOfFirstPost, indexOfLastPost);


    return (

        <Grid col={col} mdCol={2} smCol={1} gap={20}>

            {
                currentPage > 0 ? (
                    currentPosts.map((product, index) => (
                        <div key={index} className="product-card">
                            <Link to={`/product/${product._id}`}>

                                <div className="product-card__image">
                                    <img src={product.image} alt="" />
                                </div>
                                <div className="product-card__info">
                                    <div className="product-card__info__name">
                                        {product.name}
                                    </div>
                                    <div className="product-card__info__price">
                                        <span className="product-card__info__price__text">
                                            Giá từ: </span> {numberWithCommas(product.price)} <span className="product-card__info__price__currency">₫</span>
                                    </div>
                                    {
                                        product.old_price ? (
                                            <div className="product-card__info__old-price">
                                                {numberWithCommas(product.old_price)} ₫
                                            </div>
                                        ) : null
                                    }
                                    <div className="product-card__info__note">
                                        <box-icon name='gift' color="#d53b2a"></box-icon> <span className="product-card__info__note__text">{product.note}</span>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))

                ) :
                    (
                        products.map((product, index) => (
                            <div key={index} className="product-card">
                                <Link to={`/product/${product._id}`}>

                                    <div className="product-card__image">
                                        <img src={product.image} alt="" />
                                    </div>
                                    <div className="product-card__info">
                                        <div className="product-card__info__name">
                                            {product.name}
                                        </div>
                                        <div className="product-card__info__price">
                                            <span className="product-card__info__price__text">
                                                Giá từ: </span> {numberWithCommas(product.price)} <span className="product-card__info__price__currency">₫</span>
                                        </div>
                                        {
                                            product.old_price ? (
                                                <div className="product-card__info__old-price">
                                                    {numberWithCommas(product.old_price)} ₫
                                                </div>
                                            ) : null
                                        }
                                        <div className="product-card__info__note">
                                            <box-icon name='gift' color="#d53b2a"></box-icon> <span className="product-card__info__note__text">{product.note}</span>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        )

                        )
                    )



            }

        </Grid >


    )
}

ProductCard.propTypes = {
    products: PropTypes.array.isRequired,
    col: PropTypes.number.isRequired,

}

export default ProductCard
