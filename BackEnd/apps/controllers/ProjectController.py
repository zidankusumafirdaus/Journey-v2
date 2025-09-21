from flask import request, jsonify
from apps.models.ProjectModels import Project
from playhouse.shortcuts import model_to_dict
from apps.utils.auth import jwt_required_custom

# Inputan 1 / Lebih dari 1
def normalize_teknologi(value):
    if isinstance(value, list):
        return ",".join(value)
    return value

# Data agar bisa digunakan di JSON dan Form
def get_request_data():
    data = request.get_json(silent=True)
    if data is None:
        data = request.form.to_dict()
    return data

@jwt_required_custom
def create_project():
    data = get_request_data()
    project = Project.create(
        judul=data.get('judul'),
        deskripsi=data.get('deskripsi'),
        teknologi=normalize_teknologi(data.get('teknologi')),
        foto=data.get('foto'),
        tahun=data.get('tahun'),
        bulan=data.get('bulan'),
        tanggal=data.get('tanggal'),
        link=data.get('link') 
    )
    return jsonify({'message': 'project created', 'id': project.id})


def get_all_projects():
    projects = Project.select()
    return jsonify([model_to_dict(p) for p in projects])


def get_project(project_id):
    try:
        project = Project.get_by_id(project_id)
        return jsonify(model_to_dict(project))
    except Project.DoesNotExist:
        return jsonify({'error': 'project not found'}), 404

@jwt_required_custom
def update_project(project_id):
    try:
        project = Project.get_by_id(project_id)
        data = get_request_data()
        project.judul = data.get('judul', project.judul)
        project.deskripsi = data.get('deskripsi', project.deskripsi)
        project.teknologi = normalize_teknologi(data.get('teknologi')) or project.teknologi
        project.foto = data.get('foto', project.foto)
        project.tahun = data.get('tahun', project.tahun)
        project.bulan = data.get('bulan', project.bulan)
        project.tanggal = data.get('tanggal', project.tanggal)
        project.link = data.get('link', project.link)
        project.save()
        return jsonify({'message': 'project updated'})
    except Project.DoesNotExist:
        return jsonify({'error': 'project not found'}), 404

@jwt_required_custom
def delete_project(project_id):
    try:
        project = Project.get_by_id(project_id)
        project.delete_instance()
        return jsonify({'message': 'project deleted'})
    except Project.DoesNotExist:
        return jsonify({'error': 'project not found'}), 404