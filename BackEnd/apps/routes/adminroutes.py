from flask import Blueprint
from apps.controllers import ProjectController, NoteController, AdminController
from apps.utils.auth import jwt_required_custom

def register_routes(app):
    bp = Blueprint('api', __name__, url_prefix='/api')

    # Login Admin
    bp.route('/login', methods=['POST'])(AdminController.login_admin)
    bp.route('/admin', methods=['GET'])(AdminController.get_current_admin_id)

    # Routes for Project (CRUD)
    bp.route('/project', methods=['POST'])(jwt_required_custom(ProjectController.create_project))
    bp.route('/project', methods=['GET'])(ProjectController.get_all_projects)
    bp.route('/project/<int:project_id>', methods=['GET'])(ProjectController.get_project)
    bp.route('/project/<int:project_id>', methods=['PUT'])(jwt_required_custom(ProjectController.update_project))
    bp.route('/project/<int:project_id>', methods=['DELETE'])(jwt_required_custom(ProjectController.delete_project))

    # Routes for Note (CRUD)
    bp.route('/note', methods=['POST'])(jwt_required_custom(NoteController.create_note))
    bp.route('/note', methods=['GET'])(NoteController.get_notes)
    bp.route('/note/<int:note_id>', methods=['GET'])(NoteController.get_note)
    bp.route('/note/<int:note_id>', methods=['PUT'])(jwt_required_custom(NoteController.update_note))
    bp.route('/note/<int:note_id>', methods=['DELETE'])(jwt_required_custom(NoteController.delete_note))

    app.register_blueprint(bp)

    # 🔹 Print daftar route
    print("\n=== Registered Routes ===")
    for rule in app.url_map.iter_rules():
        methods = ",".join(sorted(rule.methods - {"HEAD", "OPTIONS"}))
        print(f"{rule.endpoint:30s} {methods:20s} {rule}")
    print("=========================\n")
