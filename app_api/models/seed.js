// Bring in the DB connection and the Trip schema
const Mongoose = require('./db');
const Trip = require('./travlr');

// Read seed data from json file
var fs = require('fs');
var trips = JSON.parse(fs.readFileSync('./data/trips.json', 'utf8'));

async function connectToDB(delayInMilliseconds) {
    // Output connection imminent following delay
    console.log("Connecting to database...");

    // Set promise to ensure the connection occurs
    await new Promise(resolve => setTimeout(resolve, delayInMilliseconds));

    // Component to delete any existing records, then insert seed data
    const seedDB = async() => {
        try {
            await Trip.deleteMany({});
            console.log('All documents deleted from the trips collection');
        } catch (error) {
            console.error('Error deleting documents from the trips collection:', error);
        }
        await Trip.insertMany(trips);
    };

    // Seed the database using component, then close the MongoDB connection and exit the process
    seedDB().then(async () => {
        await Mongoose.connection.close();
        process.exit(0);
    });
};

// Usage
connectToDB(0);