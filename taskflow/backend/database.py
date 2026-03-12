import json
import os

# File-based JSON storage
class Storage:
    def __init__(self, file_path="data.json"):
        self.file_path = file_path
        self.users = [
            {"id": 1, "name": "Demo User", "email": "demo@taskflow.com", "password": "password"}
        ]
        self.projects = []
        self.tasks = []
        self._user_id_counter = 2
        self._project_id_counter = 1
        self._task_id_counter = 1
        
        self._load_data()

    def _load_data(self):
        if os.path.exists(self.file_path):
            try:
                with open(self.file_path, "r") as f:
                    data = json.load(f)
                    self.users = data.get("users", self.users)
                    self.projects = data.get("projects", [])
                    self.tasks = data.get("tasks", [])
                    self._user_id_counter = data.get("user_id_counter", 2)
                    self._project_id_counter = data.get("project_id_counter", 1)
                    self._task_id_counter = data.get("task_id_counter", 1)
            except Exception as e:
                print(f"Error loading data: {e}")

    def _save_data(self):
        try:
            with open(self.file_path, "w") as f:
                json.dump({
                    "users": self.users,
                    "projects": self.projects,
                    "tasks": self.tasks,
                    "user_id_counter": self._user_id_counter,
                    "project_id_counter": self._project_id_counter,
                    "task_id_counter": self._task_id_counter
                }, f, indent=4)
        except Exception as e:
            print(f"Error saving data: {e}")

    def get_user_by_email(self, email):
        return next((u for u in self.users if u["email"] == email), None)

    def add_project(self, name, description, created_by):
        project = {
            "id": self._project_id_counter,
            "project_name": name,
            "description": description,
            "created_by": created_by
        }
        self.projects.append(project)
        self._project_id_counter += 1
        self._save_data()
        return project

    def get_projects(self):
        return self.projects

    def add_task(self, title, description, project_id, status):
        task = {
            "id": self._task_id_counter,
            "title": title,
            "description": description,
            "project_id": project_id,
            "assigned_user_id": None,
            "status": status,
            "created_at": None
        }
        self.tasks.append(task)
        self._task_id_counter += 1
        self._save_data()
        return task

    def get_tasks_by_project(self, project_id):
        return [t for t in self.tasks if t["project_id"] == project_id]

    def assign_task(self, task_id, user_id):
        for t in self.tasks:
            if t["id"] == task_id:
                t["assigned_user_id"] = user_id
                self._save_data()
                return t
        return None

    def update_task_status(self, task_id, status):
        for t in self.tasks:
            if t["id"] == task_id:
                t["status"] = status
                self._save_data()
                return t
        return None

db_store = Storage()

def get_db():
    return db_store

