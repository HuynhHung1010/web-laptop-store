import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Order from './../models/oderModel.js';

const dashboardRouter = express.Router();

dashboardRouter.get('/price',
    expressAsyncHandler(async (req, res) => {
        // const order = await Order.find({ status: 'receved' });
        const result = await Order.aggregate([
            {
                $group: {
                    _id: {
                        month: { $month: { "$toDate": "$createdAt" } },
                        year: { $year: { "$toDate": "$createdAt" } },
                        status: "$status",
                    },
                    total: { $sum: "$totalPrice" }
                }
            }])
        const sortResult = [].concat(result)
            .sort((a, b) => a._id.month > b._id.month ? 1 : -1)

        res.send(sortResult);
    })
)

dashboardRouter.get('/category',
    expressAsyncHandler(async (req, res) => {
        const order = await Order.find({ status: 'receved' });
        let categories = [];

        const totalOrders = order.length;

        order.forEach(or => {
            or.orderItems.map(orItem => {
                categories = [...categories, {
                    key: orItem.category, value: orItem.quantity
                }]
            })
        })
        let categoryUni = [];
        categories.forEach(cate => {
            if (!categoryUni.includes(cate.key))
                categoryUni = [...categoryUni, cate.key]
        })

        let result = [];
        result = categoryUni.map(cate => {
            let num = categories.filter(c => c.key === cate).reduce((a, b) => a + b.value, 0);
            return { title: [cate], value: num };
        })
        let total__category = categories.reduce((a, b) => a + b.value, 0);

        res.send({ result, total__category, totalOrders });
        // console.log("categories ", categories)
        // console.log("KQ ", total__category)
    })
)

export default dashboardRouter;
