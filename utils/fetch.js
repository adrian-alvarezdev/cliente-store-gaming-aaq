import { getToken, hasExpiredToken } from "../api/token/token";

export async function authFetch(url, params, logOut) {
  const token = getToken();

  if (!token) {
    // Usuario no logeador
    logOut();
  } else {
    if (hasExpiredToken(token)) {
      // Token caducado
      logOut();
    } else {
      const paramsTemp = {
        ...params,
        headers: {
          ...params?.headers,
          Authorization: `Bearer ${token}`,
        },
      };
      try {
        const response = await fetch(url, paramsTemp);
        const result = await response.json();
        return result;
      } catch (error) {
        return error;
      }
    }
  }
}
