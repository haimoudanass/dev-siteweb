# TP 4 — Questions théorique d’examen (architecture & choix techno)

Ces questions sont **hors composants** : révision orale / écrit. Les Q1–Q3 sont aussi rappelées **dans le code** (`HeaderMUI`, `HeaderBS`, `LoginBS`).

---

## HAD QUESTION DYAL TP4 — Q4

**Si vous deviez choisir UNE seule library pour TaskFlow en production, laquelle et pourquoi ?**

> *(Jawb l'examen):* Je choisirais **Material UI** pour une application d'entreprise complexe car elle offre des composants très avancés (DataGrid, DatePickers) et un système de thème (ThemeProvider) très robuste. Si c'est un projet rapide, **Bootstrap** pour la vitesse de prototypage.

---

## HAD QUESTION DYAL TP4 — Q5

**Pourquoi React ne peut-il PAS se connecter directement à MySQL ?**

> *(Jawb l'examen):* React s'exécute **côté client** (navigateur). Si React se connectait directement à MySQL, on devrait exposer les **identifiants de la base de données** dans le code JavaScript, ce qui est une **énorme faille de sécurité**. Il faut un **backend** (Express, Spring, etc.) pour servir de **pont sécurisé**.

---

## HAD QUESTION DYAL TP4 — Q6

**json-server est parfait pour notre TP. Donnez 3 raisons pour lesquelles on ne l'utiliserait PAS en production.**

> *(Jawb l'examen):*
>
> 1. Pas de vraie **authentification / sécurité** (tout le monde peut modifier le fichier `db.json`).
> 2. Pas conçu pour supporter **plusieurs utilisateurs en même temps** (pas de **concurrence**).
> 3. **Performances** très faibles par rapport à une vraie base de données comme **PostgreSQL** ou **MongoDB**.

---

## HAD QUESTION DYAL TP4 — Q7

**Firebase permet à React de se connecter directement (pas de backend Express). Comment est-ce possible alors que MySQL ne le permet pas ?**

> *(Jawb l'examen):* Firebase est un **Backend-as-a-Service (BaaS)**. Il gère lui-même la sécurité via des **Security Rules** et l'**authentification**. Il expose une **API HTTP / WebSocket sécurisée** que le **SDK Firebase** dans React utilise. MySQL est juste un **moteur de BDD**, il n'a **pas de couche API HTTP** intégrée.

---

## HAD QUESTION DYAL TP4 — Q8 / Q10

**Vous devez créer une app de chat en temps réel. json-server, Firebase ou backend custom ? Justifiez.**

> *(Jawb l'examen):* **Firebase** (ou un **backend custom** avec **WebSockets**, ex. **Socket.io**). Firebase est idéal pour le temps réel car il **synchronise automatiquement** l'état via **WebSockets** dès qu'une donnée change sur le serveur. **json-server** est **incapable** de faire du temps réel : il utilise du **HTTP classique** (requête / réponse).

---

## Routes TP4 (démo dans l’app)

- `/login` — Login TP3 (CSS modules + router).
- `/login-mui` — `LoginMUI` (Material UI).
- `/login-bs` — `LoginBS` (React-Bootstrap).

Les headers **MUI / Bootstrap** sont prêts à l’emploi (`HeaderMUI`, `HeaderBS`) pour remplacer le header du dashboard si tu veux comparer visuellement.
