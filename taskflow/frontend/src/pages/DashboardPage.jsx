import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LayoutDashboard, CheckCircle2, Clock, FolderKanban, Users } from 'lucide-react';
import api from '../api';

export default function DashboardPage() {
    const [stats, setStats] = useState({
        totalProjects: 0,
        totalTasks: 0,
        completedTasks: 0,
        pendingTasks: 0
    });

    useEffect(() => {
        fetchOverview();
    }, []);

    const fetchOverview = async () => {
        try {
            // In a real app we'd have a specific /overview endpoint
            // For now, we simulate an overview query by fetching projects
            const projectsRes = await api.get('/projects');
            const projects = projectsRes.data;

            let allTasks = [];
            for (const project of projects) {
                const tasksRes = await api.get(`/tasks/${project.id}`);
                allTasks = [...allTasks, ...tasksRes.data];
            }

            setStats({
                totalProjects: projects.length,
                totalTasks: allTasks.length,
                completedTasks: allTasks.filter(t => t.status === 'Completed').length,
                pendingTasks: allTasks.filter(t => t.status !== 'Completed').length,
            });
        } catch (error) {
            // Handled
        }
    };

    const statCards = [
        { title: 'Total Projects', value: stats.totalProjects, icon: FolderKanban, color: 'text-indigo-600', bg: 'bg-indigo-100' },
        { title: 'Total Tasks', value: stats.totalTasks, icon: LayoutDashboard, color: 'text-blue-600', bg: 'bg-blue-100' },
        { title: 'Completed', value: stats.completedTasks, icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-100' },
        { title: 'In Progress', value: stats.pendingTasks, icon: Clock, color: 'text-amber-600', bg: 'bg-amber-100' },
    ];

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
                <p className="text-gray-500 mt-1">Here is a high level snapshot of your team's workflow.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
                {statCards.map((stat, idx) => (
                    <div key={idx} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex items-center space-x-4">
                        <div className={`p-4 rounded-xl ${stat.bg}`}>
                            <stat.icon className={stat.color} size={32} />
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-gray-500">{stat.title}</p>
                            <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-8 bg-white p-8 rounded-2xl border shadow-sm">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h2>
                <div className="flex space-x-4">
                    <Link to="/projects" className="px-6 py-3 bg-slate-800 text-white rounded-lg font-medium hover:bg-slate-900 transition-colors shadow-md">
                        View All Projects
                    </Link>
                    <Link to="/projects/create" className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors shadow-md">
                        Create New Project
                    </Link>
                </div>
            </div>
        </div>
    );
}
