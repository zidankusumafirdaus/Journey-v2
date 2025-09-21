from config import Config
from flask import request, jsonify
from apps.utils.auth import jwt_required_custom
from flask_jwt_extended import create_access_token, get_jwt_identity

def login_admin():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")

    if username == Config.SUPERADMIN_USERNAME and password == Config.SUPERADMIN_PASSWORD:
        token = create_access_token(identity="default_admin")
        return jsonify({
            "message": "Login successful",
            "access_token": token
        })
    return jsonify({"error": "Invalid credentials"}), 401

@jwt_required_custom
def get_current_admin_id():
    identity = get_jwt_identity()
    if identity == 'default_admin':
        return jsonify({"admin_id": "default_admin"})
    return jsonify({"admin_id": identity})