const mongoose = require('mongoose');
const Trip = require('../models/travlr');
const Model = mongoose.model('trips');

//GET: /trips - lists all the trips
// Regardless of the outcome, response must include HTML status code
// and JSON message to the requesting client
const tripsList = async (req, res) => {
    try {
        // Create query model for getting all documents
        const query = await Model.find({}).exec();
        console.log(query);

        // Check if query result is empty
        if (query.length === 0) { 
            return res
                .status(404)
                .json({ message: 'No trips found' });
        // Return existing trip list
        } else { 
            return res
                .status(200)
                .json(query);
        }
    // Unable to reach endpoint
    } catch (err) {
        console.error(err);
        return res
            .status(500)
            .json({ message: 'Internal Server Error.' });
    }
};

//GET: /trips/:tripCode - lists a single trip
// Regardless of the outcome, response must include HTML status code
// and JSON message to the requesting client
const tripsFindByCode = async (req, res) => {
    try {
        // Create query model for getting a single document
        const query = await Model.find({'code' : req.params.tripCode}).exec();
        console.log(query);

        // Check if query result is empty
        if (query.length === 0) { 
            return res
                .status(404)
                .json({ message: 'Trip code not recognized' });
        // Return existing trip list
        } else { 
            return res
                .status(200)
                .json(query);
        }
    // Unable to reach endpoint
    } catch (err) {
        console.error(err);
        return res
            .status(500)
            .json({ message: 'Internal Server Error.' });
    }
};

module.exports = {
    tripsList,
    tripsFindByCode
};