var lookup = require('./lookup');
var generateKey = require('./generateKey');

module.exports = function(callback){
    var key = "";
    while (key.length < 6) {
        var charCode = Math.floor(Math.random() * 57 + 65);
        if (charCode < 91 || charCode > 96) {
            key += String.fromCharCode(charCode);
        }
    }
    lookup({'_id': key}, function(err, data){
        if (err) {
            throw err;
        } else if (data.length > 0){
            generateKey();
        } else {
            callback(null, key);
        }
        
    });
};