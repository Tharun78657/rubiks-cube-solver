function getCubeSvg(cubeStr) {
  const colors = {
    r: '#ff4136', g: '#2ecc40', b: '#0074d9',
    y: '#ffdc00', o: '#ff851b', w: '#ffffff'
  };
  const faces = cubeStr.match(/.{1,9}/g);
  let html = '<div style="display: grid; grid-template-columns: repeat(12, 20px); gap: 2px;">';

  // U
  for (let i = 0; i < 9; i++)
    html += `<div style="grid-column: ${4 + (i % 3)}; grid-row: ${1 + Math.floor(i / 3)}; width: 20px; height: 20px; background: ${colors[faces[0][i]]}; border: 1px solid #aaa;"></div>`;
  
  // L, F, R, B
  const offsets = [0, 3, 6, 9];
  for (let f = 1; f <= 4; f++) {
    for (let i = 0; i < 9; i++)
      html += `<div style="grid-column: ${1 + offsets[f - 1] + (i % 3)}; grid-row: ${4 + Math.floor(i / 3)}; width: 20px; height: 20px; background: ${colors[faces[f][i]]}; border: 1px solid #aaa;"></div>`;
  }

  // D
  for (let i = 0; i < 9; i++)
    html += `<div style="grid-column: ${4 + (i % 3)}; grid-row: ${7 + Math.floor(i / 3)}; width: 20px; height: 20px; background: ${colors[faces[5][i]]}; border: 1px solid #aaa;"></div>`;

  html += '</div>';
  return html;
}
