import hmac
import hashlib
import base64


def calculate_secret_hash(client_secret, username, client_id):
    message = username + client_id
    dig = hmac.new(
        str(client_secret).encode("utf-8"),
        msg=str(message).encode("utf-8"),
        digestmod=hashlib.sha256,
    ).digest()
    secret_hash = base64.b64encode(dig).decode()
    return secret_hash
