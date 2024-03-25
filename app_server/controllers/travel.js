var fs = require('fs');
var trips = JSON.parse(fs.readFileSync('./data/trips.json','utf8'));

/* Get Travlr View */
const travel = (req, res) => {
    res.render('travel', { title: "Travlr Getaways", trips: trips}); // Defines the url route name as 'travel' to be returned as /travel
};

module.exports = {
    travel
}