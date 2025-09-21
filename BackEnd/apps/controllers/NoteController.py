from flask import request, jsonify
from apps.models.NoteModels import Note
from apps.utils.auth import jwt_required_custom

def get_notes():
    notes = [note_to_dict(n) for n in Note.select()]
    return jsonify(notes)

def get_note(note_id):
    note = Note.get_or_none(Note.id == note_id)
    if not note:
        return jsonify({'error': 'Note not found'}), 404
    return jsonify(note_to_dict(note))

@jwt_required_custom
def create_note():
    data = request.json
    note = Note.create(
        judul=data.get('judul'),
        foto=data.get('foto'),
        text=data.get('text')
    )
    return jsonify(note_to_dict(note)), 201

@jwt_required_custom
def update_note(note_id):
    note = Note.get_or_none(Note.id == note_id)
    if not note:
        return jsonify({'error': 'Note not found'}), 404
    data = request.json
    note.judul = data.get('judul', note.judul)
    note.foto = data.get('foto', note.foto)
    note.text = data.get('text', note.text)
    note.save()
    return jsonify(note_to_dict(note))

@jwt_required_custom
def delete_note(note_id):
    note = Note.get_or_none(Note.id == note_id)
    if not note:
        return jsonify({'error': 'Note not found'}), 404
    note.delete_instance()
    return jsonify({'message': 'Note deleted'})

def note_to_dict(note):
    return {
        'id': note.id,
        'judul': note.judul,
        'foto': note.foto,
        'text': note.text
    }