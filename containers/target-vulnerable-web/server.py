from http.server import HTTPServer, BaseHTTPRequestHandler
import json
import os

FLAG = os.environ.get("TARGET_FLAG", "RANGE{web_detective_default}")

class VulnerableHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        if self.path == '/':
            self.send_response(200)
            self.send_header('Content-type', 'text/html')
            self.send_header('Server', 'training-app/1.0-vulnerable')
            self.end_headers()
            html = """
            <!doctype html>
            <html>
            <head><title>Internal Portal - Training Target</title></head>
            <body style="font-family: monospace; background: #111; color: #0f0; padding: 40px;">
                <h1>[!] INTRANET TARGET APPLICATION</h1>
                <p>Welcome to the isolated lab network target machine (10.10.0.10:8080).</p>
                <p>Check developer notes or analyze HTTP headers to uncover security flaws.</p>
                <!-- Security Note: Debug token exposed in /debug endpoint -->
            </body>
            </html>
            """
            self.wfile.write(html.encode())
        elif self.path == '/debug':
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            data = {"status": "debug_mode", "flag": FLAG, "service": "vulnerable_api"}
            self.wfile.write(json.dumps(data).encode())
        else:
            self.send_response(404)
            self.end_headers()

if __name__ == '__main__':
    server = HTTPServer(('0.0.0.0', 8080), VulnerableHandler)
    print("Vulnerable target listening on port 8080...")
    server.serve_forever()
