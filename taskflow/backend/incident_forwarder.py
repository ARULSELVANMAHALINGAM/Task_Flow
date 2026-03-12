import requests
from threading import Thread

def send_log_async(payload):
    try:
        requests.post("http://localhost:8000/parse-log", json=payload, timeout=2)
    except Exception:
        pass

def forward_incident(payload):
    Thread(target=send_log_async, args=(payload,)).start()
