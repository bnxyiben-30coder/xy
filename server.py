# server.py
from http.server import HTTPServer, SimpleHTTPRequestHandler
import os

class Handler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Cache-Control', 'no-cache')
        super().end_headers()

if __name__ == "__main__":
    port = 8000
    server_address = ('', port)
    httpd = HTTPServer(server_address, Handler)
    print(f"🚀 Server running at http://localhost:{port}")
    print("Open browser → http://localhost:8000")
    httpd.serve_forever()