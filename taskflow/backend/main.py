from fastapi import FastAPI, Depends, Request
from fastapi.middleware.cors import CORSMiddleware
from routers import auth, projects, tasks
from logger import log_error, log_info
from pydantic import BaseModel
from fastapi.responses import JSONResponse

app = FastAPI(title="TaskFlow API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, tags=["Authentication"])
app.include_router(projects.router, tags=["Projects"])
app.include_router(tasks.router, tags=["Tasks"])


@app.get("/")
def root():
    return {"message": "TaskFlow Backend Running"}



@app.post("/parse-log")
def parse_log(payload: dict):
    print(f"\n--- INCIDENT PLATFORM RECEIVED LOG ---")
    import json
    print(json.dumps(payload, indent=2))
    print("--------------------------------------\n")
    return {"status": "received"}

# Exception handler to return JSON and avoid app crash for manual trigger error
@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    return JSONResponse(
        status_code=500,
        content={"message": str(exc)},
    )
