// Inside container, backend service is accessible as "backend"
const BACKEND_URL = "http://backend:5000";

// Save score
async function saveScore(score) {
  await fetch(`${BACKEND_URL}/api/save`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ score }),
  });
}

// Get best score
async function getBestScore() {
  const res = await fetch(`${BACKEND_URL}/api/best`);
  const data = await res.json();
  return data.best;
}
