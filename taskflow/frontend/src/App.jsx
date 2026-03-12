import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import ProjectsPage from './pages/ProjectsPage';
import CreateProjectPage from './pages/CreateProjectPage';
import ProjectDetailsPage from './pages/ProjectDetailsPage';
import CreateTaskPage from './pages/CreateTaskPage';
import AssignTaskPage from './pages/AssignTaskPage';
import Layout from './components/Layout';

function App() {
  return (
    <Router>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/dashboard" />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="projects" element={<ProjectsPage />} />
          <Route path="projects/create" element={<CreateProjectPage />} />
          <Route path="projects/:id" element={<ProjectDetailsPage />} />
          <Route path="projects/:id/tasks/create" element={<CreateTaskPage />} />
          <Route path="projects/:id/tasks/assign" element={<AssignTaskPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
