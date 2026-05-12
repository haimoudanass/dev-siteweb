import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';
import api from '../../api/axios';
import styles from './Login.module.css';

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { state, dispatch } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const from = (location.state as { from?: string } | null)?.from ?? '/dashboard';

  useEffect(() => {
    // Q2: Quelle différence entre navigate(from) et navigate(from, { replace: true }) ?
    // (Réponse examen: replace: true remplace l’entrée courante dans l’historique du navigateur,
    //  ainsi l’utilisateur ne « retombe » pas sur la page login avec le bouton retour.)
    if (state.user) navigate(from, { replace: true });
  }, [state.user, navigate, from]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    dispatch({ type: 'LOGIN_START' });

    try {
      const { data: users } = await api.get(`/users?email=${encodeURIComponent(email)}`);

      if (!Array.isArray(users) || users.length === 0 || users[0].password !== password) {
        dispatch({ type: 'LOGIN_FAILURE', payload: 'Email ou mot de passe incorrect' });
        return;
      }

      const row = users[0] as { id: string; email: string; name: string; password: string };
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: { id: row.id, email: row.email, name: row.name },
      });
    } catch {
      dispatch({ type: 'LOGIN_FAILURE', payload: 'Erreur de connexion au serveur' });
    }
  }

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1 className={styles.title}>TaskFlow</h1>
        <p className={styles.subtitle}>Connectez-vous pour continuer</p>

        {state.error && <div className={styles.error}>{state.error}</div>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className={styles.input}
          required
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className={styles.input}
          required
        />
        <button type="submit" className={styles.button} disabled={state.loading}>
          {state.loading ? 'Connexion...' : 'Se connecter'}
        </button>
      </form>
    </div>
  );
}
