from fastapi import APIRouter, Depends, HTTPException, Body
from database import get_db
from pydantic import BaseModel
from logger import log_info, log_error
from typing import Optional

router = APIRouter()

class TaskCreate(BaseModel):
    title: str
    description: Optional[str] = None
    project_id: int
    status: str = "Pending"

class TaskStatusUpdate(BaseModel):
    task_id: int
    status: str

@router.post("/tasks")
def create_task(task: TaskCreate, db = Depends(get_db)):
    if not task.title:
        raise HTTPException(status_code=400, detail="Task title is required")

    new_task = db.add_task(
        task.title,
        task.description,
        task.project_id,
        task.status
    )
    log_info(f"Task '{task.title}' created successfully", "tasks.py")
    return new_task

@router.get("/tasks/{project_id}")
def get_tasks(project_id: int, db = Depends(get_db)):
    tasks = db.get_tasks_by_project(project_id)
    log_info(f"Fetched tasks for project_id {project_id}", "tasks.py")
    return tasks

@router.post("/assign-task")
def assign_task(payload: dict = Body(...), db = Depends(get_db)):
    userId = payload.get("userId")
    task_id = payload.get("task_id")
    
    if not userId:
        raise HTTPException(status_code=400, detail="User ID is required")
        
    task = db.assign_task(task_id, userId)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
        
    log_info(f"Task {task_id} assigned to user {userId}", "tasks.py")
    return task

@router.put("/update-task-status")
def update_task_status(update: TaskStatusUpdate, db = Depends(get_db)):
    task = db.update_task_status(update.task_id, update.status)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
        
    log_info(f"Task {update.task_id} status updated to {update.status}", "tasks.py")
    return task
