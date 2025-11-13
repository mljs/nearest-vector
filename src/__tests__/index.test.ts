import { describe, expect, it, test } from 'vitest';

import { findNearestVector, nearestVector } from '../index.js';

function cosineSimilarity(a: number[], b: number[]) {
  const ii = a.length;

  let p = 0;

  let p2 = 0;

  let q2 = 0;
  for (let i = 0; i < ii; i++) {
    p += a[i] * b[i];
    p2 += a[i] * a[i];
    q2 += b[i] * b[i];
  }
  return p / (Math.sqrt(p2) * Math.sqrt(q2));
}

test('Distance tests', () => {
  const centers = [
    [1, 2, 1],
    [-1, -1, -1],
  ];
  const data = [
    [1, 1, 1],
    [1, 2, 1],
    [-1, -1, -1],
    [-1, -1, -1.5],
  ];
  const clusterID = [0, 0, 1, 1];

  for (let i = 0; i < clusterID.length; i++) {
    expect(nearestVector(centers, data[i])).toBe(clusterID[i]);
  }
});

describe('Similarity tests', () => {
  const centers = [
    [1, 2, 1],
    [-1, -1, -1],
  ];
  const data = [
    [1, 1, 1],
    [1, 2, 1],
    [-1, -1, -1],
    [-1, -1, -1.5],
  ];
  const clusterID = [0, 0, 1, 1];

  // cosine similarity
  const options = { similarityFunction: cosineSimilarity };

  it('Find nearest vector with cosine similarity', () => {
    for (let i = 0; i < clusterID.length; i++) {
      expect(nearestVector(centers, data[i], options)).toBe(clusterID[i]);
    }
  });

  it('Throws for non-function', () => {
    //@ts-expect-error testing invalid input
    expect(nearestVector.bind(null, [], [], { distanceFunction: 1 })).toThrow(
      "A similarity or distance function it's required",
    );
  });

  it('find nearest vector', () => {
    const centers = [
      [1, 2, 1],
      [-1, -1, -1],
    ];
    const data = [
      [1, 1, 1],
      [1, 2, 1],
      [-1, -1, -1],
      [-1, -1, -1.5],
    ];
    const clusterID = [0, 0, 1, 1];

    for (let i = 0; i < clusterID.length; i++) {
      expect(findNearestVector(centers, data[i])).toStrictEqual(
        centers[clusterID[i]],
      );
    }
  });
});
