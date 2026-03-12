from fastapi import APIRouter, Depends, HTTPException
from database import get_db
from pydantic import BaseModel
from logger import log_info, log_error
from typing import Optional

router = APIRouter()

class ProjectCreate(BaseModel):
    project_name: str
    description: Optional[str] = None
    created_by: int

@router.post("/projects")
def create_project(project: ProjectCreate, db = Depends(get_db)):
    new_project = db.add_project(
        project.project_name,
        project.description,
        project.created_by
    )
    log_info(f"Project '{project.project_name}' created successfully", "projects.py")
    return new_project

@router.get("/projects")
def get_projects(db = Depends(get_db)):
    projects = db.get_projects()
    log_info("Fetched all projects", "projects.py")
    return projects
