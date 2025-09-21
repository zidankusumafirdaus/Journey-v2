import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    # Flask / JWT
    SECRET_KEY = os.getenv('SECRET_KEY', 'super-secret-key')
    JWT_SECRET_KEY = SECRET_KEY

    # Supabase PostgreSQL
    DB_HOST = os.getenv('DB_HOST')
    DB_PORT = int(os.getenv('DB_PORT', 6543))
    DB_NAME = os.getenv('DB_NAME')
    DB_USER = os.getenv('DB_USER')
    DB_PASSWORD = os.getenv('DB_PASSWORD')

    # Superadmin (login)
    SUPERADMIN_USERNAME = os.getenv('SUPERADMIN_USERNAME', 'admin')
    SUPERADMIN_PASSWORD = os.getenv('SUPERADMIN_PASSWORD', 'admin123')
    SUPERADMIN_EMAIL = os.getenv('SUPERADMIN_EMAIL', 'admin@example.com')
    SUPERADMIN_NAME = os.getenv('SUPERADMIN_NAME', 'Super Admin')
