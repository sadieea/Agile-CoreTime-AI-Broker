# Coretime Broker Streamlit UI Setup

## Backend
Start the backend server:

```bash
npm start
```

The backend will run at http://localhost:3001 and log "MCP API running at http://localhost:3001" and "Chat endpoint loaded".

## Frontend
Create and activate the Python virtual environment:

**Windows:**
```bash
venv\Scripts\activate
```

**macOS/Linux:**
```bash
source venv/bin/activate
```

Install dependencies (if not already installed):
```bash
pip install -r requirements.txt
```

Run the Streamlit UI:
```bash
streamlit run ui.py
```

The UI will open at http://localhost:8501 by default.
