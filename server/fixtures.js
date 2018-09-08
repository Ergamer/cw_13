const mongoose = require('mongoose');
const config = require('./config');

const Users = require('./models/Users');
const Cafes = require('./models/Cafes');

mongoose.connect(config.db.url + '/' + config.db.name);

const db = mongoose.connection;

db.once('open', async () => {
    try {
        await db.dropCollection('users');
        await db.dropCollection('places');
    } catch (e) {
        console.log('Collections were not present, skipping drop...');
    }

    await Cafes.create({
        title: 'Gudov`s',
        description: 'Attractor school',
        image: 'attractor.jpg',
        date: '08-09-2018: 19-56'
    }, {
        title: 'Barashek',
        description: 'Local cuisine',
        image: 'baran.jpg',
        date: '08-09-2018: 19-59'
    });

    db.close();
});