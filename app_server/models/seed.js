// Bring in the DB connection and the Trip schema
const Mongoose = require('./db');
const Trip = require('./travlr');

// Read seed data from json file
var fs = require('fs');
var trips = JSON.parse(fs.readFileSync('./data/trips.json', 'utf8'));

// Delete any existing records, then insert seed data
const seedDB = async() => {
    try {
        await Trip.deleteMany({});
        console.log('All documents deleted from the trips collection');
    } catch (error) {
        console.error('Error deleting documents from the trips collection:', error);
    }
    await Trip.insertMany(trips);
};

// Seed the database, close the MongoDB connection, then exit the process
seedDB().then(async () => {
    await Mongoose.connection.close();
    process.exit(0);
});