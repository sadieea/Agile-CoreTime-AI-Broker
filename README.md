# Agile Coretime AI Broker  
*A Radically Open, Radically Useful Project*

---

## 1. Project Overview

The **Agile Coretime AI Broker** is a standalone, AI-powered assistant built for the **Polkadot ecosystem**. Its mission is to make Polkadot 2.0's powerful (but complex) Agile Coretime market accessible to everyone.

Instead of dealing with complex APIs and blockchain queries, users simply ask natural-language questions. The assistant connects directly to the Polkadot testnet to fetch live data, analyze it, and give intelligent insights.

This project was built for the **“Bring Web2 Applications to Web3” Hackathon**, reflecting:

- **Polkadot Tinkerers:** novel tools built on Polkadot SDK  
- **User-centric Apps:** simplifying complex blockchain interactions

### 🔥 The Problem

Agile Coretime replaces parachain auctions with a flexible, on-demand market.  
Powerful—yes.  
Easy—no.

Developers suddenly have to act like **commodity traders**, tracking prices, analyzing supply, and managing assets.

### 🌟 The Solution

Your **AI Broker** acts as a personal expert:

- Queries **live coretime market prices** (on-demand + bulk)
- Analyzes your **current holdings**
- Gives **smart recommendations** within your budget
- *(In progress)* Executes buy/sell/manage Coretime transactions

---

## 2. Architecture

The project follows a clean **Frontend Face / Backend Brain** setup.

### 🧠 Backend — `src/mcp-server.ts`

- **Tech:** Node.js, Express, TypeScript  
- **Polkadot Connector:** `@polkadot/api`  
- **AI Tools:** `@modelcontextprotocol/sdk`  
- **Purpose:** Defines tools like `queryOnDemandPrice`, handles blockchain queries, and responds to frontend requests  
- **Endpoint:** `POST /` (main AI interaction)

### 🎨 Frontend — `app.py`

- **Tech:** Streamlit (Python)  
- **Purpose:** Real-time chat UI  
- **Connector:** Sends messages to the backend using `requests`  
- **Role:** Displays responses from the AI Broker

---

## 3. Features & AI Tools

### ✅ Read-Only Tools (Fully Working)

#### `queryOnDemandPrice`
Fetches the **live spot price** of on-demand Coretime from the **Westend Relay Chain**.

#### `queryBulkSaleInfo`
Fetches sale info (price, cores, end date) for bulk Coretime from the **Coretime Parachain**.

> ⚠️ Sometimes the parachain is offline — the assistant will notify you gracefully.

#### `recommendPurchase`
Given a **budget**, the AI analyzes:
- on-demand price  
- bulk sale price  
and returns the **most cost-effective recommendation**.

---

### 📝 Transaction Tools (Implemented but Paused)

These work but are disabled until the Coretime testnet stabilizes:

- `enableAutoRenewal` — auto-renew bulk Coretime NFT  
- `listCoretimeForSale` — list a Coretime NFT on the marketplace  

---

## 4. Setup & Usage Instructions

You'll run two terminals: **backend** and **frontend**.

---

### 🖥️ Terminal 1 — Backend (Node.js Server)

Clone the repository:

```bash
git clone https://github.com/sadieea/Agile-CoreTime-AI-Broker.git
cd Agile-CoreTime-AI-Broker
```

Install dependencies:
```bash
npm install
```

Start the backend:
```bash
npm start
```

You should see logs confirming connection to Westend Relay Chain.

---

###💻 Terminal 2 — Frontend (Streamlit UI)

Install Python dependencies:
```bash
pip install streamlit requests
```

Run the Streamlit app:
```bash
streamlit run app.py
```

Your browser will open automatically (usually http://localhost:8501).

You can now chat with your AI Coretime Broker!

---

##5. Example Prompts

Try asking:

“What is the on-demand coretime price?”

“What’s the status of the bulk sale?”

“I have a budget of 500 units, what do you recommend?”
