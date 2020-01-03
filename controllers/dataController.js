// contactController.js
// Import contact model
Data = require('./models/dataModel');

const redisClient = require('redis').createClient;
var redis = redisClient(6379, '54.90.63.207');

redis.on('connect', function() {
    console.log('__________Redis client connected__________');
});

redis.on('error', function (err) {
    console.log('********* Something went wrong **********' + err);
});

// Handle index actions
exports.index = function(req, res) {
    Data.get(function(err, data_sensor) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json(
            // status: "success",
            // message: "Data retrieved successfully",
            // data: data_sensor
            data_sensor
        );
    });
};

// Handle create data actions
exports.new = function (req, res) {
    var data_sensor = new Data;
    data_sensor.data = req.body.data;
    data_sensor.exist = req.body.exist;
    data_sensor.time = req.body.time;
    
    // save data and check for errors
    data_sensor.save(function (err) {
        if (err)
            res.json(err);
        res.json({
            message: 'New data created!',
            data: data_sensor
        });
    });
};

// BACKUP DATA
// // Handle view contact info
// exports.view = function (req, res) {
//     Data.findById(req.params.data_id, function (err, data_sensor) {
//         if (err)
//             res.send(err);
//         res.json({
//             message: 'data_sensor details loading..',
//             data: data_sensor
//         });
//     });
// };

// Handle view contact info
exports.view = function (req, res) {

    console.log("_____________View function____________");

    redis.get(req.params.data_id, (err, reply) => {
        if(err) {
            console.log("ERR");        
        } else if(reply){
            console.log(JSON.parse(reply));
            console.log("There is data in cache ");

            res.json({
                message: 'data_sensor from cache redis ..',
                data: JSON.parse(reply)
            });


        } else {

            console.log("Will look for in mongoDB");
            Data.findById(req.params.data_id, function (err, data_sensor) {                    
                if (err)
                    res.send(err);

                res.json({
                    message: 'data_sensor details loading ..',
                    data: data_sensor
                });

                // console.log(res);
                console.log(data_sensor);


                // set in redis
                redis.set(req.params.data_id, JSON.stringify(data_sensor), redisClient.print);
                console.log("data stored in cache redis");
                // redis.get(req.params.data_id, function (error, result) { 
                //     if (error) {
                //         console.log(error);
                //         throw error;
                //     }
                
                //     console.log('GET result ->' + result);
                // });

            });
        }
    }); 
    
    // Data.findById(req.params.data_id, function (err, data_sensor) {
    //     if (err)
    //         res.send(err);
    //     res.json({
    //         message: 'data_sensor details loading..',
    //         data: data_sensor
    //     });
    // });


};

// Handle update contact info
exports.update = function (req, res) {
        
        Data.findById(req.params.data_id, function (err, data_sensor) {
        if (err)
            res.send(err);
        data_sensor.data = req.body.data;
        data_sensor.exist = req.body.exist;
        data_sensor.time = req.body.time;

        // save the data_sensor and check for errors
        data_sensor.save(function (err) {
            if (err)
                res.json(err);
            res.json({
                message: 'data_sensor Info updated',
                data: data_sensor
            });
        });
    });
};


// Handle delete data_sensor
exports.delete = function (req, res) {
    Data.remove({
        _id: req.params.data_id
    }, function (err, data_sensor) {
        if (err)
            res.send(err);
        res.json({
            status: "success",
            message: 'data_sensor deleted'
        });
    });
};