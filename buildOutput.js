module.exports = function(original_url, key) {
    var obj = {};
    obj['original-url'] = original_url;
    if (key === 'null') {
        obj['short-url'] = 'null';
    } else {
        obj['short-url'] = "https://dandrust-url-shortener.herokuapp.com/" + key;
    }
    return obj;
}