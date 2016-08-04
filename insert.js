/*
    Lookup Module
    
    function(queryObj, callback)
    
    Parameters:
    queryObj - Object that contains query to database
    
    callback - function to execute upon completion.  Will pass err, data to callback
    
    Returns:
    Array of db.collection.find() results
    
*/

var mongo = require('mongodb').MongoClient;
var url = 'mongodb://test:test@ds139665.mlab.com:39665/dandrust-url';


module.exports = function(doc, callback) {
    

mongo.connect(url, function(err, db){
    if (err) console.log("Unable to connect: " + err);
    var collection = db.collection('urlpointers');
    var insertResult = collection.insert(doc);
    callback(null, null);
    db.close();
});
};