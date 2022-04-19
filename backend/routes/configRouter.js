import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Configs from '../models/configModels.js';

const configRouter = express.Router();

configRouter.get('/:id',
    expressAsyncHandler(async (req, res) => {
        const configs = await Configs.find({ "productId": req.params.id });
        if (configs) {
            res.send(configs);
        } else {
            res.send({ message: "Not Found Config" });
        }
    })
);

configRouter.post('/update',
    expressAsyncHandler(async (req, res) => {
        const config = await Configs.find({ "productId": req.body.productId });

        if (config.length === 0) {
            // console.log('add new');
            const configs = new Configs({
                productId: req.body.productId,
                CPU: req.body.CPU,
                RAM: req.body.RAM,
                Screen: req.body.Screen
            });
            configs.save();
        }
        if (config.length > 0) {
            // console.log('update');
            await Configs.updateOne({ productId: req.body.productId },
                {
                    $set: {
                        productId: req.body.productId,
                        CPU: req.body.CPU,
                        RAM: req.body.RAM,
                        Screen: req.body.Screen
                    }
                });
        }
    })
);


export default configRouter;