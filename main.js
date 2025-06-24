const cube = new Cube();
const output = document.getElementById('output');

function log(stepTitle) {
  const div = document.createElement('div');
  div.innerHTML = `<h3>${stepTitle}</h3>${getCubeSvg(cube.getCubeString())}`;
  output.appendChild(div);
}

let scrambleMoves = [];

function scrambleCube(moves = 10) {
  const faces = ['U','D','F','B','L','R'];
  const dirs = ['CW', 'CCW'];
  scrambleMoves = [];

  for (let i = 0; i < moves; i++) {
    let face = faces[Math.floor(Math.random() * faces.length)];
    let dir = dirs[Math.floor(Math.random() * dirs.length)];
    cube.rotateFace(face, dir);
    scrambleMoves.push({ face, dir });
  }

  log('Scrambled Cube');
}

function solveCube() {
  for (let i = scrambleMoves.length - 1; i >= 0; i--) {
    const { face, dir } = scrambleMoves[i];
    const inverseDir = dir === 'CW' ? 'CCW' : 'CW';
    cube.rotateFace(face, inverseDir);
    log(`Undo ${face} ${dir} → ${face} ${inverseDir}`);
  }

  log('Solved Cube (via Reverse Scramble)');
}

// Run
log('Initial Cube');
scrambleCube();      // Step 3
solveCube();         // Step 4
