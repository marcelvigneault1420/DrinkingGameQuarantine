module.exports.randomize = function(limit, offset = 0) {
    return Math.floor(Math.random() * limit) + 1 + offset;
};
