import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import UserComments from '../models/userCommentsModel.js';

const userCommentsRouter = express.Router();

userCommentsRouter.get('/:id',
    expressAsyncHandler(async (req, res) => {
        const userComments = await UserComments.find({ "productId": req.params.id })
        if (userComments) {
            res.send(userComments);
        }
        else {
            res.status.apply(404).send({ message: 'No comments found' });
        }
    })
)

userCommentsRouter.post('/',
    expressAsyncHandler(async (req, res) => {
        const dataForm = req.body;
        const newComment = new UserComments(dataForm);
        newComment.save();
    })
);

export default userCommentsRouter;
