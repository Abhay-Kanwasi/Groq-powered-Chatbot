import re

def clean_response(response_text):
    return re.sub(r"</?think>", "", response_text).strip() if "</think>" in response_text or "<think>" in response_text else response_text
