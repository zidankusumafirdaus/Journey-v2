from peewee import *
from apps.extensions import database

class BaseModel(Model):
    class Meta:
        database = database

class Project(BaseModel):
    judul = CharField()
    deskripsi = TextField()
    teknologi = TextField()
    foto = CharField(null=True)
    tahun = IntegerField()
    bulan = IntegerField()
    tanggal = IntegerField()
    link = CharField(null=True)