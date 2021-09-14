import {BASE_PATH} from "../utils/constants";
import {authFetch} from "../utils/fetch";
import {size} from "lodash";

export async function isFavoriteApi(idUser, idGame, logOut) {
  try {
    const url = `${BASE_PATH}/favoritos?user=${idUser}&game=${idGame}`;
    return await authFetch(url, null, logOut);
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function addFavoriteApi(idUser, idGame, logOut) {
  try {
    const dataFound = await isFavoriteApi(idUser, idGame, logOut);
    if (size(dataFound) > 0 || !dataFound) {
      return "Este juego ya lo tienes en tu lista de favoritos";
    } else {
      const url = `${BASE_PATH}/favoritos`;
      const params = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({user: idUser, game: idGame}),
      };
      const result = await authFetch(url, params, logOut);
      return result;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
}
export async function deleteFavoriteApi(idUser, idGame, logOut) {
  try {
    const dataFound = await isFavoriteApi(idUser, idGame, logOut);
    if (size(dataFound) > 0) {
      const url = `${BASE_PATH}/favoritos/${dataFound[0]?._id}`;
      const params = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      };
      const result = authFetch(url, params, logOut);
      return result;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getFavoriteApi(idUser, logOut) {
  try {
    const url = `${BASE_PATH}/favoritos?user=${idUser}`;
    const result = await authFetch(url, null, logOut);
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}
