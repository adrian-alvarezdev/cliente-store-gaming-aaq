import React, {useState, useEffect} from "react";
import {useRouter} from "next/router";
import BasicLayout from "../../layouts/BasicLayout";
import {getGamesPlatformApi, getTotalGamesPlatformApi} from "../../api/games";
import {Loader} from "semantic-ui-react";
import {size} from "lodash";
import ListGames from "../../components/ListGames";
import Pagination from "../../components/Pagination/Pagination";

const limitPerPage = 2;

export default function Categorias() {
  const {query} = useRouter();
  const [games, setGames] = useState(null);
  const [totalGames, setTotalGames] = useState(null);

  const getStartItem = () => {
    const currentPages = parseInt(query.page);
    if (!query.page || currentPages === 1) return 0;
    else return currentPages * limitPerPage - limitPerPage;
  };

  useEffect(() => {
    (async () => {
      if (query.categorias) {
        const response = await getGamesPlatformApi(
          query.categorias,
          limitPerPage,
          getStartItem()
        );
        setGames(response);
      }
    })();
  }, [query]);

  useEffect(() => {
    (async () => {
      const response = await getTotalGamesPlatformApi(query.categorias);
      setTotalGames(response);
    })();
  }, [query]);

  return (
    <BasicLayout className="categorias">
      {!games && <Loader active>Cargando juegos</Loader>}
      {games && size(games) === 0 && (
        <div>
          <h3>No hay juegos</h3>
        </div>
      )}
      {size(games) > 0 && <ListGames games={games} />}

      {totalGames ? (
        <Pagination
          totalGames={totalGames}
          page={query.page ? parseInt(query.page) : 1}
          limitPerPage={limitPerPage}
        />
      ) : null}
    </BasicLayout>
  );
}
