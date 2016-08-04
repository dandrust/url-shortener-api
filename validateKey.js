module.exports = function(key, callback){
    var valid = new RegExp(/^[A-Za-z]{6}$/);
    return valid.test(key);
};