import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api';
import toast from 'react-hot-toast';

export default function AssignTaskPage() {
    const { id } = useParams();
    const [taskId, setTaskId] = useState('');
    const [userId, setUserId] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                task_id: parseInt(taskId),
                userId: parseInt(userId)
            };

            await api.post('/assign-task', payload);
            toast.success('Task assigned successfully!');
            navigate(`/projects/${id}`);
        } catch (error) {
            // Error handled by interceptor
        }
    };

    return (
        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-sm border p-8 mt-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Assign Task</h1>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Task ID
                    </label>
                    <input
                        type="number"
                        value={taskId}
                        onChange={(e) => setTaskId(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                        placeholder="Enter Task ID"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Assign User ID
                    </label>
                    <input
                        type="number"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                        placeholder="Enter User ID"
                        required
                    />
                </div>

                <div className="flex justify-end space-x-4 pt-4">
                    <button
                        type="button"
                        onClick={() => navigate(`/projects/${id}`)}
                        className="px-6 py-2.5 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-6 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-900 text-white font-medium shadow-md transition-all active:scale-95"
                    >
                        Assign User
                    </button>
                </div>
            </form>
        </div>
    );
}
