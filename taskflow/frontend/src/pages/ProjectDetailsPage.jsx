import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Plus, UserPlus, CheckCircle2, Clock, CircleDashed } from 'lucide-react';
import api from '../api';
import toast from 'react-hot-toast';

export default function ProjectDetailsPage() {
    const { id } = useParams();
    const [tasks, setTasks] = useState([]);
    const [projectInfo, setProjectInfo] = useState({ name: 'Project Details' });

    useEffect(() => {
        fetchTasks();
        // Simulate fetching project info, for demo just setting static
    }, [id]);

    const fetchTasks = async () => {
        try {
            const res = await api.get(`/tasks/${id}`);
            setTasks(res.data);
        } catch (error) {
            // Error handled by interceptor
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'Completed': return <CheckCircle2 className="text-emerald-500" size={20} />;
            case 'In Progress': return <Clock className="text-amber-500" size={20} />;
            default: return <CircleDashed className="text-indigo-500" size={20} />;
        }
    };

    const handleStatusUpdate = async (taskId, newStatus) => {
        try {
            await api.put('/update-task-status', { task_id: taskId, status: newStatus });
            toast.success('Task status updated');
            fetchTasks();
        } catch (err) {
            // handled
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">{projectInfo.name}</h1>
                    <p className="text-gray-500 mt-1">Manage all tasks for this project efficiently.</p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                    <Link
                        to={`/projects/${id}/tasks/create`}
                        className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 px-5 rounded-lg shadow-sm transition-all"
                    >
                        <Plus size={18} />
                        <span>Create Task</span>
                    </Link>
                    <Link
                        to={`/projects/${id}/tasks/assign`}
                        className="flex items-center space-x-2 bg-slate-800 hover:bg-slate-900 text-white font-semibold py-2.5 px-5 rounded-lg shadow-sm transition-all"
                    >
                        <UserPlus size={18} />
                        <span>Assign Task</span>
                    </Link>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 border-b border-gray-200">
                                <th className="py-4 px-6 font-semibold text-gray-700">ID</th>
                                <th className="py-4 px-6 font-semibold text-gray-700">Task Title</th>
                                <th className="py-4 px-6 font-semibold text-gray-700">Assignee ID</th>
                                <th className="py-4 px-6 font-semibold text-gray-700">Status</th>
                                <th className="py-4 px-6 font-semibold text-gray-700">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tasks.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="py-12 text-center text-gray-500 font-medium">
                                        No tasks found. Create a new task to get started.
                                    </td>
                                </tr>
                            ) : (
                                tasks.map((task) => (
                                    <tr key={task.id} className="border-b last:border-0 hover:bg-slate-50/50 transition-colors">
                                        <td className="py-4 px-6 font-medium text-gray-900">{task.id}</td>
                                        <td className="py-4 px-6">
                                            <div className="font-semibold text-gray-800">{task.title}</div>
                                            <div className="text-sm text-gray-500 truncate max-w-xs">{task.description}</div>
                                        </td>
                                        <td className="py-4 px-6">
                                            {task.assigned_user_id ? (
                                                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-800">
                                                    User #{task.assigned_user_id}
                                                </span>
                                            ) : (
                                                <span className="text-gray-400 italic text-sm">Unassigned</span>
                                            )}
                                        </td>
                                        <td className="py-4 px-6">
                                            <div className="flex items-center space-x-2">
                                                {getStatusIcon(task.status)}
                                                <span className="font-medium text-gray-700">{task.status}</span>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <select
                                                className="text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 py-1.5 px-3 bg-white"
                                                value={task.status}
                                                onChange={(e) => handleStatusUpdate(task.id, e.target.value)}
                                            >
                                                <option value="Pending">Pending</option>
                                                <option value="In Progress">In Progress</option>
                                                <option value="Completed">Completed</option>
                                            </select>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
