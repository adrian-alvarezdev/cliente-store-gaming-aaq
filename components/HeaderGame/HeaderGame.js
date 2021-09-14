import React, {useState, useEffect} from "react";
import useCart from "../../hooks/useCart";
import useAuth from "../../hooks/useAuth";
import { Grid, Image, Icon, Button, GridColumn } from "semantic-ui-react";


import {
  isFavoriteApi,
  addFavoriteApi,
  deleteFavoriteApi,
} from "../../api/favorite";
import {size} from "lodash";

import classNames from "classnames";

export default function HeaderGame(props) {
  const {game} = props;

  return (
    <Grid className="header-game">
      <Grid.Column mobile={16} tablet={6} computer={5}>
        <Image src={game.poster.url} alt={game.title} />
      </Grid.Column>

      <Grid.Column mobile={16} tablet={10} computer={11}>
        <Info game={game} />
      </Grid.Column>
    </Grid>
  );
}

function Info(props) {
  const {game} = props;
  const {title, precio, descuento, url, descripcion} = game;
  const [isFavirito, setIsFavirito] = useState(false);
  const {auth, logOut} = useAuth();
  const [realoadFavorite, setRealoadFavorite] = useState(false);
  const {addProductCart} = useCart();

  useEffect(() => {
    (async () => {
      const response = await isFavoriteApi(auth.idUser, game.id, logOut);
      if (size(response) > 0) setIsFavirito(true);
      else setIsFavirito(false);
    })();
    setRealoadFavorite(false);
  }, []);

  const addFavorite = async () => {
    if (auth) {
      await addFavoriteApi(auth.idUser, game.id, logOut);
      setRealoadFavorite(true);
    }
  };

  const deleteFavorite = async () => {
    if (auth) {
      await deleteFavoriteApi(auth.idUser, game.id, logOut);
      setRealoadFavorite(true);
    }
  };

  return (
    <>
      <div className="header-game__title">
        {title}
        <Icon
          name={isFavirito ? "heart" : "heart outline"}
          className={classNames({
            like: isFavirito,
          })}
          link
          onClick={isFavirito ? deleteFavorite : addFavorite}
        />
      </div>
      <div className="header-game__delivery">Entrega en 24/48h</div>
      <div
        className="header-game__summary"
        dangerouslySetInnerHTML={{__html: descripcion}}
      />
      <div className="header-game__buy">
        <div className="header-game__buy-price">
          <p>El Precio de Venta al Publico es de: ${precio}.00 Mxn</p>
          <div className="header-game__buy-price-actions">
            <p>-{descuento}%</p>
            <p>{(precio - Math.floor(precio * descuento) / 100).toFixed(2)}€</p>
          </div>
        </div>
        <Button
          className="header-game__buy-btn"
          onClick={() => addProductCart(url)}
        >
          Comprar
        </Button>
      </div>
    </>
  );
}
