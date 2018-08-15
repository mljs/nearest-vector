'use strict';

import nearestVector, { findNearestVector } from '..';

function cosineSimilarity(a: number[], b: number[]) {
  var ii = a.length;

  var p = 0;

  var p2 = 0;

  var q2 = 0;
  for (var i = 0; i < ii; i++) {
    p += a[i] * b[i];
    p2 += a[i] * a[i];
    q2 += b[i] * b[i];
  }
  return p / (Math.sqrt(p2) * Math.sqrt(q2));
}

describe('nearest-vector test', () => {
  test('Distance tests', () => {
    let centers = [[1, 2, 1], [-1, -1, -1]];
    let data = [[1, 1, 1], [1, 2, 1], [-1, -1, -1], [-1, -1, -1.5]];
    let clusterID = [0, 0, 1, 1];

    for (let i = 0; i < clusterID.length; i++) {
      expect(nearestVector(centers, data[i])).toBe(clusterID[i]);
    }
  });

  test('Similarity tests', () => {
    let centers = [[1, 2, 1], [-1, -1, -1]];
    let data = [[1, 1, 1], [1, 2, 1], [-1, -1, -1], [-1, -1, -1.5]];
    let clusterID = [0, 0, 1, 1];

    // cosine similarity
    let options = { similarityFunction: cosineSimilarity };

    for (let i = 0; i < clusterID.length; i++) {
      expect(nearestVector(centers, data[i], options)).toBe(clusterID[i]);
    }
  });

  test('Throws for non-function', () => {
    expect(
      nearestVector.bind(null, [], [], { distanceFunction: 1 })
    ).toThrowError("A similarity or distance function it's required");
  });

  test('find nearest vector', () => {
    let centers = [[1, 2, 1], [-1, -1, -1]];
    let data = [[1, 1, 1], [1, 2, 1], [-1, -1, -1], [-1, -1, -1.5]];
    let clusterID = [0, 0, 1, 1];

    for (let i = 0; i < clusterID.length; i++) {
      expect(findNearestVector(centers, data[i])).toEqual(
        centers[clusterID[i]]
      );
    }
  });
});
