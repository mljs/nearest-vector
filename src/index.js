'use strict';

const squaredDistance = require('ml-distance-euclidean').squared;

const defaultOptions = {
    distanceFunction: squaredDistance,
    returnObject: false
};

/**
 *
 * @param {Array<Array<Number>>} listVectors - List of vectors with same dimensions
 * @param {Array<Number>} vector - Reference vector to "classify"
 * @param {Object} [options] - Options object
 * @param {Function} [options.distanceFunction = squaredDistance] - Function that receives two vectors and return their distance value as number
 * @param {Function} [options.similarityFunction = undefined] - Function that receives two vectors and return their similarity value as number
 * @param {Boolean} [options.returnObject = false] - Return the nearest vector instead of the index of it
 * @return {Number|Array<Number>} - The index or the content of the nearest vector
 */
function nearestVector(listVectors, vector, options) {
    options = Object.assign({}, defaultOptions, options);

    var vectorIndex = -1;
    if (typeof options.similarityFunction === 'function') {

        // maximum similarity
        var maxSim = -1;
        for (var j = 0; j < listVectors.length; j++) {
            var sim = options.similarityFunction(vector, listVectors[j]);
            if (sim > maxSim) {
                maxSim = sim;
                vectorIndex = j;
            }
        }
    } else if (typeof options.distanceFunction === 'function') {

        // minimum distance
        var minDist = Number.MAX_VALUE;
        for (var i = 0; i < listVectors.length; i++) {
            var dist = options.distanceFunction(vector, listVectors[i]);
            if (dist < minDist) {
                minDist = dist;
                vectorIndex = i;
            }
        }
    } else {
        throw new Error('A similarity or distance function it\'s required');
    }

    if (options.returnObject) {
        return listVectors[vectorIndex];
    } else {
        return vectorIndex;
    }
}

module.exports = nearestVector;
