from flask import Flask
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from apps.models import Project
from apps.extensions import database
from apps.routes.adminroutes import register_routes
from config import Config

def create_app():
    app = Flask(__name__)

    # Load config
    app.config.from_object(Config)

    # Enable CORS
    CORS(app, resources={r"/api/*": {"origins": ["https://zidan-nu.vercel.app"]}})

    # Init JWT
    jwt = JWTManager(app)

    # Init database & buat tabel
    with database:
        database.create_tables([Project])

    # Register semua route
    register_routes(app)

    return app