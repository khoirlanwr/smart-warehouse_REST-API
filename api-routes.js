// api-routes.js
// Initialize express router
// var express = require('express');
// var cors = require('cors');

// var app = express().use("*",cors());
// var router = app.Router();
var cors = require('cors');
let router = require('express').Router();

// Set default API response
router.get('/', function (req, res) {
    res.json({
        status: 'API Its Working',
        message: 'Welcome to RESTHub crafted with love!',
    });
});


// Import contact, data controller
var contactController = require('./controllers/contactController');
var dataController = require('./controllers/dataController');


// Contact routes
router.route('/contacts')
    .get(contactController.index)
    .post(contactController.new);
router.route('/contacts/:contact_id')
    .get(contactController.view)
    .patch(contactController.update)
    .put(contactController.update)
    .delete(contactController.delete);


// Data routes
router.route('/datas')
    .get(dataController.index)
    .post(dataController.new);

router.route('/datas/:data_id')
    .get(dataController.view)
    .patch(dataController.update)
    .put(dataController.update)
    .delete(dataController.delete);


// Export API routes
module.exports = router;