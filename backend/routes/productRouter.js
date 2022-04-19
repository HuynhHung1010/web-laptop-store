import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';
import data from '../data.js';
import Configs from '../models/configModels.js';

/// lay image
import multer from 'multer';
// vào images
// const upload = multer({ dest: 'backend/images/products/' });


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './backend/images/products/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    //reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}


const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter,
});

const productRouter = express.Router();

productRouter.get('/',
    expressAsyncHandler(async (req, res) => {
        const products = await Product.find({});    //get all products
        res.send(products);
    })
);


productRouter.get('/seed',
    expressAsyncHandler(async (req, res) => {
        //fix E11000 duplicate key error collection
        await Product.remove({});
        const createdProducts = await Product.insertMany(data.product);
        res.send({ createdProducts });
    })
);

productRouter.get('/:id',
    expressAsyncHandler(async (req, res) => {
        const product = await Product.findById(req.params.id);
        if (product) {
            res.send(product);
        }
        else {
            res.status(404).send({ message: 'Product Not Found' });
        }
    })
);


productRouter.put('/updateProduct', expressAsyncHandler(async (req, res) => {
    // console.log(req.body.id);
    const product = await Product.findById(req.body.id);


    product.name = req.body.name || product.name;
    product.category = req.body.category || product.category;
    product.price = req.body.price || product.price;
    product.old_price = req.body.oldPrice || product.old_price;
    product.note = req.body.note || product.note;
    product.countInStock = req.body.countInStock || product.countInStock;


    const updatedProduct = await product.save();

    res.send({
        _id: updatedProduct._id,
        name: updatedProduct.name,
        category: updatedProduct.category,
        price: updatedProduct.price,
        old_price: updatedProduct.old_price,
        note: updatedProduct.note,
        countInStock: updatedProduct.countInStock,
        token: generateToken(updatedProduct),
    })
}));


productRouter.put('/updateProductImage', upload.single('image'), expressAsyncHandler(async (req, res) => {
    // console.log(req.body.id);
    const product = await Product.findById(req.body.id);


    product.name = req.body.name !== 'undefined' ? req.body.name : product.name;
    product.category = req.body.category !== 'undefined' ? req.body.category : product.category;
    product.price = req.body.price !== 'undefined' ? req.body.price : product.price;
    product.old_price = req.body.oldPrice !== 'undefined' ? req.body.oldPrice : product.old_price;
    product.note = req.body.note !== 'undefined' ? req.body.note : product.note;
    product.countInStock = req.body.countInStock !== 'undefined' ? req.body.countInStock : product.countInStock;
    product.image = req.file.path.slice(7);

    const updatedProduct = await product.save();
    res.send({
        _id: updatedProduct._id,
        image: updatedProduct.image,
        name: updatedProduct.name,
        category: updatedProduct.category,
        price: updatedProduct.price,
        old_price: updatedProduct.old_price,
        note: updatedProduct.note,
        countInStock: updatedProduct.countInStock,
        token: generateToken(updatedProduct),
    })

}));


productRouter.delete('/deleteProduct/:id',
    expressAsyncHandler(async (req, res) => {

        const id = req.params.id;
        await Product.deleteOne({ _id: id }
            // ,
            // (err, result) => {
            //     if (err) return res.send(500, err)
            //     console.log('got deleted');
            //     res.redirect('/');
            // }
        );
    })
);


productRouter.post('/create', upload.single('image'), expressAsyncHandler(async (req, res) => {

    const product = new Product({
        name: req.body.name,
        price: req.body.price,
        old_price: null,
        category: req.body.category,
        note: req.body.note === 'undefined' ? '' : req.body.note,
        countInStock: req.body.countInStock,
        image: req.file.path.slice(7),
    });

    const createProduct = await product.save();

    res.send({
        _id: createProduct._id,
        name: createProduct.name,
        category: createProduct.category,
        price: createProduct.price,
        old_price: createProduct.old_price,
        note: createProduct.note,
        countInStock: createProduct.countInStock,
        token: generateToken(createProduct),
    })

}));

export default productRouter;