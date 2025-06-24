class Cube {
  constructor() {
    this.faces = {
      U: Array(9).fill('w'),
      D: Array(9).fill('y'),
      F: Array(9).fill('r'),
      B: Array(9).fill('o'),
      L: Array(9).fill('g'),
      R: Array(9).fill('b')
    };
  }

  rotateFace(face, dir = 'CW') {
    this.faces[face] = this.rotateFaceStickers(this.faces[face], dir);
    this.rotateAdjacentFaces(face, dir);
  }

  rotateFaceStickers(stickers, dir) {
    const map = dir === 'CW'
      ? [6,3,0,7,4,1,8,5,2]
      : [2,5,8,1,4,7,0,3,6];
    return map.map(i => stickers[i]);
  }

  rotateAdjacentFaces(face, dir) {
    const edges = {
      U: [['B',0], ['R',0], ['F',0], ['L',0]],
      D: [['F',6], ['R',6], ['B',6], ['L',6]],
      F: [['U',6], ['R',0,true], ['D',2,true], ['L',8]],
      B: [['U',2], ['L',0,true], ['D',6,true], ['R',8]],
      L: [['U',0], ['F',0], ['D',0], ['B',8,true]],
      R: [['U',8], ['B',0,true], ['D',8], ['F',8]]
    };

    let cycle = edges[face];
    let strips = cycle.map(([f, pos, rev]) => this.getEdge(this.faces[f], pos, rev));
    if (dir === 'CW') strips.unshift(strips.pop());
    else strips.push(strips.shift());
    cycle.forEach(([f, pos, rev], i) => this.setEdge(this.faces[f], pos, strips[i], rev));
  }

  getEdge(face, pos, reverse = false) {
    const map = {
      0: [0,1,2], 2: [2,5,8], 6: [6,7,8], 8: [0,3,6]
    };
    let values = map[pos].map(i => face[i]);
    return reverse ? values.reverse() : values;
  }

  setEdge(face, pos, values, reverse = false) {
    const map = {
      0: [0,1,2], 2: [2,5,8], 6: [6,7,8], 8: [0,3,6]
    };
    let indices = map[pos];
    values = reverse ? values.reverse() : values;
    indices.forEach((i, j) => face[i] = values[j]);
  }

  getCubeString() {
    return Object.values(this.faces).map(face => face.join('')).join('');
  }
}
