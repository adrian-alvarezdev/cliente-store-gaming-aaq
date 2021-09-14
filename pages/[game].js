import React, {useState, useEffect} from "react";
import {useRouter} from "next/router";
import {getGameByUrlApi} from "../api/games";
import HeaderGame from "../components/HeaderGame";

import BasicLayout from "../layouts/BasicLayout";
import TabsGame from '../components/Game/TabsGame';


export default function Game2() {
  const [game, setGame] = useState(null);
  const {query} = useRouter();

  useEffect(() => {
    (async () => {
      const response = await getGameByUrlApi(query.game);
      setGame(response);
    })();
  }, [query]);

  if (!game) return null;

  return (
    <BasicLayout className="game">
      <HeaderGame game={game} />
      <TabsGame game={game}/>
    </BasicLayout>
  );
}
