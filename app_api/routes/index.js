const express = require('express'); // Express app
const router = express.Router(); // Router logic

// Import the controllers being routed
const tripsController = require('../controllers/trips');

// Define routes for the endpoints
router // Route for tripsList
    .route('/trips')
    .get(tripsController.tripsList) // GET Method to retrieve the tripsList
    .post(tripsController.tripsAddTrip); // POST Method adds a new Trip to tripsList

router // Route for specific Trips via a tripCode
    .route('/trips/:tripCode')
    .get(tripsController.tripsFindByCode) // GET Method to retrieve an existing Trip
    .put(tripsController.tripsUpdateTrip); // PUT Method for updating an existing Trip

module.exports = router;