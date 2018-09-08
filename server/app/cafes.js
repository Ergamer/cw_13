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
            .then(places => res.send(places))
            .catch(() => res.sendStatus(500));
    });

    router.post('/', [auth, upload.single('image')], (req, res) => {
        const placeData = req.body;
        if (req.file) {
            placeData.image = req.file.filename;
        } else {
            placeData.image = null;
        }
        placeData.date = new Date();
        const place = new Cafes(placeData);

        place.save()
            .then(place => res.send(place))
            .catch(error => res.status(400).send(error));
    });

    router.get('/:id', (req, res) => {
        Cafes.findById(req.params.id)
            .then(place => res.send(place))
            .catch(() => res.sendStatus(500));
    });

    router.post('/rate', auth, (req, res) => {
        Cafes.findOne({_id: req.body.id}, (err, cafe) => {
            const index = cafe.votes.findIndex(vote => vote.rateUser.equals(req.user._id));
            if (index === -1) {
                cafe.votes = [...cafe.votes, {rate: req.body.rate, rateUser: req.user._id}];
            }
            else {
                cafe.votes[index].rate = req.body.rate;
            }
            const result = cafe.votes.reduce((sum, vote) => {
                return sum + vote.rate;
            }, 0);
            cafe.rating = result / cafe.votes.length;
            cafe.save(function (err) {
                if (err) console.error('ERROR!', err);
            });
        }).then(result => {
            if (result) res.send(result);
            else res.sendStatus(404);
        })
            .catch(() => res.sendStatus(500));
    });

    return router;

};

module.exports = createRouter;
