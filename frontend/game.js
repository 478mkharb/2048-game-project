let board = [];
let score = 0;
const size = 4;

// Sound effects
const sounds = {
  move: new Audio("assets/new-tile.mp3"),  // play when tiles move
  merge: new Audio("assets/tile-merge.mp3"), // play when tiles merge
  spawn: new Audio("assets/game-over.mp3")  // play when new tile appears
};

// Spawn a new tile
function spawn() {
  let empty = [];
  for (let r = 0; r < size; r++)
    for (let c = 0; c < size; c++)
      if (board[r][c] === 0) empty.push([r, c]);
  if (empty.length) {
    const [r, c] = empty[Math.floor(Math.random() * empty.length)];
    board[r][c] = Math.random() < 0.9 ? 2 : 4;
    sounds.spawn.play();
  }
}

// Slide & merge
function slide(row) {
  row = row.filter(v => v !== 0);
  for (let i = 0; i < row.length - 1; i++) {
    if (row[i] === row[i + 1]) {
      row[i] *= 2;
      score += row[i];
      row[i].merged = true;
      row.splice(i + 1, 1);
      sounds.merge.play();
    }
  }
  while (row.length < size) row.push(0);
  return row;
}

// Move tiles
function move(dir) {
  let moved = false;
  if (dir === "left" || dir === "right") {
    for (let r = 0; r < size; r++) {
      let row = board[r].slice();
      if (dir === "right") row.reverse();
      let newRow = slide(row);
      if (dir === "right") newRow.reverse();
      if (row.toString() !== newRow.toString()) moved = true;
      board[r] = newRow;
    }
  } else {
    for (let c = 0; c < size; c++) {
      let col = [];
      for (let r = 0; r < size; r++) col.push(board[r][c]);
      if (dir === "down") col.reverse();
      let newCol = slide(col);
      if (dir === "down") newCol.reverse();
      for (let r = 0; r < size; r++) {
        if (board[r][c] !== newCol[r]) moved = true;
        board[r][c] = newCol[r];
      }
    }
  }
  if (moved) {
    sounds.move.play();
    spawn();
    render();
  }
}

// Render board
function render() {
  const b = document.getElementById("board");
  b.innerHTML = "";
  for (let r = 0; r < size; r++)
    for (let c = 0; c < size; c++) {
      const d = document.createElement("div");
      const val = board[r][c].value || board[r][c]; // support legacy numbers
      d.className = "tile" + (val ? ` t${val}` : "");
      d.textContent = val || "";
      b.appendChild(d);
    }
  document.getElementById("score").innerText = score;
}

// Initialize
function init() {
  board = Array.from({ length: size }, () => Array(size).fill(0));
  score = 0;
  spawn();
  spawn();
  render();
}

// Keyboard controls
window.addEventListener("keydown", e => {
  const keys = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];
  if (keys.includes(e.key)) {
    e.preventDefault();
    move(e.key.replace("Arrow", "").toLowerCase());
  }
});

document.getElementById("newGame").addEventListener("click", init);
window.addEventListener("DOMContentLoaded", init);
