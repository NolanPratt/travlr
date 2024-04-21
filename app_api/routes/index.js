const express = require('express'); // Express app
const router = express.Router(); // Router logic
const { expressjwt: jwt } = require('express-jwt');
const auth = jwt({
    secret: process.env.JWT_SECRET,
    algorithms: ['HS256'],
    userProperty: 'payload'
});

// Import the controllers being routed
const authController = require('../controllers/authentication');
const tripsController = require('../controllers/trips');

// Define routes for the endpoints
router // Route for the login page
    .route('/login')
    .post(authController.login);

router // Route for the register page
    .route('/register')
    .post(authController.register);

router // Route for tripsList
    .route('/trips')
    .get(tripsController.tripsList) // GET Method to retrieve the tripsList
    .post(auth, tripsController.tripsAddTrip); // POST Method adds a new Trip to tripsList

router // Route for specific Trips via a tripCode
    .route('/trips/:tripCode')
    .get(tripsController.tripsFindByCode) // GET Method to retrieve an existing Trip
    .put(auth, tripsController.tripsUpdateTrip); // PUT Method for updating an existing Trip

module.exports = router;