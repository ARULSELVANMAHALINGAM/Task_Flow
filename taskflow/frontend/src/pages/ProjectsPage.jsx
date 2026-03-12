import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, FolderOpen } from 'lucide-react';
import api from '../api';

export default function ProjectsPage() {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const res = await api.get('/projects');
            setProjects(res.data);
        } catch (error) {
            // Error handled by interceptor
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-900">Projects Overview</h1>
                <Link
                    to="/projects/create"
                    className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 px-6 rounded-lg shadow-md hover:shadow-lg transition-all"
                >
                    <Plus size={20} />
                    <span>Create New Project</span>
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                {projects.length === 0 ? (
                    <div className="col-span-full flex flex-col items-center justify-center p-12 bg-white rounded-2xl border border-dashed border-gray-300">
                        <p className="text-xl text-gray-500 font-medium">No projects found. Create one to get started!</p>
                    </div>
                ) : (
                    projects.map((project) => (
                        <div
                            key={project.id}
                            className="bg-white rounded-2xl p-6 border shadow-sm hover:shadow-xl transition-all hover:-translate-y-1"
                        >
                            <h3 className="text-xl font-bold text-gray-800 mb-2 truncate">
                                {project.project_name}
                            </h3>
                            <p className="text-gray-600 text-sm line-clamp-3 mb-6 h-12">
                                {project.description}
                            </p>

                            <Link
                                to={`/projects/${project.id}`}
                                className="w-full flex justify-center items-center space-x-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold py-2.5 px-4 rounded-lg transition-colors border border-slate-200"
                            >
                                <FolderOpen size={18} />
                                <span>Open Project</span>
                            </Link>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
