// constants.js
export const URL_BASE = import.meta.env.VITE_API_URL;
export const ENDPOINT = {
  login: `${URL_BASE}/login`,
  users: `${URL_BASE}/usuarios`,
  publications: `${URL_BASE}/publications`,
  perfil: `${URL_BASE}/perfil`,
  myPublications: `${URL_BASE}/my-publications`,
  favorites: `${URL_BASE}/favorites`
};