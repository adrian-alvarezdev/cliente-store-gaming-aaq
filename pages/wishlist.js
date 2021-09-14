import BasicLayout from "../layouts/BasicLayout";
import {Loader} from "semantic-ui-react";
import React, {useState, useEffect} from "react";
import {size, forEach} from "lodash";
import {getFavoriteApi} from "../api/favorite";
import useAuth from "../hooks/useAuth";
import ListGames from "../components/ListGames";

export default function wishlist() {
  const [games, setGames] = useState(null);
  const {auth, logOut} = useAuth();

  useEffect(() => {
    (async () => {
      const response = await getFavoriteApi(auth.idUser, logOut);
      if (size(response) > 0) {
        const gamesList = [];
        forEach(response, (data) => {
          gamesList.push(data.game);
        });
        setGames(gamesList);
      } else {
        setGames([]);
      }
    })();
  }, []);

  return (
    <BasicLayout className="wishlist">
      <div className="wishlist__block">
        <div className="title">
          <h1>LISTA DE FAVORITOS</h1>
        </div>
        <div className="data">
          {!games && <Loader active>Cargando juegos</Loader>}
          {games && size(games) === 0 && (
            <div className="data__not-found">
              <h3>No tienes ingun juego en tu lista</h3>
            </div>
          )}
          {size(games) > 0 && <ListGames games={games} />}
        </div>
      </div>
    </BasicLayout>
  );
}
