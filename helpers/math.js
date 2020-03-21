module.exports.randomize = function(pLimit, pOffset = 0) {
    return Math.floor(Math.random() * pLimit) + 1 + pOffset;
};
