import express from "express";
import cors from "cors";
import PolkadotService from './polkadotService.js';

const app = express();
// Enable CORS for the Streamlit UI / Live Server. You can restrict origin later.
app.use(cors());
app.options('*', cors());
app.use(express.json());

// Initialize Polkadot Service
let polkadotService: PolkadotService;

app.post("/chat", async (req, res) => {
    const messageRaw = req.body.message;
    console.log("RAW MESSAGE:", messageRaw);

    const message = (messageRaw || "").toLowerCase().trim();
    console.log("NORMALIZED MESSAGE:", message);

    let responseText = "";

    // --- EXTREMELY PERMISSIVE MATCHING ---
    if (
        message.includes("on-demand") ||
        message.includes("on demand") ||
        message.includes("on_demand") ||
        message.includes("ondemand") ||
        (message.includes("demand") && message.includes("price")) ||
        message.includes("coretime price") ||
        message.includes("spot price") ||
        message.includes("price")
    ) {
        console.log("Matched: ON-DEMAND PRICE");

        const price = await polkadotService.getOnDemandPrice();
        responseText = `Current on-demand coretime price: ${price}`;
    }

    // --- GUARANTEED NON-EMPTY RESPONSE ---
    if (!responseText) {
        responseText = "❗I couldn't understand your question. Try asking: 'What is the on-demand coretime price?'";
    }

    return res.json({ response: responseText });
});


// START EXPRESS
async function start() {
  polkadotService = await PolkadotService.connect();
  app.listen(3001, () => {
    console.log("Express REST API running at http://localhost:3001");
  });
}

start().catch(console.error);
