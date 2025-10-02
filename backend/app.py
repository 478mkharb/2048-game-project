# backend/app.py
from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3, os

app = Flask(__name__)
CORS(app)

DB_PATH = "data/scores.db"
os.makedirs("data", exist_ok=True)

def init_db():
    conn = sqlite3.connect(DB_PATH)
    cur = conn.cursor()
    cur.execute("CREATE TABLE IF NOT EXISTS scores (id INTEGER PRIMARY KEY, score INTEGER)")
    conn.commit()
    conn.close()

init_db()

@app.route("/api/ping")
def ping():
    return jsonify({"message": "pong"})

@app.route("/api/best", methods=["GET"])
def best_score():
    conn = sqlite3.connect(DB_PATH)
    cur = conn.cursor()
    cur.execute("SELECT MAX(score) FROM scores")
    best = cur.fetchone()[0]
    conn.close()
    return jsonify({"best": best if best else 0})

@app.route("/api/save", methods=["POST"])
def save_score():
    data = request.json
    score = data.get("score", 0)
    conn = sqlite3.connect(DB_PATH)
    cur = conn.cursor()
    cur.execute("INSERT INTO scores (score) VALUES (?)", (score,))
    conn.commit()
    conn.close()
    return jsonify({"status": "ok", "score": score})

@app.route("/")
def home():
    return """
    <h1>Welcome to 2048 Game Backend!</h1>
    <p>API Endpoints:</p>
    <ul>
      <li>GET /api/best - Get best score</li>
      <li>POST /api/save - Save a score</li>
    </ul>
    <p>Go back to your frontend to play the game!</p>
    """
@app.route("/health")
def health():
    return "OK", 200

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
