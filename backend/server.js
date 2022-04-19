import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/userRouter.js';
import productRouter from './routes/productRouter.js';
// import categoryRouter from './routes/categoryRouter.js';
// import priceRouter from './routes/priceRouter.js';
// import { dirname } from 'path';

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// connect mongodb database
mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost/laptopStore', {
    // từ bản mongoose 6. thì k cần nữa
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
    // useCreateIndex: true,
});


import path from 'path';
import orderRouter from './routes/orderRouter.js';
import starRatingRouter from './routes/starRatingRouter.js';
const __dirname = path.resolve();

import cors from 'cors';
import userCommentsRouter from './routes/userCommentsRouter.js';
import configRouter from './routes/configRouter.js';
import dashboardRouter from './routes/dashboardRouter.js';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('backend'));
app.use('/images', express.static('images'));

// image user
app.use('/users', express.static('users'));
//

app.use(cors())

app.use('/api/users', userRouter);
app.use('/api/products', productRouter);
// app.use('/api/category', categoryRouter);
// app.use('/api/price', priceRouter);
app.use('/api/orders', orderRouter);
app.use('/api/rating', starRatingRouter);
app.use('/api/usercmts', userCommentsRouter);
app.use('/api/config', configRouter);
app.use('/api/dashboard', dashboardRouter);



app.get('/', (req, res) => {
    res.send('Server is ready');
});

app.use((err, req, res, next) => {
    res.status(500).send({ message: err.message });
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server at http://localhost:${port}`);
})