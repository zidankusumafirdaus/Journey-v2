from .ProjectModels import Project
from .NoteModels import Note

def create_tables():
    from apps.extensions import database
    with database:
        database.create_tables([Project, Note], safe=True)
