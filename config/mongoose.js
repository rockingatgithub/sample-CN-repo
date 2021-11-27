const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/contact_list_db");

const db  = mongoose.connection;

db.on('error', () => {
    console.error.bind(console, 'Error connecting the DB');
})

db.once('open', () => {
    console.log('successfully connect to DB');
})