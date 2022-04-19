import mongoose from 'mongoose';

const starRatingSchema = new mongoose.Schema({
    productId: { type: String, required: true },
    userName: { type: String, required: true },
    image: { type: String, required: true },
    rating: { type: Number, required: true },
    note: { type: String, required: true },
},
    {
        timestamps: true,
    }
);

const StarRating = mongoose.model('StarRating', starRatingSchema);

export default StarRating;