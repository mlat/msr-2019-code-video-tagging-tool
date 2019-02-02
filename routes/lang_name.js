var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var db = require('../db');

router.get('/:link_name', function (req, res, next) {

    var link_name = req.params.link_name;
    if (!link_name) {
        return res.status(400).json({
            title: 'link_name not provided',
            error:{message:'The parameter link_name is missing'}
        });
    }

    var sql = "SELECT * FROM datasets WHERE link_name=?;";

    sql = mysql.format(sql, [link_name]);
    db.get().query(sql, function (err, result) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err,
                message: err.message
            });
        }
        if(result.length === 0){
            return res.status(404).json({
                title: 'Dataset not found',
                error: {message:'The link provided does not correspond to a dataset'}
            })
        }
        console.log(result);
        return res.status(200).json(result);

    })


});

module.exports = router;