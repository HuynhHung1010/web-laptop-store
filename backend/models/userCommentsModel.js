import mongoose from 'mongoose';

const userCommentsSchema = new mongoose.Schema({
    productId: { type: String, required: true },
    userName: { type: String, required: true },
    image: { type: String, required: true },
    comment: { type: String, required: true },
},
    {
        timestamps: true,
    }
);

const UserComments = mongoose.model('UserComments', userCommentsSchema);

export default UserComments;
