const express = require('express');
const multer = require('multer');
const nanoid = require('nanoid');
const path = require('path');
const Comments = require('../models/Comments');

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

const router = express.Router();

const createRouter = () => {

    router.get('/', (req, res) => {
        Comments.find()
            .then(comments => res.send(comments))
            .catch(() => res.sendStatus(500));
    });

    router.post('/', (req, res) => {
        const commentsData = req.body;
        const comment = new Comments(commentsData);

        comment.save()
            .then(comment => res.send(comment))
            .catch(error => res.status(400).send(error));
    });


    return router;

};

module.exports = createRouter;
