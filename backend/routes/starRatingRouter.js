import express from "express";
import expressAsyncHandler from "express-async-handler";
import StarRating from "../models/starRatingModel.js";

const starRatingRouter = express.Router();

starRatingRouter.get('/:id',
    expressAsyncHandler(async (req, res) => {

        const rating = await StarRating.find({ "productId": req.params.id });

        if (rating) {
            res.send(rating);
        }
        else {
            res.status(404).send({ message: 'Rating Not Found' });
        }
    })
);

starRatingRouter.post('/',
    expressAsyncHandler(async (req, res) => {
        const dataForm = req.body;
        const newrating = new StarRating(dataForm);
        newrating.save();
    })
);

export default starRatingRouter;
