import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './features/auth/Login';
import LoginMUI from './features/auth/LoginMUI';
import LoginBS from './features/auth/LoginBS';
import Dashboard from './pages/Dashboard';
import ProjectDetail from './pages/ProjectDetail';
import ProtectedRoute from './components/ProtectedRoute';

export default function App() {
  /* Q4 — Tester ces scénarios (comportement attendu):
    a) /dashboard sans être connecté → ProtectedRoute → redirection /login (state.from = "/dashboard")
    b) /projects/1 sans être connecté → idem, from = "/projects/1"
    c) /nimportequoi → route "*" → Navigate vers /dashboard → si non connecté → /login avec from
    d) / (racine) → Navigate vers /dashboard → idem si non connecté
    e) Connecté puis bouton Retour du navigateur → dépend de l’historique ;
       avec replace sur les Navigate, certaines entrées sont remplacées (moins de boucles).
  */
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/login-mui" element={<LoginMUI />} />
      <Route path="/login-bs" element={<LoginBS />} />
      <Route path="/dashboard" element={
        <ProtectedRoute><Dashboard /></ProtectedRoute>
      } />
      <Route path="/projects/:id" element={
        <ProtectedRoute><ProjectDetail /></ProtectedRoute>
      } />
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}
