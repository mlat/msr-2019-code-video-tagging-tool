var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var series = require('async/series');
var db = require('../db');

router.post('/', function (req, res, next) {

    console.log(req.body);

    // extract data from request
    var imageId = req.body.imageId;
    var userChoices = req.body.userChoices;
    var username = req.body.userName;
    var dataset = req.body.dataset;
    var userId = 1;
    // find user id if not null
    // add new user if user not in db
    if(userChoices.includes(0) && userChoices.includes(3)){
        return res.status(500).json({
            title: 'An error occurred',
            error: {message: "Selection can't be is Java and not Java at same time", name:"MultiSelection"}
        });
    }

    // get id of newly created user
    series([
            function (callback) {
                if (username === null || username === "") {
                    callback({message:"Empty username", name:"UsernameMissing"}, 0);
                }
                else {
                    var sql = "SELECT * FROM ?? WHERE ??=?;";
                    var inserts = ['users', 'username', username];
                    sql = mysql.format(sql, inserts);
                    db.get().query(sql, function (error, result) {
                        if (error) {
                            callback(error);
                        }
                        console.log("POST(select): " + JSON.stringify(result));
                        if (result.length !== 0) {
                            userId = result[0].id;
                        }
                        else {
                            userId = -1;
                        }
                        callback(null, 0);
                    });
                }
            },
            function (callback) {
                if (username === null || userId !== -1) {
                    callback(null, 0);
                }
                else {
                    var userInsertSql = "INSERT INTO users(username) VALUE(?);";
                    userInsertSql = mysql.format(userInsertSql, [username]);
                    db.get().query(userInsertSql, function (error, result) {
                        if (error) {
                            callback(error);
                        }
                        userId = result.insertId;
                        console.log("Userid: " + userId);
                        console.log("POST(insert user): " + JSON.stringify(result));
                        callback(null, 1);
                    });
                }

            },
            function (callback) {
                var responsesInsertSql = "INSERT INTO responses(response_code, image_id, user_id, belongs_to_dataset) VALUES ?;";
                var values = [];
                for (var i = 0; i < userChoices.length; ++i) {
                    var choice = userChoices[i];
                    console.log("Userid(response): " + userId);
                    values.push([choice, imageId, userId, dataset]);
                }
                db.get().query(responsesInsertSql, [values], function (error, result) {
                    if (error) {
                        callback(error);
                    }
                    console.log("POST(insert response): " + JSON.stringify(result));

                    callback(null, 3);
                });
            }
        ], function (error, results) {
            if (error) {
                console.log(error);
                return res.status(500).json({
                    title: 'An error occurred',
                    error: error
                });
            }
            console.log("series finished");
            return res.status(201).json({
                title: 'Successfully added'
            });
        }
    );


});

// return a random image form the db
router.get('/:dataset', function (req, res, next) {
    var imageIdGiven;
    var imageResults;
    var dataset = req.params.dataset;

    series([
            function (callback) {
                var sql = 'SELECT * FROM images WHERE belongs_to_dataset=? ORDER BY RAND() LIMIT 1;';
                sql = mysql.format(sql, [dataset]);
                db.get().query(sql, function (error, results) {
                    if (error) {
                        return callback(error);
                    }
                    if(results.length === 0){
                        return callback({message:"No images found"})
                    }
                    imageResults = results;
                    imageIdGiven = imageResults[0].id;
                    console.log("GET(select): " + JSON.stringify(results));
                    return callback(null, 0);
                });
            },
            function (callback) {
                var insertSql = "INSERT INTO image_given_records(image_id) VALUE(?);";
                insertSql = mysql.format(insertSql, [imageIdGiven]);
                db.get().query(insertSql, function (error, result) {
                    if (error) {
                        return callback(error);
                    }
                    console.log("GET(insert): " + JSON.stringify(result));
                    return callback(null,1);
                });

            }
        ],
        function (error, results) {
            if (error) {
                console.error(error);
                return res.status(500).json({
                    title: 'An error occurred',
                    error: error
                });
            }
            return res.status(200).json({
                title: 'Query Success',
                obj: imageResults
            });
        });
});

module.exports = router;
