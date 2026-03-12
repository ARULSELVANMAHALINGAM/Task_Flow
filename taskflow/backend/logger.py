import logging
import json
import datetime
from incident_forwarder import forward_incident

class JSONFormatter(logging.Formatter):
    def format(self, record):
        error_type = getattr(record, 'error_type', record.levelname)
        message = record.getMessage()
        file_name = getattr(record, 'file_name', record.filename)
        
        log_obj = {
            "error_type": error_type,
            "message": message,
            "file": file_name,
            "service": "task-api",
            "timestamp": datetime.datetime.now(datetime.timezone.utc).isoformat()
        }
        return json.dumps(log_obj)

logger = logging.getLogger("TaskFlowLogger")
logger.setLevel(logging.INFO)

handler = logging.StreamHandler()
handler.setFormatter(JSONFormatter())
logger.addHandler(handler)

def log_event(level, error_type, message, file_name):
    timestamp = datetime.datetime.now(datetime.timezone.utc).isoformat()
    log_obj = {
        "error_type": error_type,
        "message": message,
        "file": file_name,
        "service": "task-api",
        "timestamp": timestamp
    }
    
    if level >= logging.ERROR:
        logger.error(message, extra={"error_type": error_type, "file_name": file_name})
        forward_incident(log_obj)
    else:
        logger.info(message, extra={"error_type": error_type, "file_name": file_name})

def log_info(message, file_name=""):
    log_event(logging.INFO, "INFO", message, file_name)

def log_error(error_type, message, file_name):
    log_event(logging.ERROR, error_type, message, file_name)
