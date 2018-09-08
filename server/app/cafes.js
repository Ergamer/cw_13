const express = require('express');
const multer = require('multer');
const nanoid = require('nanoid');
const path = require('path');

const auth = require('../middleware/auth');
const permit = require('../middleware/permit');
const Cafes = require('../models/Cafes');

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
        Cafes.find()
            .then(place => res.send(place))
            .catch(() => res.sendStatus(500));
    });

    router.post('/', [auth, upload.single('image')], (req, res) => {
        const placeData = req.body;
        if (req.file) {
            placeData.image = req.file.filename;
        } else {
            placeData.image = null;
        }
        const place = new Cafes(placeData);

        place.save()
            .then(place => res.send(place))
            .catch(error => res.status(400).send(error));
    });



    return router;

};

module.exports = createRouter;
