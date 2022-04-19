import mongoose from 'mongoose';

const orderSchma = new mongoose.Schema({
    orderItems: [{
        name: { type: String, required: true },
        category: { type: String, required: true },
        quantity: { type: Number, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
    }],
    shipingAddress: {
        fullName: { type: String, required: true },
        phone: { type: String, required: true },
        ship: { type: String, required: true },
        city: { type: String, required: true },
        district: { type: String, required: true },
        commune: { type: String, required: true },
        address: { type: String, required: true },
    },
    totalPrice: { type: Number, required: true },
    status: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, required: true },
    updatedAt: { type: Date, required: true },
}
);
const Order = mongoose.model('Order', orderSchma);
export default Order;