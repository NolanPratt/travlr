const express = require('express'); // Express app
const router = express.Router(); // Router logic

// Import the controllers being routed
const tripsController = require('../controllers/trips');

// Define routes for the endpoints
router // Route to collect all trips within the db
    .route('/trips')
    .get(tripsController.tripsList); 

router // Route to collect a single trip from the db
    .route('/trips/:tripCode')
    .get(tripsController.tripsFindByCode);

module.exports = router;