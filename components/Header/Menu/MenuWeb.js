import React, {useState, useEffect} from "react";
import {Container, Menu, Grid, Icon,Label} from "semantic-ui-react";
import Link from "next/Link";
import BasicModal from "../../Modal/BasicModal";
import Auth from "../../Auth/Auth";
import useAuth from "../../../hooks/useAuth";

import useCart from "../../../hooks/useCart";


import {getMeApi} from "../../../api/user";
import {getCategoriasApi} from "../../../api/categorias";
import {map} from "lodash";

export default function MenuWeb() {
  // creamos un estado PARA MOSTRAR U OCULTAR EL MODAL
  // true= abierto     false=cerrado
  // el componente MenuOptions sera el que actualizara el state, le pasamos los datos por properties

  const [categorias, setCategorias] = useState([]);
  const [showModal, setshowModal] = useState(false);
  const [titleModal, setTitleModal] = useState("Iniciar Sesion");
  const [user, setUser] = useState(undefined);
  const {logOut, auth} = useAuth();

  useEffect(() => {
    (async () => {
      const response = await getMeApi(logOut);
      setUser(response);
    })();
  }, [auth]);

  useEffect(() => {
    (async () => {
      const response = await getCategoriasApi();
      setCategorias(response || []);
    })();
  }, []);

  const onShowModal = () => {
    setshowModal(true);
  };
  const onCloseModal = () => {
    setshowModal(false);
  };

  return (
    <div className="menu">
      <Container>
        <Grid>
          <Grid.Column className="menu__left" width={6}>
            <MenuPlataformas categorias={categorias} />
          </Grid.Column>

          <Grid.Column className="menu__right" width={10}>
            {user !== undefined && (
              <MenuOptions
                onShowModal={onShowModal}
                user={user}
                logOut={logOut}
              />
            )}
          </Grid.Column>
        </Grid>
      </Container>
      <BasicModal show={showModal} setShow={setshowModal} title={titleModal}>
        <Auth onCloseModal={onCloseModal} setTitleModal={setTitleModal} />
      </BasicModal>
    </div>
  );
}

// COMPONENTES INTERNOS << MENU>>

function MenuPlataformas(props) {
  const {categorias} = props;
  return (
    <Menu>
      {map(categorias, (categoria) => (
        <Link href={`/plataformas/${categoria.url}`} key={categoria._id}>
          <Menu.Item as="a" name={categoria.url}>
            {categoria.title}
          </Menu.Item>
        </Link>
      ))}
    </Menu>
  );
}

// MENU OPTIONS

function MenuOptions(props) {
  const {onShowModal, user, logOut} = props;
 

  const { productsCart } = useCart();

  return (
    <Menu>
      {user ? (
        <>
          <Link href="/orders">
            <Menu.Item as="a">
              <Icon name="game" />
              Mis pedidos
            </Menu.Item>
          </Link>
          <Link href="/wishlist">
            <Menu.Item as="a">
              <Icon name="heart outline" />
              Wishlist
            </Menu.Item>
          </Link>
          <Link href="/account">
            <Menu.Item as="a">
              <Icon name="user outline" />
              {user.name} {user.lastname}
            </Menu.Item>
          </Link>
          <Link href="/cart">
            <Menu.Item as="a" className="m-0">
              <Icon name="cart" />
              <Label color="red" floating circular>
                {productsCart}
              </Label>
            </Menu.Item>
          </Link>

          <Menu.Item className="m-0" onClick={logOut}>
            <Icon name="power off" />
          </Menu.Item>
        </>
      ) : (
        <Menu.Item onClick={onShowModal}>
          <Icon name="user outline" />
          Mi cuenta
        </Menu.Item>
      )}
    </Menu>
  );
}
