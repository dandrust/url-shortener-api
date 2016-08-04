var lookup = require("./lookup");
var insert = require('./insert');
var validateURL = require('valid-url');
var validateKey = require('./validateKey');
var generateKey = require('./generateKey');
var buildOutput = require('./buildOutput');
var fs = require('fs');
var express = require('express');
var app = express();
var url = require('url');

app.get('/', function(req, res){                        //request for index (information page)
    fs.readFile('index.html', 'utf8', function(err, data){
        if (err) throw err;
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(data, 'utf8');
    });
});

app.get('/*', function(req, res){                       //string passed
    var input = url.parse(req.url).pathname.substr(1);

    if (validateURL.isWebUri(input)) {                          //input is a valid URL
        var key;
        generateKey(function(err, data){
            if (err) throw err;
            key = data;
            insert({"_id": key, "url": input}, function(err, data){
                if (err) throw err;
                res.writeHead(200, {'Content-Type': 'application-json'});
                res.end(JSON.stringify(buildOutput(input, key)));
            });
        });
    } else if (validateKey(input)) {                            //input is a valid key
        lookup({"_id": input}, function(err, data){
            if (err) throw err;                                         //key does not match document                 
            res.redirect(data[0]['url']);
        });
        
    } else {                                                    //input is not valid
        res.writeHead(200, {'Content-Type': 'application-json'});
        res.end(JSON.stringify(buildOutput('null', 'null')));
    }
});

app.listen(process.env.PORT || 8080);

