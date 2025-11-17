import express from "express";
import cors from "cors";
import PolkadotService from './polkadotService.js';

// ---------------- EXPRESS SERVER ----------------
const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("ok");
});

let polkadotService: any;

app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) return res.status(400).json({ error: "message required" });

    const price = await polkadotService.getOnDemandPrice();
    const reply = `On-demand price: ${price}`;

    return res.json({ reply });
  } catch (err) {
    console.error("ERROR in /chat:", err);
    return res.status(500).json({ error: "Server error" });
  }
});

// ---------------- START EVERYTHING ----------------
async function start() {
  // Connect to Polkadot
  polkadotService = await PolkadotService.connect();

  console.log("REST API running at http://localhost:3001");

  app.listen(3001, () => {
    console.log("Backend REST API listening on http://localhost:3001");
  });

  // Keep running
  await new Promise(() => {});
}

start().catch((e) => {
  console.error("FATAL STARTUP ERROR:", e);
});
