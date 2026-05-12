import { AppBar, Toolbar, Typography, IconButton, Button, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

// HAD QUESTION DYAL TP4 - Q1: Combien de lignes de CSS avez-vous écrit pour le Header MUI ? Comparez avec votre Header.module.css.
// (Jawb l'examen: 0 ligne de CSS externe. F MUI kansta3mlo la prop `sx` bach ndiro le style directement wst le composant en JS. F TP 1 drna fichier .module.css fih bezzaf d les lignes).

interface HeaderProps {
  title: string;
  onMenuClick: () => void;
  userName?: string;
  onLogout?: () => void;
}

export default function HeaderMUI({ title, onMenuClick, userName, onLogout }: HeaderProps) {
  return (
    <AppBar position="static" sx={{ backgroundColor: '#1B8C3E' }}>
      <Toolbar>
        <IconButton edge="start" color="inherit" onClick={onMenuClick} aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 700 }}>
          {title}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {userName && <Typography variant="body2">{userName}</Typography>}
          {onLogout && (
            <Button color="inherit" variant="outlined" sx={{ borderColor: 'rgba(255, 255, 255, 0.3)' }} onClick={onLogout}>
              Déconnexion
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
