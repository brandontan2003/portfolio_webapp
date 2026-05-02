import requests
import json

def test_chat(query):
    url = "http://localhost:8000/chat"
    payload = {"message": query}
    headers = {"Content-Type": "application/json"}
    
    print(f"\nQUERY: {query}")
    try:
        response = requests.post(url, json=payload, headers=headers)
        if response.status_code == 200:
            print(f"RESPONSE: {response.json().get('reply')}")
        else:
            print(f"ERROR: {response.status_code} - {response.text}")
    except Exception as e:
        print(f"CONNECTION ERROR: {e}")

if __name__ == "__main__":
    print("--- STARTING BACKEND FEATURE TEST ---")
    test_chat("What is your GPA?")
    test_chat("Tell me about your experience at Accenture.")
    test_chat("What are your skills?")
    test_chat("What is the weather today?")
    print("\n--- TEST COMPLETE ---")
