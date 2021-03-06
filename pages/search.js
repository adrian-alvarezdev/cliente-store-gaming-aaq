import React, {useState, useEffect} from "react";
import {Loader} from "semantic-ui-react";

import {useRouter} from "next/router";
import {size} from "lodash";
import {searchGamesApi} from "../api/games";
import BasicLayout from "../layouts/BasicLayout";
import ListGames from "../components/ListGames";

export default function search() {
  const [games, setGames] = useState(null);
  const {query} = useRouter();

  useEffect(() => {
    document.getElementById("search-game").focus();
  }, []);

  useEffect(() => {
    (async () => {
      if (size(query.query) > 2) {
        const response = await searchGamesApi(query.query);
        if (size(response) > 0) setGames(response);
        else setGames([]);
      } else {
        setGames([]);
      }
    })();
  }, [query]);

  return (
    <BasicLayout className="search">
      {!games && <Loader active>Buscando juegos</Loader>}
      {games && size(games) === 0 && (
        <div>
          <h3>No se han encontrado juegos</h3>
        </div>
      )}
      {size(games) > 0 && <ListGames games={games} />}
    </BasicLayout>
  );
}
