const tripsEndpoint = 'http://localhost:3000/api/trips';
const options = {
    method: 'GET',
    headers: {
        'Accept': 'application/json'
    }
}

var fs = require('fs');
var trips = JSON.parse(fs.readFileSync('./data/trips.json','utf8'));

/* Get Travlr View */
const travel = async function(req, res, next) {
    await fetch(tripsEndpoint, options)
        .then(res => res.json())
        .then(json => {
            // Return error message
            let message = null;
            // If the returned JSON is not an array
            if (!(json instanceof Array)) {
                message = 'API lookup error';
                json = [];
            // If the returned JSON is empty
            } else {
                if (!json.length) {
                    message = 'No trips exist in the database';
                }
            }
            // Render the returned JSON
            res.render('travel', {title: 'Travlr Getaways', trips: json});
        })
        .catch(err => res.status(500).send(e.message));
}

module.exports = {
    travel
}