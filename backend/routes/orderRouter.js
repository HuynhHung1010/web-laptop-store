import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Order from './../models/oderModel.js';

const orderRouter = express.Router();

orderRouter.get('/:id',
    expressAsyncHandler(async (req, res) => {
        const order = await Order.find({ "_id": req.params.id });
        res.send(order);
    })
);

orderRouter.get('/',
    expressAsyncHandler(async (req, res) => {
        const orders = await Order.find({});
        res.send(orders);
    })
);

orderRouter.get('/user/:id',
    expressAsyncHandler(async (req, res) => {
        const order = await Order.find({ "userId": req.params.id });

        if (order) {
            res.send(order);
        }
        else {
            res.status(404).send({ message: 'order Not Found' });
        }
    })
);

orderRouter.post(
    '/add',
    expressAsyncHandler(async (req, res) => {
        // console.log(req.body);
        if (!req.body.orderItems) {
            res.status(404).send({ message: "Cart is empty!" });
        }
        else {
            const order = new Order({
                orderItems: req.body.orderItems,
                shipingAddress: req.body.shipingAddress,
                totalPrice: req.body.totalPrice,
                status: req.body.status,
                createdAt: req.body.createdAt,
                updatedAt: req.body.updatedAt,
                userId: req.body.userId,
            });
            order.save();
        }
    }));

orderRouter.post(
    '/status',
    expressAsyncHandler(async (req, res) => {
        await Order.updateOne({ _id: req.body.id },
            {
                $set: {
                    status: req.body.status,
                    updatedAt: req.body.date,
                }
            });

    })
);

orderRouter.post(
    '/update',
    expressAsyncHandler(async (req, res) => {
        // console.log(req.body);
        const newCreatedAt = new Date(req.body.createdAt)
        const newUpdatedAt = new Date(req.body.updatedAt)
        await Order.updateOne({ _id: req.body.id },
            {
                $set: {
                    shipingAddress: {
                        fullName: req.body.fullName,
                        phone: req.body.phone,
                        address: req.body.address,
                        city: req.body.city,
                        district: req.body.district,
                        commune: req.body.commune,
                    },
                    createdAt: req.body.createdAt,
                    updatedAt: req.body.updatedAt,
                }
            });

        res.send({ message: 'success' });
    })
);

orderRouter.post(
    '/remove',
    expressAsyncHandler(async (req, res) => {
        await Order.deleteOne({ _id: req.body.id });
        // console.log(req.body);
    })
);

export default orderRouter;