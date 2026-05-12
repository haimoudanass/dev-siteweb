import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../features/auth/AuthContext';
import api from '../api/axios';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import MainContent from '../components/MainContent';
import ProjectForm from '../components/ProjectForm';

interface Project { id: string; name: string; color: string; }
interface Column { id: string; title: string; tasks: string[]; }

export default function Dashboard() {
  const { state: authState, dispatch } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [projects, setProjects] = useState<Project[]>([]);
  const [columns, setColumns] = useState<Column[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    let cancelled = false;
    async function fetchData() {
      setLoading(true);
      setLoadError(null);
      try {
        const [p, co] = await Promise.all([
          api.get<Project[]>('/projects'),
          api.get<Column[]>('/columns'),
        ]);
        if (!cancelled) {
          setProjects(p.data);
          setColumns(co.data);
        }
      } catch (e) {
        console.error(e);
        if (!cancelled) {
          const msg =
            axios.isAxiosError(e) && !e.response
              ? 'API injoignable (json-server arrêté ?). Dans un terminal : npm run api — ou npm run dev:full (API + Vite).'
              : 'Impossible de charger les données.';
          setLoadError(msg);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    fetchData();
    return () => {
      cancelled = true;
    };
  }, []);

  async function addProject(name: string, color: string) {
    setSaving(true);
    setError(null);
    try {
      const { data } = await api.post<Project>('/projects', { name, color });

      // Q3: Après un POST, pourquoi setProjects(prev => [...prev, data]) plutôt qu'un re-fetch GET ?
      // (Réponse examen: optimisation — la réponse du POST contient déjà la ressource créée ;
      //  pas besoin d'une nouvelle requête GET, on fusionne dans le state local.)
      setProjects(prev => [...prev, data]);
      setShowForm(false);
    } catch (err) {
      // Q7: Arrêter json-server et tenter un POST — le message s'affiche-t-il ? (oui, via setError dans ce catch)
      // Q8: Avec fetch, un 404 ne rejette pas la Promise ; avec Axios, les statuts 4xx/5xx déclenchent un rejet → on entre dans catch.
      if (axios.isAxiosError(err)) {
        if (!err.response) {
          setError('API injoignable — lancez json-server : npm run api');
        } else {
          setError(err.response?.data?.message || `Erreur ${err.response?.status ?? '?'}`);
        }
      } else {
        setError('Erreur inconnue');
      }
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <div style={{ padding: '2rem' }}>Chargement...</div>;

  if (loadError) {
    return (
      <div style={{ padding: '2rem', maxWidth: 520 }}>
        <p style={{ color: '#c0392b', marginBottom: '1rem' }}>{loadError}</p>
        <button
          type="button"
          onClick={() => {
            setLoadError(null);
            setLoading(true);
            void (async () => {
              try {
                const [p, co] = await Promise.all([
                  api.get<Project[]>('/projects'),
                  api.get<Column[]>('/columns'),
                ]);
                setProjects(p.data);
                setColumns(co.data);
                setLoadError(null);
              } catch (e) {
                console.error(e);
                setLoadError(
                  axios.isAxiosError(e) && !e.response
                    ? 'API injoignable. Terminal : npm run api'
                    : 'Erreur au chargement.',
                );
              } finally {
                setLoading(false);
              }
            })();
          }}
        >
          Réessayer
        </button>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Header
        title="TaskFlow"
        onMenuClick={() => setSidebarOpen(p => !p)}
        userName={authState.user?.name}
        onLogout={() => dispatch({ type: 'LOGOUT' })}
      />
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden', flexDirection: 'column' }}>
        <div style={{ padding: '0.5rem 1rem', borderBottom: '1px solid #eee', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button type="button" onClick={() => { setShowForm(v => !v); setError(null); }}>
            {showForm ? 'Fermer le formulaire' : 'Nouveau projet'}
          </button>
          {saving && <span style={{ fontSize: '0.875rem', color: '#666' }}>Enregistrement…</span>}
          {error && <span style={{ color: '#c0392b', fontSize: '0.875rem' }}>{error}</span>}
        </div>
        {showForm && (
          <ProjectForm
            submitLabel="Créer"
            onSubmit={addProject}
            onCancel={() => { setShowForm(false); setError(null); }}
          />
        )}
        <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
          <Sidebar projects={projects} isOpen={sidebarOpen} />
          <MainContent columns={columns} />
        </div>
      </div>
    </div>
  );
}
