import express from 'express';
import data from '../data.js';
import User from '../models/userModel.js';
import expressAsyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import { generateToken } from '../utils.js';

/// lay image
import multer from 'multer';
// vào images
// const upload = multer({ dest: 'backend/images/users/' });


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './backend/images/users/');
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

///
const userRouter = express.Router();

userRouter.get('/seed', expressAsyncHandler(async (req, res) => {
    await User.remove({});  //fix loi 
    const createdUsers = await User.insertMany(data.users);
    res.send({ createdUsers });
})
);

userRouter.get('/',
    expressAsyncHandler(async (req, res) => {
        const users = await User.find({});    //get all products
        res.send(users);
    })
);



userRouter.post('/signin', expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
            res.send({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                image: user.image,
                token: generateToken(user),
                phone: user.phone
            });
            return;
        }
    }
    res.status(401).send({ message: 'Email hoặc Mật khẩu không đúng !' });
})
);


userRouter.post('/register', upload.single('image'), expressAsyncHandler(async (req, res) => {

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        image: req.file.path.slice(7),
        password: bcrypt.hashSync(req.body.password, 8),
    });
    const createdUser = await user.save();

    res.send({
        _id: createdUser._id,
        name: createdUser.name,
        email: createdUser.email,
        isAdmin: createdUser.isAdmin,
        image: createdUser.image,
        token: generateToken(createdUser),
    });
})
);


userRouter.get('/:id',
    expressAsyncHandler(async (req, res) => {
        const user = await User.findById(req.params.id);
        if (user) {
            res.send(user);
        }
        else {
            res.status(404).send({ message: 'User Not Found' });
        }
    })
);

userRouter.put('/profile', expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.body.userId);

    // console.log('Ley tu user action: ', req.body.currentPassword);
    // console.log('Mat khau moi: ', req.body.newPassword);
    // console.log('Hien tai trong user: ', user.password);

    if (user && bcrypt.compareSync(req.body.currentPassword, user.password)) {

        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.phone = req.body.phone || user.phone;
        if (req.body.newPassword) {
            user.password = bcrypt.hashSync(req.body.newPassword, 8);
            // console.log('doi mat khau thanh: ', user.password);
        }
        else {
            // console.log('khong doi mat khau');
        }
        const updatedUser = await user.save();

        res.send({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            phone: updatedUser.phone,
            idAdmin: updatedUser.isAdmin,
            image: updatedUser.image,
            password: updatedUser.password,
            token: generateToken(updatedUser),
        })
    }
    else {
        res.status(401).send({ message: 'Nhập mật khẩu không chính xác !' });
    }
}
));

userRouter.put('/profileImage', upload.single('image'), expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.body.userId);

    // console.log('Ley tu user action: ', req.body.currentPassword);
    // console.log('Mat khau moi: ', req.body.newPassword);
    // console.log('Hien tai trong user: ', user.password);
    // console.log(req.file.path);

    if (user && bcrypt.compareSync(req.body.currentPassword, user.password)) {

        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.phone = req.body.phone || user.phone;
        user.image = req.file.path.slice(7);
        if (req.body.newPassword) {
            user.password = bcrypt.hashSync(req.body.newPassword, 8);
            // console.log('doi mat khau thanh: ', user.password);
        }
        else {
            // console.log('khong doi mat khau');
        }
        const updatedUser = await user.save();
        res.send({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            phone: updatedUser.phone,
            idAdmin: updatedUser.isAdmin,
            image: updatedUser.image,
            password: updatedUser.password,
            token: generateToken(updatedUser),
        })
    }
    else {
        res.status(401).send({ message: 'Nhập mật khẩu không chính xác !' });
    }
}
));


userRouter.put('/AdminUser', expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.body.userId);

    // console.log('Ley tu user action: ', req.body.currentPassword);
    // console.log('Mat khau moi: ', req.body.newPassword);
    // console.log('Hien tai trong user: ', user.password);

    // console.log(user);
    // console.log(req.body.name, user.name);
    // console.log(req.body.email, user.email);
    // console.log(req.body.phone, user.phone);

    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.phone = req.body.phone || user.phone;


    const updatedUser = await user.save();
    res.send({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        phone: updatedUser.phone,
        idAdmin: updatedUser.isAdmin,
        image: updatedUser.image,
        password: updatedUser.password,
        token: generateToken(updatedUser),
    })

}));

userRouter.put('/AdminUserImage', upload.single('image'), expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.body.userId);

    user.name = req.body.name !== 'undefined' ? req.body.name : user.name;
    user.email = req.body.email !== 'undefined' ? req.body.email : user.email;
    user.phone = req.body.phone !== 'undefined' ? req.body.phone : user.phone;
    user.image = req.file.path.slice(7);


    const updatedUser = await user.save();

    res.send({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        phone: updatedUser.phone,
        idAdmin: updatedUser.isAdmin,
        image: updatedUser.image,
        password: updatedUser.password,
        token: generateToken(updatedUser),
    })

}
));


userRouter.delete('/deleteUser/:id',
    expressAsyncHandler(async (req, res) => {

        const id = req.params.id;

        await User.deleteOne({ _id: id }
            // ,
            // (err, result) => {
            //     if (err) return res.send(500, err)
            //     console.log('got deleted');
            //     res.redirect('/');
            // }
        );
    })
);








export default userRouter;