from peewee import CharField, TextField
from apps.extensions import BaseModel

class Note(BaseModel):
    judul = CharField()
    foto = CharField(null=True)
    text = TextField() 