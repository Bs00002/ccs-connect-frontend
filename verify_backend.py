import requests
import json
import time

BASE_URL = "http://127.0.0.0:8000/api"

print("Starting backend verification...")

# Wait for server
time.sleep(2)

issues = []

try:
    res = requests.get("http://localhost:8000/api/common/dashboard/")
    print("Dashboard Response:", res.status_code)
except Exception as e:
    issues.append(f"Backend not reachable: {e}")

if not issues:
    print("Backend is running.")
else:
    print("Issues:", issues)
