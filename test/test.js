'use strict';

const nearestVector = require('..');

function cosineSimilarity(a, b) {
    var ii = a.length,
        p = 0,
        p2 = 0,
        q2 = 0;
    for (var i = 0; i < ii; i++) {
        p += a[i] * b[i];
        p2 += a[i] * a[i];
        q2 += b[i] * b[i];
    }
    return p / (Math.sqrt(p2) * Math.sqrt(q2));
}

describe('nearest-vector test', function () {
    it('Distance tests', function () {
        let centers = [[1, 2, 1], [-1, -1, -1]];
        let data = [[1, 1, 1], [1, 2, 1], [-1, -1, -1], [-1, -1, -1.5]];
        let clusterID = [0, 0, 1, 1];

        for (let i = 0; i < clusterID.length; i++) {
            nearestVector(centers, data[i]).should.be.equal(clusterID[i]);
        }
    });

    it('Similarity tests', function () {
        let centers = [[1, 2, 1], [-1, -1, -1]];
        let data = [[1, 1, 1], [1, 2, 1], [-1, -1, -1], [-1, -1, -1.5]];
        let clusterID = [0, 0, 1, 1];

        // cosine similarity
        let options = {similarityFunction: cosineSimilarity};

        for (let i = 0; i < clusterID.length; i++) {
            nearestVector(centers, data[i], options).should.be.equal(clusterID[i]);
        }
    });

    it('Throws for non-function', function () {
        nearestVector.bind(null, [], [], {distanceFunction: 1}).should.throw('A similarity or distance function it\'s required');
    });

    it('Return object tests', function () {
        let centers = [[1, 2, 1], [-1, -1, -1]];
        let data = [[1, 1, 1], [1, 2, 1], [-1, -1, -1], [-1, -1, -1.5]];
        let clusterID = [0, 0, 1, 1];

        for (let i = 0; i < clusterID.length; i++) {
            nearestVector(centers, data[i], {returnVector: true}).should.deepEqual(centers[clusterID[i]]);
        }
    });
});
