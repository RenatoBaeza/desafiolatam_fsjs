// constants.js
export const URL_BASE = process.env.API_URL

export const ENDPOINT = {
  login: `${URL_BASE}/login`,
  users: `${URL_BASE}/usuarios`,
  publications: `${URL_BASE}/publications`,
  perfil: `${URL_BASE}/perfil`,
  myPublications: `${URL_BASE}/my-publications`
}