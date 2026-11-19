import http.server
import urllib.request
import urllib.error
import socketserver
import os
import mimetypes

TARGET_HOST = "http://127.0.0.1:5173"
PORT = 8080
DIST_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "dist"))

class HybridProxyHandler(http.server.BaseHTTPRequestHandler):
    def do_GET(self):
        self.handle_request()

    def do_POST(self):
        self.handle_request()

    def do_HEAD(self):
        self.handle_request()

    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', '*')
        self.end_headers()

    def handle_request(self):
        # 1. Try forwarding to Vite dev server first
        url = f"{TARGET_HOST}{self.path}"
        headers = {}
        for k, v in self.headers.items():
            if k.lower() not in ['host', 'content-length', 'accept-encoding']:
                headers[k] = v
        headers['Host'] = '127.0.0.1:5173'

        content_length = int(self.headers.get('Content-Length', 0))
        body = self.rfile.read(content_length) if content_length > 0 else None
        req = urllib.request.Request(url, data=body, headers=headers, method=self.command)

        try:
            with urllib.request.urlopen(req, timeout=10) as resp:
                self.send_response(resp.status)
                for k, v in resp.getheaders():
                    if k.lower() not in ['transfer-encoding', 'content-encoding']:
                        self.send_header(k, v)
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                self.wfile.write(resp.read())
                return
        except Exception:
            # 2. Fallback to serving compiled static SPA from dist directory
            self.serve_from_dist()

    def serve_from_dist(self):
        if not os.path.isdir(DIST_DIR):
            self.send_response(502)
            self.end_headers()
            self.wfile.write(b"Server unavailable. Please start Vite dev server.")
            return

        clean_path = self.path.split('?')[0].split('#')[0].lstrip('/')
        file_path = os.path.join(DIST_DIR, clean_path)

        if not os.path.isfile(file_path):
            file_path = os.path.join(DIST_DIR, "index.html")

        if os.path.isfile(file_path):
            mime_type, _ = mimetypes.guess_type(file_path)
            mime_type = mime_type or 'application/octet-stream'

            try:
                with open(file_path, 'rb') as f:
                    content = f.read()
                self.send_response(200)
                self.send_header('Content-Type', mime_type)
                self.send_header('Content-Length', str(len(content)))
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                self.wfile.write(content)
            except Exception as e:
                self.send_response(500)
                self.end_headers()
                self.wfile.write(str(e).encode())
        else:
            self.send_response(404)
            self.end_headers()
            self.wfile.write(b"Not Found")

    def log_message(self, format, *args):
        pass

if __name__ == '__main__':
    class ThreadingHTTPServer(socketserver.ThreadingMixIn, http.server.HTTPServer):
        daemon_threads = True

    with ThreadingHTTPServer(('0.0.0.0', PORT), HybridProxyHandler) as server:
        print(f"Hybrid Proxy listening on 0.0.0.0:{PORT} -> {TARGET_HOST}", flush=True)
        server.serve_forever()
