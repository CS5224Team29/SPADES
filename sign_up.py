from models.base import *
import json

session = get_session()


def sign_up(user_id, name, email):
    user = User(id=user_id, name=name, email=email)
    session.add(user)
    session.commit()
    return {"data": f"{name} has signed up successfully"}


def lambda_handler(event, context):
    event_body = event.get("body")
    body = json.loads(event_body)
    user_id = body.get("user_id", "")
    name = body.get("name", "")
    email = body.get("email", "")
    final_data = sign_up(user_id, name, email)
    return {"statusCode": 200, "body": json.dumps(final_data)}
