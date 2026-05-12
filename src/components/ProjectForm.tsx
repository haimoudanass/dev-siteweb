import { useState } from 'react';
import styles from './ProjectForm.module.css';

// Q6: Ce composant sert pour le POST ET le PUT. Qu'est-ce qui change entre les deux usages ?
// (Réponse examen: en POST (création) les champs initiaux sont vides (initialName / initialColor par défaut) ;
//  en PUT (modification) on passe le nom et la couleur existants ; submitLabel passe p.ex. de « Créer » à « Modifier ».)

interface ProjectFormProps {
  initialName?: string;
  initialColor?: string;
  onSubmit: (name: string, color: string) => void;
  onCancel: () => void;
  submitLabel: string;
}

export default function ProjectForm({
  initialName = '',
  initialColor = '#3498db',
  onSubmit,
  onCancel,
  submitLabel,
}: ProjectFormProps) {
  const [name, setName] = useState(initialName);
  const [color, setColor] = useState(initialColor);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit(name.trim(), color);
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        className={styles.input}
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="Nom du projet"
        required
      />
      <input
        className={styles.color}
        type="color"
        value={color}
        onChange={e => setColor(e.target.value)}
        aria-label="Couleur"
      />
      <div className={styles.actions}>
        <button type="submit" className={styles.primary}>{submitLabel}</button>
        <button type="button" className={styles.secondary} onClick={onCancel}>Annuler</button>
      </div>
    </form>
  );
}
