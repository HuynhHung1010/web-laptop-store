import React from 'react';

function ProductRating(props) {
    const { rating } = props;

    return (
        <div className="star">
            <box-icon
                type='solid'
                color={
                    rating >= 1
                        ? '#ECCF0E'
                        : rating >= 0.5
                            ? '#ECCF0E'
                            : '#CCCCCC'
                }
                name={
                    rating >= 1
                        ? 'star'
                        : rating >= 0.5
                            ? 'star-half'
                            : 'star'
                }>
            </box-icon>
            <box-icon
                type='solid'
                color={
                    rating >= 2
                        ? '#ECCF0E'
                        : rating >= 1.5
                            ? '#ECCF0E'
                            : '#CCCCCC'
                }
                name={
                    rating >= 2
                        ? 'star'
                        : rating >= 1.5
                            ? 'star-half'
                            : 'star'
                }>
            </box-icon>
            <box-icon
                type='solid'
                color={
                    rating >= 3
                        ? '#ECCF0E'
                        : rating >= 2.5
                            ? '#ECCF0E'
                            : '#CCCCCC'
                }
                name={
                    rating >= 3
                        ? 'star'
                        : rating >= 2.5
                            ? 'star-half'
                            : 'star'
                }>
            </box-icon>
            <box-icon
                type='solid'
                color={
                    rating >= 4
                        ? '#ECCF0E'
                        : rating >= 3.5
                            ? '#ECCF0E'
                            : '#CCCCCC'
                }
                name={
                    rating >= 4
                        ? 'star'
                        : rating >= 3.5
                            ? 'star-half'
                            : 'star'
                }>
            </box-icon>
            <box-icon
                type='solid'
                color={
                    rating >= 5
                        ? '#ECCF0E'
                        : rating >= 4.5
                            ? '#ECCF0E'
                            : '#CCCCCC'
                }
                name={
                    rating >= 5
                        ? 'star'
                        : rating >= 4.5
                            ? 'star-half'
                            : 'star'
                }>
            </box-icon>

        </div>
    );
}

export default ProductRating;