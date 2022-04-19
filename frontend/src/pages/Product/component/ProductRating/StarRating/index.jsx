import { TOAST_OPTIONS } from 'constants/productConstants';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { addStarRating } from '../StarRatingSlice';

const StarRating = (props) => {
    const { userInfo, productId, starRating, setStarRating, dateTime } = props;
    const dispatch = useDispatch();
    const [rating, setRating] = useState(null);
    const [hover, setHover] = useState(null);
    const [isRating, setIsRating] = useState(false);
    const [cmtRating, setcmtRating] = useState('');

    const handleOnChange = (e) => {
        e.preventDefault();
        setcmtRating(e.target.value);
    }
    const handleAddStarRating = (rating, comment, userInfo) => {
        if (userInfo) {
            if (rating === null || comment === '') {
                toast.warn("Đánh giá còn thiếu 🛑");
            }
            else {
                setIsRating(true);
                return new Promise((resolve) => {
                    setTimeout(() => {
                        dispatch(addStarRating({ productId, rating, comment, userInfo }));
                        toast.success("Đã thêm đánh giá thành công");


                        const newRat = [...starRating];
                        const newStarRating = {
                            productId,
                            userName: userInfo.name,
                            image: userInfo.image,
                            rating,
                            note: comment,
                            datetime: dateTime
                        }
                        newRat.push(newStarRating);
                        setStarRating(newRat);
                        resolve(true);
                        setRating(null);
                        setcmtRating('');
                        setIsRating(false);
                        clearTimeout();
                    }, 2000);
                });
            }
        } else {
            toast.warn('Vui lòng đăng nhập để đánh giá!!', {
                ...TOAST_OPTIONS,
            })
        }
    }

    return (
        <div className="star-rating-box">
            <div className="star-rating">
                {[...Array(5)].map((star, index) => {
                    const ratingValue = index + 1;
                    const style = {
                        color: ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9",
                    }

                    return (
                        <label key={index}>
                            <input
                                type="radio"
                                name="rating"
                                id="rating"
                                value={ratingValue}
                            />
                            <i
                                className="fas fa-star"
                                style={style}
                                onClick={() => setRating(ratingValue)}
                                onMouseEnter={() => (setHover(ratingValue))}
                                onMouseLeave={() => setHover(null)}
                            ></i>
                        </label>
                    )
                })}
                <div className="level-rating">
                    {
                        (hover || rating) === 1 ? "Không thích"
                            : (hover || rating) === 2 ? "Tạm được"
                                : (hover || rating) === 3 ? "Bình thường"
                                    : (hover || rating) === 4 ? "Hài lòng"
                                        : (hover || rating) === 5 ? "Tuyệt vời"
                                            : ""
                    }
                </div>
            </div>
            <div className="comment-rating">
                <textarea
                    name="cmt-rating"
                    value={cmtRating}
                    cols="30"
                    rows="10"
                    id="cmt-rating"
                    placeholder="Viết đánh giá của bạn"
                    onChange={handleOnChange}
                ></textarea>
                <button onClick={() => handleAddStarRating(rating, cmtRating, userInfo)}>
                    {isRating && <i className="fas fa-spinner fa-spin"></i>} Gửi đánh giá
                </button>
            </div>
        </div>
    );
};

export default StarRating;