from http.server import HTTPServer, SimpleHTTPRequestHandler
import os


class StaticServer(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(
            *args,
            directory=os.path.dirname(
                os.path.abspath(__file__)
            ),
            **kwargs
        )


def run(port=8000):
    server_address = ('', port)
    httpd = HTTPServer(server_address, StaticServer)
    print(f"Server running on http://localhost:{port}")
    httpd.serve_forever()


if __name__ == '__main__':
    # Read port from environment (useful in containers and Cloud Run)
    try:
        port = int(os.environ.get("PORT", 8000))
    except ValueError:
        port = 8000
    run(port)
