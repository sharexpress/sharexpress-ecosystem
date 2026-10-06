# Copyright 2026 Sharexpress Contributors
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

import subprocess
import json
import urllib.request
import urllib.error
import datetime

LOG_FILE = "/home/santusht/pm2_watcher.log"

def log(message):
    timestamp = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    log_line = f"[{timestamp}] {message}\n"
    try:
        with open(LOG_FILE, "a") as f:
            f.write(log_line)
    except Exception:
        pass
    print(log_line.strip())

def check_pm2_processes():
    try:
        # Get JSON process list from PM2
        result = subprocess.run(["pm2", "jlist"], capture_output=True, text=True, check=True)
        processes = json.loads(result.stdout)
    except Exception as e:
        log(f"Error executing pm2 jlist: {e}")
        return

    # Map product names to ports for HTTP checks
    http_checks = {
        "sharexpress": 8002,
        "interleet-8001": 8001,
        "interleet-8003": 8003,
        "interleet-8004": 8004,
        "interleet-8005": 8005
    }

    for proc in processes:
        name = proc.get("name")
        pm_id = proc.get("pm_id")
        env = proc.get("pm2_env", {})
        status = env.get("status")

        # 1. PM2 Process Status Check
        if status != "online":
            log(f"Process '{name}' (ID: {pm_id}) is down (Status: {status}). Restarting...")
            subprocess.run(["pm2", "restart", str(pm_id)])
            continue

        # 2. HTTP Port Health Check
        if name in http_checks:
            port = http_checks[name]
            url = f"http://127.0.0.1:{port}/"
            
            # Use custom request parameters to prevent head filter blocks
            req = urllib.request.Request(url, method="GET")
            try:
                # 3-second timeout for quick local loopback checks
                with urllib.request.urlopen(req, timeout=3) as res:
                    pass
            except urllib.error.HTTPError as e:
                # HTTP errors (like 405, 404, 401) mean the server IS listening, so it's healthy!
                pass
            except Exception as e:
                # Connection refused, timeout, or network socket failures mean the instance is dead!
                log(f"HTTP check failed for '{name}' on port {port} (Error: {e}). Restarting process...")
                subprocess.run(["pm2", "restart", str(pm_id)])

if __name__ == "__main__":
    check_pm2_processes()
