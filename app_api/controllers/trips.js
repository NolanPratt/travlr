const mongoose = require('mongoose');
const Trip = require('../models/travlr');
const tripModel = mongoose.model('trips');
const User = require('../models/user');
const userModel = mongoose.model('users');

// All HTTP responses must include HTML status code
// and JSON message to the requesting client,
// regardless of the outcome

//GET: /trips - retrieves all Trips
const tripsList = async (req, res) => {
    try {
        // Create query model for getting all documents
        const query = await tripModel.find({}).exec();
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
        const query = await tripModel.find({'code' : req.params.tripCode}).exec();
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

// Middleware function to verify credentials
const getUser = (req, res, callback) => {
    console.log("req.payload:", req.payload); // Log the payload to see if it's populated
    if (req.payload && req.payload.email) {
        userModel.findOne({ email: req.payload.email })
            .exec((err, user) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ message: "Internal Server Error" });
                }
                if (!user) {
                    return res.status(404).json({ message: "User not found" });
                }
                callback(req, res, user);
            });
    } else {
        return res.status(401).json({ message: "Unauthorized: Missing or invalid token" });
    }
};

// POST: /trips - Adds a new Trip
const tripsAddTrip = async (req, res) => {
    // Check user auth before executing
    getUser(req, res, (req, res) => {
        Trip.create({
            code: req.body.code,
            name: req.body.name,
            length: req.body.length,
            start: req.body.start,
            resort: req.body.resort,
            perPerson: req.body.perPerson,
            image: req.body.image,
            description: req.body.description
        }, (err, trip) => {
            if (err) {
                return res.status(400).json(err);  // bad request
            } else {
                return res.status(201).json(trip);  // created
            }
        });
    });
};

// PUT: /trips/:tripCode - Updates an existing Trip
const tripsUpdateTrip = async (req, res) => {
    // Check user auth before executing
    getUser(req, res, (req, res) => {
        Trip.findOneAndUpdate(
            { 'code': req.params.tripCode },
            {
                code: req.body.code,
                name: req.body.name,
                length: req.body.length,
                start: req.body.start,
                resort: req.body.resort,
                perPerson: req.body.perPerson,
                image: req.body.image,
                description: req.body.description
            },
            { new: true }
        )
            .then(trip => {
                if (!trip) {
                    return res.status(404).send({
                        message: "Trip not found with code " + req.params.tripCode
                    });
                }
                res.send(trip);
            })
            .catch(err => {
                if (err.kind === 'ObjectId') {
                    return res.status(404).send({
                        message: "Trip not found with code " + req.params.tripCode
                    });
                }
                return res.status(500).json(err);
            });
    });
};

module.exports = {
    tripsList,
    tripsFindByCode,
    tripsAddTrip,
    tripsUpdateTrip
};