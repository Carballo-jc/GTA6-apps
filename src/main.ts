import './styles/base.css';
import './styles/neon.css';
import { iniciarRouter } from './router';
import { home } from './pages/home';
import { laburo } from './pages/laburo';
import { ficha } from './pages/ficha';
import { complices } from './pages/complices';
import { CAFECITO_URL, DISCLAIMER } from './config/site';

const app = document.getElementById('app') as HTMLElement;
app.innerHTML = `
  <main id="vista" class="vista"></main>
  <footer class="footer">
    <p>${DISCLAIMER}</p>
    <a href="${CAFECITO_URL}" target="_blank" rel="noopener" class="cafecito">☕ Invitame un cafecito</a>
  </footer>
`;

iniciarRouter({ '/': home, '/laburo': laburo, '/ficha': ficha, '/complices': complices }, document.getElementById('vista') as HTMLElement);
