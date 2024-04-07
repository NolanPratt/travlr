const mongoose = require('mongoose');
const readLine = require('readline');

const host = process.env.host || '127.0.0.1';
const dbURI = `mongodb://${host}:27017/travlr`;

// Function to establish connection
const connectToDatabase = () => {
    mongoose.connect(dbURI)
        .then(() => console.log(`Mongoose connected to ${dbURI}`))
        .catch(err => {
            console.error('Mongoose connection error: ', err);
            // Handle connection error, e.g., retry connection
        });
};

// Monitor connection events
mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected');
});

// Windows-specific listener
if (process.platform === 'win32') {
    const rl = readLine.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    rl.on('SIGINT', () => {
        process.emit("SIGINT");
    });
}

// Configure for Graceful Shutdown
const gracefulShutdown = (msg) => {
    mongoose.connection.close(() => {
        console.log(`Mongoose disconnected through ${msg}`);
        process.exit(0);
    });
};

// Event Listeners to process graceful shutdowns
process.on('SIGUSR2', () => {
    gracefulShutdown('nodemon restart');
});
process.on('SIGINT', () => {
    gracefulShutdown('app termination');
});
process.on('SIGTERM', () => {
    gracefulShutdown('app shutdown');
});

// Make initial connection to DB
connectToDatabase();

// Import Mongoose schema
require('./travlr');
module.exports = mongoose;