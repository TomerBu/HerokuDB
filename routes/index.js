'use strict'

var express = require('express');
var router = express.Router();
var https = require('https');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Express' });
});

router.get('/movies', function (req, res) {
    var http = require('http');
    http.get('http://api.androidhive.info/json/movies.json', function (response) {
        var json = '';
        response.on('data', function (chunk) {
            json += chunk;
        });

        response.on('end', function () {
            json = JSON.parse(json);
            res.render('index', { movies: json })
        });
        response.on('error', function (e) {
            res.redirect('error', e);
        });
        
    });
});


router.get('/initDB', function (req, res) {
    res.render('initDB', { get: "Did a get" });
});

router.get('/todos', function (req, res) {
    var pg = require('pg');
    pg.connect(process.env.DATABASE_URL, function (err, client, done) {
        if (err) res.render('error', { error: err });
        client.query("SELECT * FROM TODOS;", function (err, result) {
            if (err) res.render('error', { error: err });
            else {
                res.render('todos', {todos:result.rows});
            }
        })
    });
});

router.post('/initDB', function (req, res) {
    var pg = require('pg');
    var sql = req.body.sql;
    console.log('__________________________');
    console.log(sql);
    pg.connect(process.env.DATABASE_URL, function (err, client, done) {
        if (err) { console.error("ERROR!", err); res.render('error', { error: err, messaeg: "Connection Failed" }); }
        client.query(sql, function (err, result) {
            done();

            if (err) {
                console.error("ERROR!", err);
                res.render('error', { error: err, messaeg: "Query Failed " + sql });
            } else {
                console.info("Result", result.rows);
                res.render('initDB', { result: result.rows });
            }
            console.log('__________________________');
        });
    })

});

router.get('/movie/:idx', (req, res) => {
    var http = require('http');
    var idx = req.params.idx;
    http.get('http://api.androidhive.info/json/movies.json', function (response) {
        var json = '';
        response.on('data', function (chunk) {
            json += chunk;
        });

        response.on('end', function () {
            json = JSON.parse(json);
            res.render('movie', { movie: json[idx] })
        });
        response.on('error', function (e) {
            res.redirect('error', e);
        })
    });
});



router.post('/addUser', function (req, res) {
    
    var name = req.body.userName;
    //add uesr to data base.
    res.redirect('movies');
});

router.get('/addUser', function (req, res) {
    res.render('inputSample');
})


router.get('/xml', function (req, res) {

    var url = "http://www.boi.org.il/currency.xml";
    var http = require('http');


    http.get(url, function (response) {
        var data = '';
        response.on('data', function (chunk) {
            data += chunk;
        });

        response.on('end', function () {

            var parser = require('xml2js');

            parser.parseString(data, (err, result) => {
                if (err) {
                    res.render('error', err);
                }

                res.render('currencies', { title: 'Currencies', data: result.CURRENCIES.CURRENCY });
            });
        });
        response.on('error', function (e) {
            res.redirect('error', e);
        })
    });




})
module.exports = router;