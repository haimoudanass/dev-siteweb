import { Navbar, Container, Button, Nav } from 'react-bootstrap';

// HAD QUESTION DYAL TP4 - Q2: Comparez le code du Header MUI vs Bootstrap. Lequel est plus lisible ? Plus court ?
// (Jawb l'examen: Bootstrap est souvent plus court à écrire car il utilise des classes utilitaires (comme "ms-auto", "d-flex") au lieu d'objets JS complexes dans "sx". Mais MUI est souvent jugé plus personnalisable directement en JS).

interface HeaderProps {
  title: string;
  onMenuClick: () => void;
  userName?: string;
  onLogout?: () => void;
}

export default function HeaderBS({ title, onMenuClick, userName, onLogout }: HeaderProps) {
  return (
    <Navbar bg="success" variant="dark" className="px-3">
      <Container fluid>
        <Button variant="outline-light" size="sm" onClick={onMenuClick}>
          ☰
        </Button>
        <Navbar.Brand className="ms-3 fw-bold">{title}</Navbar.Brand>
        <Nav className="ms-auto d-flex align-items-center gap-3">
          {userName && <span className="text-light">{userName}</span>}
          {onLogout && (
            <Button variant="outline-light" size="sm" onClick={onLogout}>
              Déconnexion
            </Button>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}
