const path = require('path');

const rootPath = __dirname;


const name = 'Cafes';

const testName = 'cafes-test';

module.exports = {
    rootPath,
    uploadPath: path.join(rootPath, '/public/uploads'),
    db: {
        url: 'mongodb://localhost:27017',
        name: process.env.NODE_ENV === 'test' ? testName : name
    },
    jwt: {
        secret: 'some kinda very secret key',
        expires: '7d'
    }
};




