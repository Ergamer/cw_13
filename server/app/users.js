const express = require('express');
const nanoid = require('nanoid');
const multer = require('multer');
const path = require('path');
const Users = require('../models/Users');
const auth = require('../middleware/auth');
const permit = require('../middleware/permit');
const router = express.Router();

const config = require('../config');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, nanoid() + path.extname(file.originalname));
    }
});
const upload = multer({storage});

const createRouter = () => {

    router.post('/', (req, res) => {
        const user = new Users({
            username: req.body.username,
            password: req.body.password
        });

        user.save()
            .then(user => res.send(user))
            .catch(error => res.status(400).send(error))
    });
    router.post('/sessions', async (req, res) => {
        const user = await Users.findOne({username: req.body.username});

        if (!user) {
            return res.status(400).send({error: 'Username not found'});
        }

        const isMatch = await user.checkPassword(req.body.password);

        if (!isMatch) {
            return res.status(400).send({error: 'Password is wrong!'});
        }

        const token = user.generateToken();

        return res.send({message: 'User and password correct!', user, token});
    });
    router.post('/verify', auth, (req, res) => {
        res.send({message: 'Token valid'});
    });

    router.delete('/sessions', async (req, res) => {
        const token = req.get('Token');

        const success = {message: 'Logout success!'};

        if (!token) return res.send(success);

        const user = await Users.findOne({token});

        if (!user) return res.send(success);

        user.generateToken();

        user.save();

        return res.send(success);
    });


    router.post('/', [auth, permit('admin'), upload.single('image')], (req, res) => {
        const userData = req.body;
        if (req.file) {
            userData.image = req.file.filename;
        } else {
            userData.image = null;
        }

        const user = new Users(userData);

        user.save()
            .then(user => res.send(user))
            .catch(error => res.status(400).send(error))
    });
    router.get('/:id', (req, res) => {
        Users.findById(req.params.id)
            .then(user => res.send(user))
            .catch(() => res.sendStatus(500));
    });

    router.put('/:id', [auth, permit('admin'), upload.single('image')], async (req, res) => {
        const oneUserData = req.body;
        let CheckUserNameForExist='';
        await Users.findOne({username: oneUserData.username}, (err, findUser) => {
            if(findUser && findUser._id != req.params.id) {
                CheckUserNameForExist = findUser.username
            }
        }).then(()=>{
            if(CheckUserNameForExist !== oneUserData.username) {
                Users.findOne({_id: req.params.id}, (err, user) => {
                    if (req.file) user.image = req.file.filename;
                    user.username = oneUserData.username;
                    user.description = oneUserData.description;
                    user.role = oneUserData.role;
                    if (oneUserData.password !== '') {
                        user.password = oneUserData.password;
                        user.save(function (err) {
                            if (err) console.error('ERROR!', err);
                        });
                    } else {
                        user.save();
                    }

                }).then(result => res.send(result))
                    .catch(error => res.status(400).send(error));
            }else{
                res.status(400).send('User already exists')
            }
        });
    });

    router.delete('/:id', [auth, permit('admin')], (req, res) => {
        Users.deleteOne({_id: req.params.id})
            .then(result => res.send(result))
            .catch(error => res.status(400).send(error));
    });

    router.get('/', (req, res) => {
        Users.find().select("-role")
            .then(result => {
                let index;
                result.forEach((item, key) => {
                    if (item.username === 'admin')
                        index = key;
                });
                result.splice(index, 1);
                res.send(result)
            })
            .catch(error => res.send(error));
    });

    return router;
};

module.exports = createRouter;