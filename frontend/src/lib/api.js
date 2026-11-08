// Naslov strežnika (backend). Če REACT_APP_BACKEND_URL ni nastavljen, uporabimo isto domeno.
export const API_BASE = (process.env.REACT_APP_BACKEND_URL || '').replace(/\/$/, '');

const TOKEN_KEY = 'asistentrm_admin_token';

const readToken = () => {
  try { return sessionStorage.getItem(TOKEN_KEY) || ''; } catch { return ''; }
};
const writeToken = (t) => {
  try { if (t) sessionStorage.setItem(TOKEN_KEY, t); else sessionStorage.removeItem(TOKEN_KEY); } catch { /* ignore */ }
};

// Klic admin API-ja z žetonom (ADMIN_TOKEN na strežniku). Ob napačnem žetonu ga vpraša znova.
export async function adminFetch(path, options = {}) {
  for (let attempt = 0; attempt < 2; attempt += 1) {
    let token = readToken();
    if (!token) {
      token = window.prompt('Vnesite admin žeton (ADMIN_TOKEN):') || '';
      if (!token) throw new Error('Admin žeton ni vnesen.');
      writeToken(token);
    }
    const response = await fetch(`${API_BASE}${path}`, {
      ...options,
      headers: { ...(options.headers || {}), 'X-Admin-Token': token },
    });
    if (response.status !== 401) return response;
    writeToken('');
  }
  throw new Error('Napačen admin žeton.');
}
