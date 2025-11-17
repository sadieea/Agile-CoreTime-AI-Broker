import streamlit as st
import requests
from sseclient import SSEClient

BACKEND_URL = "http://localhost:3001/chat"

def send_to_backend(message, is_stream=True):
    data = {"message": message, "stream": is_stream}

    if is_stream:
        response = requests.post(BACKEND_URL, json=data, stream=True)

        if response.status_code != 200:
            return f"Error: {response.status_code} - {response.text}"

        client = SSEClient(response)
        full_msg = ""
        for event in client.events():
            if event.data:
                full_msg += event.data
        return full_msg
    else:
        headers = {"Content-Type": "application/json"}
        response = requests.post(BACKEND_URL, json=data, headers=headers)

        if response.status_code != 200:
            return f"Error: {response.status_code} - {response.text}"

        return response.json()["response"]


# --- Streamlit UI ---
st.set_page_config(page_title="CoreTime Broker", page_icon="⚡")

st.title("⚡ CoreTime Broker Chat")

user_input = st.text_input("Ask something:")

use_stream = st.checkbox("Stream response", value=True)

if st.button("Send"):
    if not user_input.strip():
        st.error("Please enter a message.")
    else:
        with st.spinner("Thinking..."):
            result = send_to_backend(user_input, use_stream)

        st.subheader("Response:")
        st.json({"response": result})
