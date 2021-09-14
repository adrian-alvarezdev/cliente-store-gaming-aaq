import { BASE_PATH } from "../utils/constants";
import { authFetch } from "../utils/fetch";

export async function getOrdersApi(idUser, logOut) {
  try {
    const url = `${BASE_PATH}/orders?_sort=createdAt:desc&user=${idUser}`;
    const result = authFetch(url, null, logOut);
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}
