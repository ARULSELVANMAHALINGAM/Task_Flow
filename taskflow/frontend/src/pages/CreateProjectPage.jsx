import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import toast from 'react-hot-toast';

export default function CreateProjectPage() {
    const [projectName, setProjectName] = useState('');
    const [description, setDescription] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Simulate getting logged in user id
            const user = JSON.parse(localStorage.getItem('user')) || { user_id: 1 };

            const res = await api.post('/projects', {
                project_name: projectName,
                description,
                created_by: user.user_id,
            });
            toast.success('Project created successfully!');
            navigate('/dashboard');
        } catch (error) {
            // Error handled by interceptor
        }
    };

    return (
        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-sm border p-8 mt-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Create New Project</h1>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Project Name
                    </label>
                    <input
                        type="text"
                        value={projectName}
                        onChange={(e) => setProjectName(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                        placeholder="E.g., Website Redesign"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Description
                    </label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={4}
                        className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                        placeholder="A short description of this project..."
                    />
                </div>

                <div className="flex justify-end space-x-4 pt-4">
                    <button
                        type="button"
                        onClick={() => navigate('/dashboard')}
                        className="px-6 py-2.5 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-6 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-medium shadow-md transition-all active:scale-95"
                    >
                        Save Project
                    </button>
                </div>
            </form>
        </div>
    );
}
