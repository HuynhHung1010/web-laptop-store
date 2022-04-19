import React from 'react';
import ProductRating from './index';
import moment from 'moment';

const StarRatingList = (props) => {
    const { starRating } = props;

    return (
        <div>
            {
                [].concat(starRating)
                    .sort((a, b) => a.itemM > b.itemM ? 1 : -1)
                    .map((item, index) => (
                        <div key={index} className="item">
                            <div className="item-logo">
                                <img src={item.image} alt="" />
                            </div>
                            <div className="item-detail">
                                <p className="item-name">
                                    <b >{item.userName}</b>
                                    <i>{moment(item.createdAt).fromNow()}</i>
                                </p>
                                <div className="item-star-rate">
                                    <ProductRating rating={item.rating} />
                                </div>
                                <p>{item.note}</p>
                            </div>
                        </div>
                    ))
            }
        </div>
    );
};

export default StarRatingList;