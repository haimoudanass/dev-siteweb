import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../features/auth/AuthContext';

interface Props { children: React.ReactNode; }

export default function ProtectedRoute({ children }: Props) {
  const { state } = useAuth();
  const location = useLocation();

  if (!state.user) {
    // Q1: Pourquoi <Navigate /> (composant) et pas navigate() (hook) ici ?
    // (Réponse examen: car on est dans la phase de render — pas d’effet de bord avec une fonction,
    //  il faut retourner un composant qui déclare la redirection.)
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }
  return <>{children}</>;
}
