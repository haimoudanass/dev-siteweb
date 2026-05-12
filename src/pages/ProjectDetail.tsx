import { useParams, Link } from 'react-router-dom';

export default function ProjectDetail() {
  const { id } = useParams();

  return (
    <div style={{ padding: '2rem' }}>
      <p><Link to="/dashboard">← Retour au tableau de bord</Link></p>
      <h1>Projet {id}</h1>
      <p>Détail du projet.</p>
    </div>
  );
}
