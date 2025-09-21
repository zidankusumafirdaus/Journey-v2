from peewee import PostgresqlDatabase, Model
from config import Config

database = PostgresqlDatabase(
    Config.DB_NAME,
    user=Config.DB_USER,
    password=Config.DB_PASSWORD,
    host=Config.DB_HOST,
    port=Config.DB_PORT
)

class BaseModel(Model):
    class Meta:
        database = database