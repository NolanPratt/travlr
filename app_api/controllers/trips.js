const mongoose = require('mongoose');
const Trip = require('../models/travlr');
const Model = mongoose.model('trips');

// All HTTP responses must include HTML status code
// and JSON message to the requesting client,
// regardless of the outcome

//GET: /trips - retrieves all Trips
const tripsList = async (req, res) => {
    try {
        // Create query model for getting all documents
        const query = await Model.find({}).exec();
        console.log(query);

        // Check if query result is empty
        if (query.length === 0) { 
            return res.status(404).json({ message: 'No trips found' });

        // Return existing trip list
        } else { 
            return res.status(200).json(query);
        }
    // Unable to reach endpoint
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal Server Error.' });
    }
};

//GET: /trips/:tripCode - retrieves a specified Trip
const tripsFindByCode = async (req, res) => {
    try {
        // Create query model for getting a single document
        const query = await Model.find({'code' : req.params.tripCode}).exec();
        console.log(query);

        // Check if query result is empty
        if (query.length === 0) { 
            return res.status(404).json({ message: 'Trip code not recognized' });

        // Return existing trip list
        } else { 
            return res.status(200).json(query);
        }
    // Unable to reach endpoint
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal Server Error.' });
    }
};

// POST: /trips - Adds a new Trip
const tripsAddTrip = async(req, res) => {
    const newTrip = new Trip({
        code: req.body.code,
        name: req.body.name,
        length: req.body.length,
        start: req.body.start,
        resort: req.body.resort,
        perPerson: req.body.perPerson,
        image: req.body.image,
        description: req.body.description,
    });

    try {
        // Create query model for adding a new Trip
        const query = await newTrip.save();
        console.log(query);

        // Check if query result is empty
        if (query.length === 0) { 
            return res.status(400).json({ message: 'Trip code not recognized' });

        // Return the newly created Trip
        } else { 
            return res.status(201).json(query);
        }
    // Unable to reach endpoint
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal Server Error.' });
    }
};

// PUT: /trips/:tripCode - Updates an existing Trip
const tripsUpdateTrip = async(req, res) => {
    try {
        // Structure the search query for locating an existing Trip via the respective code
        const query = await Model
        .findOneAndUpdate({'code': req.params.tripCode}, {
            code: req.body.code,
            name: req.body.name,
            length: req.body.length,
            start: req.body.start,
            resort: req.body.resort,
            perPerson: req.body.perPerson,
            image: req.body.image,
            description: req.body.description,
        }).exec();
        console.log(query);

        // Check if query result is empty
        if (query.length === 0) { 
            return res.status(400).json({ message: 'Trip code not recognized' });

        // Return the newly created Trip
        } else { 
            return res.status(201).json(query);
        }
    // Unable to reach endpoint
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal Server Error.' });
    }
};

module.exports = {
    tripsList,
    tripsFindByCode,
    tripsAddTrip,
    tripsUpdateTrip
};