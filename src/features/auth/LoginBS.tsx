import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Container, Card, Form, Button, Alert } from 'react-bootstrap';
import { useAuth } from './AuthContext';
import api from '../../api/axios';

// HAD QUESTION DYAL TP4 - Q3: Le Login MUI utilise sx={{}} pour le style. Le Login Bootstrap utilise des classes CSS (className). Quel système préférez-vous ? Pourquoi ?
// (Jawb l'examen: Ça dépend du projet. Le système `sx` (CSS-in-JS) de MUI permet de lier facilement la logique JS au style, mais ça surcharge le JSX. Bootstrap (utility classes) rend le code plus familier pour ceux qui connaissent le CSS classique, mais ça fait de très longues chaînes de classes).

export default function LoginBS() {
  const { state, dispatch } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const from = (location.state as { from?: string } | null)?.from ?? '/dashboard';

  useEffect(() => {
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
      const { password: _, ...user } = users[0];
      dispatch({ type: 'LOGIN_SUCCESS', payload: user });
    } catch {
      dispatch({ type: 'LOGIN_FAILURE', payload: 'Erreur serveur' });
    }
  }

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <Card style={{ maxWidth: 400, width: '100%' }}>
        <Card.Body>
          <Card.Title className="text-center fw-bold" style={{ color: '#1B8C3E' }}>
            TaskFlow
          </Card.Title>
          <p className="text-center text-muted">Connectez-vous pour continuer</p>

          {state.error && <Alert variant="danger">{state.error}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Control type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control type="password" placeholder="Mot de passe" value={password} onChange={e => setPassword(e.target.value)} required />
            </Form.Group>
            <Button type="submit" variant="success" className="w-100" disabled={state.loading}>
              {state.loading ? 'Connexion...' : 'Se connecter'}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}
